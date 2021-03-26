///<reference path="../globalTypes/global.base.d.ts" />
import error from '../methods/error';

export default function isFirefox(this: Craydent | Window): boolean {
    /*|{
        "info": "Check if browser is Firefox",
        "category": "HTTP",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#isFirefox",
        "returnType": "(Bool)"
    }|*/
    try {
        const nu = (this as Window).navigator.userAgent;
        return (!/chrome/i.test(nu)
            && !/apple/i.test(nu)
            && !/opera/i.test(nu)
            && /firefox/i.test(nu));
    } catch (e) /* istanbul ignore next */ {
        error && error('isFirefox', e);
        return null as any;
    }
}