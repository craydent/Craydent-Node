import _typeCheck from '../protected/_typeCheck';

export default function isPromise(obj: any): boolean {
    /*|{
        "info": "Object class extension to check if object is a promise object",
        "category": "Object|TypeOf",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.isPromise",
        "returnType": "(Bool)"
    }|*/
    return _typeCheck(obj, "Promise", true);
}