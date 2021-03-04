import error from '../methods/error';

export default function isAmaya(this: Craydent | Window): boolean {
    /*|{
        "info": "Check if browser is Amaya",
        "category": "HTTP",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#isAmaya",
        "returnType": "(Bool)"
    }|*/
    try {
        return (/amaya/i.test(this.navigator.userAgent));
    } catch (e) /* istanbul ignore next */ {
        error && error('isAmaya', e);
    }
}