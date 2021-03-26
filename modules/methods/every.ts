import error from '../methods/error';
import { ArrayIterator } from '../models/Arrays';
import isArray from '../methods/isarray';
import { ObjectIterator } from '../models/ObjectIterator';


export default function every<T>(objs: T[] | T, callback: ArrayIterator<T> | ObjectIterator<T>, context?: any): boolean {
    /*|{
        "info": "Array class extension to implement .every method",
        "category": "Array",
        "parameters":[
            {"callback": "(ArrayIterator<T>) Callback to test for each element. Callback will get the current item, index, context as arguments."},
            {"thisObject?": "(any) Context for the callback function"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#array.every",
        "typeParameter": "<T>",
        "returnType": "(Bool)"
    }|*/
    try {
        const thiss: any = context || objs;
        if (isArray(objs)) {
            //@ts-ignore
            for (let i = 0, len = objs.length; i < len; i++) {
                if (!(callback as ArrayIterator<T>).call(thiss, (objs as any)[i], i, objs as any)) { return false; }
            }
        } else {
            for (let prop in thiss)
                if (!(callback as ObjectIterator<T>).call(thiss, (objs as any)[prop], prop, objs as any)) {
                    return false;
                }
        }
        return true;
    } catch (e) /* istanbul ignore next */ {
        error && error("Array.every", e);
        return null as any;
    }
}