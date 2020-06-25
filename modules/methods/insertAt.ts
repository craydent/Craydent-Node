import error from './error';
import _addToIndex from '../protected/_addToIndex';

import { IndexedArray } from '../models/Arrays';

export default function insertAt<T>(arr: T[], index: number, value: any): boolean {
    try {
        let objs = arr as IndexedArray<T>;
        objs.splice(index, 0, value);
        if (objs.__indexed_buckets) {
            _addToIndex(objs.__indexed_buckets, value);
        }
        return true;
    } catch (e) {
        error && error("Array.insertAt", e);
        return null;
    }
}