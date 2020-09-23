import _typeCheck from '../protected/_typeCheck';
import isAsync from '../methods/isAsync';
import isGenerator from '../methods/isGenerator';

export default function isFunction(obj: any): boolean {
    /*|{
        "info": "Object class extension to check if object is a function",
        "category": "Object|TypeOf",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.isFunction",
        "returnType": "(Bool)"
    }|*/
    return _typeCheck(obj, Function) && !isAsync(obj) && !isGenerator(obj);
}