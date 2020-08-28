///<reference path="../globalTypes/global.base.ts" />
import error from './error';

export default function isSafari(this: Craydent | Window): boolean {
    /*|{
        "info": "Check if browser is Safari",
        "category": "HTTP",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#isSafari",
        "returnType": "(Bool)"
    }|*/
    try {
        const nu = (this as Window).navigator.userAgent;
        return (/safari/i.test(nu));
    } catch (e) /* istanbul ignore next */ {
        error && error('isSafari', e);
    }
}