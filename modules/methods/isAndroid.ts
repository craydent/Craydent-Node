import error from '../methods/error';

export default function isAndroid(this: Craydent | Window): boolean {
    /*|{
        "info": "Check if device is Android",
        "category": "HTTP",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#isAndroid",
        "returnType": "(Bool)"
    }|*/
    try {
        return (/android/i.test(this.navigator.userAgent));
    } catch (e) /* istanbul ignore next */ {
        error && error('isAndroid', e);
    }
}