import { _joinHelper } from '../methods/where';
import error from '../methods/error';

export default function joinLeft<T, R, TResult>(orig: T[], arr: R[], on: string): TResult[] {
    try {
        return _joinHelper(arr, orig, on);
    } catch (e) /* istanbul ignore next */ {
        error && error('Array.joinRight', e);
        return [];
    }
}