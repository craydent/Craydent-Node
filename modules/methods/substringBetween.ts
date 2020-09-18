import error from '../methods/error';
import isNull from '../methods/isNull';
import substringEndAt from '../methods/substringEndAt';

export default function substringBetween(str: string, start?: string, end?: string): string {
    /*|{
        "info": "String class extension to substring (exclusive) by character instead of using indexes",
        "category": "String",
        "parameters":[
            {"start?": "(Char) Character to use for the starting index (required if end is not passed)"},
            {"end?": "(Char) Character to use for the ending index (required if start is null or undefined)"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#string.substringBetween",
        "returnType": "(String)"
    }|*/
    try {
        if (isNull(start)) { return substringEndAt(str, end); }
        if (isNull(end)) { return str.substring(str.indexOf(start) + 1); }
        let si = str.indexOf(start), ei = str.indexOf(end);
        if (!~si) { si = -1; }
        if (!~ei) { ei = str.length + 1; }
        return str.slice(si + 1, ei);
    } catch (e) /* istanbul ignore next */ {
        error && error('Object.substringBetween', e);
    }
}