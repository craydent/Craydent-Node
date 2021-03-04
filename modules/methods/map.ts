import error from '../methods/error';
import { ArrayIterator } from '../models/Arrays';
import isArray from '../methods/isarray';
import duplicate from '../methods/duplicate';
import { ObjectIterator } from '../models/ObjectIterator';


export default function map<T>(objs: T[] | T, callback: ArrayIterator<T> | ObjectIterator<T>, context?: any): T[] | T {
    /*|{
        "info": "Array class extension to implement map",
        "category": "Array",
        "parameters":[
            {"callback": "(ArrayIterator<T, TResult>) Callback function used to apply changes"},
            {"thisObject?": "(any) Specify the context on callback function"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#array.map",
        "typeParameter": "<T, TResult>",
        "returnType": "(Array<TResult>) returns the resulting array."
    }|*/
    try {
        context = context || global;
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