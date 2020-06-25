import error from './error';
import { AnyObject } from '../models/Arrays';

export default function getKeys(obj: AnyObject): string[] {
    try {
        if (Object.keys) {
            return Object.keys(obj);
        }
        let arr = [];
        for (let prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                arr.push(prop);
            }
        }
        return arr;
    } catch (e) {
        error && error('Object.getKeys', e);
        return [];
    }
}
