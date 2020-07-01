import error from "./error";
import getProperty from "./getProperty";
import isObject from "./isObject";
import { AnyObject } from "../models/Arrays";
import isInt from "./isInt";
import isString from "./isString";
import ltrim from "./ltrim";
import rtrim from "./rtrim";
import tryEval from "./tryEval";

export interface CookieOptions {
    cookie?: any;
    path?: string;
    domain?: string;
    expiration?: string;
    delete?: boolean
}

export default function $COOKIE(key: string, options?: CookieOptions): any;
export default function $COOKIE(keyValue: AnyObject, options?: CookieOptions): any;
export default function $COOKIE(key: string, value: string, options?: CookieOptions): any;
export default function $COOKIE(key, value?, options?): any {
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
        options = options || {};
        let path = "", domain = "", keys = [], values = [];
        let c = options.cookie ? options.cookie : getProperty(this, 'request.headers.cookie') || getProperty(this, 'document.cookie');
        if (isObject(key)) {
            options = value;
            for (let prop in key) {
                if (!key.hasOwnProperty(prop)) { continue; }
                values.push(JSON.stringify(key[prop]));
                keys.push(prop);
            }
        } else if (isString(key) && isObject(value) && !options) {
            options = value;
            value = undefined;
            keys.push(key);
        } else if (arguments.length > 1) {
            keys.push(key);
            values.push(JSON.stringify(value));
        }

        if (!c && !values.length) { return {}; }
        if (options.path && isString(options.path)) { path = `path=${(options.path || '/')};`; }
        if (options.domain && isString(options.domain)) { domain = `domain=${options.domain};` }
        if (options["delete"]) {
            isNode ? this.response.setHeader("Set-Cookie", [`${key}=; expires=Thu, 01 Jan 1970 00:00:01 GMT;${path}${domain}`]) :
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
                isNode ? this.response.setHeader("Set-Cookie", [`${encodeURIComponent(keys[j])}=${encodeURIComponent(values[j])}${expires}${path}${domain}`]) :
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
    } catch (e) {
        error && error('$COOKIE', e);
    }
}