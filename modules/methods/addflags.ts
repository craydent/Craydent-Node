/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.9.0                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
import error from '../methods/error';

export default function addFlags(regex: RegExp, flags: string): RegExp {
    /*|{
        "info": "RegExp class extension to add flags to regex",
        "category": "RegExp",
        "parameters":[
            {"flags": "(String) Flags to add"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#regexp.addFlag",
        "returnType": "(RegExp)"
    }|*/
    try {
        if (regex.global && !~flags.indexOf('g')) { flags += "g"; }
        if (regex.ignoreCase && !~flags.indexOf('i')) { flags += "i"; }
        if (regex.multiline && !~flags.indexOf('m')) { flags += "m"; }

        return new RegExp(regex.source, flags);
    } catch (e) /* istanbul ignore next */ {
        error && error("RegExp.addFlags", e);
        return null as any;
    }
}
