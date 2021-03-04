import error from '../methods/error';

export default function getSessionID(this: Craydent | void) {
    /*|{
        "info": "Retrieve the session id when used in conjunction with createServer",
        "category": "HTTP",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#getSessionID",
        "returnType": "(String)"
    }|*/
    try {
        return (this as any).sessionid;
    } catch (e) /* istanbul ignore next */ {
        error && error('getSessionID', e);
    }
}