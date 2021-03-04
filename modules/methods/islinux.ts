import error from '../methods/error';

export default function isLinux(this: Craydent | Window): boolean {
    /*|{
        "info": "Check if OS is Linux",
        "category": "HTTP",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#isLinux",
        "returnType": "(Bool)"
    }|*/
    try {
        return /linux/i.test(this.navigator.platform);
    } catch (e) /* istanbul ignore next */ {
        error && error('isLinux', e);
    }
}