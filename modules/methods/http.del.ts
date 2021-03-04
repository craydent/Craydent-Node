import $DELETE from '../methods/http.delete';
import { VerbOptions } from '../models/VerbOptions';

export default function $DEL(this: Craydent | Window, variable?: string, options?: VerbOptions) {
    /*|{
        "info": "Retrieve all or specific variables in the Body",
        "category": "HTTP",
        "featured": true,
        "parameters":[],

        "overloads":[
            {"parameters":[
                {"key": "(String) key for query value"},
                {"options?": "(VerbOptionsTypes|VerbOptions) Options to defer, ignore case, etc"}]}],

        "url": "http://www.craydent.com/library/1.9.3/docs#$DEL",
        "returnType": "(Bool|Object)"
    }|*/
    return $DELETE.apply(this, arguments);
}