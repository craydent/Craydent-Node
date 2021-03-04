import error from '../methods/error';
import isInt from '../methods/isint';

export default function _even(num: number): boolean {
    try {
        if (isNaN(num) || !isInt(num)) { return false; }
        return !(num & 1);
    } catch (e) /* istanbul ignore next */ {
        error && error('_even', e);
    }
}