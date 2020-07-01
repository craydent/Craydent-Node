import error from './error';
import cut from './cut';

export default function ellipsis(str: string, before: number, after: number): string {
    /*|{
        "info": "String class extension to shorten by ellipsis",
        "category": "String",
        "parameters":[
            {"before": "(Int) Number of characters to use before using ellipsis"},
            {"after?": "(Int) Number of characters to use after the ellipsis"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#string.ellipsis",
        "returnType": "(String)"
    }|*/
    try {
        after = after || 0;
        if (before + after > str.length) { return str; }
        return cut(str, before, -1 * after, "...");
    } catch (e) {
        error && error('String.ellipsis', e);
    }
}