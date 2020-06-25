import error from './error';
import __convertRegexSafe from '../private/__convertRegexSafe'
import isArray from './isArray';

export default function replaceAll(str: string, replace: string, subject: string, flag?: string): string;
export default function replaceAll(str: string, replace: string[], subject: string[], flag?: string): string;
export default function replaceAll(str, replace, subject, flag?): string {
    /*|{
        "info": "String class extension to replace all substrings (case sensitive)",
        "category": "String",
        "parameters":[
            {"replace": "(String|String[]) String or Array of strings to replace"},
            {"subject": "(String|String[]) String or Array of strings to replace with"}
            {"flag?": "(String) RegEx flags to use for replacing"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#string.replace_all",
        "returnType": "(String)"
    }|*/
    try {
        if (!isArray(replace)) {
            replace = [replace];
        }
        if (!isArray(subject)) {
            subject = [subject];
        }
        let last = 0;
        for (let i = 0, len = replace.length; i < len; i++) {
            let rep = replace[i];
            let reg = new RegExp(__convertRegexSafe(rep), flag);
            if (!~str.search(reg)) { continue; }
            str = str.replace(reg, subject[i] === undefined ? subject[last] : subject[i]);
            if (subject[last + 1]) { last++; }
        }
        return str.toString();
    } catch (e) {
        error && error("replace_all", e);
        return '';
    }
}