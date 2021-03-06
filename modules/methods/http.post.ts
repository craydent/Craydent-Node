
import { VerbOptions } from '../models/VerbOptions';
import error from '../methods/error';
import _verbPayloadHelper from '../protected/_verbPayloadHelper';

export default function $POST(this: Craydent, variable?: string, options?: VerbOptions) {
    /*|{
        "info": "Retrieve all or specific variables in the Body",
        "category": "HTTP",
        "featured": true,
        "parameters":[],

        "overloads":[
            {"parameters":[
                {"key": "(String) key for query value"},
                {"options?": "(VerbOptionsTypes|VerbOptions) Options to defer, ignore case, etc"}]}],

        "url": "http://www.craydent.com/library/1.9.3/docs#$POST",
        "returnType": "(Bool|Object)"
    }|*/
    try {
        return _verbPayloadHelper(this, variable, 'post', options);
    } catch (e) /* istanbul ignore next */ {
        error('$POST', e);
    }
}