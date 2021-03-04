import _getBrowserVersion from '../protected/_getBrowserVersion'
import error from '../methods/error';

export default function OperaVersion(this: Craydent | Window) {
    /*|{
        "info": "Get Opera version",
        "category": "HTTP",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#OperaVersion",
        "returnType": "(Float)"
    }|*/
    try {
        return _getBrowserVersion(this, "Opera");
    } catch (e) /* istanbul ignore next */ {
        error && error('OperaVersion', e);
    }
}