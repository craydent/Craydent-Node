
import { VerbOptions } from "../models/VerbOptions";
import error from "./error";

export default function $HEADER(variable: string, options: VerbOptions) {
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
        this.request.headers = this.request.headers || {};

        if (!variable) { return this.request.headers; }
        if (!options) { return this.request.headers[variable] === undefined ? false : this.request.headers[variable]; }

        if (options == 'i' || (options as any).ignoreCase || options == "ignoreCase") {
            for (let prop in this.request.headers) {
                if (!this.request.headers.hasOwnProperty(prop)) { continue; }
                if (prop.toLowerCase() == variable.toLowerCase()) { return this.request.headers[prop]; }
            }
        }
        return false;
    } catch (e) {
        error && error('$HEADER', e);
    }
}