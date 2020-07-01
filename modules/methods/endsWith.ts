import error from './error';

export default function endsWith(str: string, searchString: string, length?: number) {
    /*|{
        "info": "String class extension to check if the string ends with the given string",
        "category": "String",
        "parameters":[
            {"searchString": "(String) any number of arguments can be passed"},
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
    } catch (e) {
        error('String.endsWith', e);
    }

}