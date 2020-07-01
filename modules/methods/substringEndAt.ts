import error from './error';
import { IndexedArray } from '../models/Arrays';
import _addToIndex from '../protected/_addToIndex';

export default function substringEndAt(str: string, end: string): string {
    try {
        return str.substring(0, str.indexOf(end));
    } catch (e) {
        error && error('Object.substringEndAt', e);
    }
}