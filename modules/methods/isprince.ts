import error from '../methods/error';

export default function isPrince(this: Craydent | Window): boolean {
    /*|{
        "info": "Check if engine is Prince",
        "category": "HTTP",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#isPrince",
        "returnType": "(Bool)"
    }|*/
    try {
        return (/prince/i.test(this.navigator.userAgent));
    } catch (e) /* istanbul ignore next */ {
        error && error('isPrince', e);
        return null as any;
    }
}