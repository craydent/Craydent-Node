import _typeCheck from '../protected/_typeCheck'

export default function isArray(obj: any): boolean {
    /*|{
        "info": "Object class extension to check if object is an array",
        "category": "Object|TypeOf",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.isArray",
        "returnType": "(Bool)"
    }|*/
    return Array.isArray ? Array.isArray(obj) : _typeCheck(obj, Array);
}