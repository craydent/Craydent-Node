import error from '../methods/error';

export default function endsWith(str: string, searchString: string, length?: number): boolean {
    /*|{
        "info": "String class extension to check if the string ends with the given string",
        "category": "String",
        "parameters":[
            {"searchString": "(String) string to compare"},
            {"length": "(Number) Specify the length of the string to search. If omitted, the default value is the length of the string"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#string.endsWith",
        "returnType": "(Bool|String)"
    }|*/
    try {
        str = str || "";
        if (length) {
            str = str.slice(0, length);
        }
        return str.slice(-searchString.length) == searchString;
    } catch (e) /* istanbul ignore next */ {
        error && error('String.endsWith', e);
        return null as any;
    }

}