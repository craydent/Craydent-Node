import error from './error';
import isNull from './isNull';
import substringEndAt from './substringEndAt';
import substringStartFrom from './substringStartFrom';
import cut from './cut';

export default function substringBetween(str: string, start?: string, end?: string): string {
    /*|{
        "info": "String class extension to substring by character instead of using indexes",
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
        if (isNull(end)) { return substringStartFrom(str, start); }
        let si = str.indexOf(start), ei = str.indexOf(end);
        if (!~si) { si = 0; }
        if (!~ei) { ei = str.length; }
        return cut(str, si, ei);
    } catch (e) {
        error && error('Object.substringBetween', e);
    }
}