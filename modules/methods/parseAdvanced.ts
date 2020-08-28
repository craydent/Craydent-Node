import error from './error';
import _parseAdvanced from '../protected/_parseAdvanced';
import include from './include';
import isObject from './isObject';
import isString from './isString';
import absolutePath from './absolutePath';
import { AnyObject } from '../models/Arrays';
import { Reviver } from '../models/Reviver';

export default function parseAdvanced(text: string, reviver?: Reviver, values?: AnyObject, base_path?: string): AnyObject {
    /*|{
        "info": "JSON Parser that can handle types and refs",
        "category": "JSON Parser",
        "parameters":[
            {"text": "(String) A valid JSON string."},
            {"reviver?": "(Reviver) A function that transforms the results. This function is called for each member of the object. If a member contains nested objects, the nested objects are transformed before the parent object is."},
            {"values?": "(Object) Key/value pairs to be used to replace template variables defined in the json."}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#parseAdvanced",
        "returnType": "(Object)"
    }|*/
    try {
        base_path = base_path || "";
        let err;
        //handle numbers greater than max
        if (isString(text) && /\d{16,}/.test(text)) {
            text = text.replace(/(\d{16,})/g, "\"$1\"");
            if (/""\d{16,}""/.test(text)) {
                text = text.replace(/""(\d{16,})""/g, "\"$1\"");
            }
        }
        let parsedObject: AnyObject;
        try { parsedObject = JSON.parse(text, reviver) || text; } catch (e) { err = e; }
        if (!isObject(parsedObject)) {
            base_path = text.substring(0, text.lastIndexOf('/'));
            parsedObject = include(absolutePath(text));
            if (!parsedObject) { throw err; }
        }
        if (base_path && base_path.slice(-1) != "/") {
            base_path += "/";
        }
        return _parseAdvanced(parsedObject, null, values, base_path, 0);
    } catch (e) /* istanbul ignore next */ {
        error && error('JSON.parseAdvanced', e);
    }
}