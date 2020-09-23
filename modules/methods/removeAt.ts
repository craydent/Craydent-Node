import error from '../methods/error';
import _removeFromIndex from '../protected/_removeFromIndex';
import { IndexedArray } from '../models/Arrays';

export default function removeAt<T>(arr: T[], index: number): T | boolean {
    /*|{
        "info": "Array class extension to remove item at a specific index",
        "category": "Array",
        "parameters":[
            {"index": "(Int) Index of the item to remove"}],

        "overloads": [],

        "url": "http://www.craydent.com/library/1.9.3/docs#array.removeAt",
        "typeParameter": "<T>",
        "returnType": "(T | undefined) returns the removed item."
    }|*/
    try {
        let obj = arr as IndexedArray<T>;
        if (!obj.hasOwnProperty(index)) { return false; }
        if (obj.__indexed_buckets) {
            _removeFromIndex(obj.__indexed_buckets, obj[index]);
        }
        return obj.splice(index, 1)[0];
    } catch (e) /* istanbul ignore next */ {
        error && error("Array.removeAt", e);
    }
}
