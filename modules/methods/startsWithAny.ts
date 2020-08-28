/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.9.0                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
import isArray from './isArray';
import error from './error';
import isNull from './isNull';

export default function startsWithAny(subject: string, startsWith: string[]): string | false;
export default function startsWithAny(subject: string, ...args): string | false;
export default function startsWithAny(subject, ...args) {
    /*|{
        "info": "String class extension to check if the string starts with the given string",
        "category": "String",
        "parameters":[
            {"...infinite": "(String[]) any number of arguments can be passed"}],

        "overloads":[
            {"parameters":[
                {"arr": "(String[]) An array of strings to check"}]}],

        "url": "http://www.craydent.com/library/1.9.3/docs#string.startsWithAny",
        "returnType": "(Bool|String)"
    }|*/
    try {
        subject = subject || "";
        let i = 1;
        let args = arguments;
        if (arguments.length < 3 && isArray(arguments[1])) {
            args = arguments[1];
            i = 0;
        }
        for (let len = args.length; i < len; i++) {
            let arg = args[i];
            if (isNull(arg)) { continue; }
            if (arg == subject.slice(0, arg.length)) { return arg; }
        }
        return false;
    } catch (e) /* istanbul ignore next */ {
        error && error('String.startsWith', e);
        return null;
    }
}