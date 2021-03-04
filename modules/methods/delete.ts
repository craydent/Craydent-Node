import error from '../methods/error';
import { WhereCondition, IndexedArray, DeleteOptions } from '../models/Arrays';
import equals from '../methods/equals';
import contains from '../methods/contains';
import { _containsLessThan, _containsLessThanEqual, _containsGreaterThan, _containsGreaterThanEqual, _containsType, _containsMod } from '../protected/_containsComparisons';
import isNull from '../methods/isnull';
import isArray from '../methods/isarray';
import isFunction from '../methods/isfunction';
import isInt from '../methods/isint';
import isObject from '../methods/isobject';
import isRegExp from '../methods/isregexp';
import isString from '../methods/isstring';
import parseBoolean from '../methods/parseboolean';
import _removeFromIndex from '../protected/_removeFromIndex';
import getProperty from '../methods/getproperty';
import __queryNestedProperty from '../private/__queryNestedProperty';
import _subQuery from '../protected/_subQuery';

export default function deleteIt<T>(objs: T[], condition?: WhereCondition, justOne?: boolean): T[];
export default function deleteIt<T>(objs: T[], condition?: WhereCondition, options?: DeleteOptions): T[];
export default function deleteIt<T>(objs, condition?, justOne?): T[] {
    /*|{
        "info": "Array class extension to delete records",
        "category": "Array",
        "defaults": {
            "justOne": true
        },
        "parameters":[
            {"condition": "(WhereCondition) Query following find/where clause syntax"},
            {"justOne?": "(Bool) Flag for deleting just one records [Default is: true]"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#array.delete",
        "typeParameter": "<T>",
        "returnType": "(Array<T>) returns a list of the deleted objects."
    }|*/
    try {
        let docs = objs as IndexedArray<T>;
        const _equals = equals,
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
            _parseBoolean = parseBoolean;
        justOne = parseBoolean(isNull(justOne) ? true : isNull((justOne as DeleteOptions).justOne, justOne));
        // if no condition was given, remove all
        if (!condition) { return docs.splice(0, justOne ? 1 : docs.length); }
        let arr = [], indexes = [], cb = function (obj, i) {
            if (justOne) {
                if (docs.__indexed_buckets) {
                    _removeFromIndex(docs.__indexed_buckets, obj);
                }
                arr = arr.concat(docs.splice(i, 1));
                return false;
            }
            indexes.push(i);
            return true;
        };

        let _refs = [], ifblock = _subQuery(condition, null, null, _refs),
            func = `
            (function (record,i) {
            	var values,finished;
            	if (${ifblock}) {
            		if(!cb.call(objs,record,i)) { throw 'keep going'; }
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
            docs.filter(eval(func));
        } catch (e) {
            /* istanbul ignore if */
            if (e != 'keep going') { throw e; }
        }

        for (let i = indexes.length - 1; i >= 0; i--) {
            let item = docs.splice(indexes[i], 1);
            if (docs.__indexed_buckets) {
                _removeFromIndex(docs.__indexed_buckets, item[0]);
            }
            arr = item.concat(arr);
        }

        return arr;
    } catch (e) /* istanbul ignore next */ {
        error("Array.delete", e);
        return [];
    }
}