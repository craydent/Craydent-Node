import error from '../methods/error';
import { IndexedArray } from '../models/Arrays';
import _addToIndex from '../protected/_addToIndex';
import _removeFromIndex from '../protected/_removeFromIndex';

export default function replaceAt<T>(arr: T[], index: number, value: T): T {
    try {
        let objs = arr as IndexedArray<T>
        let item = objs.splice(index, 1, value)[0];
        if (objs.__indexed_buckets) {
            _removeFromIndex(objs.__indexed_buckets, item);
            _addToIndex(objs.__indexed_buckets, value);
        }
        return item;
    } catch (e) /* istanbul ignore next */ {
        error && error("Array.replaceAt", e);
        return null;
    }
}