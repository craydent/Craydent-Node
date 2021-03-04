import _typeCheck from '../protected/_typeCheck';

export default function isRegExp(obj: any): boolean {
    /*|{
        "info": "Object class extension to check if object is a RegExp",
        "category": "Object|TypeOf",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.isRegExp",
        "returnType": "(Bool)"
    }|*/
    return _typeCheck(obj, RegExp);
}