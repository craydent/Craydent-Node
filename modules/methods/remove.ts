import error from './error';
import _removeFromIndex from '../protected/_removeFromIndex';
import { IndexedArray, ArrayIterator } from '../models/Arrays';

export default function remove<T>(arr: T[], value: any, indexOf?: ArrayIterator<T>): T | boolean {
    try {
        let objs = arr as IndexedArray<T>
        indexOf = indexOf || objs.indexOf;
        let index = indexOf.call(objs, value);
        if (!~index) { return false; }
        if (objs.__indexed_buckets) {
            _removeFromIndex(objs.__indexed_buckets, objs[index]);
        }
        return objs.splice(index, 1)[0];
    } catch (e) {
        error && error("Array.remove", e);
        return null;
    }
}
