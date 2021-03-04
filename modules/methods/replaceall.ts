import __convertRegexSafe from '../private/__convertRegexSafe'
import _replaceAll from '../protected/_replaceAll';

export default function replaceAll(str: string, replace: string, subject: string,): string;
export default function replaceAll(str: string, replace: string[], subject: string[]): string;
export default function replaceAll(str, replace, subject): string {
    /*|{
        "info": "String class extension to replace all substrings (case sensitive)",
        "category": "String",
        "parameters":[
            {"replace": "(String|String[]) String or Array of strings to replace"},
            {"subject": "(String|String[]) String or Array of strings to replace with"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#string.replace_all",
        "returnType": "(String)"
    }|*/
    return _replaceAll(str, replace, subject, 'g');
}