import error from '../methods/error';
import { ArrayIterator } from '../models/Arrays';
import isArray from '../methods/isArray';
import duplicate from '../methods/duplicate';
import { ObjectIterator } from '../models/ObjectIterator';


export default function map<T>(objs: T[] | T, callback: ArrayIterator<T> | ObjectIterator<T>, context?: any): T[] | T {
    try {
        context = context || objs;
        if (isArray(objs)) {
            //@ts-ignore
            let other = new Array(objs.length);
            //@ts-ignore
            for (let i = 0, n = objs.length; i < n; i++) {
                other[i] = callback.call(context, objs[i], i, objs);
            }
            return other;
        }
        let obj = duplicate(objs as T);
        for (let prop in obj) {
            /* istanbul ignore else */
            if (obj.hasOwnProperty(prop)) {
                obj[prop] = callback.call(context, obj[prop], prop, obj);
            }
        }
        return obj;
    } catch (e) /* istanbul ignore next */ {
        error && error("Array.map", e);
        return null;
    }
}