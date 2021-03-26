/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.9.0                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
import error from '../methods/error';
import __convertRegexSafe from '../private/__convertRegexSafe';
import isArray from '../methods/isarray';
import isString from '../methods/isstring';

export default function _generalTrim(str: string, side?: string, characters?: string | string[]): string {
    try {
        let temp = str,
            trimChars: any = {
                " ": 1,
                "\t": 1,
                "\n": 1
            };
        if (characters) {
            if (isArray(characters)) {
                let ch, i = 0;
                trimChars = {};
                while (ch = characters[i++]) {
                    trimChars[ch] = 1;
                }
            } else if (isString(characters)) {
                trimChars = eval('({"' + __convertRegexSafe(characters as string) + '":1})');
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
    } catch (e) /* istanbul ignore next */ {
        error && error("_generalTrim", e);
        return str;
    }
}