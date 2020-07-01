import error from './error';

export default function isWindowsMobile(this: Craydent | Window) {
    /*|{
        "info": "Check if device is Windows Mobile",
        "category": "HTTP",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#isWindowsMobile",
        "returnType": "(Bool)"
    }|*/
    try {
        return (/windows ce/i.test(this.navigator.userAgent));
    } catch (e) {
        error && error('isWindowsMobile', e);
    }
}
