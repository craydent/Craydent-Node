import _typeCheck from '../protected/_typeCheck';
import isNull from '../methods/isNull';
import isEmpty from '../methods/isEmpty';

export default function isNullOrEmpty(obj: any): boolean {
    /*|{
        "info": "Object class extension to check if object is a null or empty (object with no props, empty string, etc)",
        "category": "Object|TypeOf",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.isNullOrEmpty",
        "returnType": "(Bool)"
    }|*/
    return isNull(obj) || isEmpty(obj);
}