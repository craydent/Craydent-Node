import isNull from '../methods/isNull';

export default function isObject(obj: any, check_instance?: boolean): boolean {
    /*|{
        "info": "Object class extension to check if object is an object",
        "category": "Object|TypeOf",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.isObject",
        "returnType": "(Bool)"
    }|*/
    if (isNull(obj)) { return false; }
    return (obj.constructor == Object || (!!check_instance && obj instanceof Object));
}