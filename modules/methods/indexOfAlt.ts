import error from '../methods/error';
import _getFuncName from '../protected/_getFuncName';
import isArray from '../methods/isArray';
import isFunction from '../methods/isFunction';
import isNull from '../methods/isNull';
import isRegExp from '../methods/isRegExp';
import isString from '../methods/isString';
import isNumber from '../methods/isNumber';
import { ArrayIterator } from '../models/Arrays';

export default function indexOfAlt<T>(obj: any[], value: any, callback: ArrayIterator<T>, pos?: number): number;
export default function indexOfAlt(obj: any[], regex: RegExp, pos?: number): number;
export default function indexOfAlt<T>(obj: string, value: string, pos?: number): number;
export default function indexOfAlt(obj: string, regex: RegExp, pos?: number): number;
export default function indexOfAlt(obj, value, func, pos?): number {
    /*|{
        "info": "Array class extension to find index of a value based on a callback function & String class extension to find the index based on a regular expression",
        "category": "Array",
        "parameters":[
            {"value": "(any) value to find"},
            {"func": "(ArrayIterator<T, TResult>) Callback function used to do the comparison"}],

        "overloads":[
            {"parameters":[
                {"regex": "(RegExp) Regular expression to check value against"},
                {"pos?": "(Int) Index offset to start"}]}],

        "url": "http://www.craydent.com/library/1.9.3/docs#array.indexOfAlt",
        "typeParameter": "<T, TResult>",
        "returnType": "(Int) returns the index of the item that matches or -1. "
    }|*/
    try {
        if (isNumber(func)) {
            pos = func;
            func = undefined;
        }
        pos = pos || 0;
        if (isArray(obj)) {
            if (isNull(value) && isNull(func)) {
                return -1;
            }
            let len = obj.length,
                i = pos;
            while (i < len) {
                if (isRegExp(value) && value.test(obj[i])) { return i; }
                // if (isFunction(func) && (value instanceof Object ? func(obj[i], value, obj) : func(obj[i]) === value)) { return i; }
                if (isFunction(func) && func(obj[i], value, obj)) { return i; }
                ++i;
            }
            return -1;
        }
        if (isString(obj)) {
            if (isString(value)) {
                return obj.indexOf(value, pos);
            }
            let regex = value;
            if (isNull(regex)) {
                return -1;
            }
            let index = (obj as string).substring(pos).search(regex);
            return (index >= 0) ? (index + pos) : index;
        }
        return -1;
    } catch (e) /* istanbul ignore next */ {
        error && error(`${_getFuncName(obj.constructor)}.indexOfAlt`, e);
        return NaN;
    }
}