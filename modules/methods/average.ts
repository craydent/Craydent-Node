import error from './error';
import isNumber from './isNumber';

export default function average(arr: number[]): number {
    try {
        let length = 0, sum = 0;
        for (let i = 0, len = arr.length; i < len; i++) {
            if (isNumber(arr[i])) {
                sum += arr[i];
                length++;
            }
        }
        return sum / length;
    } catch (e) /* istanbul ignore next */ {
        error && error("Array.average", e);
        return NaN;
    }
}