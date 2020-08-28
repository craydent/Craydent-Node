import _getBrowserVersion from '../protected/_getBrowserVersion'
import error from './error';

export default function ChromeVersion(this: Craydent | Window) {
    /*|{
        "info": "Get Chrome version",
        "category": "HTTP",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#ChromeVersion",
        "returnType": "(Float)"
    }|*/
    try {
        return _getBrowserVersion(this, "Chrome");
    } catch (e) /* istanbul ignore next */ {
        error && error('ChromeVersion', e);
    }
}