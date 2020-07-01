import error from './error';

export default function isTrident(this: Craydent | Window) {
    /*|{
        "info": "Check if engine is Trident",
        "category": "HTTP",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#isTrident",
        "returnType": "(Bool)"
    }|*/
    try {
        return (/trident/i.test(this.navigator.userAgent));
    } catch (e) {
        error && error('isTrident', e);
    }
}