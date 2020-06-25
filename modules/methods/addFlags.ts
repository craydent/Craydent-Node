/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.9.0                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
import error from './error';

export default function addFlags(obj: RegExp, flags: string): RegExp {
    try {
        if (obj.global && !~flags.indexOf('g')) { flags += "g"; }
        if (obj.ignoreCase && !~flags.indexOf('i')) { flags += "i"; }
        if (obj.multiline && !~flags.indexOf('m')) { flags += "m"; }

        return new RegExp(obj.source, flags);
    } catch (e) {
        error && error("RegExp.addFlags", e);
        return null;
    }
}
