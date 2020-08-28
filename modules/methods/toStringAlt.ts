import error from './error';
import isObject from './isObject';
import { AnyObject } from '../models/Arrays';

export default function toStringAlt(obj: AnyObject, delimiter?: string, prefix?: string, urlEncode?: boolean): string {
    /*|{
        "info": "Object class extension for an alternate way to stringify object to formatted string",
        "category": "Object",
        "parameters":[
            {"delimiter?": "(Char) Character to separate the property from the value"},
            {"prefix?": "(Char) Character to prefix the property name"},
            {"urlEncode?": "(Bool) Flag to url encode the property and value"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#",
        "returnType": "(String)"
    }|*/
    try {
        delimiter = delimiter || '=';
        prefix = prefix || '&';
        let str = '';
        for (let prop in obj) {
            /* istanbul ignore else */
            if (obj.hasOwnProperty(prop)) {
                let value = isObject(obj[prop]) ? JSON.stringify(obj[prop]) : obj[prop];
                (urlEncode) &&
                    (str += prefix + encodeURIComponent(prop) + delimiter + encodeURIComponent(value)) || (str += prefix + prop + delimiter + value);
            }
        }
        return str;
    } catch (e) /* istanbul ignore next */ {
        error && error('Object.toStringAlt', e);
    }
}