import _typeCheck from '../protected/_typeCheck';

export default function isNumber(obj: any): boolean {
    /*|{
        "info": "Object class extension to check if object is a number",
        "category": "Object|TypeOf",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.isNumber",
        "returnType": "(Bool)"
    }|*/
    return _typeCheck(obj, Number);
}