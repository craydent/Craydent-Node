import _typeCheck from '../protected/_typeCheck'

export default function isBoolean(obj: any): boolean {
    /*|{
        "info": "Object class extension to check if object is a boolean",
        "category": "Object|TypeOf",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.isBoolean",
        "returnType": "(Bool)"
    }|*/
    return _typeCheck(obj, Boolean);
}