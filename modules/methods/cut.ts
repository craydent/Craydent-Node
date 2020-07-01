/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.9.0                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
import error from './error';
import isNull from './isNull';

export default function cut(str: string, startIndex: number, endIndex: number, replacement?: string) {
    try {
        if (isNull(startIndex) || isNull(endIndex)) { return str; }
        if (endIndex == 0 && startIndex != 0) { endIndex = startIndex; }
        return str.slice(0, startIndex) + (replacement || "") + str.slice(endIndex);
    } catch (e) {
        error && error("String.cut", e);
        return null;
    }
}
