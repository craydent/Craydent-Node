import error from './error';
import { IndexedArray } from '../models/Arrays';
import _addToIndex from '../protected/_addToIndex';

export default function add<T>(arr: T[], obj: any): boolean {
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