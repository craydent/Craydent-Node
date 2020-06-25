import error from './error';
import isArray from './isArray';
import isObject from './isObject';
import isRegExp from './isRegExp';
import { AnyObject } from '../models/Arrays';

export default function equals(obj: AnyObject, compare: AnyObject, props?: string[]): boolean;
export default function equals(item: any, compare: any): boolean;
export default function equals(obj, compare, props?): boolean {
    /*|{
        "info": "Object class extension to check if object values are equal",
        "category": "Object",
        "parameters":[
            {"compare": "(any) Object to compare against"},
            {"props?": "(String[]) Array of property values to compare against"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.equals",
        "returnType": "(Bool)"
    }|*/
    try {
        if (isArray(props)) {
            let j = 0, prop;
            while (prop = props[j++]) {
                if (obj.hasOwnProperty(prop) && compare.hasOwnProperty(prop) && !equals(obj[prop], compare[prop])
                    || (!obj.hasOwnProperty(prop) && compare.hasOwnProperty(prop))
                    || (obj.hasOwnProperty(prop) && !compare.hasOwnProperty(prop))) {
                    return false;
                }
            }
            return true;
        }
        if ((isObject(obj) && isObject(compare)) || (isArray(obj) && isArray(compare))) {
            for (let prop in compare) {
                if (!compare.hasOwnProperty(prop)) { continue; }
                if (!equals(obj[prop], compare[prop])) { return false; }
            }
            for (let prop in obj) {
                if (!obj.hasOwnProperty(prop)) { continue; }
                if (!equals(obj[prop], compare[prop])) { return false; }
            }
            return true;
        }
        if (obj === undefined && compare !== undefined || obj !== undefined && compare === undefined) { return false; }
        if (obj === null && compare !== null || obj !== null && compare === null) { return false; }
        if (isRegExp(compare)) { return compare.test(obj.toString()); }
        return (obj.toString() == compare.toString() && obj.constructor == compare.constructor);
    } catch (e) {
        error && error(`${obj.constructor.name}.equals`, e);
        return null;
    }
}