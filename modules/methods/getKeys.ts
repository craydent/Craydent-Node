import error from '../methods/error';
import { AnyObject } from '../models/Arrays';
import isNull from '../methods/isNull';

export default function getKeys(obj: AnyObject): string[] {
    /*|{
        "info": "Object class extension to get the keys of the object",
        "category": "Object",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.getKeys",
        "returnType": "(Array<string>)"
    }|*/
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
