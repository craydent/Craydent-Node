import error from './error';

export default function isWindows(this: Craydent | Window) {
    /*|{
        "info": "Check if OS is Windows",
        "category": "HTTP",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#isWindows",
        "returnType": "(Bool)"
    }|*/
    try {
        return /win/i.test(this.navigator.platform);
    } catch (e) {
        error && error('isWindows', e);
    }
}