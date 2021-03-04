import error from '../methods/error';

export default function substringEndAt(str: string, end: string): string {
    /*|{
        "info": "String class extension to substring by character instead of using indexes",
        "category": "String",
        "parameters":[
            {"end": "(Char) Character to use for the ending index"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#string.substringEndAt",
        "returnType": "(String)"
    }|*/
    try {
        return str.substring(0, str.indexOf(end));
    } catch (e) /* istanbul ignore next */ {
        error && error('Object.substringEndAt', e);
    }
}