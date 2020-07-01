import error from './error';
import isNull from './isNull';

export default function lastIndexOfAlt(str: string, regex: RegExp, pos?: number): number {
    /*|{
        "info": "String class extension to find the last index based on a regular expression",
        "category": "String",
        "parameters":[
            {"regex": "(RegExp) Regular expression to check value against"},
            {"pos?": "(Int) Max index to go up to in the search"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#string.lastIndexOfAlt",
        "returnType": "(Int)"
    }|*/
    try {
        regex = (regex.global) ? regex : new RegExp(regex.source, "g" + (regex.ignoreCase ? "i" : "") + (regex.multiline ? "m" : ""));
        pos = isNull(pos, str.length);
        if (pos < 0) { pos = 0; }
        str = str.substring(0, pos + 1);
        let lindex = -1,
            next = 0,
            result;

        while ((result = regex.exec(str)) != null) {
            lindex = result.index;
            regex.lastIndex = ++next;
        }
        return lindex;
    } catch (e) {
        error && error("String.lastIndexOfAlt", e);
    }
}