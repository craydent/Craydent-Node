import error from "./error";
import _generalTrim from "../protected/_generalTrim";

export default function (str: string, character?: string | string[]): string {
    /*|{
        "info": "String class extension to remove characters from the end of the string",
        "category": "String",
        "parameters":[
            {"character?": "(Char[]) Character to remove"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#string.rtrim",
        "returnType": "(String)"
    }|*/
    try {
        return _generalTrim(str, 'r', character);
    } catch (e) {
        error && error("String.rtrim", e);
    }
}