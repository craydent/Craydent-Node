import error from '../methods/error';
import isString from '../methods/isstring';
import isArray from '../methods/isarray';
import isObject from '../methods/isobject';
import _set from '../protected/_set';
import { AnyObject } from '../models/Generics';
import { VerbOptions } from '../models/VerbOptions';

export type KeyValuePair = { key: string, value: string };

export default function $SET(this: Craydent | void, keyValuePairs: AnyObject | KeyValuePair, options?: VerbOptions): void;
export default function $SET(this: Craydent | void, key: string, value: string): void;
export default function $SET(this: Craydent | void, key: string, value: string, options: VerbOptions): void;
export default function $SET(this: Craydent | void, keyValuePairs, options?): void {
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
        const isNode = typeof window == 'undefined';
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
                'search': isNode ? (this as any).location.search : location.search,
                'hash': isNode ? (this as any).location.hash : location.hash
            };
        /* istanbul ignore else */
        if (isArray(keyValuePairs)) {
            for (let i = 0, len = keyValuePairs.length; i < len; i++) {
                let keyValuePair = keyValuePairs[i];
                loc = _set(keyValuePair.variable, keyValuePair.value, defer, options, loc);
            }
        } else if (isObject(keyValuePairs)) {
            for (let variable in keyValuePairs) {
                /* istanbul ignore next */
                if (!keyValuePairs.hasOwnProperty(variable)) {
                    continue;
                }
                loc = _set(variable, keyValuePairs[variable], defer, options, loc);
            }
        }
        if (isNode) {
            (this as any).location.search = loc.search;
            (this as any).location.hash = loc.hash;
            return;
        }
        if (!defer) {
            let noHistory = options.noHistory || options == "noHistory" || options == "h";
            if (noHistory) {
                /* istanbul ignore else */
                if (loc.hash[0] != "#") {
                    loc.hash = `#${loc.hash}`;
                }
                /* istanbul ignore else */
                if (loc.search && loc.search[0] != "?") {
                    loc.search = `?${loc.search}`;
                }
                location.replace(loc.search + loc.hash);
                return;
            }
            location.hash = loc.hash;
            /* istanbul ignore else */
            if (location.search.trim() != loc.search.trim()) {
                location.search = loc.search;
            }
        }
    } catch (e) /* istanbul ignore next */ {
        error && error("$SET", e);
    }
}