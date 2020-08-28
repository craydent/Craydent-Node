import error from './error';
import isIPad from './isIPad';

export default function isIPhone(this: Craydent | Window): boolean {
    /*|{
        "info": "Check if device is IPhone",
        "category": "HTTP",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#isIphone",
        "returnType": "(Bool)"
    }|*/
    try {
        return !isIPad.call(this) && /iphone/i.test(this.navigator.userAgent);
    } catch (e) /* istanbul ignore next */ {
        error && error('isIPhone', e);
    }
}