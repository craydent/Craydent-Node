import { _joinHelper } from '../methods/where';
import error from '../methods/error';

export default function innerJoin<T, R, TResult>(orig: T[], arr: R[], on: string): TResult[] {
    try {
        return _joinHelper(orig, arr, on, true);
    } catch (e) /* istanbul ignore next */ {
        error && error('Array.innerJoin', e);
        return [];
    }
}