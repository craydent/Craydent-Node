import error from './error';
import IEVersion from './IEVersion';

export default function isIE(this: Craydent | Window) {
    /*|{
        "info": "Check if browser is Internet Explorer",
        "category": "HTTP",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#isIE",
        "returnType": "(Bool)"
    }|*/
    try {
        return (!!~IEVersion.call(this));
    } catch (e) {
        error && error('isIE', e);
    }
}