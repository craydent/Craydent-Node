import * as IHttp from 'http';
import { $c } from '../private/__common';
import echo from './echo';
import end from './end';
import getSessionID from './getSessionID';
import getSession from './getSession';
import getSessionSync from './getSessionSync';
import header from './header';
import send from './send';
import writeSession from './writeSession';
import _getSession from '../protected/_getSession';
import varDump from './varDump';
import $COOKIE from './$COOKIE';
import $DELETE from './$DELETE';
import $GET from './$GET';
import $HEADER from './$HEADER';
import $PAYLOAD from './$PAYLOAD';
import $POST from './$POST';
import $PUT from './$PUT';
import isIE from './isIE';
import isIE6 from './isIE6';
import IEVersion from './IEVersion';
import isChrome from './isChrome';
import isFirefox from './isFirefox';
import isSafari from './isSafari';
import isOpera from './isOpera';
import ChromeVersion from './ChromeVersion';
import FirefoxVersion from './FirefoxVersion';
import SafariVersion from './SafariVersion';
import OperaVersion from './OperaVersion';
import isIPhone from './isIPhone';
import isIPod from './isIPod';
import isIPad from './isIPad';
import isAndroid from './isAndroid';
import isWindowsMobile from './isWindowsMobile';
import isBlackBerry from './isBlackBerry';
import isPalmOS from './isPalmOS';
import isSymbian from './isSymbian';
import isMobile from './isMobile';
import isWebkit from './isWebkit';
import isAmaya from './isAmaya';
import isGecko from './isGecko';
import isKHTML from './isKHTML';
import isPresto from './isPresto';
import isPrince from './isPrince';
import isTrident from './isTrident';
import isWindows from './isWindows';
import isMac from './isMac';
import isLinux from './isLinux';

