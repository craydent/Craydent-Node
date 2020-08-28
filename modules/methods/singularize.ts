import error from './error';
import _irregularNouns from '../protected/_irregularNouns';
import keyOf from './keyOf';

export default function singularize(str: string): string {
    /*|{
        "info": "String class extension to do a best guess singularization of the string",
        "category": "String",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#string.singularize",
        "returnType": "(String)"
    }|*/
    try {
        let key;
        const vowels = { a: 1, e: 1, i: 1, o: 1, u: 1 };
        if (key = keyOf(_irregularNouns, str)) {
            str = key;
        } else if (str.slice(-3) == "ves") {
            if (str[str.length - 4] in vowels) {
                str = `${str.slice(0, -3)}fe`;
            } else {
                str = `${str.slice(0, -3)}f`;
            }
        } else if (str.slice(-3) == "ies") {
            str = `${str.slice(0, -3)}y`;
        } else if (str.slice(-1) == "a") {
            str = `${str.slice(0, -1)}on`;
        } else if (str.slice(-1) == "i") {
            str = `${str.slice(0, -1)}us`;
        } else if (str.slice(-4) == "yses") {
            str = `${str.slice(0, -2)}is`;
        } else if (str.slice(-3) in { "ses": 1, "xes": 1, "oes": 1 } || str.slice(-4) in { "ches": 1, "shes": 1, "ises": 1 }) {
            str = str.slice(0, -2);
        } else { // regular nouns
            str = str.slice(0, -1);
        }
        return str;
    } catch (e) /* istanbul ignore next */ {
        error && error('String.singularize', e);
    }
}