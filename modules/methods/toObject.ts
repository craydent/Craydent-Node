import error from './error';
import { AnyObject } from '../models/Arrays';

export default function toObject(str: string, assignmentChar?: string, delimiter?: string): AnyObject {
    /*|{
        "info": "String class extension to convert query string (ex: key=value&key2=value2)to JSON",
        "category": "String",
        "parameters":[
            {"assignmentChar?": "(Char) Character to use as assignment delimiter. Defaults to '&'."},
            {"delimiter?": "(Char) Character to use as pair delimiter"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#string.toObject",
        "returnType": "(Object)"
    }|*/
    try {
        if (str[0] === "?") {
            str = str.slice(1);
        }
        assignmentChar = assignmentChar || "=";
        delimiter = delimiter || "&";
        let rtn = {}, kv_pairs = str.split(delimiter);
        for (let i = 0, len = kv_pairs.length; i < len; i++) {
            let kv = kv_pairs[i].split(assignmentChar);
            rtn[kv[0]] = kv[1];
        }
        return rtn;
    } catch (e) /* istanbul ignore next */ {
        error && error("String.toObject", e);
    }
}