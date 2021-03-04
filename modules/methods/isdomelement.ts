import isNull from '../methods/isnull';

export default function isDomElement(obj: any): boolean {
    /*|{
        "info": "Object class extension to check if object is a DOM element",
        "category": "Object|TypeOf",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.isDomElement",
        "returnType": "(Bool)"
    }|*/
    if (isNull(obj)) { return false; }
    return obj.nodeType === 1;
}