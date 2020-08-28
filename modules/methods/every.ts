import error from './error';
import { ArrayIterator } from '../models/Arrays';
import isArray from './isArray';
import { ObjectIterator } from '../models/ObjectIterator';


export default function every<T>(objs: T[] | T, callback: ArrayIterator<T> | ObjectIterator<T>, context?: any): boolean {
    try {
        const thiss = context || objs;
        if (isArray(objs)) {
            //@ts-ignore
            for (let i = 0, len = objs.length; i < len; i++) {
                if (!callback.call(thiss, objs[i], i, objs)) { return false; }
            }
        } else {
            for (let prop in thiss)
                if (!callback.call(thiss, objs[prop], prop, objs)) {
                    return false;
                }
        }
        return true;
    } catch (e) /* istanbul ignore next */ {
        error && error("Array.every", e);
        return null;
    }
}