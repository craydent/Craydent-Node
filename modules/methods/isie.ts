import error from '../methods/error';
import IEVersion from '../methods/ieversion';

export default function isIE(this: Craydent | Window): boolean {
    /*|{
        "info": "Check if browser is Internet Explorer",
        "category": "HTTP",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#isIE",
        "returnType": "(Bool)"
    }|*/
    try {
        return (!!~IEVersion.call(this));
    } catch (e) /* istanbul ignore next */ {
        error && error('isIE', e);
    }
}