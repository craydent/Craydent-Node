import error from '../methods/error';
import replaceAll from '../methods/replaceall';
import suid from '../methods/suid';
import isArray from '../methods/isarray';
import isAsync from '../methods/isasync';
import isDate from '../methods/isdate';
import isFunction from '../methods/isfunction';
import isGenerator from '../methods/isgenerator';
import isNull from '../methods/isnull';
import isRegExp from '../methods/isregexp';
import isString from '../methods/isstring';

const $g: any = global;

export default function parseRaw(value: any, skipQuotes?: boolean, saveCircular?: boolean, __windowVars?: any[], __windowVarNames?: any): string {
    /*|{
        "info": "Creates an evaluable string",
        "category": "Utility",
        "parameters":[
            {"value": "(any) value to parse"},
            {"skipQuotes?": "(Bool) Flag to skip quotes for strings"},
            {"saveCircular?": "(Bool) Flag to save circular references"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#parseRaw",
        "returnType": "(String)"
    }|*/
    try {
        if (isNull(value)) { return `${value}`; }
        let raw = "";
        if (isString(value)) {
            raw = (!skipQuotes ? `"${replaceAll(value, '"', '\\"')}"` : value);
        } else if (isArray(value)) {
            let tmp = [];
            for (let i = 0, len = value.length; i < len; i++) {
                tmp[i] = parseRaw(value[i], skipQuotes, saveCircular, __windowVars, __windowVarNames);
            }
            raw = `[${tmp.join(',')}]`;
        } else if (isDate(value)) {
            return `new Date('${value.toString()}')`;
        } else if (isRegExp(value)) {
            return value.toString();
        } else if (value instanceof Object && !isFunction(value) && !isGenerator(value) && !isAsync(value)) {
            if (!__windowVars) {
                __windowVars = [];
                __windowVarNames = [];
                if (saveCircular) {
                    for (let prop in $g) {
                        /* istanbul ignore if */
                        if (!$g.hasOwnProperty(prop)) { continue; }
                        if (value.hasOwnProperty(prop)) {
                            __windowVars.push($g[prop]);
                            __windowVarNames.push(prop);
                        }
                    }
                }
            }
            let index = __windowVars.indexOf(value);
            if (!~index) {
                __windowVars.push(value);
                __windowVarNames.push(suid());
                raw = "{";
                let sliceit = false;
                for (let prop in value) {
                    /* istanbul ignore else */
                    if (value.hasOwnProperty(prop)) {
                        sliceit = true;
                        raw += `"${prop}": ${parseRaw(value[prop], skipQuotes, saveCircular, __windowVars, __windowVarNames)},`;
                    }
                }
                raw = (sliceit ? raw.slice(0, -1) : raw) + "}";
            } else {
                if (!saveCircular) {
                    raw = "{}";
                } else {
                    raw = `$g['${__windowVarNames[index]}']`;
                }
            }
        } else {
            raw = value.toString();
        }
        return raw;
    } catch (e) /* istanbul ignore next */ {
        error && error('parseRaw', e);
        return null;
    }
}