export default function ServerManager(this: Craydent, req: IHttp.IncomingMessage, res: IHttp.ServerResponse) {
    /*|{
        "info": "Class used to create a new context for HTTP server",
        "category": "Class",
        "parameters":[
            {"request": "(HTTPRequest) HTTP request object provided by createServer"},
            {"response": "(HTTPResponse) HTTP response object provided by createServer"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#HTTPContext",
        "returnType": "(void)"
    }|*/
    let self: any = this;

    self.sessionid = null;
    self.session = null;
    self.request = req;
    self.response = res;
    self.$l = null;
    self.location = null;
    self.navigator = {} as any;

    self.getSessionID = getSessionID;
    self.getSession = getSession;
    self.getSessionSync = getSessionSync;
    self.end = end;
    self.writeSession = writeSession;
    self.header = header;
    (self.header as any).headers = {};
    (self.header as any).code = 200;
    self.echo = echo;
    (self.echo as any).out = "";
    self.send = send;
    self.varDump = varDump;

    self.$COOKIE = $COOKIE;
    self.$GET = $GET;
    self.$HEADER = $HEADER;
    self.$DELETE = $DELETE;
    self.$PAYLOAD = $PAYLOAD;
    self.$POST = $POST;
    self.$PUT = $PUT;
    self.isIE6 = isIE6;
    self.isIE = isIE;
    self.IEVersion = IEVersion;
    self.isChrome = isChrome;
    self.isSafari = isSafari;
    self.isOpera = isOpera;
    self.isFirefox = isFirefox;

    self.ChromeVersion = ChromeVersion;
    self.SafariVersion = SafariVersion;
    self.OperaVersion = OperaVersion;
    self.FirefoxVersion = FirefoxVersion;

    self.isIPhone = isIPhone;
    self.isIPod = isIPod;
    self.isIPad = isIPad;
    self.isAndroid = isAndroid;
    self.isWindowsMobile = isWindowsMobile;
    self.isBlackBerry = isBlackBerry;
    self.isPalmOS = isPalmOS;
    self.isSymbian = isSymbian;
    self.isMobile = isMobile;
    self.isWebkit = isWebkit;
    self.isAmaya = isAmaya;
    self.isGecko = isGecko;
    self.isKHTML = isKHTML;
    self.isPresto = isPresto;
    self.isPrince = isPrince;
    self.isTrident = isTrident;
    self.isWindows = isWindows;
    self.isMac = isMac;
    self.isLinux = isLinux;

    let parts = req.headers.host.split(":"),
        queryparts = req.url.split("?"),
        query = queryparts.length > 1 ? queryparts.splice(1).join('?') : "",
        protocol = `http${(req.connection as any).encrypted ? "s" : ""}`,
        cookies = (req.headers.cookie || "").split('; '),
        hash = "";

    for (let i = 0, len = cookies.length; i < len; i++) {
        if (~cookies[i].indexOf("CRAYDENTHASH=")) {
            hash = cookies[i].substring(13);
            break;
        }
    }

    self.location = self.$l = {
        hash: hash,
        host: req.headers.host,
        hostname: parts[0],
        href: `${protocol}://${req.headers.host}${req.url}${hash && "#" + hash}`,
        method: req.headers.method,
        origin: `${protocol}://${req.headers.host}`,
        pathname: req.url,
        port: parseInt(parts[1]) || protocol == 'http' ? 80 : 443,
        protocol: protocol,
        search: query
    } as any;
    self.navigator = { userAgent: req.headers['user-agent'], platform: req.headers.platform || req.headers['user-agent'] } as Navigator;

    self.PROTOCOL = self.$l.protocol;
    self.SERVER = self.$l.host;
    self.SERVER_PATH = self.$l.pathname;
    self.REFERER = req.headers.referer;
    self.ORIGIN = req.headers.origin as string;
    self.PRAGMA = req.headers.pragma;
    self.ACCEPT_ENCODING = req.headers["accept-encoding"] as string;
    self.ACCEPT_LANGUAGE = req.headers["accept-language"] as string;
    self.REFERER_IP = (req.headers['x-forwarded-for'] || req.connection.remoteAddress) as string;
    self.PUBLIC_IP = $c.PUBLIC_IP;
    self.LOCAL_IP = $c.LOCAL_IP;

    /* istanbul ignore next */
    const _ie = self.IEVersion(), _chrm = self.ChromeVersion(), _ff = self.FirefoxVersion(), _op = self.OperaVersion(), _saf = self.SafariVersion(),
        _droid = self.isAndroid(), _bbery = self.isBlackBerry(), _ipad = self.isIPad(), _ifon = self.isIPhone(), _ipod = self.isIPod(), _linx = self.isLinux(), _mac = self.isMac(), _palm = self.isPalmOS(), _symb = self.isSymbian(), _win = self.isWindows(), _winm = self.isWindowsMobile(),
        _amay = self.isAmaya(), _gekk = self.isGecko(), _khtm = self.isKHTML(), _pres = self.isPresto(), _prin = self.isPrince(), _trid = self.isTrident(), _webk = self.isWebkit(),
        _browser = (~_ie && 'Internet Explorer') || (~_chrm && 'Chrome') || (~_ff && 'Firefox') || (~_saf && 'Safari'),
        _os = (_droid && 'Android') || (_bbery && 'BlackBerry') || (_linx && 'Linux') || ((_ipad || _ifon || _ipod) && 'iOS') || (_mac && 'Mac') || (_palm && 'PalmOS') || (_symb && 'Symbian') || (_win && 'Windows') || (_winm && 'Windows Mobile'),
        _device = (_droid && 'Android') || (_bbery && 'BlackBerry') || (_ipad && 'iPad') || (_ifon && 'iPhone') || (_ipod && 'iPod') || (_linx && 'Linux') || (_mac && 'Mac') || (_palm && 'PalmOS') || (_symb && 'Symbian') || (_win && 'Windows') || (_winm && 'Windows Mobile'),
        _engine = (_amay && 'Amaya') || (_gekk && 'Gekko') || (_khtm && 'KHTML') || (_pres && 'Presto') || (_prin && 'Prince') || (_trid && 'Trident') || (_webk && 'WebKit');

    // constants
    /* istanbul ignore next */
    self.BROWSER = {
        CURRENT: _browser,
        CURRENT_VERSION: (~_ie && _ie) || (~_chrm && _chrm) || (~_ff && _ff) || (~_saf && _saf),
        IE: self.isIE(),
        IE_VERSION: _ie,
        IE6: (_ie < 7.0 && _ie >= 6.0),
        IE7: (_ie < 8.0 && _ie >= 7.0),
        IE8: (_ie < 9.0 && _ie >= 8.0),
        CHROME: self.isChrome(),
        CHROME_VERSION: _chrm,
        FIREFOX: self.isFirefox(),
        FIREFOX_VERSION: _ff,
        OPERA: self.isOpera(),
        OPERA_VERSION: _op,
        SAFARI: self.isSafari(),
        SAFARI_VERSION: _saf
    };
    self.CLIENT = {
        BROWSER: _browser,
        CORES_SUPPORT: true,
        DEVICE: _device,
        ENGINE: _engine,
        OS: _os
    };
    self.ENGINE = {
        CURRENT: _engine,
        AMAYA: _amay,
        GEKKO: _gekk,
        KHTML: _khtm,
        PRESTO: _pres,
        PRINCE: _prin,
        TRIDENT: _trid,
        WEBKIT: _webk
    };
    self.OS = {
        CURRENT: _os,
        ANDROID: _droid,
        BLACKBERRY: _bbery,
        LINUX: _linx,
        IOS: (_ipad || _ifon || _ipod),
        MAC: _mac,
        PALM: _palm,
        SYMBIAN: _symb,
        WINDOWS: _win,
        WINDOWS_MOBILE: _winm
    };
    self.DEVICE = {
        CURRENT: _device,
        ANDROID: _droid,
        BLACKBERRY: _bbery,
        IPAD: _ipad,
        IPHONE: _ifon,
        IPOD: _ipod,
        LINUX: _linx,
        MAC: _mac,
        PALM: _palm,
        SYMBIAN: _symb,
        WINDOWS: _win,
        WINDOWS_MOBILE: _winm
    };
    self.ANDROID = _droid;
    self.AMAYA = _amay;
    self.BLACKBERRY = _bbery;
    self.CHROME = self.isChrome();
    self.CHROME_VERSION = _chrm;
    self.CORES_SUPPORT = true;
    self.DEBUG_MODE = $c.DEBUG_MODE = $c.DEBUG_MODE || !!self.$GET("debug");
    self.EXPOSE_ROUTE_API = $c.EXPOSE_ROUTE_API;
    self.FIREFOX = self.isFirefox();
    self.FIREFOX_VERSION = self.FirefoxVersion();
    self.GEKKO = self.isGecko();
    self.IE = self.isIE();
    self.IE_VERSION = _ie;
    self.IE6 = (_ie < 7.0 && _ie >= 6.0);
    self.IE7 = (_ie < 8.0 && _ie >= 7.0);
    self.IE8 = (_ie < 9.0 && _ie >= 8.0);
    self.IPAD = self.isIPad();
    self.IPHONE = self.isIPhone();
    self.IPOD = self.isIPod();
    self.KHTML = self.isKHTML();
    self.LINUX = self.isLinux();
    self.MAC = self.isMac();
    self.OPERA = self.isOpera();
    self.OPERA_VERSION = self.OperaVersion();
    self.PAGE_NAME = (function () {
        var pn = self.$l.href.substring(self.$l.href.lastIndexOf('/') + 1).replace(/([^#^?]*).*/gi, '$1');
        return !pn || !~pn.indexOf('.') ? "index.html" : pn;
    })();
    self.PAGE_NAME_RAW = (function () {
        var pn = self.$l.href.substring(self.$l.href.lastIndexOf('/') + 1).replace(/(.*)?\?.*/gi, '$1');
        return !pn || !~pn.indexOf('.') ? "index.html" : pn;
    })();
    self.PALM = self.isPalmOS();
    self.PRESTO = self.isPresto();
    self.PRINCE = self.isPrince();
    self.PROTOCOL = self.$l.protocol;
    self.RESPONSES = $c.RESPONSES;
    self.SAFARI = self.isSafari();
    self.SAFARI_VERSION = self.SafariVersion();
    self.SYMBIAN = self.isSymbian();
    self.TEMPLATE_VARS = $c.TEMPLATE_VARS;
    self.TEMPLATE_TAG_CONFIG = $c.TEMPLATE_TAG_CONFIG;
    self.TRIDENT = self.isTrident();
    self.VERBOSE_LOGS = $c.VERBOSE_LOGS;
    self.VERSION = $c.VERSION;
    self.WEBKIT = self.isWebkit();
    self.WINDOWS = self.isWindows();
    self.WINDOWS_MOBILE = self.isWindowsMobile();
}