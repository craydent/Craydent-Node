import error from './error';

export default function isIPod(this: Craydent | Window): boolean {
    /*|{
        "info": "Check if device is IPod",
        "category": "HTTP",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#isIPod",
        "returnType": "(Bool)"
    }|*/
    try {
        return (/ipod/i.test(this.navigator.userAgent));
    } catch (e) /* istanbul ignore next */ {
        error && error('isIPod', e);
    }
}