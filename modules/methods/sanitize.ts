import error from '../methods/error';

const chars = {
    '&': '&#38;',
    '#': '&#35;',
    '%': '&#37;',
    ';': '&#59;',
    '+': '&#43;',
    '-': '&#45;',
    '\'': '&#39;',
    '"': '&#34;',
    '(': '&#40;',
    ')': '&#41;',
    '<': '&#60;',
    '>': '&#62;'
}
export default function sanitize(str: string): string {
    /*|{
        "info": "String class extension to remove potential XSS threats",
        "category": "String",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#string.sanitize",
        "returnType": "(String)"
    }|*/
    try {
        let sanitizedString = "";
        for (let i = 0, len = str.length; i < len; i++) {
            sanitizedString += chars[str[i]];
        }
        return sanitizedString;
    } catch (e) /* istanbul ignore next */ {
        error && error("String.sanitize", e);
    }
}