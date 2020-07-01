import error from './error';
import isBlank from './isBlank';
import isNull from './isNull';

export default function isValidEmail(str: string): boolean {
    /*|{
        "info": "String class extension to check if string is a valid email",
        "category": "String",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#string.isValidEmail",
        "returnType": "(Bool)"
    }|*/
    try {
        if (!isBlank(this) && !isNull(str)) {
            let reg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            return reg.test(str);
        }
        return false;
    } catch (e) {
        error && error("String.isValidEmail", e);
    }
}