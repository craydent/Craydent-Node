import error from '../methods/error';
import * as crypto from 'crypto';

export default function md5(str: string): string {
    /*|{
        "info": "MD5 encode a string.",
        "category": "Utility",
        "parameters":[
            {"str": "(String) String to encode."}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#md5",
        "returnType": "(String)"
    }|*/
    try {
        let md5sum = crypto.createHash('md5');
        md5sum.update(str);
        return md5sum.digest('hex');
    } catch (e) /* istanbul ignore next */ {
        error && error('md5', e);
    }
}