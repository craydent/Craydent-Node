import _stringifyAdvanced from '../protected/_stringifyAdvanced';
import { AnyObject, AnyObjects } from '../models/Arrays';

export type Replacer = (key?: string, value?: any) => any;
export default function stringifyAdvanced(obj: AnyObject | AnyObjects, replacer?: Replacer, space?: string | number): string {
    /*|{
        "info": "JSON Parser that can handle types and refs",
        "category": "JSON Parser",
        "parameters":[
            {"json": "(Object) A JavaScript value, usually an object or array, to be converted."},
            {"replacer?": "(Replacer) A function that transforms the results. This function is called for each member of the object. If a member contains nested objects, the nested objects are transformed before the parent object is."},
            {"space?": "(String|Integer) Adds indentation, white space, and line break characters to the return-value JSON text to make it easier to read."}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#Benchmarker",
        "returnType": "(String)"
    }|*/
    return JSON.stringify(_stringifyAdvanced(obj), replacer, space);
};