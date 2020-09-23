import error from '../methods/error';
import condense from '../methods/condense';
import isArray from '../methods/isArray';
import { IndexedArray, IndexedBucket } from '../models/Arrays';
import isNull from '../methods/isNull';

export default function createIndex<T>(objs: T[], indexes: string | string[]): IndexedArray<T> {
    /*|{
        "info": "Array class extension to create indexes for faster searches during where",
        "category": "Array",
        "parameters":[
            {"properties": "(string) Property or comma delimited property list to index."}],

        "overloads":[
            {"parameters":[
                {"indexes": "(Array<string>) Array of properties to index"}]}],

        "url": "http://www.craydent.com/library/1.9.3/docs#array.createIndex",
        "typeParameter": "<T>",
        "returnType": "(Array<T> | Bool) returns the Array<T> if successfull otherwise false."
    }|*/
    try {
        let arr = objs as IndexedArray<T>;
        arr.__indexed_buckets = arr.__indexed_buckets || {};
        if (!indexes || !indexes.length) { return arr; }
        if (!isArray(indexes)) { indexes = (indexes as string).split(','); }
        indexes = condense(indexes as string[], true);

        let subArr = arr.slice().filter((obj) => !isNull(obj));
        for (let i = 0, len = indexes.length; i < len; i++) {
            let prop = indexes[i].trim();
            subArr = subArr.slice();

            let bucket = arr.__indexed_buckets[prop] = {} as IndexedBucket<T>;
            let keys = bucket.__bucket_keys = [];

            subArr.sort(function (a, b) {
                if (a[prop] < b[prop]) { return -1; }
                if (a[prop] > b[prop]) { return 1; }
                return 0;
            });
            let last_key = '';
            for (let j = 0, jlen = subArr.length; j < jlen; j++) {
                let item = subArr[j];
                if (last_key !== item[prop]) {
                    last_key = item[prop];
                    keys.push(item[prop]);
                }
                bucket[item[prop]] = bucket[item[prop]] || [];
                bucket[item[prop]].push(item);

            }
        }
        return arr;
    } catch (e) /* istanbul ignore next */ {
        error("Array.createIndex", e);
        let emptyArr = [] as IndexedArray<T>;
        emptyArr.__indexed_buckets = {};
        return emptyArr;
    }
}