import * as IServerManager from '../methods/servermanager';
import * as I$COOKIE from '../methods/http.cookie';
import * as I$DELETE from '../methods/http.delete';
import * as I$DEL from '../methods/http.del';
import * as I$GET from '../methods/http.get';
import * as I$HEADER from '../methods/http.header';
import * as I$PAYLOAD from '../methods/http.payload';
import * as I$POST from '../methods/http.post';
import * as I$PUT from '../methods/http.put';
import * as IChromeVersion from '../methods/chromeversion';
import * as IFirefoxVersion from '../methods/firefoxversion';
import * as IIEVersion from '../methods/ieversion';
import * as IOperaVersion from '../methods/operaversion';
import * as ISafariVersion from '../methods/safariversion';
import * as IIsAmaya from '../methods/isamaya';
import * as IIsAndroid from '../methods/isandroid';
import * as IIsBlackBerry from '../methods/isblackberry';
import * as IIsChrome from '../methods/ischrome';
import * as IIsFirefox from '../methods/isfirefox';
import * as IIsGecko from '../methods/isgecko';
import * as IIsIE6 from '../methods/isie6';
import * as IIsIE from '../methods/isie';
import * as IIsIPad from '../methods/isipad';
import * as IIsIPhone from '../methods/isiphone';
import * as IIsIPod from '../methods/isipod';
import * as IIsKHTML from '../methods/iskhtml';
import * as IIsLinux from '../methods/islinux';
import * as IIsMac from '../methods/ismac';
import * as IIsMobile from '../methods/ismobile';
import * as IIsOpera from '../methods/isopera';
import * as IIsPalmOS from '../methods/ispalmos';
import * as IIsPresto from '../methods/ispresto';
import * as IIsPrince from '../methods/isprince';
import * as IIsSafari from '../methods/issafari';
import * as IIsSymbian from '../methods/issymbian';
import * as IIsTrident from '../methods/istrident';
import * as IIsWebkit from '../methods/iswebkit';
import * as IIsWindows from '../methods/iswindows';
import * as IIsWindowsMobile from '../methods/iswindowsmobile';
import * as ICreateServer from '../methods/createserver';
import * as IEcho from '../methods/echo';
import * as IEnd from '../methods/end';
import * as IGetSessionID from '../methods/getsessionid';
import * as IGetSession from '../methods/getsession';
import * as IGetSessionSync from '../methods/getsessionsync';
import * as ISetHeader from '../methods/set-header';
import * as ISend from '../methods/send';
import * as IVarDump from '../methods/vardump';
import * as IWriteSession from '../methods/writesession';

import { scope } from '../private/__common';

