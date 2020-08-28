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
        replacement = replacement || "";
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
        return null;
    }
}
