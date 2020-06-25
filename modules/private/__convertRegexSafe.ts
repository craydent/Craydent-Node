/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.9.0                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
import error from '../methods/error';

export default function __convertRegexSafe(reg_str: string): string {
    try {
        return reg_str.replace(/\\/gi, "\\\\")
            .replace(/\$/gi, "\\$")
            .replace(/\//gi, "\\/")
            .replace(/\^/gi, "\\^")
            .replace(/\./gi, "\\.")
            .replace(/\|/gi, "\\|")
            .replace(/\*/gi, "\\*")
            .replace(/\+/gi, "\\+")
            .replace(/\?/gi, "\\?")
            .replace(/\!/gi, "\\!")
            .replace(/\{/gi, "\\{")
            .replace(/\}/gi, "\\}")
            .replace(/\[/gi, "\\[")
            .replace(/\]/gi, "\\]")
            .replace(/\(/gi, "\\(")
            .replace(/\)/gi, "\\)")
            .replace('\n', '\\n');
    } catch (e) {
        error && error('__convertRegexSafe', e);
        return null;
    }
}