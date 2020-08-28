import error from './error';
import _getFuncName from '../protected/_getFuncName';
import isArray from './isArray';
import isFunction from './isFunction';
import isNull from './isNull';
import isRegExp from './isRegExp';
import isString from './isString';
import isNumber from './isNumber';
import { ArrayIterator } from '../models/Arrays';

export default function indexOfAlt<T>(obj: any[], value: any, callback: ArrayIterator<T>, pos?: number): number;
export default function indexOfAlt(obj: any[], regex: RegExp, pos?: number): number;
export default function indexOfAlt<T>(obj: string, value: string, pos?: number): number;
export default function indexOfAlt(obj: string, regex: RegExp, pos?: number): number;
export default function indexOfAlt(obj, value, func, pos?): number {
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