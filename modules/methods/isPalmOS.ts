import error from './error';

export default function isPalmOS(this: Craydent | Window) {
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
    } catch (e) {
        error && error('isPalmOS', e);
    }
}