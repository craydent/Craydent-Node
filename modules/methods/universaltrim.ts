/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.9.0                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
import error from '../methods/error';
import _getFuncName from '../protected/_getFuncName';
import _generalTrim from '../protected/_generalTrim';
import isArray from '../methods/isarray';
import isBoolean from '../methods/isboolean';
import isString from '../methods/isstring';

const _isString = isString,
    _isArray = isArray,
    _isBoolean = isBoolean;

export default function universalTrim(subject: string[], chars?: string | string[], ref?: boolean): string[];
export default function universalTrim(subject: string, chars?: string | string[]): string;
export default function universalTrim(subject: any, chars?: any, ref?: boolean): string | string[] {
    /*|{
        "info": "Array class extension to remove all white space/chars from the beginning and end of all string values in the array & String class extension to remove characters from the beginning and end of the string.",
        "category": "Array",
        "parameters":[],

        "overloads":[
            {"parameters":[
                {"ref":"(Bool) Whether or not to mutate the original array."}]},

            {"parameters":[
                {"character": "(Char[]) Character to remove in the String"}]}],

        "url": "http://www.craydent.com/library/1.9.3/docs#String.trim",
        "returnType": "(Bool)"
    }|*/
    try {
        if (_isString(subject)) {
            return _generalTrim(subject as string, undefined, chars);
        }
        if (_isArray(subject)) {
            // var ref = chars,
            let arr = [],
                alter = false;
            if (_isBoolean(ref) && ref) { alter = true; }

            for (let i = 0, len = subject.length; i < len; i++) {
                let item = subject[i];
                /* istanbul ignore next */
                _isString(item) && (arr[i] = _generalTrim(item.toString(), undefined, chars)) || (arr[i] = item);
                alter && ((subject as any[])[i] = arr[i]);
            }
            return arr;
        }
        return '';
    } catch (e) /* istanbul ignore next */ {
        error && error(`${_getFuncName(subject.constructor)}.trim`, e);
        return '';
    }
}
