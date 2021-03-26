/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.9.0                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
import error from '../methods/error';
import { AnyObject } from '../models/Generics';
import { EachIterator } from '../models/EachIterator';

export default function eachProperty<T>(obj: AnyObject, callback: EachIterator<T>): void {
    /*|{
        "info": "Object class extension to loop through all properties where hasOwnValue is true.",
        "category": "Object",
        "parameters":[
            {"callback": "(EachIterator<T>) Function to call for each property.  Callback will have two arguments (the value of the object and the property name) passed"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.eachProperty",
        "typeParameter": "<T>",
        "returnType": "(Object)"
    }|*/
    try {
        for (let prop in obj) {
            /* istanbul ignore next */
            if (!obj.hasOwnProperty(prop)) { continue; }
            if (callback.call(obj as any, obj[prop], prop)) { break; }
        }
    } catch (e) /* istanbul ignore next */ {
        error && error('Object.eachProperty', e);
    }
}