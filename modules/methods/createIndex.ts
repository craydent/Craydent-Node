import error from './error';
import condense from './condense';
import isArray from './isArray';
import { IndexedArray, IndexedBucket } from '../models/Arrays';

export default function createIndex<T>(objs: T[], indexes: string | string[]): IndexedArray<T> {
    try {
        let arr = objs as IndexedArray<T>;
        arr.__indexed_buckets = arr.__indexed_buckets || {};
        if (!indexes || !indexes.length) { return arr; }
        if (!isArray(indexes)) { indexes = (indexes as string).split(','); }
        indexes = condense(indexes as string[], true);

        for (let i = 0, len = indexes.length; i < len; i++) {
            let prop = indexes[i].trim(), subArr = arr.slice();

            let bucket = arr.__indexed_buckets[prop] = {} as IndexedBucket;
            let keys = bucket.__bucket__keys = [];

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
    } catch (e) {
        error("Array.createIndex", e);
        let emptyArr = [] as IndexedArray<T>;
        emptyArr.__indexed_buckets = {};
        return emptyArr;
    }
}