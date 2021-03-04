import _getBrowserVersion from '../protected/_getBrowserVersion'
import error from '../methods/error';

export default function FirefoxVersion(this: Craydent | Window) {
    /*|{
        "info": "Get Firefox version",
        "category": "HTTP",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#FirefoxVersion",
        "returnType": "(Float)"
    }|*/
    try {
        return _getBrowserVersion(this, "Firefox");
    } catch (e) /* istanbul ignore next */ {
        error && error('FirefoxVersion', e);
    }
}