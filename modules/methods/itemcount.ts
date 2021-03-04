import isObject from '../methods/isobject';

export default function itemCount(obj: any): number {
    /*|{
        "info": "Object class extension to count the properties in item",
        "category": "Object",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.itemCount",
        "returnType": "(Int)"
    }|*/
    if (isObject(obj)) {
        let count = 0;
        for (let prop in obj) {
            /* istanbul ignore else */
            if (obj.hasOwnProperty(prop)) { count++; }
        }
        return count;
    }
    return null;
}