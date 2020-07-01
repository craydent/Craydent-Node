import error from './error';
import _getSession from '../protected/_getSession';

export default function getSessionSync(sid) {
    /*|{
        "info": "Syncronously retrieve the session object when used in conjunction with createServer",
        "category": "HTTP",
        "parameters":[
            {"sid": "(String) Session id of the session object to retrieve syncronously."}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#getSessionSync",
        "returnType": "(Session)"
    }|*/
    try {
        return _getSession(this, sid);
    } catch (e) {
        error('getSessionSync', e);
    }
}