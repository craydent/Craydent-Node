
import error from '../methods/error';
import cuid from '../methods/cuid';
import getProperty from '../methods/getproperty';
import _sessionFileCreateAndRetrieve from '../protected/_sessionFileCreateAndRetrieve';

declare var __GLOBALSESSION: any;

export default function _getSession(ctx: Craydent, sid: string, callback?: (data: any) => void): any {
    try {
        if ((ctx as any).session || __GLOBALSESSION[(ctx as any).sessionid]) {
            (ctx as any).session = (ctx as any).session ? (__GLOBALSESSION[sid] = (ctx as any).session) : (__GLOBALSESSION[(ctx as any).sessionid]);
            return callback ? callback((ctx as any).session) : (ctx as any).session;
        }
        let request = (ctx as any).request;
        let sync = !callback;

        let cookies, sessionCookieKey = "NODEJSSESSION";
        cookies = (getProperty(request, 'headers.cookie') || '').split('; ');
        // get thes session cookie cuid from the cookie
        let sessionCookie = cookies.filter(function (c: any) { return ~c.indexOf(`${sessionCookieKey}=`); })[0];
        if (sessionCookie) {
            (ctx as any).sessionid = sessionCookie.substring(sessionCookieKey.length + 1);
        } else {
            (ctx as any).sessionid = cuid();
        }

        if (!__GLOBALSESSION[(ctx as any).sessionid] && __GLOBALSESSION.length > 1000000) {
            // make room for this session to be store globally
            for (let prop in __GLOBALSESSION) {
                delete __GLOBALSESSION[prop];
                break;
            }

            let path = `craydent/session/${(ctx as any).sessionid}`;

            let csession = _sessionFileCreateAndRetrieve(path, sync, function (retrievedSession) {
                __GLOBALSESSION[(ctx as any).sessionid] = (ctx as any).session = retrievedSession;
                callback && callback((ctx as any).session);
            });
            if (csession) {
                return __GLOBALSESSION[(ctx as any).sessionid] = (ctx as any).session = csession;
            }
        } else {
            return callback ? callback(__GLOBALSESSION[(ctx as any).sessionid]) : __GLOBALSESSION[(ctx as any).sessionid];
        }
    } catch (e) /* istanbul ignore next */ {
        error && error('_getSession', e);
        return null as any;
    }
}