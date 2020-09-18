import error from '../methods/error';

export default function isBlackBerry(this: Craydent | Window): boolean {
    /*|{
        "info": "Check if device is BlackBerry",
        "category": "HTTP",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#isBlackBerry",
        "returnType": "(Bool)"
    }|*/
    try {
        return (/blackberry/i.test(this.navigator.userAgent));
    } catch (e) /* istanbul ignore next */ {
        error && error('isBlackBerry', e);
    }
}