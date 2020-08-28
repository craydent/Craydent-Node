///<reference path="../globalTypes/global.base.ts" />
import error from './error';

export default function isChrome(this: Craydent | Window): boolean {
    /*|{
        "info": "Check if browser is Chrome",
        "category": "HTTP",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#isChrome",
        "returnType": "(Bool)"
    }|*/
    try {
        return (/chrome/i.test((this as Window).navigator.userAgent));
    } catch (e) /* istanbul ignore next */ {
        /* istanbul ignore next */
        error && error('isChrome', e);
    }
}