import error from './error';

export default function isCuid(str: string, msFormat?: boolean): boolean {
    /*|{
        "info": "String class extension to check if the string is a cuid",
        "category": "String",
        "parameters":[
            {"msFormat?": "(Bool) use microsoft format if true"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#string.isCuid",
        "returnType": "(Bool)"
    }|*/
    try {
        let pre = "", post = "", length = 36;
        msFormat && ((pre = "{") && (post = "}"), length += 2);
        return str.length == length && (new RegExp(pre + "[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}" + post)).test(str);
    } catch (e) {
        error && error("String.isCuid", e);
    }
}