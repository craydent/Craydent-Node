
import isArray from '../methods/isarray';
import isString from '../methods/isstring';
import isObject from '../methods/isobject';
import isFunction from '../methods/isfunction';
import itemCount from '../methods/itemcount';

export default function isEmpty(obj: any): boolean {
    /*|{
        "info": "Array class extension to check if it is empty",
        "category": "Array",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#array.isEmpty",
        "typeParameter": "",
        "returnType": "(Bool) returns true if the array is empty, otherwise false."
    }|*/
    if (isArray(obj) || isString(obj)) { return !obj.length; }
    if (isObject(obj)) { return !itemCount(obj); }
    if (isFunction(obj)) {
        return /function.*?\(.*?\)\{\}/.test(obj.toString().replace(/[\n ]/g, ''));
    }
    return false;
}