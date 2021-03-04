import error from '../methods/error';

export default function isWebkit(this: Craydent | Window): boolean {
    /*|{
        "info": "Check if engine is Webkit",
        "category": "HTTP",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#isWebkit",
        "returnType": "(Bool)"
    }|*/
    try {
        return (/webkit/i.test(this.navigator.userAgent));
    } catch (e) /* istanbul ignore next */ {
        error && error('isWebkit', e);
    }
}