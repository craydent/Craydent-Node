import error from './error';

export default function isMac(this: Craydent | Window) {
    /*|{
        "info": "Check if OS is Mac Based",
        "category": "HTTP",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#isMac",
        "returnType": "(Bool)"
    }|*/
    try {
        return /mac/i.test(this.navigator.platform);
    } catch (e) {
        error && error('isMac', e);
    }
}