/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.9.0                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
import error from './error';
import isNull from './isNull';

export default function cut(str: string, si: number, ei: number, replacement?: string) {
    try {
        if (isNull(si) || isNull(ei)) { return str; }
        if (ei == 0 && si != 0) { ei = si; }
        return str.slice(0, si) + (replacement || "") + str.slice(ei);
    } catch (e) {
        error && error("String.cut", e);
        return null;
    }
}
