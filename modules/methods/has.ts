import error from '../methods/error';
import { AnyObject } from '../models/Generics';

export default function has(obj: AnyObject, property: string): boolean {
    /*|{
        "info": "Alias to Object.prototype.hasOwnProperty",
        "category": "Object",
        "parameters":[
            {"property": "(String) Property name to check"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.has",
        "returnType": "(Boolean)"
    }|*/
    try {
        return Object.prototype.hasOwnProperty.call(obj, property);
    } catch (e) /* istanbul ignore next */ {
        error && error('Object.has', e);
    }
}