
import { VerbOptions } from '../models/VerbOptions';
import error from '../methods/error';
import _verbPayloadHelper from '../protected/_verbPayloadHelper';
import { AnyObject } from '../models/Generics';

export default function $PUT(this: Craydent, variable?: string, options?: VerbOptions): boolean | AnyObject {
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
        return _verbPayloadHelper(this, variable as string, 'put', options);
    } catch (e) /* istanbul ignore next */ {
        error('$PUT', e);
        return null as any;
    }
}