if (typeof (global as any) == 'undefined') {
    (window as any).global = window;
}
scope.eval = str => eval(str);
//#region dependencies
const ServerManager: typeof IServerManager.default = require('../methods/servermanager').default;
const RESPONSES = {
    100: { "status": 100, "success": true, "message": "Continue" },
    101: { "status": 101, "success": true, "message": "Switching Protocols" },
    102: { "status": 102, "success": true, "message": "Processing" },

    200: { "status": 200, "success": true, "message": "OK" },
    201: { "status": 201, "success": true, "message": "Created" },
    202: { "status": 202, "success": true, "message": "Accepted" },
    203: { "status": 203, "success": true, "message": "Non-Authoritative Information" },
    204: { "status": 204, "success": true, "message": "No Content" },
    205: { "status": 205, "success": true, "message": "Reset Content" },
    206: { "status": 206, "success": true, "message": "Partial Content" },
    207: { "status": 207, "success": true, "message": "Multi-Status" },
    208: { "status": 208, "success": true, "message": "Already Reported" },
    226: { "status": 226, "success": true, "message": "IM Used" },

    300: { "status": 300, "success": true, "message": "Multiple Choices" },
    301: { "status": 301, "success": true, "message": "Moved Permanently" },
    302: { "status": 302, "success": true, "message": "Found" },
    303: { "status": 303, "success": true, "message": "See Other" },
    304: { "status": 304, "success": true, "message": "Not Modified" },
    305: { "status": 305, "success": true, "message": "Use Proxy" },
    306: { "status": 306, "success": true, "message": "Unused" },
    307: { "status": 307, "success": true, "message": "Temporary Redirect" },
    308: { "status": 308, "success": true, "message": "Permanent Redirect" },

    400: { "status": 400, "success": false, "message": "Bad Request" },
    401: { "status": 401, "success": false, "message": "Unauthorized" },
    402: { "status": 402, "success": false, "message": "Payment Required" },
    403: { "status": 403, "success": false, "message": "Forbidden" },
    404: { "status": 404, "success": false, "message": "Not Found" },
    405: { "status": 405, "success": false, "message": "Method Not Allowed" },
    406: { "status": 406, "success": false, "message": "Not Acceptable" },
    407: { "status": 407, "success": false, "message": "Proxy Authentication Required" },
    408: { "status": 408, "success": false, "message": "Request Timeout" },
    409: { "status": 409, "success": false, "message": "Conflict" },
    410: { "status": 410, "success": false, "message": "Gone" },
    411: { "status": 411, "success": false, "message": "Length Required" },
    412: { "status": 412, "success": false, "message": "Precondition Failed" },
    413: { "status": 413, "success": false, "message": "Request Entity Too Large" },
    414: { "status": 414, "success": false, "message": "Request-URI Too Long" },
    415: { "status": 415, "success": false, "message": "Unsupported Media Type" },
    416: { "status": 416, "success": false, "message": "Requested Range Not Satisfiable" },
    417: { "status": 417, "success": false, "message": "Expectation Failed" },
    418: { "status": 418, "success": false, "message": "I'm a teapot" },
    420: { "status": 420, "success": false, "message": "Enhanced Your Calm" },
    422: { "status": 422, "success": false, "message": "Unprocessable Entity" },
    423: { "status": 423, "success": false, "message": "Locked" },
    424: { "status": 424, "success": false, "message": "Failed Dependency" },
    425: { "status": 425, "success": false, "message": "Reserved for WebDAV" },
    426: { "status": 426, "success": false, "message": "Upgrade Required" },
    428: { "status": 428, "success": false, "message": "Precondition Required" },
    429: { "status": 429, "success": false, "message": "Too Many Requests" },
    431: { "status": 431, "success": false, "message": "Request Header Fields Too Large" },
    444: { "status": 444, "success": false, "message": "No Response" },
    449: { "status": 449, "success": false, "message": "Retry With" },
    450: { "status": 450, "success": false, "message": "Blocked By Windows Parental Controls" },
    451: { "status": 451, "success": false, "message": "Unavailable For Legal Reasons" },
    499: { "status": 499, "success": false, "message": "Client Closed Request" },

    500: { "status": 500, "success": false, "message": "Internal Server Error" },
    501: { "status": 501, "success": false, "message": "Not Implemented" },
    502: { "status": 502, "success": false, "message": "Bad Gateway" },
    503: { "status": 503, "success": false, "message": "Service Unavailable" },
    504: { "status": 504, "success": false, "message": "Gateway Timeout" },
    505: { "status": 505, "success": false, "message": "HTTP Version Not Supported" },
    506: { "status": 506, "success": false, "message": "Variant Also Negotiates" },
    507: { "status": 507, "success": false, "message": "Insufficient Storage" },
    508: { "status": 508, "success": false, "message": "Loop Detected" },
    509: { "status": 509, "success": false, "message": "Bandwidth Limit Exceeded" },
    510: { "status": 510, "success": false, "message": "Not Extended" },
    511: { "status": 511, "success": false, "message": "Network Authentication Require" },
    598: { "status": 598, "success": false, "message": "Network read timeout error" },
    599: { "status": 599, "success": false, "message": "Network connect timeout error" }
} as {
    [key: number]: {
        status: number;
        success: boolean;
        message: string;
    }
};
const HTTP_STATUS_TEMPLATE = {} as { [key: number]: string };
const $COOKIE: typeof I$COOKIE.default = require('../methods/http.cookie').default;
const $DELETE: typeof I$DELETE.default = require('../methods/http.delete').default;
const $DEL: typeof I$DEL.default = require('../methods/http.delete').default;
const $GET: typeof I$GET.default = require('../methods/http.get').default;
const $HEADER: typeof I$HEADER.default = require('../methods/http.header').default;
const $PAYLOAD: typeof I$PAYLOAD.default = require('../methods/http.payload').default;
const $POST: typeof I$POST.default = require('../methods/http.post').default;
const $PUT: typeof I$PUT.default = require('../methods/http.put').default;
const ChromeVersion: typeof IChromeVersion.default = require('../methods/chromeversion').default;
const FirefoxVersion: typeof IFirefoxVersion.default = require('../methods/firefoxversion').default;
const IEVersion: typeof IIEVersion.default = require('../methods/ieversion').default;
const OperaVersion: typeof IOperaVersion.default = require('../methods/operaversion').default;
const SafariVersion: typeof ISafariVersion.default = require('../methods/safariversion').default;
const isAmaya: typeof IIsAmaya.default = require('../methods/isamaya').default;
const isAndroid: typeof IIsAndroid.default = require('../methods/isandroid').default;
const isBlackBerry: typeof IIsBlackBerry.default = require('../methods/isblackBerry').default;
const isChrome: typeof IIsChrome.default = require('../methods/ischrome').default;
const isFirefox: typeof IIsFirefox.default = require('../methods/isfirefox').default;
const isGecko: typeof IIsGecko.default = require('../methods/isgecko').default;
const isIE6: typeof IIsIE6.default = require('../methods/isie6').default;
const isIE: typeof IIsIE.default = require('../methods/isie').default;
const isIPad: typeof IIsIPad.default = require('../methods/isipad').default;
const isIPhone: typeof IIsIPhone.default = require('../methods/isiphone').default;
const isIPod: typeof IIsIPod.default = require('../methods/isipod').default;
const isKHTML: typeof IIsKHTML.default = require('../methods/iskhtml').default;
const isLinux: typeof IIsLinux.default = require('../methods/islinux').default;
const isMac: typeof IIsMac.default = require('../methods/ismac').default;
const isMobile: typeof IIsMobile.default = require('../methods/ismobile').default;
const isOpera: typeof IIsOpera.default = require('../methods/isopera').default;
const isPalmOS: typeof IIsPalmOS.default = require('../methods/ispalmos').default;
const isPresto: typeof IIsPresto.default = require('../methods/ispresto').default;
const isPrince: typeof IIsPrince.default = require('../methods/isprince').default;
const isSafari: typeof IIsSafari.default = require('../methods/issafari').default;
const isSymbian: typeof IIsSymbian.default = require('../methods/issymbian').default;
const isTrident: typeof IIsTrident.default = require('../methods/istrident').default;
const isWebkit: typeof IIsWebkit.default = require('../methods/iswebkit').default;
const isWindows: typeof IIsWindows.default = require('../methods/iswindows').default;
const isWindowsMobile: typeof IIsWindowsMobile.default = require('../methods/iswindowsmobile').default;
const createServer: typeof ICreateServer.default = require('../methods/createserver').default;
const echo: typeof IEcho.default = require('../methods/echo').default;
const end: typeof IEnd.default = require('../methods/end').default;
const getSessionID: typeof IGetSessionID.default = require('../methods/getsessionid').default;
const getSession: typeof IGetSession.default = require('../methods/getsession').default;
const getSessionSync: typeof IGetSessionSync.default = require('../methods/getsessionsync').default;
const header: typeof ISetHeader.default = require('../methods/set-header').default;
const send: typeof ISend.default = require('../methods/send').default;
const varDump: typeof IVarDump.default = require('../methods/vardump').default;
const writeSession: typeof IWriteSession.default = require('../methods/writesession').default;
//#endregion

export {
    ServerManager,
    RESPONSES,
    HTTP_STATUS_TEMPLATE,
    $COOKIE,
    $DELETE,
    $DEL,
    $GET,
    $HEADER,
    $PAYLOAD,
    $POST,
    $PUT,
    ChromeVersion,
    FirefoxVersion,
    IEVersion,
    OperaVersion,
    SafariVersion,
    isAmaya,
    isAndroid,
    isBlackBerry,
    isChrome,
    isFirefox,
    isGecko,
    isIE6,
    isIE,
    isIPad,
    isIPhone,
    isIPod,
    isKHTML,
    isLinux,
    isMac,
    isMobile,
    isOpera,
    isPalmOS,
    isPresto,
    isPrince,
    isSafari,
    isSymbian,
    isTrident,
    isWebkit,
    isWindows,
    isWindowsMobile,
    createServer,
    echo,
    end,
    getSessionID,
    getSession,
    getSessionSync,
    header,
    send,
    varDump,
    writeSession
};
