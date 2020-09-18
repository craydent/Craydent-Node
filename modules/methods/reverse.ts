import error from '../methods/error';
import isNullOrEmpty from '../methods/isNullOrEmpty';

export default function reverse(str: string): string {
    /*|{
        "info": "String class extension to reverse the string",
        "category": "String",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#string.reverse",
        "returnType": "(String)"
    }|*/
    try {
        if (isNullOrEmpty(str)) { return ''; }
        return str.split('').reverse().join('');
    } catch (e) /* istanbul ignore next */ {
        error && error("String.reverse", e);
    }
}