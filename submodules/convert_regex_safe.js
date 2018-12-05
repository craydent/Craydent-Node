/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.9.0                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var error = require('./error');
function __convert_regex_safe(reg_str) {
    try {
        return reg_str.replace(/\\/gi,"\\\\")
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
            .replace('\n','\\n');
    } catch (e) {
        error('__convert_regex_safe', e);
    }
}
module.exports = __convert_regex_safe;