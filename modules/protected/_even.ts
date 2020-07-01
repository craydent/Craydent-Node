import error from '../methods/error';

export default function _even(num: number): boolean {
    try {
        if (isNaN(num)) { return false; }
        return !(num & 1);
    } catch (e) {
        error && error('_even', e);
    }
}