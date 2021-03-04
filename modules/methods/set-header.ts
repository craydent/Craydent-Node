import error from '../methods/error';
import merge from '../methods/merge';
import isString from '../methods/isstring';
import isInt from '../methods/isint';
import { AnyObject } from '../models/Generics';

export default function setHeader(headers: string | AnyObject, code?: number): void {
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
        (setHeader as any).headers = (setHeader as any).headers || {};
        if (isString(headers)) {
            if (!~headers.indexOf(':')) {
                code = parseInt(headers.replace(/.*?([\d]{3}).*/, '$1'));
            }
            if (headers.toLowerCase().indexOf('http/') == 0) {
                headers = { 'Content-Type': 'text/html' };
            } else {
                const parts = headers.split(':');
                headers = {};
                headers[parts[0].trim()] = parts[1].trim();
            }
        }
        (setHeader as any).headers = merge((setHeader as any).headers, headers);
        if (code && isInt(code)) { (setHeader as any).code = code; }

    } catch (e) /* istanbul ignore next */ {
        error && error('setHeader', e);
    }
}