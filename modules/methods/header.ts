import error from "./error";
import merge from "./merge";
import isString from "./isString";
import isInt from "./isInt";

export default function header(headers: any, code: number): void {
    /*|{
        "info": "Set Http Headers to send",
        "category": "HTTP",
        "parameters":[
            {"header": "(Header) Http header."},
            {"code?": "(Integer) Http response code."}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#header",
        "returnType": "(void)"
    }|*/
    try {
        if (isString(headers) && !code) {
            if (!~headers.indexOf(':')) {
                code = parseInt(headers.replace(/.*?([\d]{3}).*/, '$1'));
            }
            if (headers.toLowerCase().indexOf('http/') == 0) {
                headers = { 'Content-Type': 'text/html' };
            } else {
                var parts = headers.split(':');
                headers = {};
                headers[parts[0].trim()] = parts[1].trim();
            }
        }
        (header as any).headers = merge((header as any).headers, headers);
        if (code && isInt(code)) { (header as any).code = code; }

    } catch (e) {
        error && error('header', e);
    }
}