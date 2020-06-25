import { _joinHelper } from "./where";
import error from './error';

export default function innerJoin<T, R, TResult>(orig: T[], arr: R[], on: string): TResult[] {
    try {
        return _joinHelper(orig, arr, on, true);
    } catch (e) {
        error && error('Array.innerJoin', e);
        return [];
    }
}