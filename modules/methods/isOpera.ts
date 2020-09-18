///<reference path="../globalTypes/global.base.ts" />
import error from '../methods/error';

export default function isOpera(this: Craydent | Window): boolean {
    /*|{
        "info": "Check if browser is Opera",
        "category": "HTTP",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#isOpera",
        "returnType": "(Bool)"
    }|*/
    try {
        const nu = (this as Window).navigator.userAgent;
        return /chrome/i.test(nu)
            && /apple/i.test(nu)
            && /opera|opr/i.test(nu);
    } catch (e) /* istanbul ignore next */ {
        error && error('isOpera', e);
    }
}