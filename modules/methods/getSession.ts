import error from './error';
import foo from './foo';
import _getSession from '../protected/_getSession';

export default function getSession(this: Craydent | void, sid: string, callback?: (data: any) => void) {
    /*|{
        "info": "Asynchronous retrieval of the session object when used in conjunction with createServer",
        "category": "HTTP",
        "parameters":[
            {"sid": "(String) Session id of the session object to retrieve syncronously."},
            {"callback?": "(SessionCallback) callback function to invoke once the session object is retrieved."}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#getSession",
        "returnType": "(Promise<Session>)"
    }|*/
    try {
        // if (arguments.length == 1) {
        //     return this.getSessionSync(sid);
        // }
        return new Promise(function (res, rej) {
            callback = callback || foo;
            const cb = function (sessionObject) {
                callback(sessionObject);
                res(sessionObject);
            };
            _getSession(this, sid, cb);
        });
    } catch (e) /* istanbul ignore next */ {
        error && error('getSession', e);
    }
}