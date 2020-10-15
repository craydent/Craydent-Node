import * as IServerManager from '../methods/ServerManager';
import * as I$COOKIE from '../methods/$COOKIE';
import * as I$DELETE from '../methods/$DELETE';
import * as I$DEL from '../methods/$DEL';
import * as I$GET from '../methods/$GET';
import * as I$HEADER from '../methods/$HEADER';
import * as I$PAYLOAD from '../methods/$PAYLOAD';
import * as I$POST from '../methods/$POST';
import * as I$PUT from '../methods/$PUT';
import * as IChromeVersion from '../methods/ChromeVersion';
import * as IFirefoxVersion from '../methods/FirefoxVersion';
import * as IIEVersion from '../methods/IEVersion';
import * as IOperaVersion from '../methods/OperaVersion';
import * as ISafariVersion from '../methods/SafariVersion';
import * as IIsAmaya from '../methods/isAmaya';
import * as IIsAndroid from '../methods/isAndroid';
import * as IIsBlackBerry from '../methods/isBlackBerry';
import * as IIsChrome from '../methods/isChrome';
import * as IIsFirefox from '../methods/isFirefox';
import * as IIsGecko from '../methods/isGecko';
import * as IIsIE6 from '../methods/isIE6';
import * as IIsIE from '../methods/isIE';
import * as IIsIPad from '../methods/isIPad';
import * as IIsIPhone from '../methods/isIPhone';
import * as IIsIPod from '../methods/isIPod';
import * as IIsKHTML from '../methods/isKHTML';
import * as IIsLinux from '../methods/isLinux';
import * as IIsMac from '../methods/isMac';
import * as IIsMobile from '../methods/isMobile';
import * as IIsOpera from '../methods/isOpera';
import * as IIsPalmOS from '../methods/isPalmOS';
import * as IIsPresto from '../methods/isPresto';
import * as IIsPrince from '../methods/isPrince';
import * as IIsSafari from '../methods/isSafari';
import * as IIsSymbian from '../methods/isSymbian';
import * as IIsTrident from '../methods/isTrident';
import * as IIsWebkit from '../methods/isWebkit';
import * as IIsWindows from '../methods/isWindows';
import * as IIsWindowsMobile from '../methods/isWindowsMobile';
import * as ICreateServer from '../methods/createServer';
import * as IEcho from '../methods/echo';
import * as IEnd from '../methods/end';
import * as IGetSessionID from '../methods/getSessionID';
import * as IGetSession from '../methods/getSession';
import * as IGetSessionSync from '../methods/getSessionSync';
import * as IHeader from '../methods/header';
import * as ISend from '../methods/send';
import * as IVarDump from '../methods/varDump';
import * as IWriteSession from '../methods/writeSession';

import { scope } from '../private/__common';

if (typeof (global as any) == 'undefined'){
    (window as any).global = window;
}
scope.eval = str => eval(str);
//#region dependencies
const ServerManager: typeof IServerManager.default = require('../methods/ServerManager').default;
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
const $COOKIE: typeof I$COOKIE.default = require('../methods/$COOKIE').default;
const $DELETE: typeof I$DELETE.default = require('../methods/$DELETE').default;
const $DEL: typeof I$DEL.default = require('../methods/$DEL').default;
const $GET: typeof I$GET.default = require('../methods/$GET').default;
const $HEADER: typeof I$HEADER.default = require('../methods/$HEADER').default;
const $PAYLOAD: typeof I$PAYLOAD.default = require('../methods/$PAYLOAD').default;
const $POST: typeof I$POST.default = require('../methods/$POST').default;
const $PUT: typeof I$PUT.default = require('../methods/$PUT').default;
const ChromeVersion: typeof IChromeVersion.default = require('../methods/ChromeVersion').default;
const FirefoxVersion: typeof IFirefoxVersion.default = require('../methods/FirefoxVersion').default;
const IEVersion: typeof IIEVersion.default = require('../methods/IEVersion').default;
const OperaVersion: typeof IOperaVersion.default = require('../methods/OperaVersion').default;
const SafariVersion: typeof ISafariVersion.default = require('../methods/SafariVersion').default;
const isAmaya: typeof IIsAmaya.default = require('../methods/isAmaya').default;
const isAndroid: typeof IIsAndroid.default = require('../methods/isAndroid').default;
const isBlackBerry: typeof IIsBlackBerry.default = require('../methods/isBlackBerry').default;
const isChrome: typeof IIsChrome.default = require('../methods/isChrome').default;
const isFirefox: typeof IIsFirefox.default = require('../methods/isFirefox').default;
const isGecko: typeof IIsGecko.default = require('../methods/isGecko').default;
const isIE6: typeof IIsIE6.default = require('../methods/isIE6').default;
const isIE: typeof IIsIE.default = require('../methods/isIE').default;
const isIPad: typeof IIsIPad.default = require('../methods/isIPad').default;
const isIPhone: typeof IIsIPhone.default = require('../methods/isIPhone').default;
const isIPod: typeof IIsIPod.default = require('../methods/isIPod').default;
const isKHTML: typeof IIsKHTML.default = require('../methods/isKHTML').default;
const isLinux: typeof IIsLinux.default = require('../methods/isLinux').default;
const isMac: typeof IIsMac.default = require('../methods/isMac').default;
const isMobile: typeof IIsMobile.default = require('../methods/isMobile').default;
const isOpera: typeof IIsOpera.default = require('../methods/isOpera').default;
const isPalmOS: typeof IIsPalmOS.default = require('../methods/isPalmOS').default;
const isPresto: typeof IIsPresto.default = require('../methods/isPresto').default;
const isPrince: typeof IIsPrince.default = require('../methods/isPrince').default;
const isSafari: typeof IIsSafari.default = require('../methods/isSafari').default;
const isSymbian: typeof IIsSymbian.default = require('../methods/isSymbian').default;
const isTrident: typeof IIsTrident.default = require('../methods/isTrident').default;
const isWebkit: typeof IIsWebkit.default = require('../methods/isWebkit').default;
const isWindows: typeof IIsWindows.default = require('../methods/isWindows').default;
const isWindowsMobile: typeof IIsWindowsMobile.default = require('../methods/isWindowsMobile').default;
const createServer: typeof ICreateServer.default = require('../methods/createServer').default;
const echo: typeof IEcho.default = require('../methods/echo').default;
const end: typeof IEnd.default = require('../methods/end').default;
const getSessionID: typeof IGetSessionID.default = require('../methods/getSessionID').default;
const getSession: typeof IGetSession.default = require('../methods/getSession').default;
const getSessionSync: typeof IGetSessionSync.default = require('../methods/getSessionSync').default;
const header: typeof IHeader.default = require('../methods/header').default;
const send: typeof ISend.default = require('../methods/send').default;
const varDump: typeof IVarDump.default = require('../methods/varDump').default;
const writeSession: typeof IWriteSession.default = require('../methods/writeSession').default;
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
