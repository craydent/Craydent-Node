import error from './error';
import isFunction from './isFunction';

import { ArrayIterator } from '../models/Arrays';

export default function filter<T>(objs: T[], callback: ArrayIterator<T>, context?: any): T[] {
    try {
        if (!isFunction(callback)) {
            throw new TypeError();
        }
        let filtered = [],
            thiss = context || objs;
        for (let i = 0; i < objs.length; i++) {
            let val = objs[i];
            if (callback.call(thiss, val, i, objs)) {
                filtered.push(val);
            }
        }

        return filtered;
    } catch (e) {
        error && error('Array.filter', e);
        return [];
    }
}