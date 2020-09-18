import error from '../methods/error';
import rand from '../methods/rand';

export default function scramble<T>(arr: T[]): T[] {
    try {
        return arr.sort(function () { return Math.round(rand(-1.5, 1.5)); });
    } catch (e) /* istanbul ignore next */ {
        error && error("Array.scramble", e);
        return arr;
    }
}