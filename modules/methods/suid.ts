import error from '../methods/error';
import rand from '../methods/rand';

export default function suid(length?: number): string {
    /*|{
        "info": "Creates a short Craydent/Global Unique Identifier",
        "category": "Utility",
        "parameters":[
            {"length?": "(Integer) Custom length of the short unique identifier. Default is 10."}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#suid",
        "returnType": "(String)"
    }|*/
    try {
        length = length || 10;
        let chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", id = "";
        while (id.length < length) {
            // @ts-ignore
            id += chars[parseInt(rand(0, 62))];
        }

        return id;
    } catch (e) /* istanbul ignore next */ {
        error && error('suid', e);
        return '';
    }
}