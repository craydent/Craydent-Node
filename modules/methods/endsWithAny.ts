import error from './error';
import isArray from './isArray';

export default function endsWithAny(str: string, args: string[]): string | false;
export default function endsWithAny(str: string, ...args: string[]): string | false;
export default function endsWithAny(str, ...args): string | false {
    /*|{
        "info": "String class extension to check if the string ends with the given string",
        "category": "String",
        "parameters":[
            {"...infinite": "(String[]) any number of arguments can be passed"}],

        "overloads":[
            {"parameters":[
                {"arr": "(String[]) An array of strings to check"}]}],

        "url": "http://www.craydent.com/library/1.9.3/docs#string.endsWith",
        "returnType": "(Bool|String)"
    }|*/
    try {
        str = str || "";
        if (arguments.length < 3 && (isArray(arguments[0]) || isArray(arguments[1]))) {
            args = arguments[1] || arguments[0];
        }
        for (let i = 1, len = args.length; i < len; i++) {
            let arg = args[i];
            if (arg == str.slice(-arg.length)) { return arg; }
        }
        return false;
    } catch (e) {
        error && error('String.endsWithAny', e);
    }
}