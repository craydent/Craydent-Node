import error from './error';

export default function isOpera(this: Craydent | Window) {
    /*|{
        "info": "Check if browser is Opera",
        "category": "HTTP",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#isOpera",
        "returnType": "(Bool)"
    }|*/
    try {
        var nu = this.navigator.userAgent;
        return /chrome/i.test(nu)
            && /apple/i.test(nu)
            && /opera/i.test(nu);
    } catch (e) {
        error && error('isOpera', e);
    }
}