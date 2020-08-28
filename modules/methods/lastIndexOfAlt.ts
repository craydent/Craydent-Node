// import error from './error';
// import isNull from './isNull';

// export default function lastIndexOfAlt(str: string, regex: RegExp, pos?: number): number {
//     /*|{
//         "info": "String class extension to find the last index based on a regular expression",
//         "category": "String",
//         "parameters":[
//             {"regex": "(RegExp) Regular expression to check value against"},
//             {"pos?": "(Int) Max index to go up to in the search"}],

//         "overloads":[],

//         "url": "http://www.craydent.com/library/1.9.3/docs#string.lastIndexOfAlt",
//         "returnType": "(Int)"
//     }|*/
//     try {
//         regex = (regex.global) ? regex : new RegExp(regex.source, "g" + (regex.ignoreCase ? "i" : "") + (regex.multiline ? "m" : ""));
//         pos = isNull(pos, str.length);
//         if (pos < 0) { pos = 0; }
//         str = str.substring(0, pos + 1);
//         let lindex = -1,
//             next = 0,
//             result;

//         while ((result = regex.exec(str)) != null) {
//             lindex = result.index;
//             regex.lastIndex = ++next;
//         }
//         return lindex;
//     } catch (e) {
//         error && error("String.lastIndexOfAlt", e);
//     }
// }



import error from './error';
import _getFuncName from '../protected/_getFuncName';
import isArray from './isArray';
import isFunction from './isFunction';
import isNull from './isNull';
import isRegExp from './isRegExp';
import isString from './isString';
import isNumber from './isNumber';
import { ArrayIterator } from '../models/Arrays';

export default function lastIndexOfAlt<T>(obj: any[], value: any, callback: ArrayIterator<T>, pos?: number): number;
export default function lastIndexOfAlt(obj: any[], regex: RegExp, pos?: number): number;
export default function lastIndexOfAlt<T>(obj: string, value: string, pos?: number): number;
export default function lastIndexOfAlt(obj: string, regex: RegExp, pos?: number): number;
export default function lastIndexOfAlt(obj, value, func, pos?): number {
    try {
        if (isNumber(func)) {
            pos = func;
            func = undefined;
        }
        if (isNull(obj)) {
            return -1;
        }
        if (pos < 0 || pos === 0) {
            pos = 1;
        } else if (pos > 0) {
            pos++;
        }
        obj.slice && (obj = obj.slice(0, pos));

        if (isArray(obj)) {
            if (isNull(value) && isNull(func)) {
                return -1;
            }
            let i = obj.length;
            while (i >= 0) {
                if (isRegExp(value) && value.test(obj[i])) { return i; }
                // if (isFunction(func) && (value instanceof Object ? func(obj[i], value, obj) : func(obj[i]) === value)) { return i; }
                if (isFunction(func) && func(obj[i], value, obj)) { return i; }
                --i;
            }
            return -1;
        }
        if (isString(obj)) {
            if (isString(value)) {
                return obj.lastIndexOf(value);
            }
            if (isNull(value)) {
                return -1;
            }
            let regex = value;
            regex = (regex.global) ? regex : new RegExp(regex.source, `g${regex.ignoreCase ? "i" : ""}${(regex.multiline ? "m" : "")}`);
            // pos = isNull(pos, obj.length);
            // obj = obj.substring(0, pos);
            let lindex = -1,
                next = 0,
                result;

            while ((result = regex.exec(obj)) != null) {
                lindex = result.index;
                regex.lastIndex = ++next;
            }
            return lindex;
        }
        return -1;
    } catch (e) /* istanbul ignore next */ {
        error && error(`${_getFuncName(obj.constructor)}.indexOfAlt`, e);
        return NaN;
    }
}