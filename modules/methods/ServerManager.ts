import * as IHttp from 'http';
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
    let self = this;

    this.sessionid = null;
    this.session = null;
    this.request = req;
    this.response = res;
    this.$l = null;
    this.location = null;
    this.navigator = {} as any;

    this.getSessionID = getSessionID;
    this.getSession = getSession;
    this.getSessionSync = getSessionSync;
    this.end = end;
    this.writeSession = writeSession;
    this.header = header;
    (this.header as any).headers = {};
    (this.header as any).code = 200;
    this.echo = echo;
    (this.echo as any).out = "";
    this.send = send;
    this.varDump = varDump;

    this.$COOKIE = $COOKIE;
    this.$GET = $GET;
    this.$HEADER = $HEADER;
    this.$DELETE = $DELETE;
    this.$PAYLOAD = $PAYLOAD;
    this.$POST = $POST;
    this.$PUT = $PUT;
    this.isIE6 = isIE6;
    this.isIE = isIE;
    this.IEVersion = IEVersion;
    this.isChrome = isChrome;
    this.isSafari = isSafari;
    this.isOpera = isOpera;
    this.isFirefox = isFirefox;

    this.ChromeVersion = ChromeVersion;
    this.SafariVersion = SafariVersion;
    this.OperaVersion = OperaVersion;
    this.FirefoxVersion = FirefoxVersion;

    this.isIPhone = isIPhone;
    this.isIPod = isIPod;
    this.isIPad = isIPad;
    this.isAndroid = isAndroid;
    this.isWindowsMobile = isWindowsMobile;
    this.isBlackBerry = isBlackBerry;
    this.isPalmOS = isPalmOS;
    this.isSymbian = isSymbian;
    this.isMobile = isMobile;
    this.isWebkit = isWebkit;
    this.isAmaya = isAmaya;
    this.isGecko = isGecko;
    this.isKHTML = isKHTML;
    this.isPresto = isPresto;
    this.isPrince = isPrince;
    this.isTrident = isTrident;
    this.isWindows = isWindows;
    this.isMac = isMac;
    this.isLinux = isLinux;

    let parts = req.headers.host.split(":"),
        queryparts = req.url.split("?"),
        query = queryparts.length > 1 ? queryparts.splice(1).join('?') : "",
        protocol = "http" + ((req.connection as any).encrypted ? "s" : ""),
        cookies = (req.headers.cookie || "").split('; '),
        hash = "";

    for (let i = 0, len = cookies.length; i < len; i++) {
        if (~cookies[i].indexOf("CRAYDENTHASH=")) {
            hash = cookies[i].substring(13);
            break;
        }
    }

    this.location = this.$l = {
        hash: hash,
        host: req.headers.host,
        hostname: parts[0],
        href: protocol + "://" + req.headers.host + req.url + (hash && "#" + hash),
        method: req.headers.method,
        origin: protocol + "://" + req.headers.host,
        pathname: req.url,
        port: parts[1],
        protocol: protocol,
        search: query
    } as any;
    this.navigator = { userAgent: req.headers['user-agent'], platform: req.headers['user-agent'] } as Navigator;

    this.PROTOCOL = self.$l.protocol;
    this.SERVER = self.$l.host;
    this.SERVER_PATH = self.$l.pathname;
    this.REFERER = req.headers.referer;
    this.ORIGIN = req.headers.origin as string;
    this.PRAGMA = req.headers.pragma;
    this.ACCEPT_ENCODING = req.headers["accept-encoding"] as string;
    this.ACCEPT_LANGUAGE = req.headers["accept-language"] as string;
    this.REFERER_IP = (req.headers['x-forwarded-for'] || req.connection.remoteAddress) as string;
    this.PUBLIC_IP = $c.PUBLIC_IP;
    this.LOCAL_IP = $c.LOCAL_IP;

    const _ie = this.IEVersion(), _chrm = this.ChromeVersion(), _ff = this.FirefoxVersion(), _op = this.OperaVersion(), _saf = this.SafariVersion(),
        _droid = this.isAndroid(), _bbery = this.isBlackBerry(), _ipad = this.isIPad(), _ifon = this.isIPhone(), _ipod = this.isIPod(), _linx = this.isLinux(), _mac = this.isMac(), _palm = this.isPalmOS(), _symb = this.isSymbian(), _win = this.isWindows(), _winm = this.isWindowsMobile(),
        _amay = this.isAmaya(), _gekk = this.isGecko(), _khtm = this.isKHTML(), _pres = this.isPresto(), _prin = this.isPrince(), _trid = this.isTrident(), _webk = this.isWebkit(),
        _browser = (~_ie && 'Internet Explorer') || (~_chrm && 'Chrome') || (~_ff && 'Firefox') || (~_saf && 'Safari'),
        _os = (_droid && 'Android') || (_bbery && 'BlackBerry') || (_linx && 'Linux') || ((_ipad || _ifon || _ipod) && 'iOS') || (_mac && 'Mac') || (_palm && 'PalmOS') || (_symb && 'Symbian') || (_win && 'Windows') || (_winm && 'Windows Mobile'),
        _device = (_droid && 'Android') || (_bbery && 'BlackBerry') || (_ipad && 'iPad') || (_ifon && 'iPhone') || (_ipod && 'iPod') || (_linx && 'Linux') || (_mac && 'Mac') || (_palm && 'PalmOS') || (_symb && 'Symbian') || (_win && 'Windows') || (_winm && 'Windows Mobile'),
        _engine = (_amay && 'Amaya') || (_gekk && 'Gekko') || (_khtm && 'KHTML') || (_pres && 'Presto') || (_prin && 'Prince') || (_trid && 'Trident') || (_webk && 'WebKit');

    // constants
    this.BROWSER = {
        CURRENT: _browser,
        CURRENT_VERSION: (~_ie && _ie) || (~_chrm && _chrm) || (~_ff && _ff) || (~_saf && _saf),
        IE: this.isIE(),
        IE_VERSION: _ie,
        IE6: (_ie < 7.0 && _ie >= 6.0),
        IE7: (_ie < 8.0 && _ie >= 7.0),
        IE8: (_ie < 9.0 && _ie >= 8.0),
        CHROME: this.isChrome(),
        CHROME_VERSION: _chrm,
        FIREFOX: this.isFirefox(),
        FIREFOX_VERSION: _ff,
        OPERA: this.isOpera(),
        OPERA_VERSION: _op,
        SAFARI: this.isSafari(),
        SAFARI_VERSION: _saf
    };
    this.CLIENT = {
        BROWSER: _browser,
        CORES_SUPPORT: true,
        DEVICE: _device,
        ENGINE: _engine,
        OS: _os
    };
    this.ENGINE = {
        CURRENT: _engine,
        AMAYA: _amay,
        GEKKO: _gekk,
        KHTML: _khtm,
        PRESTO: _pres,
        PRINCE: _prin,
        TRIDENT: _trid,
        WEBKIT: _webk
    };
    this.OS = {
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
    this.DEVICE = {
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
    this.ANDROID = _droid;
    this.AMAYA = _amay;
    this.BLACKBERRY = _bbery;
    this.CHROME = this.isChrome();
    this.CHROME_VERSION = _chrm;
    this.CORES_SUPPORT = true;
    this.DEBUG_MODE = $c.DEBUG_MODE = $c.DEBUG_MODE || !!this.$GET("debug");
    this.EXPOSE_ROUTE_API = $c.EXPOSE_ROUTE_API;
    this.FIREFOX = this.isFirefox();
    this.FIREFOX_VERSION = this.FirefoxVersion();
    this.GEKKO = this.isGecko();
    this.IE = this.isIE();
    this.IE_VERSION = _ie;
    this.IE6 = (_ie < 7.0 && _ie >= 6.0);
    this.IE7 = (_ie < 8.0 && _ie >= 7.0);
    this.IE8 = (_ie < 9.0 && _ie >= 8.0);
    this.IPAD = this.isIPad();
    this.IPHONE = this.isIPhone();
    this.IPOD = this.isIPod();
    this.KHTML = this.isKHTML();
    this.LINUX = this.isLinux();
    this.MAC = this.isMac();
    this.OPERA = this.isOpera();
    this.OPERA_VERSION = this.OperaVersion();
    this.PAGE_NAME = (function () {
        var pn = self.$l.href.substring(self.$l.href.lastIndexOf('/') + 1).replace(/([^#^?]*).*/gi, '$1');
        return !pn || !~pn.indexOf('.') ? "index.html" : pn;
    })();
    this.PAGE_NAME_RAW = (function () {
        var pn = self.$l.href.substring(self.$l.href.lastIndexOf('/') + 1).replace(/(.*)?\?.*/gi, '$1');
        return !pn || !~pn.indexOf('.') ? "index.html" : pn;
    })();
    this.PALM = this.isPalmOS();
    this.PRESTO = this.isPresto();
    this.PRINCE = this.isPrince();
    this.PROTOCOL = this.$l.protocol;
    this.RESPONSES = $c.RESPONSES;
    this.SAFARI = this.isSafari();
    this.SAFARI_VERSION = this.SafariVersion();
    this.SYMBIAN = this.isSymbian();
    this.TEMPLATE_VARS = $c.TEMPLATE_VARS;
    this.TEMPLATE_TAG_CONFIG = $c.TEMPLATE_TAG_CONFIG;
    this.TRIDENT = this.isTrident();
    this.VERBOSE_LOGS = $c.VERBOSE_LOGS;
    this.VERSION = $c.VERSION;
    this.WEBKIT = this.isWebkit();
    this.WINDOWS = this.isWindows();
    this.WINDOWS_MOBILE = this.isWindowsMobile();

    // return this;
}