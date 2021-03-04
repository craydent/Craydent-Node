import error from '../methods/error';
import cut from '../methods/cut';
import isNull from '../methods/isnull';

export default function ellipsis(str: string, before: number, after?: number): string {
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
        const afterIsNull = isNull(after);
        after = after || 0;
        if (before + after > str.length) { return str; }
        return cut(str, before, afterIsNull ? null : -1 * after, "...");
    } catch (e) /* istanbul ignore next */ {
        error && error('String.ellipsis', e);
    }
}