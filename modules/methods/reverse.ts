import error from './error';

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
        return str.split('').reverse().join('');
    } catch (e) {
        error && error("String.reverse", e);
    }
}