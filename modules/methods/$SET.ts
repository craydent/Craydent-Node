import error from './error';
import isString from './isString';
import isArray from './isArray';
import isObject from './isObject';
import _set from '../protected/_set';
import { AnyObjects } from '../models/Arrays';
import { VerbOptions } from '../models/VerbOptions';

export default function $SET(keyValuePairs: AnyObjects): void;
export default function $SET(keyValuePairs: AnyObjects, options: VerbOptions): void;
export default function $SET(key: string, value: string): void;
export default function $SET(key: string, value: string, options: VerbOptions): void;
export default function $SET(keyValuePairs, options?): void {
    /*|{
        "info": "Store variable in the url",
        "category": "Utility",
        "featured": true,
        "parameters":[
            {"keyValuePairs": "(Object[]) specify the key value pairs"}],

        "overloads":[
            {"parameters":[
                {"keyValuePairs": "(Object[]) specify the key value pairs"},
                {"options": "(VerbOptions) options to defer, no history, etc"}]},
            {"parameters":[
                {"key": "(String) variable name"},
                {"value": "(String) value to set"}]},
            {"parameters":[
                {"key": "(String) variable name"},
                {"value": "(String) value to set"},
                {"options": "(VerbOptions) options to defer, no history, etc"}]}],

        "url": "http://www.craydent.com/library/1.9.3/docs#$SET",
        "returnType": "(Mixed)"
    }|*/
    try {
        if (arguments.length == 3 || isString(keyValuePairs)) {
            let variable = keyValuePairs;
            keyValuePairs = {};
            keyValuePairs[variable] = options;
            options = arguments[2] || {};
        } else if (!options) {
            options = {};
        }
        let defer = !!(options.defer || options == "defer"),
            loc = {
                'search': location.search,
                'hash': location.hash
            };
        if (isArray(keyValuePairs)) {
            for (let i = 0, len = keyValuePairs.length; i < len; i++) {
                let keyValuePair = keyValuePairs[i];
                loc = _set(keyValuePair.variable, keyValuePair.value, defer, options, loc);
            }
        } else if (isObject(keyValuePairs)) {
            for (let variable in keyValuePairs) {
                if (!keyValuePairs.hasOwnProperty(variable)) {
                    continue;
                }
                loc = _set(variable, keyValuePairs[variable], defer, options, loc);
            }
        }

        if (!defer) {
            let noHistory = options.noHistory || options == "noHistory" || options == "h";
            if (noHistory) {
                if (loc.hash[0] != "#") {
                    loc.hash = "#" + loc.hash;
                }
                if (loc.search && loc.search[0] != "?") {
                    loc.search = "?" + loc.search;
                }
                location.replace(loc.search + loc.hash);
                return;
            }
            location.hash = loc.hash;
            if (location.search.trim() != loc.search.trim()) {
                location.search = loc.search;
            }
        }
    } catch (e) {
        error && error("$SET", e);
    }
}