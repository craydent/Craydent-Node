import error from './error';
import rand from './rand';

export default function add<T>(arr: T[]): T[] {
    try {
        return arr.sort(function () { return Math.round(rand(-1.5, 1.5)); });
    } catch (e) {
        error && error("Array.scramble", e);
        return arr;
    }
}