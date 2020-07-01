import error from './error';
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

        if (_irregularNouns[str]) {
            str = _irregularNouns[str];
        } else if (str.slice(-1) in { "s": 1, "x": 1, "o": 1 } || str.slice(-2) in { "ch": 1, "sh": 1, "is": 1 }) {
            str += "es";
        } else if (str.slice(-1) == "f") {
            str = str.slice(0, -1) + "ves";
        } else if (str.slice(-2) == "fe") {
            str = str.slice(0, -2) + "ves";
        } else if (str.slice(-1) == "y") {
            str = str.slice(0, -1) + "ies";
        } else if (str.slice(-2) == "us") {
            str = str.slice(0, -2) + "i";
        } else if (str.slice(-2) == "tion") {
            str = str.slice(0, -2) + "tions";
        } else if (str.slice(-2) == "on") {
            str = str.slice(0, -2) + "a";
        } else { // regular nouns
            str += "s";
        }
        return str;
    } catch (e) {
        error && error('String.pluralize', e);
    }
}