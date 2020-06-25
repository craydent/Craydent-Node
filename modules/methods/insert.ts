import error from './error';
import add from './add';
import isArray from './isArray';

export default function insert<T>(objs: T[], value: any | any[]): boolean {
    try {
        if (isArray(value)) {
            for (let i = 0, len = value.length; i < len; i++) {
                add(objs, value[i]);
            }
        } else {
            add(objs, value);
        }
        return true;
    } catch (e) {
        error && error("Array.insert", e);
        return null;
    }
}