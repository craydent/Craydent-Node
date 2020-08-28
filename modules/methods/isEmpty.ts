
import isArray from './isArray';
import isString from './isString';
import isObject from './isObject';
import isFunction from './isFunction';
import itemCount from './itemCount';

export default function isEmpty(obj: any): boolean {
    if (isArray(obj) || isString(obj)) { return !obj.length; }
    if (isObject(obj)) { return !itemCount(obj); }
    if (isFunction(obj)) {
        return /function.*?\(.*?\)\{\}/.test(obj.toString().replace(/[\n ]/g, ''));
    }
    return false;
}