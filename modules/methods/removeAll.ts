import error from '../methods/error';
import remove from '../methods/remove';
import isInt from '../methods/isInt';

import { IndexedArray, ArrayIterator } from '../models/Arrays';

const _isInt = isInt;

export default function removeAll<T>(arr: T[], value?: any, indexOf?: ArrayIterator<T>): T[] | boolean {
    /*|{
        "info": "Array class extension to remove all items by value",
        "category": "Array",
        "parameters":[
            {"value?": "(any) Value to remove"},
            {"indexOf?": "(IndexOf<T>) Callback function to use to find the item based on the value"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#array.removeAll",
        "typeParameter": "<T>",
        "returnType": "(Array<T>) returns an array of all the removed items."
    }|*/
    try {
        let obj = arr as IndexedArray<T>;
        if (value) {
            indexOf = indexOf || obj.indexOf;
            let removed = [], index = indexOf.call(obj, value);
            if (!~index) { return false; }
            while (~index && _isInt(index)) {
                removed.push(remove(obj, value, indexOf));
                index = indexOf.call(obj, value);
            }
            return removed;
        }
        delete obj.__indexed_buckets;
        return obj.splice(0, obj.length);

    } catch (e) /* istanbul ignore next */ {
        error && error("Array.removeAll", e);
        return null;
    }
}