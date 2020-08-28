import error from './error';

export default function isIPad(this: Craydent | Window): boolean {
    /*|{
        "info": "Check if device is iPad",
        "category": "HTTP",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#isIPad",
        "returnType": "(Bool)"
    }|*/
    try {
        return (/iPad|iPhone OS 3_[1|2]_2/i.test(this.navigator.userAgent));
    } catch (e) /* istanbul ignore next */ {
        error && error('isIPad', e);
    }
}