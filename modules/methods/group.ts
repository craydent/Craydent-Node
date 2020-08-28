import error from './error';
import { GroupOptions } from '../models/Arrays';
import {
    _containsLessThan,
    _containsGreaterThan,
    _containsLessThanEqual,
    _containsGreaterThanEqual,
    _containsMod,
    _containsType
} from '../protected/_containsComparisons';
import { __queryNestedProperty, _subQuery, _unwind, _groupFieldHelper, _copyWithProjection } from './where'
import foo from './foo';
import getKeys from './getKeys';
import suid from './suid';
import equals from './equals';
import contains from './contains';
import isNull from './isNull';
import isArray from './isArray';
import isFunction from './isFunction';
import isInt from './isInt';
import isObject from './isObject';
import isRegExp from './isRegExp';
import isString from './isString';
import duplicate from './duplicate';
import setProperty from './setProperty';
import merge from './merge';
import getProperty from './getProperty';
import getValue from './getValue';

export default function group<T>(docs: T[], params: GroupOptions<T>, removeProps?: boolean): T[] {
    try {
        let key = params.field || params.key,
            condition = params.cond || {},
            reduce = params.reduce || foo,
            initial = params.initial || {},
            keyf = params.keyf,
            finalize = params.finalize || function (o) { return o; };

        if (isString(key)) { key = key.split(','); }
        if (isArray(key)) {
            let tmp = {};
            for (let i = 0, len = key.length; i < len; i++) {
                tmp[key[i]] = 1;
            }
            key = tmp;
        }

        let props = getKeys(initial),
            fields = getKeys(key),
            arr = [], result = {}, id = suid(),
            cb = function (doc, i) {
                // _groupFieldHelper creates a grouping string based on the field value pairs
                if (!fields && keyf) {
                    fields = getValue(keyf, [doc]);
                    key = key || {};
                    for (let i = 0, len = fields.length; i < len; i++) {
                        key[fields[i]] = 1;
                    }
                }
                let objs = [];
                for (let f = 0, flen = fields.length; f < flen; f++) {
                    let field = fields[f];
                    if (isArray(getProperty(doc, field))) {
                        objs = objs.concat(_unwind([doc], field));
                    }
                }
                /* istanbul ignore next */
                objs = objs.length ? objs : [doc];
                for (let o = 0, olen = objs.length; o < olen; o++) {
                    let ob = objs[o];
                    let prop = _groupFieldHelper(ob, fields), addit = false;
                    if (!result[prop]) {
                        addit = true;
                        let tmp = duplicate(initial);
                        result[prop] = tmp;
                    }
                    let curr = duplicate(ob), item;
                    reduce(curr, result[prop]);
                    item = _copyWithProjection(ob, fields, !removeProps);
                    item[id] = prop;
                    addit && arr.push(item);
                }
                // var props = _groupFieldHelper(ob, fields);
                // for (var j = 0, jlen = props.length; j < jlen; j++) {
                //     var prop = props[j].key;
                //     var field = props[j].field;
                //     var value = props[j].value;
                //     addit = false;
                //     if (!result[prop]) {
                //         addit = true;
                //         var tmp = $s.duplicate(initial);
                //         result[prop] = tmp;
                //     }
                //     var curr = $s.duplicate(ob), item;
                //     reduce(curr, result[prop]);
                //     item = $s._copyWithProjection(fields, ob, !removeProps);
                //     if ($s.isArray($s.getProperty(item, field))) {
                //         $s.setProperty(item, field, value);
                //     }
                //     item[id] = prop;
                //     addit && arr.push(item);
                // }
                return true;
            };


        const thiz = docs,
            _equals = equals,
            _contains = contains,
            _isArray = isArray,
            _isNull = isNull,
            _isFunction = isFunction,
            _isObject = isObject,
            _isString = isString,
            _isRegExp = isRegExp,
            _isInt = isInt,
            _qnp = __queryNestedProperty,
            _clt = _containsLessThan,
            _clte = _containsLessThanEqual,
            _cgt = _containsGreaterThan,
            _cgte = _containsGreaterThanEqual,
            _ct = _containsType,
            _cm = _containsMod,
            _refs = [],
            ifblock = _subQuery(condition, null, null, _refs),
            func = `(function (record,i) {
                var values,finished;
                if (${ifblock}) {
                if(!cb.call(thiz,record,i)) { throw 'keep going'; }
                }
            })`;
        if (_refs.length) {
            let varStrings = "";
            for (let i = 0, len = _refs.length; i < len; i++) {
                varStrings += `var __where_cb${(i + 1)}=_refs[${i}];`
            }
            eval(varStrings);
        }
        try {
            let rarr = docs.filter(eval(func));
        } catch (e) /* istanbul ignore next */ {
            if (e != 'keep going') { throw e; }
        }

        let keyObj = duplicate(initial);
        for (let prop in key) {
            /* istanbul ignore next */
            if (!key.hasOwnProperty(prop) || !key[prop]) { continue; }
            setProperty(keyObj, prop, key[prop]);
        }
        for (let i = 0, len = arr.length; i < len; i++) {
            let merge1: T = merge(arr[i], result[arr[i][id]]);
            arr[i] = merge(keyObj, finalize(merge1) || merge1, { clone: true, intersect: true });
        }
        return arr;
    } catch (e) /* istanbul ignore next */ {
        error && error("Array.group", e);
        return [];
    }
}