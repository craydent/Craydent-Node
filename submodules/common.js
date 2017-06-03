/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.8.2                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var _craydent_version = '0.8.2',
    $c = {};
global.$g = global;
$g.navigator = $g.navigator || {};

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


var t = require('craydent-typeof'),
    _isArray = t.isArray,
    _isString = t.isString,
    _isInt = t.isInt,
    _isFloat = t.isFloat,
    _isNumber = t.isNumber,
    _isBoolean = t.isBoolean,
    _isRegExp = t.isRegExp,
    _isDate = t.isDate,
    _isFunction = t.isFunction,
    _isPromise = t.isPromise,
    _isGenerator = t.isGenerator,
    _isAsync = t.isAsync,
    _isObject = t.isObject,
    isNull = t.isNull;

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

function _condense (objs, check_values) {
    try {
        var skip = [], arr = [], without = false;
        if (_isArray(check_values)) {
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
            obj !== "" && !isNull(obj) && !~(skip.indexOf && skip.indexOf(i) || _indexOf(skip, i)) && !isNull(obj) && arr.push(obj);
        }
        return arr;
    } catch (e) {
        error("_condence", e);
        return false;
    }
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
function _duplicate(obj, original, recursive/*, ref, current_path, exec*/) {
    try {
        if (_isString(obj) || _isString(original)
            || _isInt(obj) || _isInt(original)
            || _isFloat(obj) || _isFloat(original)
            || _isNumber(obj) || _isNumber(original)) {
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
                var index = _indexOfAlt(ref.objects,original[prop], function(obj,value){
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
                    } else { obj[prop] = tryEval(original[prop].toString()); }
                    ref.objects.push({obj:original[prop],path:new_path});
                    return _duplicate(obj[prop], original[prop], true, ref, new_path, arguments[argIndex+1]);
                }
            } else if (!original.hasOwnProperty(prop)) {
                return;
            }
            obj[prop] = original[prop];
        };
        if (_isArray(original)) {
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
function _ext (cls, property, func, override) {
    try {
        $g.__craydentNoConflict || (cls['prototype'][property] = cls['prototype'][property] || func);
        _defineFunction(property, func, override);
    } catch (e) {
        error('_ext', e);
    }
}
function _getFuncArgs (func) {
    try {
        return _condense(_trim(_strip(func.toString(), '(')).replace(/\s*/gi, '').replace(/\/\*.*?\*\//g,'').replace(/.*?\((.*?)\).*/, '$1').split(',')) || [];
    } catch (e) {
        error('_getFuncArgs', e);
    }
}
function _getGMTOffset (dt) {
    try {
        var diff = dt.getHours() - dt.getUTCHours();
        return diff - (diff <= 12 ? (diff <= 0 ? (diff <= -12 ? -24:0):0):24);
    } catch (e) {
        error('_getGMTOffset', e);
    }
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
function _indexOfAlt (value,option) {
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
        if (_isArray(this)) {
            var func = option;
            var len = this.length,
                i = 0;
            while (i < len) {
                if (_isRegExp(value) && value.test(this[i])) { return i; }
                if (_isFunction(func) && (value instanceof Object ? func(this[i], value) : func(this[i]) === value)) { return i; }
                ++i;
            }
            return -1;
        }
        if (_isString(this)) {
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
function _keyOf (obj,value) {
    /*|{
        "info": "Object class extension to get the key of the give value",
        "category": "Object",
        "parameters":[
            {"value": "(Mixed) Value to compare against"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.keyOf",
        "returnType": "(String)"
    }|*/
    try {
        for(var prop in this) {
            if(this.hasOwnProperty(prop)) {
                if(this[prop] === value)
                    return prop;
            }
        }
        return null;
    } catch (e) {
        error('Object.keyOf', e);
    }
}
function _merge (secondary, condition) {
    /*|{
        "info": "Object class extension to merge objects",
        "category": "Object",
        "parameters":[
            {"secondary": "(Object) Object to merge with"}],

        "overloads":[
            {"parameters":[
                {"secondary": "(Object) Object to merge with"},
                {"condition": "(Mixed) Flags to recurse, merge only shared value, clone, intersect etc"}]}],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.merge",
        "returnType": "(Object)"
    }|*/
    try {
        condition = condition || {};
        var recurse = condition == "recurse" || condition.recurse,
            shared = condition == "onlyShared" || condition.onlyShared,
            intersect = condition == "intersect" || condition.intersect,
            objtmp = (condition == "clone" || condition.clone) ? _duplicate(this,true) : this,
            compareFunction = _isFunction(condition) ? condition : condition.compareFunction,
            intersectObj = {};

        for (var prop in secondary) {
            if (secondary.hasOwnProperty(prop)) {
                if (intersect && objtmp.hasOwnProperty(prop)) {
                    intersectObj[prop] = secondary[prop];
                } else if (shared) {
                    // passing share Only
                    if (objtmp.hasOwnProperty(prop)) {
                        objtmp[prop] = secondary[prop];
                    }
                } else if (compareFunction && _isFunction(compareFunction)) {
                    if (_isArray(objtmp) && objtmp.hasOwnProperty(prop) && compareFunction(objtmp[prop], secondary[prop])) {
                        objtmp[prop] = secondary[prop];
                        continue;
                    }
                    objtmp.push(_duplicate(secondary[prop]));
                } else {
                    if (_isArray(objtmp) && (isNull(condition) || recurse)) {
                        if (!~objtmp.indexOf(secondary[prop])) {
                            objtmp.push(secondary[prop]);
                        }
                    } else if (recurse && (_isArray(objtmp[prop]) || _isObject(objtmp[prop])) && (_isArray(secondary[prop]) || _isObject(secondary[prop]))) {
                        objtmp[prop] = _merge(objtmp[prop],secondary[prop],condition);
                    } else {
                        objtmp[prop] = secondary[prop];
                    }
                }
            }
        }
        return intersect ? intersectObj : objtmp;
    } catch (e) {
        error('Object.merge', e);
    }
}
function _remove (obj, value, indexOf) {
    /*|{
        "info": "Array class extension to remove an item by value",
        "category": "Array",
        "parameters":[
            {"value": "(Mixed) Value to remove"}],

        "overloads":[
            {"parameters":[
                {"value": "(Mixed) Value to remove"},
                {"indexOf": "(Function) Callback function to use to find the item based on the value"}]}],

        "url": "http://www.craydent.com/library/1.9.3/docs#array.remove",
        "returnType": "(Mixed)"
    }|*/
    try {
        indexOf = indexOf || obj.indexOf;
        var index = indexOf.call(obj, value);
        if(!~index) { return false; }
        return obj.splice(index, 1)[0];
    } catch (e) {
        error("Array.remove", e);
    }
}
function _removeAll(obj, value, indexOf) {
    /*|{
    "info": "Array class extension to remove all items by value",
        "category": "Array",
        "parameters":[
            {"value": "(Mixed) Value to remove"}],

        "overloads":[
            {"parameters":[
                {"value": "(Mixed) Value to remove"},
                {"indexOf": "(Function) Callback function to use to find the item based on the value"}]}],

        "url": "http://www.craydent.com/library/1.9.3/docs#array.removeAll",
        "returnType": "(Array)"
    }|*/
    try {
        if (value) {
            indexOf = indexOf || obj.indexOf;
            var  removed = [], index = indexOf.call(obj, value);
            if (!~index) { return false; }
            while (~index && _isInt(index)) {
                removed.push(_remove(obj, value, indexOf));
                index = indexOf.call(obj, value);
            }
            return removed;
        }
        return obj.splice(0, obj.length);

    } catch (e) {
        error("Array.removeAll", e);
    }
}
function _replace_all(replace, subject, flag) {
    try {
        if (!_isArray(replace)){
            replace = [replace];
        }
        if (!_isArray(subject)) {
            subject = [subject];
        }
        var str = this, last = 0;
        for (var i = 0, len = replace.length; i < len; i++) {
            var rep = replace[i];
            var reg = new RegExp(__convert_regex_safe(rep), flag);
            if (!~str.search(val)) { continue; }
            str = str.replace(reg, subject[i] === undefined ? subject[last] : subject[i]);
            if (subject[last + 1]) { last++; }
        }
        return str.toString();
    } catch (e) {
        error("_replace_all", e);
    }
}
function _setProperty (path, value, delimiter, options) {
    /*|{
        "info": "Object class extension to set nested properties creating necessary property paths",
        "category": "Object",
        "parameters":[
            {"path": "(String) Path to nested property"},
            {"value": "(Mixed) Value to set"}],

        "overloads":[
            {"parameters":[
                {"path": "(String) Path to nested property"},
                {"value": "(Mixed) Value to set"},
                {"delimiter": "(Char) Separator used to parse path"}]},

            {"parameters":[
                {"path": "(String) Path to nested property"},
                {"delimiter": "(Char) Separator used to parse path"},
                {"value": "(Mixed) Value to set"},
                {"options": "(Object) Options for ignoring inheritance, validPath, etc"}]}],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.setProperty",
        "returnType": "(Bool)"
    }|*/
    try {
        options = options || {};
        delimiter = delimiter || ".";
        path = _strip(path, delimiter);
        var props = path.split(delimiter);
        var obj = this, i = 0, prop, len = props.length, pobj, pprop;
        while (prop = props[i++]) {
            if (i == len) {
                return obj[prop] = value, true;
            }
            if (pobj && pprop && !_isArray(pobj[pprop]) && parseInt(prop) >= 0) {
                var tmp = pobj[pprop];
                pobj[pprop] = [];
                for (var p in tmp) {
                    if (tmp.hasOwnProperty(p)) { pobj[p] = tmp[p]; }
                }
                obj = pobj[pprop];
            }
            obj[prop] = obj[prop] || {};
            pobj = obj;
            pprop = prop;
            obj = obj[prop];
        }
        return false;
    } catch (e) {
        error('Object.setProperty', e)
    }
}
function _strip (str, character) {
    try {
        return _trim(str, undefined, character);
    } catch (e) {
        error("_strip", e);
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
function _toSet () {
    /*|{
        "info": "Array class extension to convert the array to a set",
        "category": "Array",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#array.toSet",
        "returnType": "(Array)"
    }|*/
    try {
        for (var i = 0, len = this.length; i < len; i++) {
            var item = this[i];
            for (var j = i + 1; j < len; j++) {
                var citem = this[j];
                if (_equals(item,citem)) {
                    $c.removeAt(this,j--);
                    len--;
                }
            }
        }
    } catch (e) {
        error("Array.toSet", e);
        return false;
    }
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

function equals (compare, props) {
    /*|{
        "info": "Object class extension to check if object values are equal",
        "category": "Object",
        "parameters":[
            {"compare": "(Object) Object to compare against"}],

        "overloads":[
            {"parameters":[
                {"compare": "(Object) Object to compare against"},
                {"props": "(String[]) Array of property values to compare against"}]}],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.equals",
        "returnType": "(Bool)"
    }|*/
    try {
        if (_isArray(props)) {
            var j = 0;
            while (prop = props[j++]) {
                if (this.hasOwnProperty(prop) && compare.hasOwnProperty(prop) && !equals(this[prop],compare[prop])
                    || (!this.hasOwnProperty(prop) && compare.hasOwnProperty(prop)) || (this.hasOwnProperty(prop) && !compare.hasOwnProperty(prop))) {
                    return false;
                }
            }
            return true;
        }
        if ((_isObject(this) && _isObject(compare)) || (_isArray(this) && _isArray(compare))) {
            for (var prop in compare){
                if (!compare.hasOwnProperty(prop)) { continue; }
                if (!equals(this[prop], compare[prop])) { return false; }
            }
            for (var prop in this){
                if (!this.hasOwnProperty(prop)) { continue; }
                if (!equals(this[prop], compare[prop])) { return false; }
            }
            return true;
        }
        if (this === undefined && compare !== undefined || this !== undefined && compare === undefined) { return false; }
        if (this === null && compare !== null || this !== null && compare === null) { return false; }
        if (_isRegExp(compare)) { return compare.test(this.toString()); }
        return (this.toString() == compare.toString() && this.constructor == compare.constructor);
    } catch (e) {
        error('Object.equals', e);
    }
}
function logit(){
    /*|{
        "info": "Log to console when DEBUG_MODE is true and when the console is available",
        "category": "Global",
        "parameters":[
            {"infinite": "any number of arguments can be passed."}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#logit",
        "returnType": "(void)"
    }|*/
    try {
        var location = "", err = new Error(), args = [];

        $c.VERBOSE_LOGS && err.stack && (location = "\t\t\t\t    " + err.stack.split('\n')[2]);
        for (var i = 0, len = arguments.length; i < len; i++) { args.push( arguments[i]); }
        if ($c.VERBOSE_LOGS) { args.push(location); }
        cout.apply(this, arguments);
    } catch (e) {
        error('logit', e);
    }
}
function namespace (name, clazz, fn) {
    /*|{
        "info": "Adds the class to a namespace instead of the global space",
        "category": "Global",
        "parameters":[
            {"name":"(String) Name of the namespace to add to."},
            {"clazz":"(Class) Class to add to the given namespace"}],

        "overloads":[
            {"parameters":[
                {"name":"(String) Name of the namespace to add to."},
                {"clazz":"(Class) Class to add to the given namespace"},
                {"fn":"(Function) Method to call after the class has been added to the namespace"}]}],

        "url": "http://www.craydent.com/library/1.9.3/docs#namespace",
        "returnType":"(void)"
    }|*/
    try {
        var className = $c.getName(clazz);
        $c.namespaces = $c.namespaces || {};
        $c.namespaces[className] = namespace[className] || clazz;
        _setProperty($c.namespaces, name + "." + className, clazz);
        !$g.__craydentNoConflict && ($g[name] = ($g[name] || "") + clazz.toString());
        fn && fn.call(clazz);
        return clazz;
    } catch (e) {
        error('namespace', e);
    }
}
function parseBoolean(value) {
    /*|{
        "info": "Try to parse value to a Boolean",
        "category": "Global",
        "parameters":[
            {"value": "(Mixed) value to parse as boolean"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#parseBoolean",
        "returnType": "(Mixed)"
    }|*/
    try {
        if (_isString(value)) {
            value = value.toLowerCase();
            return (value == "true" ? true : value == "false" ? false : value == "1" ? true : value == "0" ? false : undefined);
        } else if (_isNumber(value)) {
            return (value === 1 ? true : value === 0 ? false : undefined);
        } else if (_isBoolean(value)) {
            return value;
        }
        return undefined;
    } catch (e) {
        error('parseBoolean', e);
    }
}
function parseRaw(value, skipQuotes, saveCircular, __windowVars, __windowVarNames) {
    /*|{
        "info": "Creates an evaluable string",
        "category": "Global",
        "parameters":[
            {"value": "value to parse"}],

        "overloads":[
            {"parameters":[
                {"value": "(Mixed) Value to parse"},
                {"skipQuotes": "(Bool) Flag to skip quotes for strings"},
                {"saveCircular": "(Bool) Flag to save circular references"}]}],

        "url": "http://www.craydent.com/library/1.9.3/docs#parseRaw",
        "returnType": "(String)"
    }|*/
    try {
        if (isNull(value)) { return value + ""; }
        var raw = "";
        if (_isString(value)) {
            raw = (!skipQuotes ? "\"" + _replace_all(value,'"','\\"') + "\"" : value);
        } else if (_isArray(value)) {
            var tmp = [];
            for (var i = 0, len = value.length; i < len; i++) {
                tmp[i] = parseRaw(value[i], skipQuotes, saveCircular, __windowVars, __windowVarNames);
            }
            raw = "[" + tmp.join(',') + "]";
        } else if (_isDate(value)) {
            return "new Date('" + value.toString() + "')";
        } else if (_isRegExp(value)) {
            return value.toString();
        } else if (value instanceof Object && !_isFunction(value) && !_isGenerator(value) && !_isAsync(value)) {
            if (!__windowVars) {
                __windowVars = [];
                __windowVarNames = [];
                if (saveCircular) {
                    for (var prop in $g) {
                        if (!$g.hasOwnProperty(prop)) { continue; }
                        if (value.hasOwnProperty(prop)) {
                            __windowVars.push($g[prop]);
                            __windowVarNames.push(prop);
                        }
                    }
                }
            }
            var index = __windowVars.indexOf(value);
            if (!~index) {
                if (saveCircular) {
                    __windowVars.push(value);
                    __windowVarNames.push(suid());
                }
                raw = "{";
                var sliceit = false;
                for (var prop in value) {
                    if (value.hasOwnProperty(prop)) {
                        sliceit = true;
                        raw += "\"" + prop + "\": " + parseRaw(value[prop], skipQuotes, saveCircular, __windowVars, __windowVarNames) + ",";
                    }
                }
                raw = (sliceit ? raw.slice(0,-1) : raw) + "}";
            } else {
                if (!saveCircular) {
                    raw = "{}";
                } else {
                    raw = "$g['" + __windowVarNames[index ] +"']";
                }
            }
        } else {
            raw = value.toString();
        }
        return raw;
    } catch (e) {
        error('parseRaw', e);
    }
}
function rand(num1, num2, inclusive) {
    /*|{
        "info": "Create a random number between two numbers",
        "category": "Global",
        "parameters":[
            {"num1": "(Number) Lower bound"},
            {"num2": "(Number) Upper bound"}],

        "overloads":[
            {"parameters":[
                {"num1": "(Number) Lower bound"},
                {"num2": "(Number) Upper bound"},
                {"inclusive": "(Bool) Flag to include the given numbers"}]}],

        "url": "http://www.craydent.com/library/1.9.3/docs#rand",
        "returnType": "(Number)"
    }|*/
    try {
        var val = (num2 - num1) * Math.random() + num1;
        if (inclusive) {
            if(val == Math.max(num1,num2)) {
                val -= 0.1
            } else if (val == Math.min(num1,num2)) {
                val += 0.1
            }
        }
        return val;
    } catch (e) {
        error('rand', e);
    }
}
function syncroit(gen) {
    /*|{
    "info": "Generator based control flow to allow for more \"syncronous\" programing structure",
    "category": "Global",
    "parameters":[
        {"gen": "(GeneratorFunction) Generator function to execute"}],

    "overloads":[{
        "parameters":[
            {"async": "(AsyncFunction) Async function to execute"}]}],

    "url": "http://www.craydent.com/library/1.9.3/docs#syncroit",
    "returnType": "(Promise)"
    }|*/
    try {
        if (_isAsync(gen)) { return gen(); }
        return new Promise(function(res){
            var geno = gen();
            try {
                _isGenerator(gen) && (function cb(value) {
                    var obj = geno.next(value);

                    if (!obj.done) {
                        if (_isPromise(obj.value)) {
                            return obj.value.then(cb).catch(cb);
                        }
                        setTimeout(function () {
                            cb(obj.value);
                        }, 0);
                    } else {
                        res(isNull(obj.value, value));
                    }
                })();
            } catch(e) {
                if (process.listenerCount('uncaughtException')) {
                    return process.emit('uncaughtException', e);
                }
                throw e;
            }
        });

    } catch (e) {
        error('syncroit', e);
        throw e;
    }
}
function suid(length) {
    /*|{
        "info": "Creates a short Craydent/Global Unique Identifier",
        "category": "Global",
        "parameters":[],

        "overloads":[
            {"parameters":[
            {"length": "(Integer) Custom length of the short unique identifier"}]}],

        "url": "http://www.craydent.com/library/1.9.3/docs#suid",
        "returnType": "(String)"
    }|*/
    try {
        //noinspection CommaExpressionJS
        length = length || 10;
        var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", id = "";
        while (id.length < length) {
            id += chars[parseInt(rand(0,62))];
        }

        return id;
    } catch (e) {
        error('suid', e);
    }
}
function tryEval(expression, evaluator) {
    /*|{
        "info": "Evaluates an expression without throwing an error",
        "category": "Global",
        "parameters":[
            {"expression": "(Mixed) Expression to evaluate"}],

        "overloads":[
            {"parameters":[
                {"expression": "(Mixed) Expression to evaluate"},
                {"evaluator": "(Function) Method to use to evaluate the expression"}]}],

        "url": "http://www.craydent.com/library/1.9.3/docs#tryEval",
        "returnType": "(Mixed)"
    }|*/
    try {
        var value;
        if (evaluator) { value = evaluator(expression); }
        else { value = eval(expression); }
        if (value === undefined && expression != "undefined") {
            throw '';
        }
        return value;
    } catch(e) {
        try {
            return eval("("+expression+")");
        } catch(e) {
            return null;
        }
    }
}

module.exports.$c = $c;

module.exports.condense = _condense;
module.exports.convert_regex_safe = __convert_regex_safe;
module.exports.defineFunction = _defineFunction;
module.exports.duplicate = _duplicate;
module.exports.ext = _ext;
module.exports.equals = equals;
module.exports.getFuncArgs = _getFuncArgs;
module.exports.getGMTOffset = _getGMTOffset;
module.exports.indexOf = _indexOf;
module.exports.indexOfAlt = _indexOfAlt;
module.exports.keyOf = _keyOf;
module.exports.logit = logit;
module.exports.merge = _merge;
module.exports.namespace = namespace;
module.exports.parseBoolean = parseBoolean;
module.exports.rand = rand;
module.exports.strip = _strip;
module.exports.trim = _trim;
module.exports.toCurrencyNotation = _toCurrencyNotation;
module.exports.toSet = _toSet;
module.exports.removeAll = _removeAll;
module.exports.remove = _remove;
module.exports.setProperty = _setProperty;
module.exports.syncroit = syncroit;
module.exports.tryEval = tryEval;

//TODO: insertAt



