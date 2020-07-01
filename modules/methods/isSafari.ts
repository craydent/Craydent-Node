import error from './error';

export default function isSafari(this: Craydent | Window) {
    /*|{
        "info": "Check if browser is Safari",
        "category": "HTTP",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#isSafari",
        "returnType": "(Bool)"
    }|*/
    try {
        var nu = this.navigator.userAgent;
        return !this.isChrome() && (/chrome/i.test(nu)) && (/apple/i.test(nu));
    } catch (e) {
        error && error('isSafari', e);
    }
}