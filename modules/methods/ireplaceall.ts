import error from '../methods/error';
import _replaceAll from '../protected/_replaceAll';

export default function ireplaceAll(str: string, replace: string, subject: string): string;
export default function ireplaceAll(str: string, replace: string[], subject: string[]): string;
export default function ireplaceAll(str, replace, subject): string {
    /*|{
       "info": "String class extension to replace all substrings ignoring case",
       "category": "String",
       "parameters":[
           {"replace": "(String|String[]) String or Array of strings to replace"},
           {"subject": "(String|String[]) String or Array of strings to replace with"}],

       "overloads":[],

       "url": "http://www.craydent.com/library/1.9.3/docs#string.ireplace_all",
       "returnType": "(String)"
   }|*/
    try {
        return _replaceAll(str, replace, subject, "gi")
    } catch (e) /* istanbul ignore next */ {
        error && error("String.ireplaceAll", e);
    }
}