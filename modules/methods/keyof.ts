import error from '../methods/error';
import equals from '../methods/equals';
import isNull from '../methods/isnull';

export default function keyOf<T>(obj: T, value: any): string {
    /*|{
        "info": "Object class extension to get the key of the give value",
        "category": "Object",
        "parameters":[
            {"value": "(any) Value to compare against"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.keyOf",
        "returnType": "(String)"
    }|*/
    try {
        if (isNull(obj)) {
            return '';
        }
        for (let prop in obj) {
            /* istanbul ignore else */
            if (obj.hasOwnProperty(prop)) {
                if (equals(obj[prop], value)) { return prop; }
            }
        }
        return '';
    } catch (e) /* istanbul ignore next */ {
        error && error('Object.keyOf', e);
        return '';
    }
}