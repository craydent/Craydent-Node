import error from './error';

export default function getSessionID() {
    /*|{
        "info": "Retrieve the session id when used in conjunction with createServer",
        "category": "HTTP",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#getSessionID",
        "returnType": "(String)"
    }|*/
    try {
        return this.sessionid;
    } catch (e) {
        error && error('getSessionID', e);
    }
}