import error from '../methods/error';

export default function isMac(this: Craydent | Window): boolean {
    /*|{
        "info": "Check if OS is Mac Based",
        "category": "HTTP",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#isMac",
        "returnType": "(Bool)"
    }|*/
    try {
        return /mac/i.test(this.navigator.platform);
    } catch (e) /* istanbul ignore next */ {
        error && error('isMac', e);
        return null as any;
    }
}