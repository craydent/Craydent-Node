import error from './error';
import isWebkit from './isWebkit';

export default function isKHTML(this: Craydent | Window): boolean {
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
    } catch (e) /* istanbul ignore next */ {
        error && error('isKHTML', e);
    }
}