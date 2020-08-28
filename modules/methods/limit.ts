import error from './error';

export default function limit<T>(arr: T[], max: number, skip?: number): T[] {
    try {
        skip = skip || 0;
        return arr.slice(skip, max + skip);
    } catch (e) /* istanbul ignore next */ {
        error && error("Array.limit", e);
        return [];
    }
}