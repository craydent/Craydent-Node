import error from './error';

export default function isPrince(this: Craydent | Window) {
    /*|{
        "info": "Check if engine is Prince",
        "category": "HTTP",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#isPrince",
        "returnType": "(Bool)"
    }|*/
    try {
        return (/prince/i.test(this.navigator.userAgent));
    } catch (e) {
        error && error('isPrince', e);
    }
}