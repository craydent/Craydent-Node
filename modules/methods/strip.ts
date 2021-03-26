/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.9.0                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
import error from '../methods/error';
import _generalTrim from '../protected/_generalTrim';
export default function strip(str: string, character?: string | string[]): string {
    /*|{
        "info": "String class extension to remove characters from the beginning and end of the string",
        "category": "String",
        "parameters":[
            {"character": "(Char[]) Character to remove"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#string.strip",
        "returnType": "(String)"
    }|*/
    try {
        return _generalTrim(str, undefined, character);
    } catch (e) /* istanbul ignore next */ {
        error && error("_strip", e);
        return null as any;
    }
}