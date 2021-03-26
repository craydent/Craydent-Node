import error from '../methods/error';
import foo from '../methods/foo';
import _getSession from '../protected/_getSession';

export default function getSession(this: Craydent | void, sid: string, callback: (data: any) => void = foo): Promise<any> {
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
        const self = this as Craydent;
        return new Promise(function (res, rej) {
            const cb = function (sessionObject: any) {
                callback(sessionObject);
                res(sessionObject);
            };
            _getSession(self, sid, cb);
        });
    } catch (e) /* istanbul ignore next */ {
        error && error('getSession', e);
        return Promise.resolve(null as any);
    }
}