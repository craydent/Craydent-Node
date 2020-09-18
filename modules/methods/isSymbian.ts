import error from '../methods/error';
import isWebkit from '../methods/isWebkit';

export default function isSymbian(this: Craydent | Window): boolean {
    /*|{
        "info": "Check if OS is Symbian",
        "category": "HTTP",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#isSymbian",
        "returnType": "(Bool)"
    }|*/
    try {
        let nu = this.navigator.userAgent;
        return (isWebkit.call(this) && (/series60/i.test(nu) || /symbian/i.test(nu)));
    } catch (e) /* istanbul ignore next */ {
        error && error('isSymbian', e);
    }
}