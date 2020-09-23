import error from '../methods/error';
import { IndexedArray } from '../models/Arrays';
import _addToIndex from '../protected/_addToIndex';

export default function add<T>(arr: T[], obj: any): boolean {
    /*|{
        "info": "Array class extension to perform push and update indexes if used",
        "category": "Array",
        "featured": true,
        "parameters":[
            {"value": "(Object) value to add"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#array.add",
        "typeParameter": "",
        "returnType": "(Bool) Value to indicate success or failure"
    }|*/
    try {
        let objs = arr as IndexedArray<T>;
        objs.push(obj);
        if (objs.__indexed_buckets) {
            _addToIndex(objs.__indexed_buckets, obj);
        }
        return true;
    } catch (e) /* istanbul ignore next */ {
        error && error("Array.add", e);
        return null;
    }
}