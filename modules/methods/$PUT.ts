
import { VerbOptions } from "../models/VerbOptions";
import error from "./error";
import _verbPayloadHelper from "../protected/_verbPayloadHelper";

export default function $PUT(this: Craydent, variable?: string, options?: VerbOptions) {
    /*|{
        "info": "Retrieve all or specific variables in the Body",
        "category": "HTTP",
        "featured": true,
        "parameters":[],

        "overloads":[
            {"parameters":[
                {"key": "(String) key for query value"},
                {"options?": "(VerbOptionsTypes|VerbOptions) Options to defer, ignore case, etc"}]}],

        "url": "http://www.craydent.com/library/1.9.3/docs#$PUT",
        "returnType": "(Bool|Object)"
    }|*/
    try {
        return _verbPayloadHelper(this, variable, options);
    } catch (e) {
        error('$PUT', e);
    }
}