import error from './error';

export default function isSymbian(this: Craydent | Window) {
    /*|{
        "info": "Check if OS is Symbian",
        "category": "HTTP",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#isSymbian",
        "returnType": "(Bool)"
    }|*/
    try {
        let nu = this.navigator.userAgent;
        return (this.isWebkit() && (/series60/i.test(nu) || /symbian/i.test(nu)));
    } catch (e) {
        error && error('isSymbian', e);
    }
}