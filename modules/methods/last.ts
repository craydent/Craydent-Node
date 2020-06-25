import error from './error';

export default function last<T>(arr: T[]): T {
    try {
        return arr[arr.length - 1];
    } catch (e) {
        error && error('Array.last', e);
        return null;
    }
}