import error from '../methods/error';
import { ArrayIterator } from '../models/Arrays';
import isArray from '../methods/isarray';
import duplicate from '../methods/duplicate';
import { ObjectIterator } from '../models/ObjectIterator';


export default function map<T,TResult>(objs: T[] | T, callback: ArrayIterator<T> | ObjectIterator<T>, context?: any): TResult[] | T {
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
            let other: any = new Array(objs.length);
            //@ts-ignore
            for (let i = 0, n = objs.length; i < n; i++) {
                other[i] = (callback as ArrayIterator<T>).call(context, (objs as T[])[i], i, objs as any);
            }
            return other;
        }
        let obj: any = duplicate(objs as T);
        for (let prop in obj) {
            /* istanbul ignore else */
            if (obj.hasOwnProperty(prop)) {
                obj[prop] = (callback as ObjectIterator<T>).call(context, obj[prop], prop, obj);
            }
        }
        return obj;
    } catch (e) /* istanbul ignore next */ {
        error && error("Array.map", e);
        return null as any;
    }
}