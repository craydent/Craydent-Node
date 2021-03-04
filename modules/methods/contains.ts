import error from '../methods/error';
import _foo from '../methods/foo';
import _indexOfAlt from '../methods/indexofalt';
import {
    _containsMatches,
    _containsLessThan,
    _containsGreaterThan,
    _containsLessThanEqual,
    _containsGreaterThanEqual,
    _containsMod,
    _containsType
} from '../protected/_containsComparisons'
import isArray from '../methods/isarray';
import isFunction from '../methods/isfunction';
import isNumber from '../methods/isnumber';
import isObject from '../methods/isobject';
import isRegExp from '../methods/isregexp';
import isString from '../methods/isstring';
import { ContainsValue, ContainsObjectIterator } from '../models/Contains';
import { ComparisonOperator } from '../models/ComparisonOperator'

const _isFunction = isFunction,
    _isArray = isArray,
    _isObject = isObject,
    _isRegExp = isRegExp,
    _isString = isString,
    _isNumber = isNumber


export default function contains<T, TValue>(arr: T[], func: ContainsObjectIterator<T, TValue>): boolean;
export default function contains<T, TValue>(arr: T[], val: ContainsValue, func?: ContainsObjectIterator<T, TValue>): boolean;
export default function contains<T, TValue>(arr: T[], val: ContainsValue, operator?: ComparisonOperator): boolean;
export default function contains<T, TValue>(obj: T, val: ContainsValue, func?: ContainsObjectIterator<T, TValue>): boolean;
export default function contains<T, TValue>(str: string, val: ContainsValue): boolean;
export default function contains<T, TValue>(num: number, val: ContainsValue): boolean;
export default function contains(obj, val, func?) {
    /*|{
        "info": "Object class extension to check if value exists",
        "category": "Array|Object",
        "parameters":[
            {"val": "(ContainsValue|ContainsObjectIterator<T, TValue>) Value to check or custom function to determine validity"}],

        "overloads":[
            {"parameters":[
                {"val": "(ContainsValue) Value to check"},
                {"func": "(ContainsIterator<T>) Callback function used to do the comparison"}]},
            {"parameters":[
                {"val": "(ContainsValue) Value to check"},
                {"func": "(ComparisonOperator) String indicating logical operator (\"$lt\"|\"$lte\"|\"$gt\"|\"$gte\"|\"$mod\"|\"$type\")" }]},
            {"parameters":[
                {"arr": "(Array<ContainsValue>) Array of values to return first matching value"}]}],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.contains",
        "typeParameter": "<T, TValue>",
        "returnType": "(Bool) returns if there was a match."
    }|*/
    try {
        if (_isFunction(val) && !func) {
            for (let prop in obj) {
                if (val(obj[prop], prop, obj)) {
                    return true;
                }
            }
        }
        if (_isArray(obj)) {
            if (~obj.indexOf(val) && !func) {
                return true;
            }
            if (_isFunction(func) || _isRegExp(val)) {
                if (!func) {
                    return _containsMatches(obj, val);
                }
                return !!~_indexOfAlt(obj, val, func);
            }
            if (_isString(func)) {
                let f = _foo as any;
                switch (func) {
                    case "$lt":
                        f = _containsLessThan;
                        break;
                    case "$lte":
                        f = _containsLessThanEqual;
                        break;
                    case "$gt":
                        f = _containsGreaterThan;
                        break;
                    case "$gte":
                        f = _containsGreaterThanEqual;
                        break;
                    case "$mod":
                        f = _containsMod;
                        break;
                    case "$type":
                        f = _containsType;
                        break;
                }
                return !!f(obj, val);
            }
            if (_isArray(val)) {
                for (let i = 0, len = val.length; i < len; i++) {
                    let item = val[i];
                    if (contains(obj, item, func)) {
                        return item;
                    }
                }
            }
        }
        if (_isString(obj)) {
            return !!~(_isRegExp(val) ? obj.search(val) : obj.indexOf(val));
        }
        if (_isObject(obj)) {
            for (let prop in obj) {
                /* istanbul ignore next */
                if (!obj.hasOwnProperty(prop)) {
                    continue;
                }
                /* istanbul ignore next */
                const result = func && func(obj[prop], prop, obj);
                if (result || obj[prop] == val) {
                    return true;
                }
            }
            return false;
        }
        if (_isNumber(obj)) {
            return !!~obj.toString().indexOf(val);
        }
        return false;
    } catch (e) /* istanbul ignore next */ {
        error && error("Array.contains", e);
        return null;
    }
}