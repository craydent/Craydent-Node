import error from './error';
import _getFuncName from '../protected/_getFuncName';
import isArray from './isArray';
import isFunction from './isFunction';
import isNull from './isNull';
import isRegExp from './isRegExp';
import isString from './isString';
import { ArrayIterator } from '../models/Arrays';

export default function indexOfAlt<T>(obj: any[], value: any, callback: ArrayIterator<T>): number;
export default function indexOfAlt(obj: any[], regex: RegExp, pos?: number): number;
export default function indexOfAlt<T>(obj: string, value: string, callback: ArrayIterator<T>): number;
export default function indexOfAlt(obj: string, regex: RegExp, pos?: number): number;
export default function indexOfAlt(obj, value, option): number {

    try {
        if (isArray(obj)) {
            let func = option;
            let len = obj.length,
                i = 0;
            while (i < len) {
                if (isRegExp(value) && value.test(obj[i])) { return i; }
                if (isFunction(func) && (value instanceof Object ? func(obj[i], value, obj) : func(obj[i]) === value)) { return i; }
                ++i;
            }
            return -1;
        }
        if (isString(obj)) {
            let regex = value, pos = option;
            if (isNull(regex)) {
                return -1;
            }
            pos = pos || 0;
            let index = (obj as string).substring(pos).search(regex);
            return (index >= 0) ? (index + pos) : index;
        }
    } catch (e) {
        error && error(`${_getFuncName(obj.constructor)}.indexOfAlt`, e);
        return NaN;
    }
}