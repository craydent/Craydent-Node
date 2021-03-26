import error from '../methods/error';
import _removeFromIndex from '../protected/_removeFromIndex';
import { IndexedArray, ArrayIterator } from '../models/Arrays';

export default function remove<T>(arr: T[], value: any, indexOf?: ArrayIterator<T>): T | boolean {
    /*|{
        "info": "Array class extension to remove an item by value",
        "category": "Array",
        "parameters":[
            {"value": "(any) Value to remove"},
            {"indexOf?": "(ArrayIterator<T>) Callback function to use to find the item based on the value"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#array.remove",
        "typeParameter": "<T>",
        "returnType": "(T | undefined) returns the removed item."
    }|*/
    try {
        let objs = arr as IndexedArray<T>
        indexOf = indexOf || objs.indexOf;
        let index = indexOf.call(objs, value);
        if (!~index) { return false; }
        if (objs.__indexed_buckets) {
            _removeFromIndex(objs.__indexed_buckets, objs[index]);
        }
        return objs.splice(index, 1)[0];
    } catch (e) /* istanbul ignore next */ {
        error && error("Array.remove", e);
        return null as any;
    }
}
