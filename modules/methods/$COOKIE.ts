import error from '../methods/error';
import getProperty from '../methods/getProperty';
import isObject from '../methods/isObject';
import { AnyObject } from '../models/Arrays';
import isInt from '../methods/isInt';
import isString from '../methods/isString';
import ltrim from '../methods/ltrim';
import rtrim from '../methods/rtrim';
import tryEval from '../methods/tryEval';

export interface CookieOptions {
    cookie?: any;
    path?: string;
    domain?: string;
    expiration?: number;
    delete?: boolean
}
export default function $COOKIE(this: Craydent | void): any;
export default function $COOKIE(this: Craydent | void, key: string, options?: CookieOptions): any;
export default function $COOKIE(this: Craydent | void, keyValue: AnyObject, options?: CookieOptions): any;
export default function $COOKIE(this: Craydent | void, key: string, value: string, options?: CookieOptions): any;
export default function $COOKIE(this: Craydent | void, key?, value?, options?): any {
    /*|{
         "info": "Get/set Cookies",
         "category": "HTTP",
         "featured": true,
         "parameters":[
             {"key": "(String) Key for cookie value"},
             {"option?": "(CookieOptions) Specify delete"}],

         "overloads":[
             {"parameters":[
                 {"keyValue": "(Object) Specify the key value pair: key=>property, value=>object[key]"},
                 {"option?": "(CookieOptions) Specify path, domain, and/or expiration of cookie"}]},

             {"parameters":[
                 {"key": "(String) Key for cookie value"},
                 {"value": "(any) Value to store"},
                 {"option?": "(CookieOptions) Specify path and/or expiration of cookie"}]}],

         "url": "http://www.craydent.com/library/1.9.3/docs#$COOKIE",
         "returnType": "(String|Bool)"
     }|*/
    try {
        const isNode = typeof window == 'undefined';
        let path = "", domain = "", keys = [], values = [];

        if (isObject(key)) {
            options = value;
            for (let prop in key) {
                /* istanbul ignore next */
                if (!key.hasOwnProperty(prop)) { continue; }
                values.push(isString(key[prop]) ? key[prop] : JSON.stringify(key[prop]));
                keys.push(prop);
            }
        } else if (isString(key) && isObject(value) && !options) {
            options = value;
            value = undefined;
            keys.push(key);
        } else if (arguments.length > 1) {
            keys.push(key);
            values.push(isString(value) ? value : JSON.stringify(value));
        }
        options = options || {};
        let c = options.cookie ? options.cookie : (isNode ? getProperty(this, 'request.headers.cookie') : window.document.cookie);

        if (!c && !values.length) { return {}; }
        if (options.path && isString(options.path)) { path = `path=${options.path};`; }
        if (options.domain && isString(options.domain)) { domain = `domain=${options.domain};` }
        if (options["delete"]) {
            isNode ? (this as any).response.setHeader("Set-Cookie", [`${key}=; expires=Thu, 01 Jan 1970 00:00:01 GMT;${path}${domain}`]) :
                document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:01 GMT;${path}${domain}`;
            return true;
        }

        if (values.length) {
            let expires = isNode ? "" : ";";
            if (isInt(options.expiration)) {
                let dt = new Date();
                dt.setDate(dt.getDate() + options.expiration);
                expires = `;expires=${dt.toUTCString()}`;
            }
            for (let j = 0, jlen = keys.length; j < jlen; j++) {
                isNode ? (this as any).response.setHeader("Set-Cookie", [`${encodeURIComponent(keys[j])}=${encodeURIComponent(values[j])}${expires}${path}${domain}`]) :
                    document.cookie = `${encodeURIComponent(keys[j])}=${encodeURIComponent(values[j])}${expires}${path}${domain}`;
            }
            return true;
        }
        let cookies = {},
            arr = c.split(/[,;]/);
        for (let i = 0, len = arr.length; i < len; i++) {
            let cookie = arr[i];
            let parts = cookie.split(/=/, 2),
                name = decodeURIComponent(parts[0] && ltrim(parts[0]) && ltrim(parts[0]) || ""),
                value = parts.length > 1 ? decodeURIComponent(rtrim(parts[1])) : null;
            cookies[name] = tryEval(value) || value;
            if (key && key == name) {
                return cookies[name];
            }
        }

        if (key) { return false; }
        return cookies;
    } catch (e) /* istanbul ignore next */ {
        error && error('$COOKIE', e);
    }
}