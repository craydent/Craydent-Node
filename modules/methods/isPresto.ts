import error from './error';

export default function isPresto(this: Craydent | Window): boolean {
    /*|{
        "info": "Check if engine is Presto",
        "category": "HTTP",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#isPresto",
        "returnType": "(Bool)"
    }|*/
    try {
        return (/presto/i.test(this.navigator.userAgent));
    } catch (e) /* istanbul ignore next */ {
        error && error('isPresto', e);
    }
}