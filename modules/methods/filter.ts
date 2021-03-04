import error from '../methods/error';
import isFunction from '../methods/isfunction';

import { ArrayIterator } from '../models/Arrays';

export default function filter<T>(objs: T[], callback: ArrayIterator<T>, context?: any): T[] {
    /*|{
        "info": "Array class extension to implement filter",
        "category": "Array",
        "parameters":[
            {"func": "(ArrayIterator<T>) Callback function used to determine if value should be returned. Callback will get the current item, index, context as arguments."},
            {"thiss?": "(any) Specify the context on callback function"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#array.filter",
        "typeParameter": "<T>",
        "returnType": "(Array<T>)"
    }|*/
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