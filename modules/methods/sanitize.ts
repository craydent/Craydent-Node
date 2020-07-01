import error from './error';

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
        return str.replace(/&/gi, "&#38;").
            replace(/#/gi, "&#35;").
            replace(/%/gi, "&#37;").
            replace(/;/gi, "&#59;").
            replace(/\+/gi, "&#43;").
            replace(/\-/gi, "&#45;").
            replace(/\'/gi, "&#39;").
            replace(/\\"/gi, "&#34;").
            replace(/\(/gi, "&#40;").
            replace(/\)/gi, "&#41;").
            replace(/\</gi, "&#60;").
            replace(/\>/gi, "&#62;");
    } catch (e) {
        error && error("String.sanitize", e);
    }
}