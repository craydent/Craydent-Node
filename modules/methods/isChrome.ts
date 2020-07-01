import error from './error';

export default function isChrome(this: Craydent | Window) {
    /*|{
        "info": "Check if browser is Chrome",
        "category": "HTTP",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#isChrome",
        "returnType": "(Bool)"
    }|*/
    try {
        return (/chrome/i.test(this.navigator.userAgent));
    } catch (e) {
        error && error('isChrome', e);
    }
}