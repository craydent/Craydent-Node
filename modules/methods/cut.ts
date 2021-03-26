/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.9.0                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
import error from '../methods/error';
import isNull from '../methods/isnull';

export default function cut(str: string, startIndex: number, endIndex: number, replacement?: string): string {
    /*|{
        "info": "String class extension to remove between the provided indexes",
        "category": "String",
        "parameters":[
            {"start_index": "(Integer) Start index to cut"},
            {"end_index": "(Integer) End index to cut"},
            {"replacement?": "(String) String to put in place of the cut"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#string.cut",
        "returnType": "(String)"
    }|*/
    try {
        replacement = replacement || ""
        if (isNull(startIndex)) { return str; }
        if (isNull(endIndex)) { return str.slice(0, startIndex) + replacement }
        if (endIndex < 0 || endIndex == startIndex) {
            if (startIndex < 0 && endIndex != startIndex) {
                startIndex -= 1;
            }
            return str.slice(0, startIndex) + replacement + str.slice(endIndex);
        }
        if (endIndex == 0 && startIndex != 0 || endIndex < startIndex && endIndex > 0) { endIndex = startIndex - 1; }
        return str.slice(0, startIndex) + replacement + str.slice(endIndex + 1);
    } catch (e) /* istanbul ignore next */ {
        error && error("String.cut", e);
        return null as any;
    }
}
