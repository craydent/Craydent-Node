import error from './error';
import _foo from './foo';
import _indexOfAlt from './indexOfAlt';
import {
    _containsMatches,
    _containsLessThan,
    _containsGreaterThan,
    _containsLessThanEqual,
    _containsGreaterThanEqual,
    _containsMod,
    _containsType
} from '../protected/_containsComparisons'
import isArray from './isArray';
import isFunction from './isFunction';
import isNumber from './isNumber';
import isObject from './isObject';
import isRegExp from './isRegExp';
import isString from './isString';
import { ContainsValue, ContainsObjectIterator, ComparisonOperator } from '../models/Arrays';

const _isFunction = isFunction,
    _isArray = isArray,
    _isObject = isObject,
    _isRegExp = isRegExp,
    _isString = isString,
    _isNumber = isNumber


export default function contains<T, TValue>(arr: T[], func: ContainsObjectIterator<T, TValue>): boolean;
export default function contains<T, TValue>(arr: T[], val: ContainsValue, func: ContainsObjectIterator<T, TValue>): boolean;
export default function contains<T, TValue>(arr: T[], val: ContainsValue, operator: ComparisonOperator): boolean;
export default function contains<T, TValue>(obj: T, val: ContainsValue, func: ContainsObjectIterator<T, TValue>): boolean;
export default function contains<T, TValue>(str: string, val: ContainsValue): boolean;
export default function contains<T, TValue>(num: number, val: ContainsValue): boolean;
export default function contains(obj, val, func?) {
    try {
        if (_isFunction(val) && !func) {
            for (var prop in obj) {
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
                var f = _foo as any;
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
                for (var i = 0, len = val.length; i < len; i++) {
                    var item = val[i];
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
            for (var prop in obj) {
                if (!obj.hasOwnProperty(prop)) {
                    continue;
                }
                if ((func && func(obj[prop], prop, obj)) || obj[prop] == val) {
                    return true;
                }
            }
            return false;
        }
        if (_isNumber(obj)) {
            return !!~obj.toString().indexOf(val);
        }
        return false;
    } catch (e) {
        error && error("Array.contains", e);
        return null;
    }
}