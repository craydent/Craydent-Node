import error from './error';

export default function isAmaya(this: Craydent | Window) {
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
    } catch (e) {
        error && error('isAmaya', e);
    }
}