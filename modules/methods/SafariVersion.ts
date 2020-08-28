import _getBrowserVersion from '../protected/_getBrowserVersion'
import error from './error';

export default function SafariVersion(this: Craydent | Window) {
    /*|{
        "info": "Get Safari version",
        "category": "HTTP",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#SafariVersion",
        "returnType": "(Float)"
    }|*/
    try {
        return (this as any).isChrome() ? -1 : _getBrowserVersion(this, "Safari");
    } catch (e) /* istanbul ignore next */ {
        error && error('SafariVersion', e);
    }
}