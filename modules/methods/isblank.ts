import error from '../methods/error';

export default function isBlank(str: string): boolean {
    /*|{
        "info": "String class extension to check if the string is empty",
        "category": "String",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#string.isBlank",
        "returnType": "(Bool)"
    }|*/
    try {
        return !str.length;
    } catch (e) /* istanbul ignore next */ {
        error && error("String.isBlank", e);
        return null as any;
    }
}