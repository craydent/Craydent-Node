import error from './error';

export default function startsWith(str: string, searchString: string, start?: number) {
    /*|{
        "info": "String class extension to check if the string ends with the given string",
        "category": "String",
        "parameters":[
            {"searchString": "(String) any number of arguments can be passed"},
            {"start": "(Number) At which position to start the search"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#string.startsWith",
        "returnType": "(Bool|String)"
    }|*/
    try {
        str = str || "";
        if (start) {
            str = str.slice(start);
        }
        return str.slice(0, searchString.length) == searchString;
    } catch (e) /* istanbul ignore next */ {
        error && error('String.startsWith', e);
    }

}