import error from './error';

export default function isFirefox(this: Craydent | Window) {
    /*|{
        "info": "Check if browser is Firefox",
        "category": "HTTP",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#isFirefox",
        "returnType": "(Bool)"
    }|*/
    try {
        var nu = this.navigator.userAgent;
        return (!/chrome/i.test(nu)
            && !/apple/i.test(nu)
            && !/opera/i.test(nu)
            && /firefox/i.test(nu));
    } catch (e) {
        error && error('isFirefox', e);
    }
}