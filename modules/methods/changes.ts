import error from '../methods/error';
import equals from '../methods/equals';
import { AnyObject } from '../models/Generics';

export interface CompareResults {
    $length: number;
    $add: string[];
    $update: string[];
    $delete: string[];
}
export default function changes(obj: AnyObject, compare: AnyObject): CompareResults {
    /*|{
        "info": "Object class extension to compare properties that have changed",
        "category": "Object",
        "parameters":[
            {"compare": "(any) Object to compare against"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.",
        "returnType": "(Object)"
    }|*/
    try {
        if (obj.constructor != Object || compare.constructor != Object) {
            throw new TypeError();
        }
        let rtn = { $length: 0, $add: [], $update: [], $delete: [] };
        // loop through each property of the original
        for (let prop in obj) {
            /* istanbul ignore else */
            if (obj.hasOwnProperty(prop)) {
                if (!compare.hasOwnProperty(prop)) {
                    rtn[prop] = null;
                    rtn.$delete.push(prop);
                    rtn.$length++;
                } else if (!equals(compare[prop], obj[prop])) {
                    rtn[prop] = compare[prop];
                    rtn.$update.push(prop);
                    rtn.$length++;
                }
            }
        }
        // loop through each property of the compare to make sure
        // there are no properties from compare missing from the original
        for (let prop in compare) {
            if (compare.hasOwnProperty(prop) && !obj.hasOwnProperty(prop)) {
                rtn[prop] = compare[prop];
                rtn.$add.push(prop);
                rtn.$length++;
            }
        }
        return rtn;

    } catch (e) /* istanbul ignore next */ {
        error && error("Object.changes", e);
        return null;
    }
}