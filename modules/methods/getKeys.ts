import error from './error';
import { AnyObject } from '../models/Arrays';
import isNull from './isNull';

export default function getKeys(obj: AnyObject): string[] {
    try {
        if (isNull(obj)) {
            return null;
        }
        if (Object.keys) {
            return Object.keys(obj);
        }
        let arr = [];
        for (let prop in obj) {
            /* istanbul ignore else */
            if (obj.hasOwnProperty(prop)) {
                arr.push(prop);
            }
        }
        return arr;
    } catch (e) /* istanbul ignore next */ {
        error && error('Object.getKeys', e);
        return [];
    }
}
