
import { VerbOptions } from '../models/VerbOptions';
import error from '../methods/error';
import { AnyObject } from '../models/Generics';

export default function $HEADER(this: any, variable?: string, options?: VerbOptions): boolean | AnyObject {
    /*|{
        "info": "Retrieve all or specific variables in the headers",
        "category": "HTTP",
        "featured": true,
        "parameters":[],

        "overloads":[
            {"parameters":[
                {"key": "(String) key for query value"},
                {"options?": "(VerbOptionsTypes|VerbOptions) Options to defer, ignore case, etc"}]}],

        "url": "http://www.craydent.com/library/1.9.3/docs#$HEADER",
        "returnType": "(Bool|Object)"
    }|*/
    try {
        if (typeof window != 'undefined') { return null as any; }
        this.request.headers = this.request.headers || {};

        if (!variable) { return this.request.headers; }
        if (!options) { return this.request.headers[variable] === undefined ? false : this.request.headers[variable]; }

        if (options == 'i' || (options as any).ignoreCase || options == "ignoreCase") {
            for (let prop in this.request.headers) {
                /* istanbul ignore next */
                if (!this.request.headers.hasOwnProperty(prop)) { continue; }
                if (prop.toLowerCase() == variable.toLowerCase()) { return this.request.headers[prop]; }
            }
        }
        return false;
    } catch (e) /* istanbul ignore next */ {
        error && error('$HEADER', e);
        return null as any;
    }
}