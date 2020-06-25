/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.9.0                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
import isArray from './isArray';
import error from './error';
export default function startsWithAny(subject: string, startsWith: string[]): string | false;
export default function startsWithAny(subject: string, ...args): boolean;
export default function startsWithAny(subject, ...args) {
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
            if (arg == subject.slice(0, arg.length)) { return arg; }
        }
        return false;
    } catch (e) {
        error && error('String.startsWith', e);
        return null;
    }
}
