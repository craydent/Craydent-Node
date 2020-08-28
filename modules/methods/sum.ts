import error from './error';
import isNumber from './isNumber';

export default function sum(arr: number[]): number {
    try {
        let value = 0;
        for (let i = 0, len = arr.length; i < len; i++) {
            value += isNumber(arr[i]) ? arr[i] : 0;
        }
        return value;
    } catch (e) /* istanbul ignore next */ {
        error && error("Array.sum", e);
        return NaN;
    }
}