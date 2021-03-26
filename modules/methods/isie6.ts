import error from '../methods/error';
import IEVersion from '../methods/ieversion';

export default function isIE6(this: Craydent | Window): boolean {
    /*|{
        "info": "Check if browser is Internet Explorer 6",
        "category": "HTTP",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#isIE6",
        "returnType": "(Bool)"
    }|*/
    try {
        let rv = IEVersion.call(this);
        return !!(~rv && rv < 7.0);
    } catch (e) /* istanbul ignore next */ {
        error && error('isIE6', e);
        return null as any;
    }
}