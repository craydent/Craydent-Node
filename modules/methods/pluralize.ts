import error from '../methods/error';
import _irregularNouns from '../protected/_irregularNouns';

export default function pluralize(str: string): string {
    /*|{
        "info": "String class extension to do a best guess pluralization of the string",
        "category": "String",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#string.pluralize",
        "returnType": "(String)"
    }|*/
    try {
        const vowels = { a: 1, e: 1, i: 1, o: 1, u: 1 };
        if (_irregularNouns[str]) {
            str = _irregularNouns[str];
        } else if (str.slice(-2) in { "is": 1 }) {
            str = `${str.slice(0, -2)}es`;
        } else if (str.slice(-2) == "us") {
            str = `${str.slice(0, -2)}i`;
        } else if (str.slice(-1) in { "s": 1, "x": 1, "o": 1, "z": 1 } || str.slice(-2) in { "ch": 1, "sh": 1, "ss": 1 }) {
            str += "es";
        } else if (str.slice(-1) == "f") {
            str = `${str.slice(0, -1)}ves`;
        } else if (str.slice(-2) == "fe") {
            str = `${str.slice(0, -2)}ves`;
        } else if (str.slice(-1) == "y") {
            if (str.slice(-2, -1) in vowels) {
                str = `${str}s`;
            } else {
                str = `${str.slice(0, -1)}ies`;
            }
        } else if (str.slice(-4) == "tion") {
            str = `${str.slice(0, -4)}tions`;
        } else if (str.slice(-2) == "on") {
            str = `${str.slice(0, -2)}a`;
        } else { // regular nouns
            str += "s";
        }
    } catch (e) /* istanbul ignore next */ {
        error && error('String.pluralize', e);
    }
    return str;
}