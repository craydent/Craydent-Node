import _typeCheck from '../protected/_typeCheck';
import isNull from '../methods/isNull';
import isArray from '../methods/isArray';
import isNumber from '../methods/isNumber';

export default function isInt(obj: any): boolean {
    /*|{
        "info": "Object class extension to check if object is an integer",
        "category": "Object|TypeOf",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.isInt",
        "returnType": "(Bool)"
    }|*/
    if (isNull(obj) || isArray(obj)) { return false; }
    return isNumber(obj) && parseInt(obj as any) == obj;
}