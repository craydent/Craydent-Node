import error from './error';
import _removeFromIndex from '../protected/_removeFromIndex';
import { IndexedArray } from '../models/Arrays';

export default function removeAt<T>(arr: T[], index: number): T | boolean {
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
