import error from './error';
import isWebkit from './isWebkit';

export default function isKHTML(this: Craydent | Window) {
    /*|{
        "info": "Check if engine is KHTML",
        "category": "HTTP",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#isKHTML",
        "returnType": "(Bool)"
    }|*/
    try {
        return !isWebkit.call(this) && (/khtml/i.test(this.navigator.userAgent));
    } catch (e) {
        error && error('isKHTML', e);
    }
}