import error from './error';
import { ArrayIterator } from '../models/Arrays';


export default function map<T>(objs: T[], callback: ArrayIterator<T>, context: any): T[] {
    try {
        context = context || objs;
        let other = new Array(objs.length);
        for (let i = 0, n = objs.length; i < n; i++) {
            if (i in objs) {
                other[i] = callback.call(context, objs[i], i, objs);
            }
        }
        return other;
    } catch (e) {
        error && error("Array.map", e);
        return [];
    }
}