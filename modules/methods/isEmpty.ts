
import isArray from '../methods/isArray';
import isString from '../methods/isString';
import isObject from '../methods/isObject';
import isFunction from '../methods/isFunction';
import itemCount from '../methods/itemCount';

export default function isEmpty(obj: any): boolean {
    if (isArray(obj) || isString(obj)) { return !obj.length; }
    if (isObject(obj)) { return !itemCount(obj); }
    if (isFunction(obj)) {
        return /function.*?\(.*?\)\{\}/.test(obj.toString().replace(/[\n ]/g, ''));
    }
    return false;
}