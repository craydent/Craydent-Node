import error from '../methods/error';
import { GroupOptions } from '../models/Arrays';
import {
    _containsLessThan,
    _containsGreaterThan,
    _containsLessThanEqual,
    _containsGreaterThanEqual,
    _containsMod,
    _containsType
} from '../protected/_containsComparisons';
import { _copyWithProjection } from '../methods/where';
import foo from '../methods/foo';
import getKeys from '../methods/getkeys';
import suid from '../methods/suid';
import equals from '../methods/equals';
import contains from '../methods/contains';
import isNull from '../methods/isnull';
import isArray from '../methods/isarray';
import isFunction from '../methods/isfunction';
import isInt from '../methods/isint';
import isObject from '../methods/isobject';
import isRegExp from '../methods/isregexp';
import isString from '../methods/isstring';
import duplicate from '../methods/duplicate';
import setProperty from '../methods/setproperty';
import merge from '../methods/merge';
import getProperty from '../methods/getproperty';
import getValue from '../methods/getvalue';
import parseBoolean from '../methods/parseboolean';
import _unwind from '../protected/_unwind';
import _groupFieldHelper from '../protected/_groupFieldHelper';
import __queryNestedProperty from '../private/__queryNestedProperty';
import _subQuery from '../protected/_subQuery';

export default function group<T>(docs: T[], params: GroupOptions<T>, removeProps?: boolean): T[] {
    /*|{
        "info": "Array class extension to group records by fields",
        "category": "Array",
        "parameters":[
            {"params": "(GroupOptions<T>) specs with common properties:<br />(Object) key<br />(Object | string) condition<br />(Function) reduce<br />(Object) initial<br />(Array<string> | Function) keyf<br />(Function) finalize"},
            {"removeProps?": "(Bool) Flag to preserve property if the value is null or undefined."}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#array.group",
        "typeParameter": "<T>",
        "returnType": "(Array<T>)"
    }|*/
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
            _getProperty = getProperty,
            _parseBoolean = parseBoolean,
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