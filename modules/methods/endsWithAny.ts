import error from '../methods/error';
import isArray from '../methods/isArray';
import isNull from '../methods/isNull';

export default function endsWithAny(subject: string, args: string[]): string | false;
export default function endsWithAny(subject: string, ...args: string[]): string | false;
export default function endsWithAny(subject, ...args): string | false {
    /*|{
        "info": "String class extension to check if the string ends with the given string",
        "category": "String",
        "parameters":[
            {"...infinite": "(String[]) any number of arguments can be passed"}],

        "overloads":[
            {"parameters":[
                {"arr": "(String[]) An array of strings to check"}]}],

        "url": "http://www.craydent.com/library/1.9.3/docs#string.endsWithAny",
        "returnType": "(Bool|String)"
    }|*/
    try {
        // str = str || "";
        // if (arguments.length < 3 && (isArray(arguments[0]) || isArray(arguments[1]))) {
        //     /* istanbul ignore next */
        //     args = arguments[1] || arguments[0];
        // }
        subject = subject || "";
        let i = 1;
        let args = arguments;
        if (arguments.length < 3 && isArray(arguments[1])) {
            args = arguments[1];
            i = 0;
        }
        for (let len = args.length; i < len; i++) {
            let arg = args[i];
            if (isNull(arg)) { continue; }
            if (arg == subject.slice(-arg.length)) { return arg; }
        }
        return false;
    } catch (e) /* istanbul ignore next */ {
        error && error('String.endsWithAny', e);
    }
}