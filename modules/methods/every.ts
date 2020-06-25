import error from './error';
import { ArrayIterator } from '../models/Arrays';


export default function every<T>(objs: T[], callback: ArrayIterator<T>, context?: any): boolean {
    try {
        const thiss = context || objs;
        for (let i = 0, len = objs.length; i < len; i++) {
            if (!callback.call(thiss, objs[i], i, objs)) { return false; }
        }
        return true;
    } catch (e) {
        error && error("Array.every", e);
        return null;
    }
}