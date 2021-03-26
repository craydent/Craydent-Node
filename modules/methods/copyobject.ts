import error from '../methods/error';
import _duplicate from '../protected/_duplicate';

export default function copyObject<T>(obj: T): T {
    /*|{
        "info": "Object class extension to copy an object excluding constructor",
        "category": "Object",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.copyObject",
        "returnType": "(Object)"
    }|*/
    try {
        return _duplicate({} as T, obj, true);
    } catch (e) /* istanbul ignore next */ {
        error && error("Object.copyObject", e);
        return null as any;
    }
}