import error from '../methods/error';

export default function isPalmOS(this: Craydent | Window): boolean {
    /*|{
        "info": "Check if OS is PalmOS",
        "category": "HTTP",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#isPalmOS",
        "returnType": "(Bool)"
    }|*/
    try {
        return (/palm/i.test(this.navigator.userAgent));
    } catch (e) /* istanbul ignore next */ {
        error && error('isPalmOS', e);
        return null as any;
    }
}