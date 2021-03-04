import _typeCheck from '../protected/_typeCheck';
import { $c } from '../private/__common';

export default function isError(obj: any): boolean {
    /*|{
        "info": "Object class extension to check if object is an error object",
        "category": "Object|TypeOf",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.isError",
        "returnType": "(Bool)"
    }|*/
    let is = _typeCheck(obj, Error);
    return is || !!~$c.ERROR_TYPES.indexOf(obj)
        || !!~$c.ERROR_TYPES.indexOf(obj.constructor)
        || !!~$c.ERROR_TYPES.indexOf(obj.constructor.name);
}