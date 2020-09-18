import error from '../methods/error';
import addFlags from '../methods/addFlags';
import isRegExp from '../methods/isRegExp';
import replaceAll from '../methods/replaceAll';
import { isString } from 'util';

export default function highlight(str: string, search: string | RegExp, cssClass?: string, tag?: string): string {
    /*|{
        "info": "String class extension to surround search words with the given tag(default span) and class (default chighlight)",
        "category": "String",
        "parameters":[
            {"search": "(String|RegExp) String or Regular expression to search"},
            {"cssClass?": "(String) Class to add for highlighting"},
            {"tag?": "(String) Tag to use to surround the search"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#string.:stringhighlight",
        "returnType": "(String)"
    }|*/
    try {
        cssClass = cssClass || "chighlight";
        tag = tag || "span";
        let txt = search, flags = "g";
        if (isRegExp(search) && !~(search as RegExp).source.indexOf("(")) {
            txt = `(${(search as RegExp).source})`;
            if ((search as RegExp).ignoreCase) { flags += "i"; }
            if ((search as RegExp).multiline) { flags += "m"; }
        } else if (isString(search)) {
            if (~(search as string).indexOf("(")) {
                txt = replaceAll(txt as string, ['(', ')'], ['\\(', '\\)']);
            }
            txt = `(${txt})`;
        }
        return str.replace(addFlags((new RegExp(txt)), flags), `<${tag} class="${cssClass}">$1</${tag}>`);
    } catch (e) /* istanbul ignore next */ {
        error && error("String.highlight", e);
    }
}