import error from './error';

export default function isBlackBerry(this: Craydent | Window) {
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
    } catch (e) {
        error && error('isBlackBerry', e);
    }
}