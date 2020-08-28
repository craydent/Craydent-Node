import error from './error';
import isBoolean from './isBoolean';
import isNull from './isNull';

export default function acronymize(str: string, capsOnly?: boolean, delimiter?: string | RegExp): string;
export default function acronymize(str: string, match?: RegExp): string;
export default function acronymize(str: string, match?: RegExp, delimiter?: string | RegExp): string;
export default function acronymize(str: string, capsOnly?, delimiter?): string {
    /*|{
        "info": "String class extension to create an acronym from the given string",
        "category": "String",
        "parameters":[
            {"capsOnly": "(Boolean) Flag to indicate to use capital letters only."}],

        "overloads":[
            {"parameters":[
                {"match": "(RegExp) Pattern to match to qualify the Acronym."}]},

            {"parameters":[
                {"capsOnly": "(Boolean) Flag to indicate to use capital letters only."},
                {"delimiter": "(String|RegExp) Character or RegExp pattern that delimits the string."}]},

            {"parameters":[
                {"match": "(RegExp) Pattern to match to qualify the Acronym."},
                {"delimiter": "(String|RegExp) Character or RegExp pattern that delimits the string."}]}],

        "url": "http://www.craydent.com/library/1.9.3/docs#string.acronymize",
        "returnType": "(String)"
    }|*/
    try {
        delimiter = delimiter || " ";
        if (isBoolean(capsOnly) || isNull(capsOnly)) {
            if (capsOnly) {
                capsOnly = /[A-Z]/
            } else {
                capsOnly = /[a-zA-Z]/
            }
        }
        let words = str.split(delimiter),
            acronym = "";
        for (let i = 0, len = words.length; i < len; i++) {
            if (capsOnly.test(words[i])) { acronym += words[i].match(capsOnly)[0]; }
        }
        return acronym.toUpperCase();
    } catch (e) /* istanbul ignore next */ {
        error && error("String.acronymize", e);
    }
}