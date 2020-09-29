import error from '../methods/error';
import _parseAdvanced from '../protected/_parseAdvanced';
import duplicate from '../methods/duplicate';
import include from '../methods/include';
import isObject from '../methods/isObject';
import isString from '../methods/isString';
import absolutePath from '../methods/absolutePath';
import { AnyObject } from '../models/Arrays';
import { Reviver } from '../models/Reviver';

export default function parseAdvanced(text: string | AnyObject, reviver?: Reviver, values?: AnyObject, base_path?: string): AnyObject {
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
        if (isString(text) && /\d{16,}/.test(text as string)) {
            text = text.replace(/(\d{16,})/g, "\"$1\"");
            if (/""\d{16,}""/.test(text as string)) {
                text = text.replace(/""(\d{16,})""/g, "\"$1\"");
            }
        }
        let parsedObject: AnyObject;
        if (isObject(text)) {
            parsedObject = text as AnyObject;
        } else {
            try { parsedObject = JSON.parse(text as string, reviver) || text; } catch (e) { err = e; }
        }
        if (!isObject(parsedObject)) {
            base_path = text.substring(0, text.lastIndexOf('/'));
            parsedObject = include(absolutePath(text as string));
            if (!parsedObject) { throw err; }
        }
        if (base_path && base_path.slice(-1) != "/") {
            base_path += "/";
        }
        return _parseAdvanced(duplicate(parsedObject, true), null, values, base_path, 1);
    } catch (e) /* istanbul ignore next */ {
        error && error('JSON.parseAdvanced', e);
    }
}