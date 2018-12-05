/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.9.0                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var __convert_regex_safe = require('./convert_regex_safe');
var error = require('./error');
function _general_trim (str, side, characters) {
    try {
        var temp = str,
            trimChars = {
                " ":1,
                "\t":1,
                "\n":1
            };
        if (characters) {
            if (characters && characters.constructor == Array) {
                var ch, i = 0;
                trimChars = {};
                while (ch = characters[i++]) {
                    trimChars[ch] = 1;
                }
            } else if (characters && characters.constructor == String) {
                trimChars = eval('({"'+__convert_regex_safe(characters)+'":1})');
            }
        }
        if (!side || side == 'l') {
            while (temp.charAt(0) in trimChars) {
                temp = temp.substring(1);
            }
        }
        if (!side || side == 'r') {
            while (temp.charAt(temp.length - 1) in trimChars) {
                temp = temp.substring(0, temp.length - 1);
            }
        }
        return temp.toString();
    } catch (e) {
        error("_general_trim", e);
    }
}
module.exports = _general_trim