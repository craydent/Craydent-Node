
import error from '../methods/error';
import isArray from '../methods/isArray';
import isAsync from '../methods/isAsync';
import isFunction from '../methods/isFunction';
import cuid from '../methods/cuid';
import getProperty from '../methods/getProperty';
import _sessionFileCreateAndRetrieve from '../protected/_sessionFileCreateAndRetrieve';



export default function _getSession(ctx: Craydent, sid: string, callback?: (data: any) => void): any {
    try {
        let request = ctx.request;
        if (ctx.session || __GLOBALSESSION[ctx.sessionid]) {
            ctx.session = ctx.session ? (__GLOBALSESSION[sid] = ctx.session) : (__GLOBALSESSION[ctx.sessionid]);
            return callback ? callback(ctx.session) : ctx.session;
        }
        let sync = !callback;

        let cookies, sessionCookieKey = "NODEJSSESSION";
        cookies = (getProperty(request, 'headers.cookie') || '').split('; ');
        // get thes session cookie cuid from the cookie
        let sessionCookie = cookies.filter(function (c) { return ~c.indexOf(sessionCookieKey + "="); })[0];
        if (sessionCookie) {
            ctx.sessionid = sessionCookie.substring(sessionCookieKey.length + 1);
        } else {
            ctx.sessionid = cuid();
        }

        if (true || !__GLOBALSESSION[ctx.sessionid] && __GLOBALSESSION.length > 1000000) {
            // make room for this session to be store globally
            for (let prop in __GLOBALSESSION) {
                delete __GLOBALSESSION[prop];
                break;
            }

            let dir = 'craydent/session',
                path = dir + "/" + ctx.sessionid;

            let csession = _sessionFileCreateAndRetrieve(dir, path, sync, function (retrievedSession) {
                __GLOBALSESSION[ctx.sessionid] = ctx.session = retrievedSession;
                callback && callback(ctx.session);
            });
            if (csession) {
                return __GLOBALSESSION[ctx.sessionid] = ctx.session = csession;
            }
        } else {
            return callback ? callback(__GLOBALSESSION[ctx.sessionid]) : __GLOBALSESSION[ctx.sessionid];
        }
    } catch (e) {
        error && error('_getSession', e);
    }
}