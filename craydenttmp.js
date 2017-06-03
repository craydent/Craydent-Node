/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.8.2                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/


var ccc = {};
module.exports["testtest"] = function () {
    console.log(arguments.callee.name,"adfadfahhh");
    console.log(arguments.callee)
    for (var prop in arguments.callee) {
        console.log(prop);
    }
};
Object.defineProperty(module.exports["testtest"],"name",{writabel:true, value:"testtest"});
return;

/*----------------------------------------------------------------------------------------------------------------
/-	Global CONSTANTS and variables
/---------------------------------------------------------------------------------------------------------------*/
var _craydent_version = '0.8.2',
    __GLOBALSESSION = [], $c = {};
global.$g = global;
$g.navigator = $g.navigator || {};
function __isNewer(loadedVersion, thisVersion){
    if (loadedVersion[0] == thisVersion[0]) {
        loadedVersion.splice(0,1);
        thisVersion.splice(0,1);
        if (!thisVersion.length || !loadedVersion.length) {
            return false;
        }
        return __isNewer(loadedVersion, thisVersion);
    }
    return parseInt(loadedVersion[0]) < parseInt(thisVersion[0]);
}
if (!$g.$c || __isNewer($c.VERSION.split('.'), _craydent_version.split('.')) ) {
    $g.$c = $c = $g.$c || $c;
    function Craydent(req, res) {
        var self = this;

        var fs = require('fs');

        this.sessionid = null;
        this.session = null;
        this.request = req;
        this.response = res;
        this.$l = null;
        this.location = null;
        this.navigator = {};

        this.getSessionID = getSessionID;
        this.getSession = getSession;
        this.getSessionSync = getSessionSync;
        this._sessionFileCreatAndRetrieve = _sessionFileCreatAndRetrievefunction;
        this._getSession = _getSession;

        this.end = end;
        this.writeSession = writeSession;
        this.header = header;
        this.header.headers = {};
        this.header.code = 200;
        this.echo = echo;
        this.echo.out = "";
        this.send = send;
        this.var_dump = var_dump;

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

        this._getBrowserVersion = _getBrowserVersion;
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

        var parts = req.headers.host.split(":"),
            queryparts = req.url.split("?"),
            query = queryparts.length > 1 ? queryparts.splice(1).join('?') : "",
            protocol = "http" + (req.connection.encrypted ? "s" : ""),
            cookies = (req.headers.cookie || "").split('; '),
            hash = "";

        for (var i = 0, len = cookies.length; i < len; i++) {
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
        };
        this.navigator = {userAgent: req.headers['user-agent'], platform: req.headers['user-agent']};

        this.PAGE_NAME = (function () {
            var pn = self.$l.href.substring(self.$l.href.lastIndexOf('/') + 1).replace(/([^#^?]*).*/gi, '$1');
            return !pn || !~pn.indexOf('.') ? "index.html" : pn;
        })();
        this.PAGE_NAME_RAW = (function () {
            var pn = self.$l.href.substring(self.$l.href.lastIndexOf('/') + 1).replace(/(.*)?\?.*/gi, '$1');
            return !pn || !~pn.indexOf('.') ? "index.html" : pn;
        })();
        this.PROTOCOL = self.$l.protocol;
        this.SERVER = self.$l.host;
        this.SERVER_PATH = self.$l.pathname;
        this.REFERER = req.headers.referer;
        this.ORIGIN = req.headers.origin;
        this.PRAGMA = req.headers.pragma;
        this.ACCEPT_ENCODING = req.headers["accept-encoding"];
        this.ACCEPT_LANGUAGE = req.headers["accept-language"];
        this.REFERER_IP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        this.PUBLIC_IP = $c.PUBLIC_IP;
        this.LOCAL_IP = $c.LOCAL_IP;

        var _ie = this.IEVersion(), _chrm = this.ChromeVersion(), _ff = this.FirefoxVersion(), _op = this.OperaVersion(), _saf = this.SafariVersion(),
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
        this.CLICK = $c.CLICK;
        this.CORES_SUPPORT = true;
        this.DEBUG_MODE = $c.DEBUG_MODE = $c.DEBUG_MODE || !!this.$GET("debug");
        this.EXPOSE_ROUTE_API = $c.EXPOSE_ROUTE_API;
        this.FIREFOX = this.isFirefox();
        this.FIREFOX_VERSION = this.FirefoxVersion();
        this.FIREFOX = this.isFirefox();
        this.GEKKO = this.isGecko();
        this.HANDPOINT = $c.HANDPOINT;
        this.HIDDEN = $c.HIDDEN;
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
        this.ONMOUSEDOWN = $c.ONMOUSEDOWN;
        this.ONMOUSEUP = $c.ONMOUSEUP;
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
        this.POINTER = $c.POINTER;
        this.PRESTO = this.isPresto();
        this.PRINCE = this.isPrince();
        this.PROTOCOL = this.$l.protocol;
        this.RESPONSES = $c.RESPONSES;
        this.REST_API_TEMPLATE = $c.REST_API_TEMPLATE;
        this.ROUTE_API_PATH = $c.ROUTE_API_PATH;
        this.ROUTE_LOGO_URL = $c.ROUTE_LOGO_URL || "http://www.craydent.com/craydent-logo.svg";
        this.SAFARI = this.isSafari();
        this.SAFARI_VERSION = this.SafariVersion();
        this.SERVER = this.$l.host;
        this.SERVER_PATH = this.$l.pathname;
        this.SYMBIAN = this.isSymbian();
        this.TEMPLATE_VARS = $c.TEMPLATE_VARS;
        this.TEMPLATE_TAG_CONFIG = $c.TEMPLATE_TAG_CONFIG;
        this.TRIDENT = this.isTrident();
        this.VERBOSE_LOGS = $c.VERBOSE_LOGS;
        this.VERSION = $c.VERSION;
        this.VISIBLE = $c.VISIBLE;
        this.WAIT = $c.WAIT;
        this.WEBKIT = this.isWebkit();
        this.WINDOWS = this.isWindows();
        this.WINDOWS_MOBILE = this.isWindowsMobile();

        return this;
    }

    Craydent.globalize = function () {
    /*|{
        "info": "Module method to globalize functions",
        "category": "Module",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#array.innerJoin",
        "returnType": "(Array)"
    }|*/
        try {
            __contextualizeMethods($g);
        } catch (e) {
            error('globalize', e);
        }
    };
    __contextualizeMethods(Craydent);

    Craydent.CLICK = $c.CLICK || "click";
    Craydent.DEBUG_MODE = $c.DEBUG_MODE || !!$GET("debug");
    Craydent.EXPOSE_ROUTE_API = $c.EXPOSE_ROUTE_API;
    Craydent.HANDPOINT = $c.HANDPOINT || "pointer";
    Craydent.HIDDEN = $c.HIDDEN || "hidden";
    Craydent.HTTP_STATUS_TEMPLATE = $c.HTTP_STATUS_TEMPLATE || [];
    Craydent.POINTER = $c.POINTER || "default";
    Craydent.RESPONSES = {
        100:{"status":100,"success":true,"message":"Continue"},
        101:{"status":101,"success":true,"message":"Switching Protocols"},
        102:{"status":102,"success":true,"message":"Processing"},

        200:{"status":200,"success":true,"message":"OK"},
        201:{"status":201,"success":true,"message":"Created"},
        202:{"status":202,"success":true,"message":"Accepted"},
        203:{"status":203,"success":true,"message":"Non-Authoritative Information"},
        204:{"status":204,"success":true,"message":"No Content"},
        205:{"status":205,"success":true,"message":"Reset Content"},
        206:{"status":206,"success":true,"message":"Partial Content"},
        207:{"status":207,"success":true,"message":"Multi-Status"},
        208:{"status":208,"success":true,"message":"Already Reported"},
        226:{"status":226,"success":true,"message":"IM Used"},

        300:{"status":300,"success":true,"message":"Multiple Choices"},
        301:{"status":301,"success":true,"message":"Moved Permanently"},
        302:{"status":302,"success":true,"message":"Found"},
        303:{"status":303,"success":true,"message":"See Other"},
        304:{"status":304,"success":true,"message":"Not Modified"},
        305:{"status":305,"success":true,"message":"Use Proxy"},
        306:{"status":306,"success":true,"message":"Unused"},
        307:{"status":307,"success":true,"message":"Temporary Redirect"},
        308:{"status":308,"success":true,"message":"Permanent Redirect"},

        400:{"status":400,"success":false,"message":"Bad Request"},
        401:{"status":401,"success":false,"message":"Unauthorized"},
        402:{"status":402,"success":false,"message":"Payment Required"},
        403:{"status":403,"success":false,"message":"Forbidden"},
        404:{"status":404,"success":false,"message":"Not Found"},
        405:{"status":405,"success":false,"message":"Method Not Allowed"},
        406:{"status":406,"success":false,"message":"Not Acceptable"},
        407:{"status":407,"success":false,"message":"Proxy Authentication Required"},
        408:{"status":408,"success":false,"message":"Request Timeout"},
        409:{"status":409,"success":false,"message":"Conflict"},
        410:{"status":410,"success":false,"message":"Gone"},
        411:{"status":411,"success":false,"message":"Length Required"},
        412:{"status":412,"success":false,"message":"Precondition Failed"},
        413:{"status":413,"success":false,"message":"Request Entity Too Large"},
        414:{"status":414,"success":false,"message":"Request-URI Too Long"},
        415:{"status":415,"success":false,"message":"Unsupported Media Type"},
        416:{"status":416,"success":false,"message":"Requested Range Not Satisfiable"},
        417:{"status":417,"success":false,"message":"Expectation Failed"},
        418:{"status":418,"success":false,"message":"I'm a teapot"},
        420:{"status":420,"success":false,"message":"Enhanced Your Calm"},
        422:{"status":422,"success":false,"message":"Unprocessable Entity"},
        423:{"status":423,"success":false,"message":"Locked"},
        424:{"status":424,"success":false,"message":"Failed Dependency"},
        425:{"status":425,"success":false,"message":"Reserved for WebDAV"},
        426:{"status":426,"success":false,"message":"Upgrade Required"},
        428:{"status":428,"success":false,"message":"Precondition Required"},
        429:{"status":429,"success":false,"message":"Too Many Requests"},
        431:{"status":431,"success":false,"message":"Request Header Fields Too Large"},
        444:{"status":444,"success":false,"message":"No Response"},
        449:{"status":449,"success":false,"message":"Retry With"},
        450:{"status":450,"success":false,"message":"Blocked By Windows Parental Controls"},
        451:{"status":451,"success":false,"message":"Unavailable For Legal Reasons"},
        499:{"status":499,"success":false,"message":"Client Closed Request"},

        500:{"status":500,"success":false,"message":"Internal Server Error"},
        501:{"status":501,"success":false,"message":"Not Implemented"},
        502:{"status":502,"success":false,"message":"Bad Gateway"},
        503:{"status":503,"success":false,"message":"Service Unavailable"},
        504:{"status":504,"success":false,"message":"Gateway Timeout"},
        505:{"status":505,"success":false,"message":"HTTP Version Not Supported"},
        506:{"status":506,"success":false,"message":"Variant Also Negotiates"},
        507:{"status":507,"success":false,"message":"Insufficient Storage"},
        508:{"status":508,"success":false,"message":"Loop Detected"},
        509:{"status":509,"success":false,"message":"Bandwidth Limit Exceeded"},
        510:{"status":510,"success":false,"message":"Not Extended"},
        511:{"status":511,"success":false,"message":"Network Authentication Require"},
        598:{"status":598,"success":false,"message":"Network read timeout error"},
        599:{"status":599,"success":false,"message":"Network connect timeout error"}
    };
    Craydent.REST_API_TEMPLATE = $c.REST_API_TEMPLATE || "<html><head></head><body>" +
        "<h1>Routes:</h1>" +
        "<h2>All -> </h2>" +
        "<div>" +
        "	${FOREACH ${route} in ${get}}" +
        "		<div>${route.path}</div>" +
        "		<div>" +
        "			${FOREACH ${parameter} in ${route.parameters}}" +
        "				<div>Name: ${parameter.name}<br />Description: ${parameter.description}<br />Type: ${parameter.type}<br />Required: ${parameter.required}</div>" +
        "			${END FOREACH}" +
        "		</div>" +
        "	${END FOREACH}" +
        "</div>"+
        "</body></html>";
    Craydent.ROUTE_API_PATH = $c.ROUTE_API_PATH || '/craydent/api/docs';
    Craydent.ROUTE_LOGO_URL = $c.ROUTE_LOGO_URL || "http://www.craydent.com/craydent-logo.svg";
    Craydent.TEMPLATE_VARS = $c.TEMPLATE_VARS || [];
    Craydent.TEMPLATE_TAG_CONFIG = $c.TEMPLATE_TAG_CONFIG || {
        IGNORE_CHARS: ['\n'],
        /* loop config */
        FOR: {
            "begin": /(?:\$\{for (.*?);(.*?);(.*?\}?)\})|(?:\{\{for (.*?);(.*?);(.*?\}?)\}\})/i,
            "end": /(\$\{end for\})|(\{\{end for\}\})/i,
            "helper": function (code, body) {
                var ttc = $c.TEMPLATE_TAG_CONFIG,
                    mresult = code.match(ttc.FOR.begin),
                    condition, exec, dvars, vars = "", ovars = {}, code_result = "";

                for (var j = 1, jlen = mresult.length; j < jlen; j++) {
                    if (!mresult[j]) { continue; }
                    mresult[j] = $c.replace_all(mresult[j],['\\[', '\\]'], ['[', ']']).toString();
                }

                condition = ttc.VARIABLE_NAME(mresult[2] || mresult[5] || "");
                exec = ttc.VARIABLE_NAME(mresult[3] || mresult[6] || "");
                dvars = ttc.VARIABLE_NAME(mresult[1] || mresult[4] || "").split(',');

                for (var i = 0, len = dvars.length; i < len; i++) {
                    var dvar = dvars[i];
                    var parts = dvar.split('=');
                    vars += "var " + parts[0] + "=" + parts[1] + ";";
                    ovars[parts[0]] = parts[0];
                }
                eval(vars);
                while (eval(fillTemplate(condition, ovars))) {
                    code_result += "${i=" + i + ",''}" + body;
                    eval(exec);
                }

                return code_result;
            },
            "parser": function (code, oobj, bind) {
                var ttc = $c.TEMPLATE_TAG_CONFIG,
                    FOR = ttc.FOR,
                    blocks = __processBlocks(FOR.begin, FOR.end, code),
                    code_result = "",
                    i = 0, obj;

                while (obj = blocks[i++]) {
                    var block = obj.block,
                        id = obj.id;

                    code_result = code_result || obj.code;
                    if (!~code_result.indexOf(obj.id)) { continue; }
                    code_result = $c.replace_all(code_result,id, FOR.helper(block, obj.body));
                }
                var ____execMatches = code_result.match($c.TEMPLATE_TAG_CONFIG.VARIABLE), ____execMatchIndex = 0;

                while (____execMatchIndex < ____execMatches.length) {
                    code_result = code_result.replace(____execMatches[____execMatchIndex],$c.tryEval(ttc.VARIABLE_NAME(____execMatches[____execMatchIndex])));
                    ____execMatchIndex++;
                }
                if (code == code_result) { code_result = ""; }
                return __logic_parser(code_result);
            }
        },
        FOREACH: {
            "begin": /(?:\$\{foreach (.*?)\s+in\s+(.*?)\s*\})|(?:\{\{foreach (.*?)\s+in\s+(.*?)\s*\}\})/i,
            "end": /(?:\$\{end foreach\})|(?:\{\{end foreach\}\})/i,
            "helper": function (code, body, rtnObject, uid, obj, bind, ref_obj) {
                var ttc = $c.TEMPLATE_TAG_CONFIG,
                    FOREACH = ttc.FOREACH,
                    mresult = code.match(FOREACH.begin),
                    objs, var_name,
                    code_result = "";

                for (var j = 0, jlen = mresult.length; j < jlen; j++) {
                    if (!mresult[j]) { continue; }
                    mresult[j] = $c.replace_all(mresult[j],['\\[', '\\]'], ['[', ']']).toString();
                }
                var value = mresult[2] || mresult[4];
                objs = $c.tryEval(value);
                if (!objs && $c.startsWithAny(value, "${","{{") && !value.endsWith("}")) {
                    return code;
                }
                var_name = ttc.VARIABLE_NAME(mresult[1] || mresult[3]);


                rtnObject = rtnObject || {};
                var vname = var_name + suid();
                rtnObject[uid] += "var " + vname + "s," + var_name + ";";
                rtnObject[vname + "s"] = objs;
                if ($c.isArray(objs)) {
                    var i = 0, len = objs.length;
                    while (i < len) {
                        code_result += "${i=" + i + "," + var_name + "=" + vname + "s[i],null}" + body;
                        i++;
                    }
                }

                return objs ? code_result : "";

            },
            "parser": function (code, ref_obj, bind) {
                var ttc = $c.TEMPLATE_TAG_CONFIG,
                    FOREACH = ttc.FOREACH,
                    uid = "##" + suid() + "##",
                    result_obj = {},
                    code_result = "", post = "",
                    blocks = __processBlocks(FOREACH.begin, FOREACH.end, code),
                    i = 0, obj;

                result_obj[uid] = "";

                while (obj = blocks[i++]) {
                    var block = obj.block,
                        id = obj.id, index;
                    if (i == 1 && ~(index = obj.code.lastIndexOf("##"))) {
                        post = obj.code.substring(index + 2);
                        obj.code = obj.code.substring(0, index + 2);
                    }
                    code_result = code_result || obj.code;
                    if (!~code_result.indexOf(obj.id)) { continue; }
                    code_result = $c.replace_all(code_result,id, FOREACH.helper(block, obj.body, result_obj, uid, obj, bind, ref_obj));
                    if (!code_result) { break; }
                }
                eval(result_obj[uid]);
                delete result_obj[uid];
                for (var prop in result_obj) {
                    if (!result_obj.hasOwnProperty(prop)) { continue; }
                    eval(prop + "=" + "result_obj['" + prop + "']");
                }

                var matches = code_result.match(ttc.VARIABLE) || [];
                for (var m = 0, mlen = matches.length; m < mlen; m++) {
                    var var_match = matches[m];
                    var var_match_name = ttc.VARIABLE_NAME(var_match),
                        str = "";
                    try {
                        str = eval(var_match_name);
                    } catch (e) { continue; }
                    if ($c.isObject(str) || $c.isArray(str)) {
                        str = "fillTemplate.refs['" + __add_fillTemplate_ref(str) + "']";
                    }
                    code_result = code_result.replace(var_match, str || "");
                }
                if (code == code_result + post) { code_result = ""; }
                return __logic_parser(code_result + post, obj, bind);
            }
        },
        WHILE: {
            "begin": /(?:\$\{while\s*\((.*?)\)\s*\})|(?:\{\{while\s*\((.*?)\)\s*\}\})/i,
            "end": /(?:\$\{end while\})|(?:\{\{end while\}\})/i,
            "helper": function (code, body) {
                var ttc = $c.TEMPLATE_TAG_CONFIG,
                    WHILE = ttc.WHILE,
                    mresult = code.match(WHILE.begin),
                    vars = "", ovars = {}, code_result = "",
                    declared = fillTemplate.declared,
                    loop_limit = 100000;
                for (var prop in declared) {
                    if (!declared.hasOwnProperty(prop) || !~code.indexOf("${" + prop + "}")) {
                    // if (!~code.indexOf("${" + prop + "}") || !declared.hasOwnProperty(prop)) {
                        continue;
                    }
                    var val = declared[prop];
                    vars += "var " + prop + "=" + val + ";";
                    ovars[prop] = prop;
                }
                eval(vars);
                while (eval(fillTemplate(mresult[1] || mresult[2], ovars))) {
                    loop_limit--;
                    if (loop_limit < 1) {
                        var msg = "fillTemplate While only support up to 100,000 iterations.  Possible infinite loop?";
                        console.error(msg);
                        throw msg;
                    }
                    code_result += body;
                    var matches = body.match(ttc.VARIABLE) || [];
                    for (var m = 0, mlen = matches.length; m < mlen; m++) {
                        eval(ttc.VARIABLE_NAME(matches[m]));
                    }
                }
                fillTemplate.declared = declared;

                var variable_initialization = "";
                for (var prp in ovars) {
                    if (!ovars.hasOwnProperty(prp)) { continue; }
                    variable_initialization += "${" + prp + "=" + declared[prp] + ",null}";
                }

                return variable_initialization + code_result;
            },
            "parser": function (code, ref_obj, bind) {
                var ttc = $c.TEMPLATE_TAG_CONFIG,
                    WHILE = ttc.WHILE,
                    lookups = {},
                    blocks = __processBlocks(WHILE.begin, WHILE.end, code, lookups),
                    code_result = "", vars = "", declared = fillTemplate.declared, post = "",
                    i = 0, obj;

                while (obj = blocks[i++]) {
                    var block = obj.block,
                        id = obj.id, index;

                    if (i == 1 && ~(index = obj.code.lastIndexOf("##"))) {
                        post = obj.code.substring(index + 2);
                        obj.code = obj.code.substring(0, index + 2);
                    }

                    code_result = code_result || obj.code;
                    if (!~code_result.indexOf(obj.id)) { continue; }
                    code_result = $c.replace_all(code_result,id, WHILE.helper(block, obj.body));
                }

                for (var prop in declared) {
                    if (!declared.hasOwnProperty(prop) || !~code.indexOf("${" + prop + "}")) { continue; }
                    vars += "var " + prop + "=" + declared[prop] + ";";
                }
                eval(vars);
                var matches = code_result.match(ttc.VARIABLE) || [];
                for (var m = 0, mlen = matches.length; m < mlen; m++) {
                    var var_match = matches[m],
                        var_match_name = ttc.VARIABLE_NAME(var_match),
                        var_match_index = code_result.indexOf(var_match),
                        before, after;
                    if (tryEval(var_match_name + ";") !== null) {
                        var_match_index += var_match.length;
                    }

                    before = $c.replace_all(code_result.substring(0, var_match_index),var_match, eval(var_match_name));
                    after = code_result.substring(code_result.indexOf(var_match) + var_match.length);
                    code_result = before + after;
                }
                if (code == code_result + post) { code_result = ""; }
                return __logic_parser(code_result + post);

            }
        },
        /* end loop config*/

        /* conditional config*/
        IF: {
            "begin": /\$\{if\s+\((.*?)(?!\{)\)\s*\}|\{\{if\s+\((.*?)(?!\{)\)\s*\}\}/i,
            "elseif": /\$\{elseif\s+\((.*?)(?!\{)\)\s*\}|\{\{elseif\s+\((.*?)(?!\{)\)\s*\}\}/i,
            "else": /\$\{else\}|\{\{else\}\}/i,
            "end": /\$\{end if\}|\{\{end if\}\}/i,
            "helper": function (code) {
                var IF = $c.TEMPLATE_TAG_CONFIG.IF,
                    ifmatch = $c.condense((code.match(IF.begin) || [])),
                    endlength = code.match(IF.end)[0].length,
                    startindex = $c.indexOfAlt(code,IF.begin),
                    endindex = $c.indexOfAlt(code,IF.end),
                    vsyntax = $c.TEMPLATE_TAG_CONFIG.VARIABLE;

                if (ifmatch.length) {
                    for (var j = 1, jlen = ifmatch.length; j < jlen; j++) {
                        var ifm = ifmatch[j];
                        ifmatch[j] = $c.replace_all(ifm,['\\[', '\\]'], ['[', ']']).toString();
                    }
                    var pre = code.substring(0, startindex), post = code.substring(endindex + endlength),
                        ifsyntax = new RegExp(IF.begin.source + "|" + IF.elseif.source + "|" + IF["else"].source, 'i');

                    if (!code.match(new RegExp(IF.elseif.source + "|" + IF["else"].source, 'ig'))) {
                        if ("undefined" == ifmatch[1] || !$c.tryEval(ifmatch[1])) {
                            return pre + post;
                        }
                        return pre + code.substring(startindex + ifmatch[0].length, endindex) + post;
                    }
                    ifmatch = $c.condense((code.match($c.addFlags(ifsyntax,'g')) || []));
                    for (var i = 0, len = ifmatch.length; i < len; i++) {
                        var ifm2 = ifmatch[i],
                            ife = $c.condense(ifm2.match(ifsyntax)),
                            condition = ife[1],
                            value = "undefined" == condition ? false : $c.tryEval(condition),
                            sindex = code.indexOf(ifm2) + ifm2.length;

                        if (condition && condition.length && condition != 'null' && !$c.contains(condition, vsyntax) && value === null) {
                            value = condition;
                        }

                        if (value !== undefined && value) {
                            var eindex = code.indexOf(ifmatch[i + 1]);
                            if (!~eindex) {
                                return pre + code.substring(sindex, endindex) + post;
                            }
                            return pre + code.substring(sindex, eindex) + post;
                        } else if (ifm2.match(IF["else"])) {
                            return pre + code.substring(sindex, endindex) + post;
                        }
                    }
                    return pre + post;
                }
                return code;
            },
            "parser": function (code, oobj, bind) {
                var IF = $c.TEMPLATE_TAG_CONFIG.IF,
                    blocks = __processBlocks(IF.begin, IF.end, code),
                    code_result = "",
                    i = 0, obj;
                while (obj = blocks[i++]) {
                    var block = obj.block,
                        id = obj.id;

                    code_result = code_result || obj.code;
                    if (!~code_result.indexOf(obj.id)) { continue; }
                    code_result = IF.helper(code_result.replace(id, block));
                }
                if (code == code_result) { code_result = ""; }
                return __logic_parser(code_result);
            }
        },
        SWITCH: {
            "begin": /(\$\{switch\s+\((.*?)\)\s*\})|(\{\{switch\s+\((.*?)\)\s*\}\})/i,
            "end": /(\$\{end switch\})|(\{\{end switch\}\})/i,
            "case": /(?:\$\{case\s+(.*?)\s*?:\})|(?:\{\{case\s+(.*?)\s*?:\}\})/i,
            "default": /(\$\{default\})|(\{\{default\}\})/i,
            "break": /(\$\{break\})|(\{\{break\}\})/i,
            "helper": function (code) {
                var SWITCH = $c.TEMPLATE_TAG_CONFIG.SWITCH,
                    switchmatch = $c.condense((code.match(SWITCH.begin) || [])),
                    endlength = code.match(SWITCH.end)[0].length,
                    startindex = $c.indexOfAlt(code, SWITCH.begin),
                    endindex = $c.indexOfAlt(code,SWITCH.end),
                    brk = SWITCH["break"], dflt = SWITCH["default"];


                if (switchmatch.length) {
                    for (var j = 1, jlen = switchmatch.length; j < jlen; j++) {
                        var swmatch = switchmatch[j];
                        switchmatch[j] = $c.replace_all(swmatch,['\\[', '\\]'], ['[', ']']).toString();
                    }
                    var pre = code.substring(0, startindex), post = code.substring(endindex + endlength),
                        val = $c.tryEval(switchmatch[2]) || switchmatch[2],
                        cgsyntax = $c.addFlags(SWITCH["case"],"g"),
                        cases = code.match(cgsyntax);
                    code = code.substring(startindex + (switchmatch[0] || "").length, endindex);

                    if (!cases) {
                        return pre + $c.cut(code,tartindex, endindex + endlength) + post;
                    }
                    for (var i = 0, len = cases.length; i < len; i++) {
                        var cse = cases[i],
                            cs = cse.match(SWITCH["case"]),
                            cvalue = cs[1] || cs[2];
                        cvalue = $c.tryEval(cvalue) || cvalue;
                        if (val == cvalue) {
                            var cindex = code.indexOf(cse),
                                bindex = $c.indexOfAlt(code,brk, cindex);
                            bindex = !~bindex ? code.length : bindex;
                            return pre + code.substring(cindex + cse.length, bindex).replace(cgsyntax, '') + post;
                        }
                    }
                    var dindex = $c.indexOfAlt(code,dflt);
                    if (~dindex) {
                        return pre + code.substring(dindex + code.match(dflt)[0].length).replace(cgsyntax, '').replace(brk, '') + post;
                    }

                }
                return code;
            },
            "parser": function (code, oobj, bind) {
                var SWITCH = $c.TEMPLATE_TAG_CONFIG.SWITCH,
                    blocks = __processBlocks(SWITCH.begin, SWITCH.end, code),
                    code_result = "", i = 0, obj;
                while (obj = blocks[i++]) {
                    var block = obj.block,
                        id = obj.id;

                    code_result = code_result || obj.code;
                    if (!~code_result.indexOf(obj.id)) { continue; }
                    code_result = SWITCH.helper(code_result.replace(id, block));
                }
                if (code == code_result) { code_result = ""; }
                return __logic_parser(code_result);
            }

        },
        /* end conditional config*/

        /* error handling and execution config */
        SCRIPT: {
            "begin": /(\$\{script\})|(\{\{script\}\})/i,
            "end": /(\$\{end script\})|(\{\{end script\}\})/i,
            "parser": function (code, obj, bind) {
                var SCRIPT = $c.TEMPLATE_TAG_CONFIG.SCRIPT,
                    sindex = $c.indexOfAlt(code,SCRIPT.begin),
                    slen = code.match(SCRIPT.begin)[0].length,
                    eindex = $c.indexOfAlt(code,SCRIPT.end),
                    elen = code.match(SCRIPT.end)[0].length;

                if (!~eindex) {
                    eindex = undefined;
                }
                var block = code.substring(sindex + slen, eindex),
                    echo = function (value) {
                        echo.out += value;
                    };
                echo.out = "";
                str = eval("(function(){" + block + ";return echo.out;})()");

                return __logic_parser($c.cut(code,sindex, eindex + elen, str));
            }

        },
        TRY: {
            "begin": /(\$\{try\})|(\{\{try\}\})/i,
            "catch": /(?:\$\{catch\s+\((.*)?\)\s*\})|(?:\{\{catch\s+\((.*)?\)\s*\}\})/i,
            "finally": /(\$\{finally\})|(\{\{finally\}\})/i,
            "end": /(\$\{end try\})|(\{\{end try\}\})/i,
            "helper": function (code, lookups, exec) {
                var TRY = $c.TEMPLATE_TAG_CONFIG.TRY,
                    cindex = $c.indexOfAlt(code,TRY["catch"]),
                    findex = $c.indexOfAlt(code,TRY["finally"]),
                    eindex = $c.indexOfAlt(code,TRY["end"]),
                    tend = cindex;

                if (!~tend) {
                    tend = ~findex ? findex : eindex;
                }

                var tindex = $c.indexOfAlt(code,TRY.begin),
                    body = code.substring(tindex + code.match(TRY.begin)[0].length, tend),
                    pre = code.substring(0, tindex), post = code.substring(eindex + code.match(TRY.end)[0].length),
                    regex = /##[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}##/i,
                    match = body.match(regex), str = "", id,
                    echo = function (value) {
                        echo.out += value;
                    };
                echo.out = "";
                while (match && match.length) {
                    id = match.splice(0)[0];
                    body = body.replace(id, ";echo('" + TRY.helper(lookups[id], lookups) + "');");
                }
                match = pre.match(regex);
                while (match && match.length) {
                    id = match.splice(0)[0];
                    pre = pre.replace(id, TRY.helper(lookups[id], lookups));
                }
                match = post.match(regex);
                while (match && match.length) {
                    id = match.splice(0)[0];
                    post = post.replace(id, TRY.helper(lookups[id], lookups));
                }
                exec && eval(exec);
                try {
                    str = eval("(function(){" + body + ";return echo.out; })()");
                } catch (e) {
                    if (~cindex) {
                        tend = ~findex ? findex : eindex;
                        var catchBlock = code.substring(cindex, tend),
                            catchLine = catchBlock.match(TRY["catch"]),
                            errorString = $c.replace_all(e.toString(),'\'','\\\'');
                        catchBlock = catchBlock.replace(catchLine[0], '');

                        match = catchBlock.match(regex);
                        while (match && match.length) {
                            id = match.splice(0)[0];
                            catchBlock = catchBlock.replace(id, ";echo('" + TRY.helper(lookups[id], lookups, "var " + catchLine[1] + "= new Error('" + errorString + "');") + "');");
                        }
                        str += eval("(function(" + catchLine[1] + "){" + catchBlock + ";return echo.out;})(new Error('" + errorString + "'))");
                    }
                } finally {
                    if (~findex) {
                        echo.out = "";
                        str += eval("(function(){" + code.substring(findex + code.match(TRY["finally"])[0].length, eindex) + ";return echo.out; })()");
                    }
                }
                return pre + str + post;
            },
            "parser": function (code, oobj, bind) {
                var TRY = $c.TEMPLATE_TAG_CONFIG.TRY,
                    lookups = {},
                    blocks = __processBlocks(TRY.begin, TRY.end, code, lookups);

                var obj = blocks[0],
                    block = obj.block,
                    id = obj.id;

                return __logic_parser(TRY.helper(obj.code.replace(id, block), lookups));
            }

        },
        /* end error handling config */

        /* tokens config */
        VARIABLE: /(?:\$\{((?!\$)\S)*?\})|(?:\{\{((?!\{\{)\S)*?\}\})/gi,
        VARIABLE_NAME: function (match) {
            return match.slice(2, ~match.indexOf('}}') ? -2 : -1);
        },
        DECLARE: {
            "syntax": /(?:\$\{declare (.*?);?\})|(?:\{\{declare (.*?);?\}\})/i,
            "parser": function (htmlTemplate, declare) {
                var matches = declare.match($c.TEMPLATE_TAG_CONFIG.DECLARE.syntax);
                /*,
                 var_nameValue = (matches[1]||matches[2]).strip(';').split("=");

                 fillTemplate.declared[var_nameValue[0]] = var_nameValue[1];*/
                $c.merge(fillTemplate.declared, tryEval("({" + $c.replace_all(matches[1],'=', ":") + "})"));
                return $c.replace_all(htmlTemplate,declare, '');
            }
        }
        /* end tokens config */
    };
    Craydent.VERBOSE_LOGS = $c.VERBOSE_LOGS || !!$GET("verbose");
    Craydent.VERSION = _craydent_version;
    Craydent.VISIBLE = $c.VISIBLE || "visible";
    Craydent.WAIT = $c.WAIT || "wait";
    module.exports = $c = $g.$c = Craydent;
}
var _ao, _df;

/*----------------------------------------------------------------------------------------------------------------
 /-	define functions preventing overwriting other framework functions
 /---------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------
 /-	private methods
 /---------------------------------------------------------------------------------------------------------------*/
function __add_fillTemplate_ref (obj){
    try {
        var uid = suid();
        fillTemplate.refs["ref_" + fillTemplate.refs.length] = uid;
        fillTemplate.refs[uid] = obj;
        fillTemplate.refs.push(obj);
        return uid;
    } catch (e) {
        error('fillTemplate.__add_fillTemplate_ref', e);
    }
}
function __and (){
    try {
        var a = 0;
        for (len = arguments.length; a < len; a++) {
            var arg = arguments[a];
            if (!arg) { return ""; }
        }
        return arguments[a - 1];
    } catch (e) {
        error('fillTemplate.__and', e);
    }
}
function __contextualizeMethods (ctx) {
    try {
        ctx = ctx || {};
        ctx.Benchmarker = Benchmarker;
        ctx.CLI = CLI;
        ctx.Cursor = Cursor;
        ctx.JSONPA = JSON.parseAdvanced;
        ctx.JSONSA = JSON.stringifyAdvanced;
        ctx.JSZip = JSZip;
        ctx.OrderedList = OrderedList;
        ctx.Queue = Queue;
        ctx.Set = Set;
        ctx.addObjectPrototype = addObjectPrototype;
        ctx.ajax = ajax;
        ctx.awaitable = yieldable;
        ctx.catchAll = catchAll;
        ctx.clearCache = clearCache;
        ctx.clusterit = clusterit;
        ctx.cout = cout;
        ctx.createServer = createServer;
        ctx.cuid = cuid;
        ctx.emit = emit;
        ctx.error = error;
        ctx.exclude = exclude;
        ctx.fillTemplate = fillTemplate;
        ctx.foo = foo;
        ctx.include = include;
        ctx.isNull = isNull;
        ctx.logit = logit;
        ctx.md5 = md5;
        ctx.mkdirRecursive = mkdirRecursive;
        ctx.namespace = namespace;
        ctx.next = next;
        ctx.noop = foo;
        ctx.now = now;
        ctx.parseBoolean = parseBoolean;
        ctx.parseRaw = parseRaw;
        ctx.rand = rand;
        ctx.requireDirectory = requireDirectory;
        ctx.suid = suid;
        ctx.syncroit = syncroit;
        ctx.tryEval = tryEval;
        ctx.wait = wait;
        ctx.xmlToJson = xmlToJson;
        ctx.yieldable = yieldable;
        ctx.zipit = zipit;

        return ctx;
    } catch (e) {
        error('__contextualizeMethods', e);
    }
}
function __convert_regex_safe(reg_str) {
    try {
        return reg_str.replace(/\\/gi,"\\\\")
            .replace(/\$/gi, "\\$")
            .replace(/\//gi, "\\/")
            .replace(/\^/gi, "\\^")
            .replace(/\./gi, "\\.")
            .replace(/\|/gi, "\\|")
            .replace(/\*/gi, "\\*")
            .replace(/\+/gi, "\\+")
            .replace(/\?/gi, "\\?")
            .replace(/\!/gi, "\\!")
            .replace(/\{/gi, "\\{")
            .replace(/\}/gi, "\\}")
            .replace(/\[/gi, "\\[")
            .replace(/\]/gi, "\\]")
            .replace(/\(/gi, "\\(")
            .replace(/\)/gi, "\\)")
            .replace('\n','\\n');
    } catch (e) {
        error('__convert_regex_safe', e);
    }
}
function __count(arr){
    try {
        return arr.length;
    } catch (e) {
        error('fillTemplate.count', e);
    }
}
function __enum(obj, delimiter, prePost){
    try {
        delimiter = delimiter || ", ";
        prePost = prePost || ["",""];
        var props = [],
            str = "";
        if ($c.isArray(obj)) {
            props = obj.slice(0);
        } else if ($c.isObject(obj)) {
            for (var prp in obj) {
                if (obj.hasOwnProperty(prp)) {
                    props.push(prp);
                }
            }
        }
        for (var i = 0, len = props.length; i < len; i++) {
            var prop = props[i];
            var pre = $c.replace_all(prePost[0],['{ENUM_VAR}','{ENUM_VAL}'],[prop,obj[prop]]),
                post = $c.replace_all(prePost[1],['{ENUM_VAR}','{ENUM_VAL}'],[prop,obj[prop]]);
            str += pre + prop + post + delimiter;
        }
        return str.slice(0,-1*delimiter.length);
    } catch (e) {
        error('fillTemplate.enum', e);
    }
}
function __logic_parser (code, obj, bind) {
    if (!code) { return ""; }
    var ttc = $c.TEMPLATE_TAG_CONFIG, indexes = [], logic = {};
    code = $c.replace_all(code,ttc.IGNORE_CHARS,['']);
    $c.eachProperty(ttc, function (value) {
        if (!value.begin) { return; }
        var index = $c.indexOfAlt(code,value.begin);
        indexes.push(index);
        logic[index] = value;
    });
    var index = Math.min.apply(Math,$c.condense(indexes,[-1]));

    if (!logic[index]) { return code; }

    return code.substring(0,index) + logic[index].parser(code.substring(index),obj, bind);
}
function __or (){
    try {
        for (var a = 0, len = arguments.length; a < len; a++) {
            var arg = arguments[a];
            if(arg){ return arg; }
        }
        return "";
    } catch (e) {
        error('fillTemplate.__or', e);
    }
}
function __processBlocks (start, end, code, lookups) {
    lookups = lookups || {};
    var blocks = [], sindexes = [], sindex = 0, eindexes = [], eindex = 0;
    while (~(sindex = $c.indexOfAlt(code,start, sindex)) && ~(eindex = $c.indexOfAlt(code,end, eindex))) {
        ~sindex && (sindexes.push(sindex), sindex++);
        ~eindex && (eindexes.push(eindex), eindex++);
    }
    // if true syntax error, start end missmatch
    if (sindexes.length != eindexes.length) {
        blocks.push({id: "##" + suid() + "##", block: "", body:"", code: code});
        return blocks;
    }

    var pairs = OrderedList([], function (a, b) {
        if (a.end < b.end) { return -1; }
        if (a.end > b.end) { return 1; }
        return 0;
    });

    while (sindexes.length) {
        var e = 0;
        while (eindexes[0] > sindexes[e]) {
            e++;
        }
        e--;
        pairs.add({begin: sindexes[e], end: eindexes[0]});
        $c.removeAt(sindexes,e);
        $c.removeAt(eindexes,0);
    }

    var endlength = code.match(end)[0].length;
    var k = 0, pair;
    while (pair = pairs[k++]) {
        var uid = "##" + suid() + "##",
            block = code.slice(pair.begin, pair.end + endlength),
            beginLength = block.match(start)[0].length,
            body = code.slice(pair.begin + beginLength, pair.end);
        code = code.replace(block, uid);
        blocks.push({id: uid, block: block, body: body, code: code});
        lookups[uid] = block;

        var i = k, pair2;
        while (pair2 = pairs[i++]) {
            var offset = block.length - uid.length;
            pair2.end -= offset;
            if (pair2.begin > pair.end) {
                pair2.begin -= offset;
            }
        }
    }

    return blocks.reverse();
}
function __parseArithmeticExpr (doc,expr,field) 	{
    try {
        var value, i = 0, sexp;
        switch (field) {
            case "$add":
                value = 0;
                while (sexp = expr["$add"][i++]) {
                    value += __processExpression(doc, sexp);
                }
                return value;
            case "$subtract":
                return __processExpression(doc, expr["$subtract"][0]) - __processExpression(doc, expr["$subtract"][1]);
            case "$multiply":
                value = 1;
                while (sexp = expr["$multiply"][i++]) {
                    value *= __processExpression(doc, sexp) || 0;
                }
                return value;
            case "$divide":
                return __processExpression(doc, expr["$divide"][0]) / __processExpression(doc, expr["$divide"][1]);
            case "$mod":
                return __processExpression(doc, expr["$mod"][0]) % __processExpression(doc, expr["$mod"][1]);
        }
    } catch (e) {
        error('aggregate.__parseArithmeticExpr', e);
    }
}
function __parseArrayExpr (doc,expr,field) {
    try {
        switch (field) {
            case "$size":
                return (__processExpression(doc, expr[field], field) || []).length;
        }
    } catch (e) {
        error('aggregate.__parseArrayExpr', e);
    }
}
function __parseBooleanExpr (doc,expr,field) {
    try {
        var arr = [], i = 0, obj;
        switch (field) {
            case "$and":
                arr = expr["$and"];
                while (obj = arr[i++]) {
                    if (!__processExpression(doc, arr)) { return false; }
                }
                return true;
            case "$or":
                arr = expr["$or"];
                while (obj = arr[i++]) {
                    if (__processExpression(doc, arr)) { return true; }
                }
                return false;
            case "$not":
                arr = expr["$not"];
                return !__processExpression(doc, arr[0]);
        }
    } catch (e) {
        error('aggregate.__parseBooleanExpr', e);
    }
}
function __parseComparisonExpr (doc,expr,field) {
    try {
        var sortOrder = [
                undefined,
                null,
                Number,
                typeof Symbol != "undefined" ? Symbol : "Symbol",
                String,
                Object,
                Array,
                typeof BinData != "undefined" ? BinData : "BinData",
                typeof ObjectId != "undefined" ? ObjectId : "ObjectId",
                Boolean,
                Date,
                typeof Timestamp != "undefined" ? Timestamp : "Timestamp",
                RegExp
            ],
            value1 = __processExpression(doc, expr[field][0]),
            value2 = __processExpression(doc, expr[field][1]),
            cmp = null;

        if (value1 == value2) { cmp = 0; }
        if (value1 < value2) { cmp = -1; }
        if (value1 > value2) { cmp = 1; }

        if ($c.isNull(cmp)) {
            value1 = sortOrder.indexOf(~([null, undefined].indexOf(value1)) ? value1 : value1.constructor);
            value2 = sortOrder.indexOf(~([null, undefined].indexOf(value2)) ? value2 : value2.constructor);

            if (value1 < value2) { cmp = -1; }
            if (value1 > value2) { cmp = 1; }
        }
        switch (field) {
            case "$cmp":
                return cmp;
            case "$eq":
                return cmp === 0;
            case "$gt":
                return cmp === 1;
            case "$gte":
                return cmp === 1 || cmp === 0;
            case "$lt":
                return cmp === -1;
            case "$lte":
                return cmp === -1 || cmp === 0;
            case "$ne":
                return cmp !== 0;
        }
    } catch (e) {
        error('aggregate.__parse', e);
    }
}
function __parseCond(doc,expr){
    try {
        if (!$c.isObject(expr) || !expr['$cond']) { return expr; }
        // parse $cond
        var condition = expr['$cond'],
            boolExpression,
            thenStatement,
            elseStatement;
        if ($c.isArray(condition)) {
            boolExpression = condition[0];
            thenStatement = condition[1];
            elseStatement = condition[2];
        } else {
            boolExpression = condition["if"];
            thenStatement = condition["then"];
            elseStatement = condition["else"];
        }
        return __processExpression(doc, boolExpression) ? thenStatement : elseStatement;
    } catch (e) {
        error('aggregate.__parseCond', e);
    }
}
function __parseConditionalExpr (doc,expr,field) {
    try {
        switch (field) {
            case "$cond":
                return __parseCond(doc, expr);
            case "$ifNull":
                var value = __processExpression(doc, expr["$ifNull"][0]);
                return isNull(value,__processExpression(doc, expr["$ifNull"][1]));
        }
    } catch (e) {
        error('aggregate.__parseConditionExpr', e);
    }
}
function __parseDateExpr (doc,expr,field) {
    var dt = __processExpression(doc, expr[field]);
    try {
        switch (field) {
            case "$dayOfYear":
                return dt.getDayOfYear();
            case "$dayOfMonth":
                return dt.getDate();
            case "$dayOfWeek":
                return dt.getDay() + 1;
            case "$year":
                return dt.getFullYear();
            case "$month":
                return dt.getMonth() + 1;
            case "$week":
                return dt.getWeek();
            case "$hour":
                return dt.getHours();
            case "$minute":
                return dt.getMinutes();
            case "$second":
                return dt.getSeconds();
            case "$millisecond":
                return dt.getMilliseconds();
            case "$dateToString":
                dt = __processExpression(doc, expr[field].date);
                return $c.format(dt,expr[field].format);
        }
    } catch (e) {
        error('aggregate.__parseDateExpr', e);
    }
}
function __parseSetExpr (doc,expr,field) {
    try {
        var i = 1, exp, j = 0, jlen, st, set1, set2, rtnSet, errorMessage, arr1, arr2, falseCondition;
        switch (field) {
            case "$setEquals":
                while (exp = expr[field][i++]) {
                    set1 = $c.duplicate(__processExpression(doc, expr[field][i - 2]));
                    set2 = $c.duplicate(__processExpression(doc, exp));
                    if (!$c.isArray(set1) || !$c.isArray(set2)){
                        //noinspection ExceptionCaughtLocallyJS
                        throw "Exception: All operands of $setEquals must be arrays. One argument is of type: " +
                        $c.capitalize(typeof (!$c.isArray(set1) ? set1 : set2));
                    }
                    $c.toSet(set1);
                    $c.toSet(set2);
                    if (set1.length != set2.length) { return false; }
                    for (jlen = set1.length; j < jlen; j++) {
                        if (!~set2.indexOf(set1[j])) { return false; }
                    }
                }
                return true;
            case "$setIntersection":
                rtnSet = $c.duplicate(__processExpression(doc, expr[field][0]));
                errorMessage = "Exception: All operands of $setIntersection must be arrays. One argument is of type: ";
                if(!$c.isArray(rtnSet)) {
                    //noinspection ExceptionCaughtLocallyJS
                    throw errorMessage + $c.capitalize((typeof rtnSet));
                }
                $c.toSet(rtnSet);
                while (exp = expr[field][i++]) {
                    set1 = $c.duplicate(__processExpression(doc, exp));
                    if (!$c.isArray(set1)){
                        //noinspection ExceptionCaughtLocallyJS
                        throw errorMessage + $c.capitalize(typeof set1);
                    }
                    $c.toSet(set1);
                    if (set1.length < rtnSet.length) {
                        var settmp = set1;
                        set1 = rtnSet;
                        rtnSet = settmp;
                    }
                    for (jlen = rtnSet.length; j < jlen; j++) {
                        if (!~set1.indexOf(rtnSet[j])) { $c.removeAt(rtnSet,j--); jlen--; }
                    }
                    if (!rtnSet.length) { return rtnSet; }
                }
                return rtnSet;
            case "$setUnion":
                rtnSet = $c.duplicate(__processExpression(doc, expr[field][0]));
                errorMessage = "Exception: All operands of $setUnion must be arrays. One argument is of type: ";
                if(!$c.isArray(rtnSet)) {
                    //noinspection ExceptionCaughtLocallyJS
                    throw errorMessage + $c.capitalize(typeof rtnSet);
                }
                while (exp = expr[field][i++]) {
                    var arr = $c.duplicate(__processExpression(doc, exp));
                    if (!$c.isArray(arr)){
                        //noinspection ExceptionCaughtLocallyJS
                        throw errorMessage + $c.capitalize(typeof arr);
                    }
                    rtnSet = rtnSet.concat(arr);
                }
                return $c.toSet(rtnSet);
            case "$setDifference":
                arr1 = $c.duplicate(__processExpression(doc, expr[field][0]));
                arr2 = $c.duplicate(__processExpression(doc, expr[field][1]));
                rtnSet = [];
                if (!$c.isArray(arr1) || !$c.isArray(arr2)){
                    //noinspection ExceptionCaughtLocallyJS
                    throw "Exception: All operands of $setEquals must be arrays. One argument is of type: " +
                        $c.capitalize(typeof (!$c.isArray(arr1) ? arr1 : arr2));
                }
                for (jlen = arr1.length; j < jlen; j++) {
                    st = arr1[j];
                    if (!~arr2.indexOf(st) && !~rtnSet.indexOf(st)) {
                        rtnSet.push(st);
                    }
                }
                return rtnSet;
            case "$setIsSubset":
                arr1 = $c.duplicate(__processExpression(doc, expr[field][0]));
                arr2 = $c.duplicate(__processExpression(doc, expr[field][1]));
                rtnSet = [];
                if (!$c.isArray(arr1) || !$c.isArray(arr2)){
                    //noinspection ExceptionCaughtLocallyJS
                    throw "Exception: All operands of $setEquals must be arrays. One argument is of type: " +
                        $c.capitalize(typeof (!$c.isArray(arr1) ? arr1 : arr2));
                }
                return $c.isSubset(arr1,arr2);
            case "$anyElementTrue":
                arr1 = $c.duplicate(__processExpression(doc, expr[field][0]));
                falseCondition = [undefined,null,0,false];

                while (st = arr1[j++]) {
                    if (!~falseCondition.indexOf(st)) { return true; }
                }
                return false;
            case "$allElementsTrue":
                arr1 = $c.duplicate(__processExpression(doc, expr[field][0]));
                falseCondition = [undefined,null,0,false];

                for (jlen = arr1.length; j < jlen; j++) {
                    if (~falseCondition.indexOf(arr1[j])) { return false; }
                }
                return true;
        }
    } catch (e) {
        error('aggregate.__parseSetExpr', e);
    }
}
function __parseStringExpr (doc,expr,field) {
    try {
        switch (field) {
            case "$concat":
                var value = "", i = 0, exp;
                while (exp = expr["$concat"][i++]) {
                    value += __processExpression(doc, exp);
                }
                return value;
            case "$substr":
                var index = expr["$substr"][1], length = expr["$substr"][2] < 0 ? undefined : expr["$substr"][2];
                return __processExpression(doc, expr["$substr"][0]).substr(index, length);
            case "$toLower":
                return (__processExpression(doc, expr["$toLower"]) || "").toLowerCase();
            case "$toUpper":
                return (__processExpression(doc, expr["$toLower"]) || "").toUpperCase();
            case "$strcasecmp":
                var value1 = (__processExpression(doc, expr["$strcasecmp"][0]) || "").toString(),
                    value2 = (__processExpression(doc, expr["$strcasecmp"][1]) || "").toString();
                if (value1 == value2) { return 0; }
                if (value1 < value2) { return -1; }
                if (value1 > value2) { return 1; }
        }
    } catch (e) {
        error('aggregate.__parseStringExpr', e);
    }
}
function __parseVariableExpr (doc,expr,field) {
    try {
        switch (field) {
            case "$map":
                var input = __processExpression(doc, expr[field].input),
                    v_as = "$" + expr[field].as,
                    v_in = expr[field]["in"];

                for (var i = 0, len = input.length; i < len; i++) {
                    doc[v_as] = input[i];
                    input[i] = __processExpression(doc, v_in);
                    delete doc[v_as];
                }
                return input;
            case "$let":
                var vars = expr[field].vars,
                    rmProps = [], rtn = null;
                for (var prop in vars) {
                    if (!vars.hasOwnProperty(prop)) { continue; }
                    doc["$" + prop] = __processExpression(doc, vars[prop]);
                    rmProps.push(prop);
                }
                rtn = __processExpression(doc, expr[field]["in"]);
                for (var j = 0, jlen = rmProps.length; j < jlen; j++) {
                    delete doc[rmProps[j]];
                }
                return rtn;
        }

    } catch (e) {
        error('aggregate.__parseVariableExpr', e);
    }
}
function __processAccumulator (doc,accumulator,previousValue,meta) {
    try {
        var value = __processExpression(doc,
                accumulator["$sum"] ||
                accumulator["$avg"] ||
                accumulator["$first"] ||
                accumulator["$last"] ||
                accumulator["$max"] ||
                accumulator["$min"] ||
                accumulator["$push"] ||
                accumulator["$addToSet"] ||
                accumulator["$stdDevPop"] ||
                accumulator["$stdDevSamp"]
        );
        switch (true) {
            case !!accumulator["$sum"]:
                return (value || 0) + (previousValue || 0);
            case !!accumulator["$avg"]:
                previousValue = previousValue || [];
                if (!$c.isNull(value)) { previousValue.push(value); }
                if (meta.length == meta.index + 1) { previousValue = $c.average(previousValue); }
                return previousValue;
            case !!accumulator["$first"]:
                if($c.isNull(previousValue)) { previousValue = value; }
                return previousValue;
            case !!accumulator["$last"]:
                return $c.isNull(value, previousValue);
            case !!accumulator["$max"]:
                if ($c.isNull(previousValue)) { previousValue = -9007199254740991; }
                if ($c.isNull(value)) { value = -9007199254740991 }
                if (meta.length == meta.index + 1 && value == previousValue == -9007199254740991) { return undefined; }
                return Math.max(value, previousValue);
            case !!accumulator["$min"]:
                if ($c.isNull(previousValue)) { previousValue = 9007199254740991; }
                if ($c.isNull(value)) { value = 9007199254740991 }
                if (meta.length == meta.index + 1 && value == previousValue == 9007199254740991) { return undefined; }
                return Math.min(value, (previousValue || 9007199254740991));
            case !!accumulator["$push"]:
                previousValue = previousValue || [];
                if (!$c.isNull(value)) { previousValue.push(value); }
                return previousValue;
            case !!accumulator["$addToSet"]:
                previousValue = previousValue || [];
                if (!$c.isNull(value) && !~previousValue.indexOf(value)) { previousValue.push(value); }
                return previousValue;
            case !!accumulator["$stdDevSamp"]:
                if (meta.sample && ~meta.sample.indexOf(doc)) {
                    if (!$c.isNull(value)) {
                        previousValue = previousValue || [];
                        previousValue.push(value);
                    }
                }
                if (meta.length == meta.index + 1) {
                    previousValue = $c.stdev(previousValue || []);
                }
                return $c.isNull(previousValue) ? null : previousValue;
            case !!accumulator["$stdDevPop"]:
                if (!$c.isNull(value)) {
                    previousValue = previousValue || [];
                    previousValue.push(value); }
                if (meta.length == meta.index + 1) {
                    previousValue = $c.stdev(previousValue);
                }
                return $c.isNull(previousValue) ? null : previousValue;
        }
    } catch (e) {
        error('aggregate.__processAccumulator', e);
    }
}


function __processExpression (doc,expr) {
    try {
        if ($c.isString(expr)) {
            if (expr[0] == "$") { expr = expr.substr(1); }
            return $c.getProperty(doc, expr.replace("$CURRENT.", ""));
        }
        if (!$c.isObject(expr)) { return expr; }
        for (var field in expr) {
            if (!expr.hasOwnProperty(field)) { continue; }
            var value = expr[field],
                literalKeys = ["$literal"],
                boolKeys = ["$and", "$or", "$not"],
                setKeys = ["$setEquals", "$setIntersection", "$setUnion", "$setDifference", "$setIsSubset", "$anyElementTrue", "$allElementsTrue"],
                compareKeys = ["$cmp", "$eq", "$gt", "$gte", "$lt", "$lte", "$ne"],
                arithmeticKeys = ["$add", "$subtract", "$multiply", "$divide", "$mod"],
                stringKeys = ["$concat", "$substr", "$toLower", "$toUpper", "$strcasecmp"],
                arrayKeys = ["$size"],
                variableKeys = ["$map", "$let"],
                dateKeys = ["$dayOfYear", "$dayOfMonth", "$dayOfWeek", "$year", "$month", "$week", "$hour", "$minute", "$second", "$millisecond", "$dateToString"],
                conditionalKeys = ["$cond", "$ifNull"];

            switch (true) {
                case !!~literalKeys.indexOf(field):
                    return expr;
                case !!~boolKeys.indexOf(field):
                    return __parseBooleanExpr(doc, expr, field);
                case !!~setKeys.indexOf(field):
                    return __parseSetExpr(doc, expr, field);
                case !!~compareKeys.indexOf(field):
                    return __parseComparisonExpr(doc, expr, field);
                case !!~arithmeticKeys.indexOf(field):
                    return __parseArithmeticExpr(doc, expr, field);
                case !!~stringKeys.indexOf(field):
                    return __parseStringExpr(doc, expr, field);
                case !!~arrayKeys.indexOf(field):
                    return __parseArrayExpr(doc, expr, field);
                case !!~variableKeys.indexOf(field):
                    return __parseVariableExpr(doc, expr, field);
                case !!~dateKeys.indexOf(field):
                    return __parseDateExpr(doc, expr, field);
                case !!~conditionalKeys.indexOf(field):
                    return __parseConditionalExpr(doc, expr, field);
                default:
                    __processExpression (doc,value);
                    break;
            }
        }
    } catch (e) {
        error('aggregate.__parseExpression', e);
    }
}
function __processGroup (docs, expr) {
    try {
        var _ids = expr._id, i = 0, groupings = {}, results = [], meta = {index:0,length:docs.length, sample:docs.sample/*,stop:false*/}, doc;
        while(doc = docs[meta.index = i++]) {
            var result, key = "null", keys = null;
            if (_ids) {
                keys = {};
                for (var prop in _ids) {
                    if (!_ids.hasOwnProperty(prop)) { continue; }
                    keys[prop] = __processExpression(doc, _ids[prop]);
                }
                key = JSON.stringify(keys);
            }
            if (!groupings[key]) {
                result = groupings[key] = {_id:keys};
                results.push(result);
            } else {
                result = groupings[key];
            }
            for (var prop in expr) {
                if (!expr.hasOwnProperty(prop) || prop == "_id") { continue; }
                result[prop] = __processAccumulator(doc, expr[prop],result.hasOwnProperty(prop) ? result[prop] : undefined, meta);
            }
        }
        return results;
    } catch (e) {
        error('aggregate.__processGroup', e);
    }
}
function __processSiblings(xml) {
    try {
        var parts = xml.split('<'), obj = {},
            tag = "", node = "", etag;
        obj['#text'] = obj['#text'] || "";
        for (var i = 0; i < parts.length; i++) {
            var part = parts[i];
            if (!part) {
                continue;
            }
            if (!tag) {
                etag = part.indexOf('>');
                if (!~etag) {
                    if (!i) {
                        obj['#text'] += $c.strip(part, ['\n', ' ']);
                    } else {
                        node += part;
                    }
                    continue;
                }
                tag = part.split(/\s|>/)[0];
                node += "<" + part;
            } else if (~(etag = part.indexOf('/' + tag + '>'))) {
                var text = $c.strip(part.substr(etag + tag.length + 2),['\n', ' ']);
                if (text) {
                    obj['#text'] += text;
                }
                node += "<" + part.substring(0, etag + tag.length + 2);
                obj = $c.merge(obj, xmlToJson(node));
                tag = "", node = "";
            }

        }
        if (!obj['#text']) {
            delete obj['#text'];
        }
        return obj;
    } catch (e) {
        error('xmlToJson.__processSiblings', e);
    }
}

function __pullHelper(target, lookup) {
    for (var i = 0, len = lookup.length; i < len; i++) {
        var value = lookup[i];
        for (var j = 0, jlen = target.length; j < jlen; j++) {
            if ($c.equals(value, target[j])) {
                $c.removeAt(target, j);
                j--, jlen--;
            }
        }

    }
}
function __queryNestedProperty(obj, path/*, value*/) {
    if (obj[path]) { return [obj[path]]; }
    var parts = path.split('.'), values = [], i = 0, prop;
    while (prop = parts[i++]) {
        if (!obj.hasOwnProperty(prop)) { return []; }
        if ($c.isArray(obj[prop])) {
            if ($c.isNull(parts[i])) { return obj[prop]; }
            var subPath = parts.slice(i).join('.'), items = obj[prop];
            for (var j = 0, jlen = items.length; j < jlen; j++) {
                values = values.concat(__queryNestedProperty(items[j], subPath));
            }
            return values;
        }
        obj = obj[prop];
    }
    return [obj];
}
function __relativePathFinder (path,depth) {
    var callingPath = "",
        delimiter = "/";
    depth = depth || 0;

    // first clause is for linux based files systems, second clause is for windows based file system
    if (!(path.startsWith('/') || /^[a-zA-Z]:\/|^\/\/.*/.test(path))) {
        callingPath = new Error().stack.split('\n')[3 + depth].replace(/.*?\((.*)/,'$1');
        if (~callingPath.indexOf('\\')) {
            callingPath = callingPath.replace(/\\/g,'/');
        }
        path = callingPath.substring(0,callingPath.lastIndexOf(delimiter) + 1) + path;
    }
    return path;
}
function __rest_docs(req,res,params){
    var routes = {
        all:$c.where(this.server.routes.all,{path:{$ne:"/craydent/api/docs"}},{path:1,parameters:[]}),
        delete:$c.where(this.server.routes.delete,{path:{$ne:"/craydent/api/docs"}},{path:1,parameters:[]}),
        get:$c.where(this.server.routes.get,{path:{$ne:"/craydent/api/docs"}},{path:1,parameters:[]}),
        post:$c.where(this.server.routes.post,{path:{$ne:"/craydent/api/docs"}},{path:1,parameters:[]}),
        put:$c.where(this.server.routes.put,{path:{$ne:"/craydent/api/docs"}},{path:1,parameters:[]})
    };
    if(req.method.toLowerCase() == "post" || params.f == 'json'){
        return this.send(routes);
    }
    params.logo_url = $c.ROUTE_LOGO_URL;
    this.header({'Content-Type': 'text/html'},200);
    this.end(fillTemplate($c.REST_API_TEMPLATE,$c.merge(routes,params)));

}
function __run_replace (reg, template, use_run, obj) {
    try {
        var pre = "", post = "", split_param = "|", match;
        //noinspection CommaExpressionJS
        use_run && (pre="RUN[",post="]", split_param=/;(?!\\)/);

        while ((match = reg.exec(template)) && match[1]) {
            var funcValue = [],
                func = "";

            funcValue = $c.replace_all(match[1],['\\[','\\]'],['[',']']).split(split_param);
            while ($c.count(funcValue[0],"{") != $c.count(funcValue[0],"}")) {
                if ($c.tryEval(funcValue[0])) { break; }
                funcValue[0]+= ($c.isString(split_param)?split_param:";")+funcValue[1];
                funcValue.splice(1,1);
            }
            func = $c.strip(funcValue.splice(0,1)[0],";");
            for (var i = 0, len = funcValue.length; i < len; i++) {
                var fv = funcValue[i];
                if (~fv.indexOf("${")) {
                    funcValue[i] = fillTemplate(fv, obj);
                }
                try {
                    funcValue[i] = eval("(" + $c.replace_all(fv,[';\\'], [';']) + ")");
                } catch (e) {}
            }
            funcValue = funcValue.map(function(item){ return $c.tryEval(item) || item; });
            template = ~template.indexOf(match[1]) ? template.replace(match[1], (match[1] = $c.replace_all(match[1],['\\[', '\\]'], ['[', ']']))) : template;
            template = $c.replace_all(template,"${" + pre + match[1] + post +"}",
                    $c.getProperty($g, func) ? $c.getProperty($g, func).apply(obj, funcValue) : ($c.tryEval("("+func+")")||foo).apply(obj,funcValue) || "");
        }
        return template;
    } catch (e) {
        error('fillTemplate.__run_replace', e);
    }
}
function __set_path (verb, http, path, callback) {
    try {
        callback = callback || [];
        if($c.isFunction(callback) || $c.isGenerator(callback) || $c.isAsync(callback)) { callback = [callback]; }
        if (!$c.isArray(path)) { path = [path]; }
        for (var i = 0, len = path.length; i < len; i++) {
            var route = path[i];
            if ($c.isString(route)) {
                route = {path: route, callback: callback, method: verb};
            } else if (callback) {
                route.callback = route.callback || [];
                if ($c.isFunction(route.callback) || $c.isGenerator(route.callback) || $c.isAsync(route.callback)) {
                    route.callback = [route.callback];
                }
                route.callback = route.callback.concat(callback);
                route.method = verb;
            }
            http.routes.push(route);
        }
    } catch (e) {
        error('CraydentServer.' + verb, e);
    }
}


function _binarySearch(sarr, prop, value, sindex, eindex, findIndex){
    sindex = $c.isNull(sindex) ? 0 : sindex;
    eindex = $c.isNull(eindex) ? sarr.length - 1 : eindex;
    if (findIndex) {
        if (!~eindex) { return 0; }
        if (sarr[sindex][prop] > value) { return sindex; }
        if (sarr[eindex][prop] < value) { return eindex; }
    }
    if (sindex == eindex) {
        if (sarr[sindex][prop] != value) { return []; }
        return [sarr[sindex]];
    }

    var index = sindex + parseInt((eindex - sindex) / 2);

    if (sarr[index][prop] > value) {
        return _binarySearch(sarr, prop, value, sindex, index, findIndex);
    }

    if (sarr[index][prop] < value) {
        return _binarySearch(sarr, prop, value, index, eindex, findIndex);
    }
    while (sarr[sindex][prop] < value) { sindex++; }
    while (sarr[eindex][prop] > value) { eindex--; }

    if (findIndex) { return eindex; }

    var len = eindex - sindex + 1;
    if (sindex == 0 && len == sarr.length) { return sarr; }
    return sarr.slice(sindex, eindex + len);
}
function _cli_exec (command, options, callback) {
    var child = require('child_process');
    if (typeof options == 'function') {
        callback = options;
        options = undefined;
    }
    return new Promise(function(res,rej) {
        try {
            if (!command) { res(false); }
            options = options || {};
            options.silent = !!options.silent;

            var output = '';
            var cprocess = child.exec(command, {env: process.env, maxBuffer: 20 * 1024 * 1024}, function (err) {
                var re = callback || (!err || options.alwaysResolve ? res : rej);
                if (options.outputOnly) { return re(output); }
                if (callback) { return re.call(cprocess, err ? err.code : 0, output); }
                re({code: err ? err.code : 0, output: output});
            });

            cprocess.stdout.on('data', function (data) {
                output += data;
                if (!options.silent) { process.stdout.write(data); }
            });

            cprocess.stderr.on('data', function (data) {
                output += data;
                if (!options.silent) { process.stdout.write(data); }
            });
        } catch (e) {
            error('CLI.exec', e);
        }
    });
}
function _condense (objs, check_values) {
    try {
        var skip = [], arr = [], without = false;
        if (check_values && check_values.constructor == Array) {
            without = true;
        }
        for (var i = 0, len = objs.length; i < len; i++) {
            var obj = objs[i];
            if (check_values) {
                var index = i;
                if (without && ~check_values.indexOf(obj)) {
                    skip.push(i);
                    continue;
                }
                if (~skip.indexOf(i)) { continue; }
                while (~(index = objs.indexOf(obj,index + 1))) {
                    skip.push(index);
                }

            }
            obj !== "" && !$c.isNull(obj) && !~(skip.indexOf && skip.indexOf(i) || _indexOf(skip, i)) && !$c.isNull(obj) && arr.push(obj);
        }
        return arr;
    } catch (e) {
        error("_condence", e);
        return false;
    }
}
function _contains_lessthan (vals, val) {
    for (var i = 0, len = vals.length; i < len; i++) {
        if (vals[i] < val) { return true; }
    }
    return false;
}
function _contains_greaterthan (vals, val) {
    for (var i = 0, len = vals.length; i < len; i++) {
        if (vals[i] > val) { return true; }
    }
    return false;
}
function _contains_lessthanequal (vals, val) {
    for (var i = 0, len = vals.length; i < len; i++) {
        if (vals[i] <= val) { return true; }
    }
    return false;
}
function _contains_greaterthanequal (vals, val) {
    for (var i = 0, len = vals.length; i < len; i++) {
        if (vals[i] >= val) { return true; }
    }
    return false;
}
function _contains_mod (vals, val) {
    for (var i = 0, len = vals.length; i < len; i++) {
        if (vals[i] % val[0] == val[1]) { return true; }
    }
    return false;
}
function _contains_type (vals, val) {
    for (var i = 0, len = vals.length; i < len; i++) {
        if (vals[i].constructor == val) { return true; }
    }
    return false;
}
function _copyWithProjection(projection, record, preserveProperties) {
    var copy = {}, len = 0;
    projection = projection || "*";
    if ($c.isString(projection)) {
        projection = projection.split(',');
    }
    if ($c.isArray(projection)) {
        if (!(len = projection.length)) {
            copy = $c.duplicate(record);
            return copy;
        }
        var arr = projection;
        projection = {};
        var i = 0, a;
        while (a = arr[i++]) {
            projection[a] = 1;
        }
    }

    for (var prop in projection) {
        if (projection.hasOwnProperty(prop) && projection[prop]) {
            var val = $c.getProperty(record,prop) || null;
            if (prop == "*") {
                copy = $c.duplicate(record,true);
            } else if ($c.parseBoolean(projection[prop])) {
                if (preserveProperties || !$c.isNull(val)) {
                    $c.setProperty(copy, prop, val);
                }
            } else if (!$c.isObject(projection[prop]) && !val) {
                copy[prop] = projection[prop];
            } else if ($c.isObject(projection[prop]) || val && !$c.isArray(val)) {
                copy[prop] = __processExpression(record,projection[prop]);
            } else if (val) {
                var del = true;
                if (prop.slice(-2) == ".$") {
                    prop = prop.slice(0,-2);
                    copy[prop] = val.slice(0,1);
                } else if (projection[prop]['$elemMatch']) {
                    copy[prop] = $c.where(val,projection[prop]['$elemMatch']).slice(0,1);
                } else if (projection[prop]['$slice']) {
                    var start = 0, length = $c.isInt(projection[prop]['$slice']) ? projection[prop]['$slice'] : 0;

                    if ($c.isArray(projection[prop]['$slice'])) {
                        start = projection[prop]['$slice'][0];
                        length = projection[prop]['$slice'][1];
                    }
                    copy[prop] = val.slice(start, length);
                } else if (projection[prop]) {
                    del = false;
                    $c.setProperty(copy, prop, val);
                }
                if (del && !copy[prop].length) {
                    delete copy[prop];
                }
            } else {
                copy[prop] = projection[prop];
            }
        }
    }
    return copy;
}
function _defineFunction (name, func, override) {
    try {
        var args = _getFuncArgs(func),
            fstr = func.toString().replace(/this/g,'craydent_ctx'),

        // extra code to account for when this == global
            extra_code = "if(arguments.length == 0 && this == $c){return;}",
            fnew = args.length === 0 || (args.length === 1 && !_trim(args[0])) ?
                fstr.toString().replace(/(\(\s*?\)\s*?\{)/, ' (craydent_ctx){'+extra_code) :
                "(" + fstr.toString().replace(/\((.*?)\)\s*?\{/, '(craydent_ctx,$1){'+extra_code) + ")";

        if (!override && eval("typeof("+name+")") !== "undefined") {
            return eval("$c."+name+" = "+fnew);
        }
        return eval("$c."+name+" = "+fnew);
    } catch (ex) {
        error("_defineFunction", ex);
    }
}
function _duplicate(obj, original, recursive/*, ref, current_path, exec*/){
    try {
        if ($c.isString(obj) || $c.isString(original)
            || $c.isInt(obj) || $c.isInt(original)
            || $c.isFloat(obj) || $c.isFloat(original)
            || $c.isNumber(obj) || $c.isNumber(original)) {
            return original;
        }
        var argIndex = 3;

        // remove all properties if it is the root level
        var ref = arguments[argIndex] || {objects:[{obj:original,path:"obj"}]},
            current_path = arguments[argIndex+1] || "obj";
        (arguments[argIndex+2] || (arguments[argIndex+2] = {})) && (arguments[argIndex+2].command = arguments[argIndex+2].command || "");
        if (!(ref.objects.length == 1)) {
            for (var prop in obj){
                if (obj.hasOwnProperty(prop)) { delete obj[prop]; }
            }
        }
        var loop_func = function (prop, original) { // 0 => property, 1 => original object, 2 => reference path object, 3 => current path, 4 => command object
            if (original.hasOwnProperty(prop) && original[prop] && recursive) {
                var index = $c.indexOfAlt(ref.objects,original[prop], function(obj,value){
                        return obj.obj===value;
                    }),
                    new_path = current_path+"["+parseRaw(prop)+"]";

                if (~index) {
                    return arguments[argIndex+1].command += new_path + "="+ref.objects[index].path+";";
                }

                if (typeof(original[prop]) in {"object":1,"function":1} && recursive) {
                    var isfunc = typeof(original[prop].constructor) == "function";
                    if (isfunc && typeof(original[prop]) == "object") { obj[prop] = new original[prop].constructor();
                    } else if (!isfunc) { obj[prop] = {};
                    } else { obj[prop] = $c.tryEval(original[prop].toString()); }
                    ref.objects.push({obj:original[prop],path:new_path});
                    return _duplicate(obj[prop], original[prop], true, ref, new_path, arguments[argIndex+1]);
                }
            } else if (!original.hasOwnProperty(prop)) {
                return;
            }
            obj[prop] = original[prop];
        };
        if ($c.isArray(original)) {
            var i = 0, len = original.length;
            while (i++ < len) {
                loop_func.call(obj, i - 1, original, ref, current_path, arguments[argIndex+2]);
            }
        } else {
            for (var prop in original){
                if (!original.hasOwnProperty(prop)) { continue; }
                loop_func.call(obj, prop, original, ref, current_path, arguments[argIndex+2]);
            }
        }

        if (!arguments[argIndex+1]) {
            eval(arguments[argIndex+2].command);
        }

        return obj;
    } catch (e) {
        error('_duplicate', e);
    }
}
function _endsWith () {
    /*|{
        "info": "String class extension to check if the string ends with the given string",
        "category": "String",
        "parameters":[
            {"infinite": "any number of arguments can be passed"}],

        "overloads":[
            {"parameters":[
                {"arr": "(String[]) An array of strings to check"}]}],

        "url": "http://www.craydent.com/library/1.9.3/docs#string.endsWith",
        "returnType": "(Mix)"
    }|*/
    try {
        var args = arguments;
        if (arguments.length < 3 && ($c.isArray(arguments[0]) || $c.isArray(arguments[1]))) {
            args = arguments[1] || arguments[0];
        }
        for (var i = typeof craydent_ctx != "undefined" ? 1 : 0, len = args.length; i < len; i++) {
            var arg = args[i];
            if (arg == this.slice(-arg.length)) { return arg; }
        }
        return false;
    } catch (e) {
        error('String.endsWith', e);
    }
}
function _ext (cls, property, func, override) {
    try {
        $g.__craydentNoConflict || (cls['prototype'][property] = cls['prototype'][property] || func);
        _df(property, func, override);
    } catch (e) {
        error('_ext', e);
    }
}
function _getBrowserVersion(browser){
    try {
        var index = this.navigator.userAgent.indexOf(browser);
        if (!~index && this["is"+browser]()) return -1;
        var version = parseFloat(this.navigator.userAgent.substring(index+browser.length+1));
        return version === 0 || version ? version : -1;
    } catch(e){
        error('_getBrowserVersion', e);
    }
}
function _getFuncName (func) {
    try {
        return _trim(func.toString().replace(/\/\/.*?[\r\n]/gi,'').replace(/[\t\r\n]*/gi, '').replace(/\/\*.*?\*\//gi, '').replace(/.*?function\s*?(.*?)\s*?\(.*/,'$1'));
    } catch (e) {
        error('_getFuncName', e);
    }
}
function _getFuncArgs (func) {
    try {
        return _condense(_trim(_strip(func.toString(), '(')).replace(/\s*/gi, '').replace(/\/\*.*?\*\//g,'').replace(/.*?\((.*?)\).*/, '$1').split(',')) || [];
    } catch (e) {
        error('_getFuncArgs', e);
    }
}
function _getGMTOffset () {
    try {
        var diff = this.getHours() - this.getUTCHours();
        return diff - (diff <= 12 ? (diff <= 0 ? (diff <= -12 ? -24:0):0):24);
    } catch (e) {
        error('_getGMTOffset', e);
    }
}
function _getSession(sid, callback) {
    try {
        var ctx = this, request = ctx.request;
        if (ctx.session || __GLOBALSESSION[ctx.sessionid]) {
            ctx.session = ctx.session ? (__GLOBALSESSION[sid] = ctx.session) : (__GLOBALSESSION[ctx.sessionid]);
            return callback ? callback(ctx.session) : ctx.session;
        }
        var sync = !callback;

        var cookies, sessionCookieKey = "NODEJSSESSION";
        cookies = ($c.getProperty(request, 'headers.cookie') || '').split('; ');
        // get thes session cookie cuid from the cookie
        var sessionCookie = cookies.filter(function (c) {return ~c.indexOf(sessionCookieKey + "=");})[0];
        if (sessionCookie) {
            ctx.sessionid = sessionCookie.substring(sessionCookieKey.length + 1);
        } else {
            ctx.sessionid = cuid();
        }

        if (true || !__GLOBALSESSION[ctx.sessionid] && __GLOBALSESSION.length > 1000000) {
            // make room for this session to be store globally
            for (var prop in __GLOBALSESSION) {
                delete __GLOBALSESSION[prop];
                break;
            }

            var dir = 'craydent/session',
                path = dir + "/" + ctx.sessionid;

            var csession = this._sessionFileCreatAndRetrieve(dir, path, sync, function(retrievedSession){
                __GLOBALSESSION[ctx.sessionid] = ctx.session = retrievedSession;
                callback && callback(ctx.session);
            });
            if (csession) {
                return __GLOBALSESSION[ctx.sessionid] = ctx.session = csession;
            }
        } else {
            return callback ? callback(__GLOBALSESSION[ctx.sessionid]) : __GLOBALSESSION[ctx.sessionid];
        }
    } catch(e) {
        error('_getSession', e);
    }
}
function _groupFieldHelper (obj, fields) {
    var prop = "", j = 0, field;
    while (field = fields[j++]) {
        prop += field + ":" + $c.getProperty(obj,field) + ",";
    }
    return prop;
}
function _indexOf (objs, value) {
    try {
        var len = objs.length,
            i = 0;
        while (i < len) {
            if (objs[i] === value) return i;
            ++i;
        }
        return -1;
    } catch (e) {
        error("_indexOf", e);
    }
}
function _indexOfAlt(value,option) {
    /*|{
        "info": "Array class extension to find index of a value based on a callback function & String class extension to find the index based on a regular expression",
        "category": "Array",
        "parameters":[
            {"value": "(Mixed) value to find"},
            {"func": "(Function) Callback function used to do the comparison"}],

        "overloads":[
            {"parameters":[
                {"regex": "(RegExp) Regular expression to check value against"}]},
            {"parameters":[
                {"regex": "(RegExp) Regular expression to check value against"},
                {"pos": "(Int) Index offset to start"}]}],

        "url": "http://www.craydent.com/library/1.9.3/docs#array.indexOfAlt",
        "returnType": "(Integer)"
    }|*/

    try {
        if ($c.isArray(this)) {
            var func = option;
            var len = this.length,
                    i = 0;
            while (i < len) {
                if ($c.isRegExp(value) && value.test(this[i])) { return i; }
                if ($c.isFunction(func) && (value instanceof Object ? func(this[i], value) : func(this[i]) === value)) { return i; }
                ++i;
            }
            return -1;
        }
        if ($c.isString(this)) {
            var regex = value, pos = option;
            if (isNull(regex)) {
                return -1;
            }
            pos = pos || 0;
            var index = this.substring(pos).search(regex);
            return (index >= 0) ? (index + pos) : index;
        }
    } catch (e) {
        error($c.getName(this.constructor) + ".indexOfAlt", e);
    }
}
function _isArray (obj) {
    try {
        if (isNull(obj)) {return false;}
        return (obj.constructor == Array);
    } catch (e) {
        error('_isArray', e);
    }
}
function _isString (obj) {
    try {
        if (isNull(obj)) {return false;}
        return (obj.constructor == String);
    } catch (e) {
        error('_isString', e);
    }
}
function _joinHelper (objs, arr, on, exclusive) {
    var records = [], propRef = [], objRef = arr[0] || {};

    if ($c.isString(on)) {
        on = on.split('=');
        if (on.length == 1) { on = [on,on]; }
        var name = $c.getName(arguments.callee.caller);
        on = $c.trim(on);
        name == "joinRight" && (on = [on[1],on[0]]);
    }

    for (var prop in objRef) {
        if (objRef.hasOwnProperty(prop)) {
            propRef.push(prop);
        }
    }
    for (var i = 0, len = objs.length; i < len; i++)  {
        var record = $c.duplicate(objs[i],true), query = {},results;
        query[on[1]] = record[on[0]];
        results = $c.where(arr,query);
        if (results.length > 0)  {
            records.push($c.merge(record, results[0]));
        } else if (!exclusive)  {
            for (var j = 0, jlen = propRef.length; j < jlen; j++) {
                record[propRef[j]] = record[propRef[j]] || null;
            }
            records.push(record);
        }
    }
    return records;
}
function _orderListHelper(value, sorter, arr) {
    try {
        var ii = 0, i = 0, len = arr.length;
        if (!~sorter(value, arr[0])) { return 0; }
        if (sorter(value, arr[len - 1]) === 1) { return len; }
        while (len > 1) {
            len = Math.ceil(len/2);
            ii = i + len;
            var order = sorter(value, arr[ii]);
            if (order === 0) { return ii; }
            if (order === 1) { i = ii++; }
        }
        return ii;

    } catch (e) {
        error("OrderedList._orderListHelper", e);
        return false;
    }
}
function _processClause (clause) {
    try {
        var index = $c.indexOfAlt(clause,/between/i);
        if (~index) { // contains between predicate
            //replace AND in the between to prevent confusion for AND clause separator
            clause.replace(/between( .*? )and( .*?)( |$)/gi,'between$1&and$2$3');
        }

        var ORs = clause.split(/ or /i), query = {"$or":[]}, i = 0, or;
        while (or = ORs[i++]) {
            var ANDs = or.split(/ and /i),
                aquery = {'$and':[]}, j = 0, and;
            while (and = ANDs[j++]) {
                var predicateClause = and,
                    cond = {};

                //=, <>, >, >=, <, <=, IN, BETWEEN, LIKE, IS NULL or IS NOT NULL
                switch (true) {
                    case !!~(index = predicateClause.indexOf('=')) :
                        cond[predicateClause.substring(0, index).trim()] = {'$equals':$c.tryEval(predicateClause.substring(index + 1).trim())};
                        aquery['$and'].push(cond);
                        break;
                    case !!~(index = predicateClause.indexOf('<>')) :
                        cond[predicateClause.substring(0, index).trim()] = {'$ne':$c.tryEval(predicateClause.substring(index + 1).trim())};
                        aquery['$and'].push(cond);
                        break;
                    case !!~(index = predicateClause.indexOf('>')) :
                        cond[predicateClause.substring(0, index).trim()] = {'$gt':$c.tryEval(predicateClause.substring(index + 1).trim())};
                        aquery['$and'].push(cond);
                        break;
                    case !!~(index = predicateClause.indexOf('>=')) :
                        cond[predicateClause.substring(0, index).trim()] = {'$gte':$c.tryEval(predicateClause.substring(index + 1).trim())};
                        aquery['$and'].push({'$gte':cond});
                        break;
                    case !!~(index = predicateClause.indexOf('<')) :
                        cond[predicateClause.substring(0, index).trim()] = {'$lt':$c.tryEval(predicateClause.substring(index + 1).trim())};
                        aquery['$and'].push(cond);
                        break;
                    case !!~(index = predicateClause.indexOf('<=')) :
                        cond[predicateClause.substring(0, index).trim()] = {'$lte':$c.tryEval(predicateClause.substring(index + 1).trim())};
                        aquery['$and'].push(cond);
                        break;
                    case $c.indexOfAlt(predicateClause,/between/i) == 0 :
                        var nums = predicateClause.replace(/between (.*?) &and (.*?) ( |$)/i,'$1,$2').split(',');
                        aquery['$and'].push({'$gte':$c.tryEval(nums[0])});
                        aquery['$and'].push({'$lte':$c.tryEval(nums[1])});
                        break;
                    case !!~(index = $c.indexOfAlt(predicateClause,/ in /i)) :
                        var _in = $c.tryEval(predicateClause.substring(index + 4).trim().replace(/\((.*)\)/,'[$1]'));
                        if (!_in) {
                            //noinspection ExceptionCaughtLocallyJS
                            throw "Invalid syntax near 'in'";
                        }
                        cond[predicateClause.substring(0, index).trim()] = _in;
                        aquery['$and'].push({'$in':cond});
                        break;
                    case !!~(index = $c.indexOfAlt(predicateClause,/is null/i)) :
                        cond[predicateClause.substring(0, index).trim()] = null;
                        aquery['$and'].push({'$equals':cond});
                        break;
                    case !!~(index = $c.indexOfAlt(predicateClause,/is not null/i)) :
                        cond[predicateClause.substring(0, index).trim()] = null;
                        aquery['$and'].push({'$ne':cond});
                        break;
                    case !!~(index = $c.indexOfAlt(predicateClause,/ like /i)) :
                        var likeVal = "^" + $c.replace_all(_trim(predicateClause.substring(index + 6),null,[' ', "'", '"']),"%",".*?") + "$";
                        cond[predicateClause.substring(0, index).trim()] = {'$regex': new RegExp(likeVal,'i')};
                        aquery['$and'].push(cond);
                        break;
                }
            }
            query['$or'].push(aquery);
        }

        return query;
    } catch (e) {
        error('where.processClause', e);
    }
}
function _redact(docs, expr) {
    try {
        docs = $c.isArray(docs) ? docs : [docs];
        var result = [], i = 0, doc;
        while (doc = docs[i++]) {
            var action = __parseCond(doc, expr);
            if (action == "$$KEEP") {
                result.push(doc);
            } else if (action == "$$DESCEND") { // return all fields at current document without embedded documents
                result.push(doc);
                for (var prop in doc) {
                    if (!doc.hasOwnProperty(prop) || $c.isArray(doc[prop]) && !$c.isObject(doc[prop][0]) || !$c.isArray(doc[prop]) && !$c.isObject(doc[prop])) {
                        continue;
                    }
                    doc[prop] = _redact(doc[prop], expr);
                    if (doc[prop] === undefined) {
                        delete doc[prop];
                    }
                }
            } else if (action == "$$PRUNE") {

            } else {
                //noinspection ExceptionCaughtLocallyJS
                throw "exception: $redact's expression should not return anything aside from the variables $$KEEP, $$DESCEND, and $$PRUNE, but returned " + parseRaw(action);
            }
        }
        return result.length ? result : undefined;
    } catch (e) {
        error('aggregate._redact', e);
    }
}
function _replace_all(replace, subject, flag) {
    try {
        if (!$c.isArray(replace)){
            replace = [replace];
        }
        if (!$c.isArray(subject)) {
            subject = [subject];
        }
        var str = this, last = 0;
        for (var i = 0, len = replace.length; i < len; i++) {
            var rep = replace[i];
            var reg = new RegExp(__convert_regex_safe(rep), flag);
            if (!$c.contains(str, reg)) { continue; }
            str = str.replace(reg, subject[i] === undefined ? subject[last] : subject[i]);
            if (subject[last + 1]) { last++; }
        }
        return str.toString();
    } catch (e) {
        error("_replace_all", e);
    }
}
function _run_func_array(funcs, args) {
    var self = this;
    !$c.isArray(funcs) && (funcs = [funcs]);
    var i = 0, func, rtn = [];
    while (func = funcs[i++]){
        try {
            if ($c.isFunction(func)){
                rtn = rtn.concat(func.apply(self, args));
            } else if ($c.isGenerator(func)) {
                $c.tryEval('$c.syncroit(function *(){rtn = rtn.concat(yield func.apply(self,args));});');
            } else if ($c.isAsync(func)) {
                $c.tryEval('(async function (){rtn = rtn.concat(yield func.apply(self,args));})();');
            }
        } catch (e) {
            throw e;
        }
    }
    return rtn;
}
function _sessionFileCreatAndRetrievefunction (dir, path, sync, callback) {
    try {
        var fs = require('fs');
        if (sync) {
            if (!fs.existsSync(path)) {
                if (!fs.existsSync(dir)) {
                    var dirPath = "";
                    // create all missing parent directories sync
                    var dirs = dir.split('/'), i = 0, dir;
                    while (dir = dirs[i++]) {
                        dirPath += dir + '/';
                        if (!fs.existsSync(dirPath)) {
                            fs.mkdirSync(dirPath);
                        }
                    }
                }
                // creates the file
                fs.openSync(path, 'w+');
            }
            return $c.tryEval(fs.readFileSync(path).toString()) || {};
        }
        fs.exists(path, function (exists) {
            if (!exists) {
                // create all missing parent directories async then create the file
                return $c.mkdirRecursive(dir, function () { fs.open(path, 'w+', function () { callback({}); }); });
            }
            fs.readFile(path, function (err, data) { callback(tryEval(data)); });
        });

    } catch (e) {
        error('_sessionFileCreateAndRetrieve', e);
    }
}
function _startsWith () {
    /*|{
        "info": "String class extension to check if the string starts with the given string",
        "category": "String",
        "parameters":[
            {"infinite": "any number of String arguments can be passed"}],

        "overloads":[
            {"parameters":[
                {"arr": "(String[]) An array of strings to check"}]}],

        "url": "http://www.craydent.com/library/1.9.3/docs#string.startsWith",
        "returnType": "(Bool)"
    }|*/
    try {
        var args = arguments;
        if (arguments.length < 3 && ($c.isArray(arguments[0]) || $c.isArray(arguments[1]))) {
            args = arguments[1] || arguments[0];
        }
        for (var i = typeof craydent_ctx != "undefined" ? 1 : 0, len = args.length; i < len; i++) {
            var arg = args[i];
            if (arg == this.slice(0, arg.length)) { return arg; }
        }
        return false;
    } catch (e) {
        error('String.startsWith', e);
    }
}
function _strip (str, character) {
    try {
        return _trim(str, undefined, character);
    } catch (e) {
        error("_strip", e);
    }
}
function _subFieldHelper(obj, operands) {
    try {
        if (!$c.isObject(obj)) { return false; }

        for (var prop in obj) {
            if (!obj.hasOwnProperty(prop)) { continue; }
            if (prop in operands) { return prop; }
        }
        return false;
    } catch (e) {
        error('_subFieldHelper', e);
    }
}

function _subQuery(query, field, index ,_whereRefs) {
    try {
        _whereRefs = _whereRefs || [];
        if (!$c.isObject(query)) {
            if (~field.indexOf('.')) { return "$c.equals($c.getProperty(record.'" + field + "'), " + $c.parseRaw(query) + ")";}
            return "$c.equals(record['" + field + "'], " + $c.parseRaw(query) + ")";
        }
        var expression = "true", comparison_map = {
            "$lt":"_clt",
            "$lte":"_clte",
            "$gt":"_cgt",
            "$gte":"_cgte"
        };


        // prep multiple subqueries
        for (var prop in query) {
            if (!query.hasOwnProperty(prop)){ continue; }
            switch(prop) {
                // value is the record in the array
                // q is the conditional value
                case "$equals":
                case "$eq":
                case "$regex":
                case "$ne":
                    var val = $c.getValue(query[prop]), q = "(" + $c.parseRaw(val) + ")";
                    if ($c.isFunction(val)) {
                        q += "(record,'" + field + "',index)";
                    } else {
                        q = "$c.contains(values," + q + ")";
                    }
                    expression += " && ((values = _qnp(record, '" + field + "')).length && " + (prop == "$ne" ? "!" : "") + q + ")";
                    break;
                case "$lt":
                case "$lte":
                case "$gt":
                case "$gte":
                    expression += " && ((values = _qnp(record, '" + field + "')).length && " + comparison_map[prop] + "(values," + $c.parseRaw(query[prop]) + "))";
                    break;
                case "$exists":
                    expression += " && ((finished = {validPath:0}),$c.getProperty(record,'" + field + "','.',finished),$c.parseBoolean(finished.validPath) == " + query['$exists'] + ")";
                    break;
                case "$type":
                    var qt = $c.isNull(query["$type"]) ? "!" : "";
                    expression += " && (" + qt + "(values = _qnp(record, '" + field + "')).length && _ct(values," + $c.getName(query['$type']) + "))";
                case "$text":
                    //return record.getProperty(field).contains(query['$search']);
                    break;
                case "$mod":
                    var qm = $c.isArray(query['$mod']);
                    expression += " && ((values = _qnp(record, '" + field + "')).length && " + qm + " && _cm(values," + $c.parseRaw(query[prop]) + "))";
                    break;
                case "$all":
                    var all = $c.parseRaw(query['$all']) || undefined;
                    expression += " && (values = _qnp(record, '" + field + "')),(all = " + all + "),($c.isArray(values[0]) && $c.isArray(all)) && (function(){ for (var j = 0, jlen = all.length; j < jlen; j++){ if (!$c.contains(values[0],all[j])) { return false; }} return true;})()";
                    break;
                case "$size":
                    var ival = parseInt(query['$size']);
                    expression += " && (values = _qnp(record, '" + field + "')[0]),($c.isArray(values) ? (" + ival + " === values.length) : (values == undefined && 0 === " + ival + "))";
                    break;
                case "$where":
                    var isfunc = $c.isFunction(query['$where']);
                    if (isfunc) {
                        _whereRefs.push(query['$where']);
                    }
                    var val = "(" + (isfunc ? "__where_cb" + _whereRefs.length : "function(){return (" + query['$where'] + ");}") + ")";
                    expression += " && " + val + ".call(record)";
                    break;
                case "$elemMatch":
                    expression += " && (values = _qnp(record, '" + field + "')[0]),($c.isArray(values) && !!$c.where(values," + $c.parseRaw(query['$elemMatch']) + ",1).length)";
                    break;
                case "$or":
                case "$nor":
                    var ors = query[prop],o = 0, or,nor = "";
                    if (!$c.isArray(ors)) { return false; }
                    if (prop == "$nor") { nor = "!"; }
                    expression += " && " + nor + "(";
                    while (or = ors[o++]) {
                        expression += "(" + _subQuery(or, field, index, _whereRefs) + ") || ";
                    }
                    expression += "false)";

                    break;
                case "$and":
                    var ands = query['$and'],a = 0, and;
                    if (!$c.isArray(ands)) { return false; }
                    expression += " && (";
                    while (and = ands[a++]) {
                        expression += "(" + _subQuery(and, field, index, _whereRefs) + ") && ";
                    }
                    expression += "true)";

                    break;
                case "$not":
                    if (!$c.isObject(query['$not'])) {
                        expression += " && $c.contains(values, "+$c.parseRaw(query['$not'])+")";
                        break;
                    }

                    expression += " && !(" + _subQuery(query[prop],field,null,_whereRefs) + ")";
                    break;

                case "$in":
                case "$nin":
                    expression += " && " + (prop == "$nin" ? "!" : "") + "((values = _qnp(record, '" + field + "')[0]),$c.contains(" + $c.parseRaw(query[prop]) + ",values))";
                    break;
                default:
                    expression += " && " + _subQuery(query[prop], $c.replace_all(prop,'\'','\\\''),null,_whereRefs);
                    break;
            }
        }
        return expression;
    } catch (e) {
        error('_subQuery', e);
    }
}
function _toCurrencyNotation(sep) {
    /*|{
        "info": "Number/String class extension to change number to currency",
        "category": "String",
        "parameters":[],

        "overloads":[
            {"parameters":[
            {"separator": "(Char) Character to use as delimiter"}]}],

        "url": "http://www.craydent.com/library/1.9.3/docs#String.toCurrencyNotation",
        "returnType": "(String)"
    }|*/
    sep = sep || ",";
    var whole = this.toString(), fraction = "";
    if (sep != ".") {
        var part = whole.split('.');
        if (part.length > 1) {
            whole = part[0];
            fraction = '.'+part[1];
        }
    }
    return whole.replace(/\B(?=(\d{3})+(?!\d))/g, sep) + fraction;
}
function _trim(str, side, characters) {
    try {
        var temp = str,
            trimChars = {
                " ":1,
                "\t":1,
                "\n":1
            };
        if (characters) {
            if (_isArray(characters)) {
                var ch, i = 0;
                trimChars = {};
                while (ch = characters[i++]) {
                    trimChars[ch] = 1;
                }
            } else if (_isString(characters)) {
                trimChars = eval('({"'+__convert_regex_safe(characters)+'":1})');
            }
        }
        if (!side || side == 'l') {
            while (temp.charAt(0) in trimChars) {
                temp = temp.substring(1);
            }
        }
        if (!side || side == 'r') {
            while (temp.charAt(temp.length - 1) in trimChars) {
                temp = temp.substring(0, temp.length - 1);
            }
        }
        return temp.toString();
    } catch (e) {
        error("_trim", e);
    }
}
function _unwind(docs, path) {
    try {
        var results = [], doc, i = 0, options = {};
        if ($c.isObject(path)) {
            options = path;
            path = options.path;
        }
        while (doc = docs[i++]) {
            var arr = __processExpression(doc, path);
            if (isNull(arr) || $c.isArray(arr) && $c.isEmpty(arr)) {
                doc = $c.duplicate(doc);
                if (options.includeArrayIndex) {
                    doc[options.includeArrayIndex] = 0;
                }
                options.preserveNullAndEmptyArrays && results.push(doc);
                continue;
            }
            if (!$c.isArray(arr)) {
                //noinspection ExceptionCaughtLocallyJS
                throw "Exception: Value at end of $unwind field path '"+path+"' must be an Array, but is a " + (typeof arr).capitalize() +".";
            }
            if (path[0] == "$") {
                path = path.substr(1);
            }
            for (var j = 0, jlen = arr.length; j < jlen; j++) {
                var dup = $c.duplicate(doc);
                if (options.includeArrayIndex) {
                    dup[options.includeArrayIndex] = j;
                }
                $c.setProperty(dup, path, arr[j]);
                results.push(dup);
            }
        }
        return results;
    } catch (e) {
        error('aggregate._unwind', e);
    }
}
function _verb_payload_helper (variable, options) {
    this.raw = this.raw || "";
    if (!variable) { return this.rawData || this.raw; }
    this.rawData = this.rawData || {};
    if (!options) {
        return this.rawData[variable] === undefined ? false : this.rawData[variable];
    }

    if (options == 'i' || options.ignoreCase || options == "ignoreCase") {
        for (var prop in this.rawData) {
            if (!this.rawData.hasOwnProperty(prop)) { continue; }
            if (prop.toLowerCase() == variable.toLowerCase()) { return this.rawData[prop]; }
        }
        return false;
    }

    return this.raw[variable] || false;
}


/*----------------------------------------------------------------------------------------------------------------
 /-	Class prototypes
 /---------------------------------------------------------------------------------------------------------------*/

_ao = addObjectPrototype;
_df = _defineFunction;

/*----------------------------------------------------------------------------------------------------------------
 /-	Benchmark testing Class
 /---------------------------------------------------------------------------------------------------------------*/

/*----------------------------------------------------------------------------------------------------------------
 /-	CLI Class
 /---------------------------------------------------------------------------------------------------------------*/

/*----------------------------------------------------------------------------------------------------------------
 /-	Collection class
 /---------------------------------------------------------------------------------------------------------------*/


/*----------------------------------------------------------------------------------------------------------------
 /-	Ajax operations
 /---------------------------------------------------------------------------------------------------------------*/

/*----------------------------------------------------------------------------------------------------------------
 /-	helper operations
 /---------------------------------------------------------------------------------------------------------------*/
/*  $COOKIE
 *  options can have the properties:
 *      expiration : int
 *      path : string
 **/



/*timing functions*/




/*----------------------------------------------------------------------------------------------------------------
 /-	Browser helper operations
 /---------------------------------------------------------------------------------------------------------------*/


/*----------------------------------------------------------------------------------------------------------------
 /-	String class Extensions
 /---------------------------------------------------------------------------------------------------------------*/


/*----------------------------------------------------------------------------------------------------------------
 /-	Array class Extensions
 /---------------------------------------------------------------------------------------------------------------*/


/*----------------------------------------------------------------------------------------------------------------
 /-	Date class Extensions
 /---------------------------------------------------------------------------------------------------------------*/


/*----------------------------------------------------------------------------------------------------------------
 /-	Number class Extensions
 /---------------------------------------------------------------------------------------------------------------*/


/*----------------------------------------------------------------------------------------------------------------
/-	Function and Generator class Extensions
/---------------------------------------------------------------------------------------------------------------*/


/*----------------------------------------------------------------------------------------------------------------
 /-	RegExp class Extensions
 /---------------------------------------------------------------------------------------------------------------*/


/*----------------------------------------------------------------------------------------------------------------
 /-	Object class Extensions
 /---------------------------------------------------------------------------------------------------------------*/



// RTF converter
var control_words = ['\\'], rtf_delimiter = "";
function rftToHtml (text) {

}


