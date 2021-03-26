import error from '../methods/error';
import isArray from '../methods/isarray';
import isObject from '../methods/isobject';
import isRegExp from '../methods/isregexp';
import { AnyObject } from '../models/Generics';

export default function equals(obj: AnyObject, compare: AnyObject, props?: string[]): boolean;
export default function equals(item: any, compare: any): boolean;
export default function equals(obj: any, compare: any, props?: any): boolean {
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
                /* istanbul ignore next */
                if (!compare.hasOwnProperty(prop)) { continue; }
                if (!equals(obj[prop], compare[prop])) { return false; }
            }
            for (let prop in obj) {
                /* istanbul ignore next */
                if (!obj.hasOwnProperty(prop)) { continue; }
                if (!equals(obj[prop], compare[prop])) { return false; }
            }
            return true;
        }
        if (obj === undefined && compare !== undefined || obj !== undefined && compare === undefined) { return false; }
        if (obj === null && compare !== null || obj !== null && compare === null) { return false; }
        if (isRegExp(compare)) { return compare.test(obj.toString()); }
        if (obj === undefined && compare === undefined || obj === null && compare === null) { return true; }
        return (obj.toString() == compare.toString() && obj.constructor == compare.constructor);
    } catch (e) /* istanbul ignore next */ {
        error && error(`${obj.constructor.name}.equals`, e);
        return null as any;
    }
}