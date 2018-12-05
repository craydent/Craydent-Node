/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.9.0                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var $s = require('./dependencies/common')(),
    $c = $s.$c,
    error = $s.error,
    __GLOBALSESSION = [];

if (!$c.MODULES_LOADED[$s.info.name]) {
    $s.__log_module();
    $s.scope.eval = function (str) { return eval(str); };

    $s.TEMPLATE_VARS = $c.TEMPLATE_VARS || $s.TEMPLATE_VARS;
    $s.TEMPLATE_TAG_CONFIG = $c.TEMPLATE_TAG_CONFIG || $s.TEMPLATE_TAG_CONFIG;

    require($s.dir + 'fillTemplate')($s);
    require($s.dir + 'include')($s);
    require($s.dir + 'isValidDate')($s);
    require($s.dir + 'itemCount')($s);
    require($s.dir + 'logit')($s);
    require($s.dir + 'mkdirRecursive')($s);
    require($s.dir + 'parseBoolean')($s);
    require($s.dir + 'where')($s);

    function Craydent(req, res) {
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
        this._sessionFileCreateAndRetrieve = _sessionFileCreateAndRetrievefunction;
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

        // this.PAGE_NAME = (function () {
        //     var pn = self.$l.href.substring(self.$l.href.lastIndexOf('/') + 1).replace(/([^#^?]*).*/gi, '$1');
        //     return !pn || !~pn.indexOf('.') ? "index.html" : pn;
        // })();
        // this.PAGE_NAME_RAW = (function () {
        //     var pn = self.$l.href.substring(self.$l.href.lastIndexOf('/') + 1).replace(/(.*)?\?.*/gi, '$1');
        //     return !pn || !~pn.indexOf('.') ? "index.html" : pn;
        // })();
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
        this.CORES_SUPPORT = true;
        this.DEBUG_MODE = $c.DEBUG_MODE = $c.DEBUG_MODE || !!this.$GET("debug");
        this.EXPOSE_ROUTE_API = $c.EXPOSE_ROUTE_API;
        this.FIREFOX = this.isFirefox();
        this.FIREFOX_VERSION = this.FirefoxVersion();
        this.FIREFOX = this.isFirefox();
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
        this.WEBKIT = this.isWebkit();
        this.WINDOWS = this.isWindows();
        this.WINDOWS_MOBILE = this.isWindowsMobile();

        return this;
    }
    $c.TEMPLATE_VARS = $c.TEMPLATE_VARS || $s.TEMPLATE_VARS;
    $c.TEMPLATE_TAG_CONFIG = $c.TEMPLATE_TAG_CONFIG || $s.TEMPLATE_TAG_CONFIG;
    $c.RESPONSES = {
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
    $c.HTTP_STATUS_TEMPLATE = $c.HTTP_STATUS_TEMPLATE || [];
    $c.REST_API_TEMPLATE = $c.REST_API_TEMPLATE || "<html><head></head><body>" +
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
    $c.ROUTE_API_PATH = $c.ROUTE_API_PATH || '/craydent/api/docs';
    $c.ROUTE_LOGO_URL = $c.ROUTE_LOGO_URL || "http://www.craydent.com/craydent-logo.svg";
    $c.EXPOSE_ROUTE_API = $c.EXPOSE_ROUTE_API || false;

    function __rest_docs(req,res,params){
        var routes = {
            all:$s.where(this.server.routes.all,{path:{$ne:"/craydent/api/docs"}},{path:1,parameters:[]}),
            delete:$s.where(this.server.routes.delete,{path:{$ne:"/craydent/api/docs"}},{path:1,parameters:[]}),
            get:$s.where(this.server.routes.get,{path:{$ne:"/craydent/api/docs"}},{path:1,parameters:[]}),
            post:$s.where(this.server.routes.post,{path:{$ne:"/craydent/api/docs"}},{path:1,parameters:[]}),
            put:$s.where(this.server.routes.put,{path:{$ne:"/craydent/api/docs"}},{path:1,parameters:[]})
        };
        if(req.method.toLowerCase() == "post" || params.f == 'json'){
            return this.send(routes);
        }
        params.logo_url = $c.ROUTE_LOGO_URL;
        this.header({'Content-Type': 'text/html'},200);
        this.end($s.fillTemplate($c.REST_API_TEMPLATE,$s.merge(routes,params)));

    }
    function __set_path (verb, http, path, callback) {
        try {
            callback = callback || [];
            if($s.isFunction(callback) || $s.isGenerator(callback) || $s.isAsync(callback)) { callback = [callback]; }
            if (!$s.isArray(path)) { path = [path]; }
            for (var i = 0, len = path.length; i < len; i++) {
                var route = path[i];
                if ($s.isString(route)) {
                    route = {path: route, callback: callback, method: verb};
                } else if (callback) {
                    route.callback = route.callback || [];
                    if ($s.isFunction(route.callback) || $s.isGenerator(route.callback) || $s.isAsync(route.callback)) {
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

                var csession = this._sessionFileCreateAndRetrieve(dir, path, sync, function(retrievedSession){
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
    function _sessionFileCreateAndRetrievefunction (dir, path, sync, callback) {
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
                return $s.tryEval(fs.readFileSync(path).toString()) || {};
            }
            fs.exists(path, function (exists) {
                if (!exists) {
                    // create all missing parent directories async then create the file
                    return $s.mkdirRecursive(dir, function () { fs.open(path, 'w+', function () { callback({}); }); });
                }
                fs.readFile(path, function (err, data) { callback($s.tryEval(data)); });
            });

        } catch (e) {
            error('_sessionFileCreateAndRetrieve', e);
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

    function $COOKIE(key, value, options) {
        /*|{
            "info": "Get/set Cookies",
            "category": "HTTP",
            "featured": true,
            "parameters":[
                {"key": "(String) Key for cookie value"},
                {"option?": "(CookieOptions) Specify delete"}],

            "overloads":[
                {"parameters":[
                    {"keyValue": "(Object) Specify the key value pair: key=>property, value=>object[key]"},
                    {"option?": "(CookieOptions) Specify path, domain, and/or expiration of cookie"}]},

                {"parameters":[
                    {"key": "(String) Key for cookie value"},
                    {"value": "(any) Value to store"},
                    {"option?": "(CookieOptions) Specify path and/or expiration of cookie"}]}],

            "url": "http://www.craydent.com/library/1.9.3/docs#$COOKIE",
            "returnType": "(String|Bool)"
        }|*/
        try {
            options = options || {};
            var c = $s.getProperty(this, 'request.headers.cookie');
            options.cookie && (c = options.cookie);
            if($s.isObject(key)) {
                options = value;
                for (var prop in key) {
                    if (!key.hasOwnProperty(prop)) { continue; }
                    value.push(JSON.stringify(key[prop]));
                    keys.push(prop);
                }
            } else if (arguments.length > 1) {
                keys.push(key);
                values.push(JSON.stringify(value));
            }

            var path = "", domain = "";
            if (!c && !values.length) { return {}; }
            if (options.path && $s.isString(options.path)) { path = 'path=' + (options.path || '/') + ';' }
            if (options.domain && $s.isString(options.domain)) { domain = 'domain=' + options.domain + ';' }
            if (options["delete"]) {
                this.response.setHeader("Set-Cookie", [key + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;' + path + domain]);
                return true;
            }

            if (values.length) {
                var expires = "";
                if ($s.isInt(options.expiration)) {
                    var dt = new Date();
                    dt.setDate(dt.getDate() + options.expiration);
                    expires = ";expires=" + dt.toUTCString();
                }
                for (var j = 0, jlen = keys.length; j < jlen; j++) {
                    this.response.setHeader("Set-Cookie", [encodeURIComponent(keys[j]) + "=" + encodeURIComponent(values[j]) + expires + path + domain]);
                }
                return true;
            }
            var cookies = {},
                arr = c.split(/[,;]/);
            for (var i = 0, len = arr.length; i < len; i++) {
                var cookie = arr[i];
                var parts = cookie.split(/=/, 2),
                    name = decodeURIComponent(parts[0] && parts[0].ltrim && parts[0].ltrim() || ""),
                    value = parts.length > 1 ? decodeURIComponent($s.rtrim(parts[1])) : null;
                cookies[name] = $s.tryEval(value) || value;
                if (key && key == name) {
                    return cookies[name];
                }
            }

            if (key) { return false; }
            return cookies;
        } catch (e) {
            error('$COOKIE', e);
        }
    }
    function $DELETE(variable, options) {
        /*|{
            "info": "Retrieve all or specific variables in the Body",
            "category": "HTTP",
            "featured": true,
            "parameters":[],

            "overloads":[
                {"parameters":[
                    {"key": "(String) key for query value"},
                    {"options?": "(VerbOptionsTypes|VerbOptions) Options to defer, ignore case, etc"}]}],

            "url": "http://www.craydent.com/library/1.9.3/docs#$DELETE",
            "returnType": "(Bool|Object)"
        }|*/
        try {
            return _verb_payload_helper.call(this, variable, options);
        } catch (e) {
            error('$DELETE', e);
        }
    }
    function $DEL () {
        /*|{
            "info": "Retrieve all or specific variables in the Body",
            "category": "HTTP",
            "featured": true,
            "parameters":[],

            "overloads":[
                {"parameters":[
                    {"key": "(String) key for query value"},
                    {"options?": "(VerbOptionsTypes|VerbOptions) Options to defer, ignore case, etc"}]}],

            "url": "http://www.craydent.com/library/1.9.3/docs#$DEL",
            "returnType": "(Bool|Object)"
        }|*/
        return $DELETE.apply(this,arguments);
    }
    function $GET(variable, options) {
        /*|{
            "info": "Retrieve all or specific variables in the url",
            "category": "HTTP",
            "featured": true,
            "parameters":[],

            "overloads":[
                {"parameters":[
                    {"key": "(String) key for query value"},
                    {"options?": "(GetOptions|VerbOptionsTypes|String) Options to defer, ignore case, etc"}]}],

            "url": "http://www.craydent.com/library/1.9.3/docs#$GET",
            "returnType": "(Bool|Object)"
        }|*/
        try {
            options = options || {};
            if (!variable) {
                var search = this.$l.search || "";
                var hash = this.$l.hash || "";
                if (options.url) {
                    var index = -1;
                    if (~(index = url.indexOf("#"))) {
                        hash = url.substring(index);
                        search = url.substring(0,index);
                    }
                    if (~(index = url.indexOf("?"))) {
                        search = url.substring(index);
                    }
                }
                var allkeyvalues = {},
                    mapFunc = function(value){
                        if (value == "") { return; }
                        var keyvalue = value.split('='),
                            len = keyvalue.length;
                        if (len > 2) {
                            for (var i = 2, len = keyvalue.length; i < len; i++) {
                                keyvalue[1] += keyvalue[i];
                            }
                        }
                        return allkeyvalues[keyvalue[0]] = keyvalue[1];
                    };

                (search[0] == "?" ? search.substr(1) :search).split('&').map(mapFunc);
                (hash[0] == "#" ? hash.substr(1) : hash).split('@').map(mapFunc);
                return allkeyvalues;
            }
            var ignoreCase = options.ignoreCase || options == "ignoreCase" ? "i" : "",
                regex = new RegExp("[\?|&|@]?" + variable + "=", ignoreCase),
                attr = "search",
                location = {};
            location.hash = this.$l.hash;
            location.search = this.$l.search;

            if (options.url || $s.isString && ($s.isString(options) && (~options.indexOf("?") || ~options.indexOf("#")))) {
                var query = options.url || options,
                    hindex, qindex = query.indexOf("?");

                ~qindex && (query = query.substr(qindex));

                hindex = query.indexOf("#");
                if (~hindex) {
                    location.hash = query.substr(hindex);
                    query = query.substr(0,hindex);
                }
                location.search = query;
            }
            if (regex.test(location.hash)) {
                attr = 'hash';
            } else if (!regex.test(location.search)){
                return false;
            }
            regex = new RegExp('(.*)?(' + variable +'=)(.*?)(([&]|[@])(.*)|$)', ignoreCase);
            return decodeURI(location[attr].replace(regex, '$3'));
        } catch (e) {
            error('$GET', e);
        }
    }
    function $HEADER(variable, options) {
        /*|{
            "info": "Retrieve all or specific variables in the headers",
            "category": "HTTP",
            "featured": true,
            "parameters":[],

            "overloads":[
                {"parameters":[
                    {"key": "(String) key for query value"},
                    {"options?": "(VerbOptionsTypes|VerbOptions) Options to defer, ignore case, etc"}]}],

            "url": "http://www.craydent.com/library/1.9.3/docs#$HEADER",
            "returnType": "(Bool|Object)"
        }|*/
        try {
            this.request.headers = this.request.headers || {};

            if (!variable) { return this.request.headers; }
            if (!options) { return this.request.headers[variable] === undefined ? false : this.request.headers[variable]; }

            if (options == 'i' || options.ignoreCase || options == "ignoreCase") {
                for (var prop in this.request.headers) {
                    if (!this.request.headers.hasOwnProperty(prop)) { continue; }
                    if (prop.toLowerCase() == variable.toLowerCase()) { return this.request.headers[prop]; }
                }
            }
            return false;
        } catch (e) {
            error('$HEADER', e);
        }
    }
    function $PAYLOAD(variable, options) {
        /*|{
            "info": "Retrieve all or specific variables in the Body",
            "category": "HTTP",
            "featured": true,
            "parameters":[],

            "overloads":[
                {"parameters":[
                    {"key": "(String) key for query value"},
                    {"options?": "(VerbOptionsTypes|VerbOptions) Options to defer, ignore case, etc"}]}],

            "url": "http://www.craydent.com/library/1.9.3/docs#$PAYLOAD",
            "returnType": "(Bool|Object)"
        }|*/
        try {
            return _verb_payload_helper.call(this, variable, options);
        } catch (e) {
            error('$PAYLOAD', e);
        }
    }
    function $POST(variable, options) {
        /*|{
            "info": "Retrieve all or specific variables in the Body",
            "category": "HTTP",
            "featured": true,
            "parameters":[],

            "overloads":[
                {"parameters":[
                    {"key": "(String) key for query value"},
                    {"options?": "(VerbOptionsTypes|VerbOptions) Options to defer, ignore case, etc"}]}],

            "url": "http://www.craydent.com/library/1.9.3/docs#$POST",
            "returnType": "(Bool|Object)"
        }|*/
        try {
            return _verb_payload_helper.call(this, variable, options);
        } catch (e) {
            error('$POST', e);
        }
    }
    function $PUT(variable, options) {
        /*|{
            "info": "Retrieve all or specific variables in the Body",
            "category": "HTTP",
            "featured": true,
            "parameters":[],

            "overloads":[
                {"parameters":[
                    {"key": "(String) key for query value"},
                    {"options?": "(VerbOptionsTypes|VerbOptions) Options to defer, ignore case, etc"}]}],

            "url": "http://www.craydent.com/library/1.9.3/docs#$PUT",
            "returnType": "(Bool|Object)"
        }|*/
        try {
            return _verb_payload_helper.call(this, variable, options);
        } catch (e) {
            error('$PUT', e);
        }
    }

    function ChromeVersion (){
        /*|{
            "info": "Get Chrome version",
            "category": "HTTP",
            "parameters":[],

            "overloads":[],

            "url": "http://www.craydent.com/library/1.9.3/docs#ChromeVersion",
            "returnType": "(Float)"
        }|*/
        try {
            return _getBrowserVersion.call(this, "Chrome");
        } catch(e){
            error('ChromeVersion', e);
        }
    }
    function FirefoxVersion (){
        /*|{
            "info": "Get Firefox version",
            "category": "HTTP",
            "parameters":[],

            "overloads":[],

            "url": "http://www.craydent.com/library/1.9.3/docs#FirefoxVersion",
            "returnType": "(Float)"
        }|*/
        try {
            return _getBrowserVersion.call(this, "Firefox");
        } catch(e){
            error('FirefoxVersion', e);
        }
    }
    function IEVersion () {
        /*|{
            "info": "Get Internet Explorer version",
            "category": "HTTP",
            "parameters":[],

            "overloads":[],

            "url": "http://www.craydent.com/library/1.9.3/docs#IEVersion",
            "returnType": "(Float)"
        }|*/
        try {
            var rv = -1;
            if (this.navigator.appName == 'Microsoft Internet Explorer') {
                var ua = this.navigator.userAgent,
                    re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
                if (re.exec(ua) != null) { rv = parseFloat(RegExp.$1); }
            }
            return rv;
        } catch (e) {
            error('IEVersion', e);
        }
    }
    function OperaVersion (){
        /*|{
            "info": "Get Opera version",
            "category": "HTTP",
            "parameters":[],

            "overloads":[],

            "url": "http://www.craydent.com/library/1.9.3/docs#OperaVersion",
            "returnType": "(Float)"
        }|*/
        try {
            return _getBrowserVersion.call(this, "Opera");
        } catch(e){
            error('OperaVersion', e);
        }
    }
    function SafariVersion (){
        /*|{
            "info": "Get Safari version",
            "category": "HTTP",
            "parameters":[],

            "overloads":[],

            "url": "http://www.craydent.com/library/1.9.3/docs#SafariVersion",
            "returnType": "(Float)"
        }|*/
        try {
            return this.isChrome() ? -1 : _getBrowserVersion.call(this, "Safari");
        } catch(e){
            error('SafariVersion', e);
        }
    }
    function isAmaya() {
        /*|{
            "info": "Check if browser is Amaya",
            "category": "HTTP",
            "parameters":[],

            "overloads":[],

            "url": "http://www.craydent.com/library/1.9.3/docs#isAmaya",
            "returnType": "(Bool)"
        }|*/
        try {
            return (/amaya/i.test(this.navigator.userAgent));
        } catch (e) {
            error('isAmaya', e);
        }
    }
    function isAndroid(){
        /*|{
            "info": "Check if device is Android",
            "category": "HTTP",
            "parameters":[],

            "overloads":[],

            "url": "http://www.craydent.com/library/1.9.3/docs#isAndroid",
            "returnType": "(Bool)"
        }|*/
        try {
            return (/android/i.test(this.navigator.userAgent));
        } catch (e) {
            error('isAndroid', e);
        }
    }
    function isBlackBerry() {
        /*|{
            "info": "Check if device is BlackBerry",
            "category": "HTTP",
            "parameters":[],

            "overloads":[],

            "url": "http://www.craydent.com/library/1.9.3/docs#isBlackBerry",
            "returnType": "(Bool)"
        }|*/
        try {
            return (/blackberry/i.test(this.navigator.userAgent));
        } catch (e) {
            error('isBlackBerry', e);
        }
    }
    function isChrome(){
        /*|{
            "info": "Check if browser is Chrome",
            "category": "HTTP",
            "parameters":[],

            "overloads":[],

            "url": "http://www.craydent.com/library/1.9.3/docs#isChrome",
            "returnType": "(Bool)"
        }|*/
        try {
            return (/chrome/i.test(this.navigator.userAgent));
        } catch(e){
            error('isChrome', e);
        }
    }
    function isFirefox(){
        /*|{
            "info": "Check if browser is Firefox",
            "category": "HTTP",
            "parameters":[],

            "overloads":[],

            "url": "http://www.craydent.com/library/1.9.3/docs#isFirefox",
            "returnType": "(Bool)"
        }|*/
        try {
            var nu = this.navigator.userAgent;
            return (!/chrome/i.test(nu)
            && !/apple/i.test(nu)
            && !/opera/i.test(nu)
            && /firefox/i.test(nu));
        } catch(e){
            error('isFirefox', e);
        }
    }
    function isGecko() {
        /*|{
            "info": "Check if engine is Gecko",
            "category": "HTTP",
            "parameters":[],

            "overloads":[],

            "url": "http://www.craydent.com/library/1.9.3/docs#isGecko",
            "returnType": "(Bool)"
        }|*/
        try {
            return !this.isWebkit() && !this.isKHTML() && (/gecko/i.test(this.navigator.userAgent));
        } catch (e) {
            error('isGecko', e);
        }
    }
    function isIE6() {
        /*|{
            "info": "Check if browser is Internet Explorer 6",
            "category": "HTTP",
            "parameters":[],

            "overloads":[],

            "url": "http://www.craydent.com/library/1.9.3/docs#isIE6",
            "returnType": "(Bool)"
        }|*/
        try {
            var rv = IEVersion.call(this);
            return (~rv && rv < 7.0);
        } catch (e) {
            error('isIE6', e);
        }
    }
    function isIE() {
        /*|{
            "info": "Check if browser is Internet Explorer",
            "category": "HTTP",
            "parameters":[],

            "overloads":[],

            "url": "http://www.craydent.com/library/1.9.3/docs#isIE",
            "returnType": "(Bool)"
        }|*/
        try {
            return (!!~IEVersion.call(this));
        } catch (e) {
            error('isIE', e);
        }
    }
    function isIPad() {
        /*|{
            "info": "Check if device is iPad",
            "category": "HTTP",
            "parameters":[],

            "overloads":[],

            "url": "http://www.craydent.com/library/1.9.3/docs#isIPad",
            "returnType": "(Bool)"
        }|*/
        try {
            return (/iPad|iPhone OS 3_[1|2]_2/i.test(this.navigator.userAgent));
        } catch (e) {
            error('isIPad', e);
        }
    }
    function isIPhone(){
        /*|{
            "info": "Check if device is IPhone",
            "category": "HTTP",
            "parameters":[],

            "overloads":[],

            "url": "http://www.craydent.com/library/1.9.3/docs#isIphone",
            "returnType": "(Bool)"
        }|*/
        try{
            return !this.isIPad() && /iphone/i.test(this.navigator.userAgent);
        } catch (e) {
            error('isIPhone', e);
        }
    }
    function isIPod() {
        /*|{
            "info": "Check if device is IPod",
            "category": "HTTP",
            "parameters":[],

            "overloads":[],

            "url": "http://www.craydent.com/library/1.9.3/docs#isIPod",
            "returnType": "(Bool)"
        }|*/
        try {
            return (/ipod/i.test(this.navigator.userAgent));
        } catch (e) {
            error('isIPod', e);
        }
    }
    function isKHTML() {
        /*|{
            "info": "Check if engine is KHTML",
            "category": "HTTP",
            "parameters":[],

            "overloads":[],

            "url": "http://www.craydent.com/library/1.9.3/docs#isKHTML",
            "returnType": "(Bool)"
        }|*/
        try {
            return !this.isWebkit() && (/khtml/i.test(this.navigator.userAgent));
        } catch (e) {
            error('isKHTML', e);
        }
    }
    function isLinux(){
        /*|{
            "info": "Check if OS is Linux",
            "category": "HTTP",
            "parameters":[],

            "overloads":[],

            "url": "http://www.craydent.com/library/1.9.3/docs#isLinux",
            "returnType": "(Bool)"
        }|*/
        try{
            return /linux/i.test(this.navigator.platform);
        } catch (e) {
            error('isLinux', e);
        }
    }
    function isMac(){
        /*|{
            "info": "Check if OS is Mac Based",
            "category": "HTTP",
            "parameters":[],

            "overloads":[],

            "url": "http://www.craydent.com/library/1.9.3/docs#isMac",
            "returnType": "(Bool)"
        }|*/
        try{
            return /mac/i.test(this.navigator.platform);
        } catch (e) {
            error('isMac', e);
        }
    }
    function isMobile(){
        /*|{
            "info": "Check if the device is a Mobile device",
            "category": "HTTP",
            "parameters":[],

            "overloads":[],

            "url": "http://www.craydent.com/library/1.9.3/docs#isMobile",
            "returnType": "(Bool)"
        }|*/
        try{
            return this.isAndroid() || this.isBlackBerry() || this.isIPad() || this.isIPhone() || this.isIPod() || this.isPalmOS() || this.isSymbian() || this.isWindowsMobile();
        } catch (e) {
            error('isMobile', e);
        }
    }
    function isOpera(){
        /*|{
            "info": "Check if browser is Opera",
            "category": "HTTP",
            "parameters":[],

            "overloads":[],

            "url": "http://www.craydent.com/library/1.9.3/docs#isOpera",
            "returnType": "(Bool)"
        }|*/
        try {
            var nu = this.navigator.userAgent;
            return /chrome/i.test(nu)
                && /apple/i.test(nu)
                && /opera/i.test(nu);
        } catch(e){
            error('isOpera', e);
        }
    }
    function isPalmOS(){
        /*|{
            "info": "Check if OS is PalmOS",
            "category": "HTTP",
            "parameters":[],

            "overloads":[],

            "url": "http://www.craydent.com/library/1.9.3/docs#isPalmOS",
            "returnType": "(Bool)"
        }|*/
        try {
            return (/palm/i.test(this.navigator.userAgent));
        } catch (e) {
            error('isIPad', e);
        }
    }
    function isPresto() {
        /*|{
            "info": "Check if engine is Presto",
            "category": "HTTP",
            "parameters":[],

            "overloads":[],

            "url": "http://www.craydent.com/library/1.9.3/docs#isPresto",
            "returnType": "(Bool)"
        }|*/
        try {
            return (/presto/i.test(this.navigator.userAgent));
        } catch (e) {
            error('isPresto', e);
        }
    }
    function isPrince() {
        /*|{
            "info": "Check if engine is Prince",
            "category": "HTTP",
            "parameters":[],

            "overloads":[],

            "url": "http://www.craydent.com/library/1.9.3/docs#isPrince",
            "returnType": "(Bool)"
        }|*/
        try {
            return (/prince/i.test(this.navigator.userAgent));
        } catch (e) {
            error('isPrince', e);
        }
    }
    function isSafari(){
        /*|{
            "info": "Check if browser is Safari",
            "category": "HTTP",
            "parameters":[],

            "overloads":[],

            "url": "http://www.craydent.com/library/1.9.3/docs#isSafari",
            "returnType": "(Bool)"
        }|*/
        try {
            var nu = this.navigator.userAgent;
            return !this.isChrome() && (/chrome/i.test(nu)) && (/apple/i.test(nu));
        } catch(e){
            error('isSafari', e);
        }
    }
    function isSymbian () {
        /*|{
            "info": "Check if OS is Symbian",
            "category": "HTTP",
            "parameters":[],

            "overloads":[],

            "url": "http://www.craydent.com/library/1.9.3/docs#isSymbian",
            "returnType": "(Bool)"
        }|*/
        try {
            var nu = this.navigator.userAgent;
            return (this.isWebkit() && (/series60/i.test(nu) || /symbian/i.test(nu)));
        } catch (e) {
            error('isIPad', e);
        }
    }
    function isTrident() {
        /*|{
            "info": "Check if engine is Trident",
            "category": "HTTP",
            "parameters":[],

            "overloads":[],

            "url": "http://www.craydent.com/library/1.9.3/docs#isTrident",
            "returnType": "(Bool)"
        }|*/
        try {
            return (/trident/i.test(this.navigator.userAgent));
        } catch (e) {
            error('isTrident', e);
        }
    }
    function isWebkit() {
        /*|{
            "info": "Check if engine is Webkit",
            "category": "HTTP",
            "parameters":[],

            "overloads":[],

            "url": "http://www.craydent.com/library/1.9.3/docs#isWebkit",
            "returnType": "(Bool)"
        }|*/
        try {
            return (/webkit/i.test(this.navigator.userAgent));
        } catch (e) {
            error('isWebkit', e);
        }
    }
    function isWindows(){
        /*|{
            "info": "Check if OS is Windows",
            "category": "HTTP",
            "parameters":[],

            "overloads":[],

            "url": "http://www.craydent.com/library/1.9.3/docs#isWindows",
            "returnType": "(Bool)"
        }|*/
        try{
            return /win/i.test(this.navigator.platform);
        } catch (e) {
            error('isWindows', e);
        }
    }
    function isWindowsMobile() {
        /*|{
            "info": "Check if device is Windows Mobile",
            "category": "HTTP",
            "parameters":[],

            "overloads":[],

            "url": "http://www.craydent.com/library/1.9.3/docs#isWindowsMobile",
            "returnType": "(Bool)"
        }|*/
        try {
            return (/windows ce/i.test(this.navigator.userAgent));
        } catch (e) {
            error('isWindowsMobile', e);
        }
    }


    function createServer (callback, options) {
        /*|{
            "info": "Create http server, ability to run middleware, and define routes.",
            "category": "HTTP",
            "parameters":[
                {"callback": "(HTTPCallback) Function to callback when a request is received"},
                {"createServer?": "(HTTPOptions) Options for creating the server (ex: {createServer:require('http').createServer})"}],

            "overloads":[{
                "parameters":[
                    {"options": "(HTTPOptions) Function to callback when a request is received"}]}],

            "url": "http://www.craydent.com/library/1.9.3/docs#createServer",
            "returnType": "(HTTP)"
        }|*/
        if (!callback || $s.isObject(callback)) {
            options = callback;
            callback = $s.foo;
        }
        options = options || {};
        if (options.logo_url) {
            $c.ROUTE_LOGO_URL = options.logo_url;
        }
        var http = (options.createServer || require('http').createServer)(function (request, response) {
            var cray = new Craydent(request, response);
            cray.server = http;
            $c.GarbageCollector = [];
            __set_context (cray);
            if (request.url == '/favicon.ico') {
                var code = 404;
                var cb = function (err, data) {
                    if (err) { $s.logit(err); code = 500; }
                    response.writeHead(code, {"Content-Type": "image/x-icon"});
                    response.end(data);
                };
                if (options.favicon) {
                    try {
                        code = 200;
                        fs.readFile(options.favicon,function(err, data){
                            cb(err, data || cray.RESPONSES[code]);
                        });
                        return;
                    } catch (e) {
                        cb(e, cray.RESPONSES[500]);
                    }
                }
                return;
            }
            function onRequestReceived(methods, body) {
                try {
                    body = body || {};
                    var url = $s.strip(request.url.split(/[?#]/)[0],'/'), params = $s.merge(body, cray.$GET() || {}), haveRoutes = false;

                    if (!$s.equals(params,{})) {
                        cray.callback = params.callback || "";
                        delete params.callback;
                    }
                    var routes = $s.where(http.routes,{method:{$in:methods}});
                    var i = 0, route, execute = [];
                    while (route = routes[i++]) {
                        cray.rest = haveRoutes = true;

                        var cbs = route.callback;
                        if (route.path != "/*" && route.path != "*") {
                            var rout_parts = $s.condense($s.strip(route.path,"*").split('/')),
                                requ_parts = url.split('/'), vars = {};

                            if (rout_parts.length > requ_parts.length + $s.itemCount(params)) {
                                continue;
                            }
                            rout_parts = $s.condense(route.path.split('/'));

                            var var_regex = /\$\{(.*?)\}/;
                            for (var k = 0, l = 0, klen = Math.max(rout_parts.length, requ_parts.length); k < klen; k++, l++) {
                                var ro = rout_parts[k], re = decodeURIComponent($s.replace_all(requ_parts[l],'+', '%20')), prop = (ro || "").replace(var_regex, '$1'),
                                    qVal = params[prop], no_route = false;
                                if (ro == "*") {
                                    break;
                                }
                                if (var_regex.test(ro)) {
                                    if (qVal) {
                                        qVal = decodeURIComponent($s.replace_all(qVal,'+', '%20'));
                                        vars[prop] = $s.tryEval(qVal) || qVal;
                                        l--;
                                        continue;
                                    }
                                    vars[prop] = $s.tryEval(re) || re;
                                } else if (ro != re) {
                                    no_route = true;
                                    break;
                                }
                            }
                        }
                        if (!no_route) {
                            for (var prop in params) {
                                if (!params.hasOwnProperty(prop)) { continue; }
                                var val = vars[prop] || params[prop], obj;
                                vars[prop] = $s.isNull(params[prop]) ? undefined : ($s.isString(val) ? decodeURIComponent($s.replace_all(val,'+', '%20')) : val);

                                obj = $s.tryEval(vars[prop],JSON.parseAdvanced) || vars[prop];
                                // this is probably a date
                                if ($s.isNumber(obj) && obj.toString() != vars[prop]) {
                                    continue;
                                }
                                vars[prop] = obj;
                            }
                            var parameters = route.parameters || [],
                                p = 0, parameter, bad = [];
                            while (parameter = parameters[p++]) {
                                var name = parameter.name, type = (parameter.type || "").toLowerCase();
                                if (parameter.required && $s.isNull(vars[name])) {
                                    bad.push("Required parameter " + name + " was not provided.");
                                    continue;
                                }
                                vars[name] = vars[name] || parameter.default;
                                if (type == "string") { continue; }
                                if (type == "date") {
                                    var dt = new Date(vars[name]);
                                    if ($s.isValidDate(dt)) {
                                        vars[name] = dt;
                                    } else {
                                        bad.push("Invalid parameter type, " + name + " must be a " + type + ".");
                                    }
                                    continue;
                                }

                                if (type && type != "string") {
                                    if (type == "regexp") { type = "RegExp"; }
                                    var checker = "is"+$s.capitalize(type), value = $s.tryEval(vars[name],JSON.parseAdvanced);
                                    if (type == "bool") {
                                        type = "boolean";
                                        checker = "isBoolean";
                                        value = $s.parseBoolean(value, true);
                                        vars[name] = $s.parseBoolean(vars[name], true);
                                    }

                                    if(!$s[checker](value) && !$s[checker](vars[name])) {
                                        var an = type[0] in {a:1,e:1,i:1,o:1,u:1} ? "an" : "a";
                                        bad.push("Invalid parameter type, " + name + " must be " + an + " " + type + ".");
                                        continue;
                                    }
                                    vars[name] = value || vars[name];
                                }
                            }
                            if (bad.length) { return cray.send({errors: bad}); }
                            var c = 0, cb;
                            while (cb = cbs[c++]) {
                                execute.push(cb);
                                execute['v' + c] = vars;
                            }
                        }
                    }
                    if (execute.length) {

                        function setUpNext (exec, i) {
                            i++;
                            if ($s.isFunction(exec[0])) {
                                return function() {
                                    exec[0] && exec[0].call(cray, request, response, execute['v' + i],setUpNext(exec.slice(1), i));
                                }
                            }
                            if ($s.isGenerator(exec[0])) {
                                return eval("function* () {exec[0] && exec[0].call(cray, request, response, execute['v' + i], setUpNext(exec.slice(1), i));}");
                            }
                            if ($s.isAsync(exec[0])) {
                                return eval("(async function () {exec[0] && (await exec[0].call(cray, request, response, execute['v' + i], setUpNext(exec.slice(1), i)));})()");
                            }
                        }
                        if ($s.isGenerator(execute[0])) {
                            eval("$s.syncroit(function*(){_complete(yield* execute[0].call(cray, request, response, execute['v1'], setUpNext(execute.slice(1), 1)));});");
                        } else if ($s.isAsync(execute[0])) {
                            eval("(async function(){_complete(await execute[0].call(cray, request, response, execute['v1'], setUpNext(execute.slice(1), 1)));})();");
                        } else {
                            _complete(execute[0].call(cray, request, response, execute['v1'],setUpNext(execute.slice(1), 1)));
                        }


                    } else { _complete(); }
                    function _complete(value) {
                        if (haveRoutes && callback == $s.foo) {
                            return cray.send(404, cray.RESPONSES["404"]);
                        }


                        // look for other node apps
                        if (~url.indexOf(':')) {
                            var parts = url.split(':'),
                                appPath = parts[0],
                                sindex = ~parts[1].indexOf('/') ? parts[1].indexOf('/') : 0,
                                port = parts[1].substring(0, sindex),
                                path = $s.strip(parts[1].substring(sindex),'/'),
                                callingPath = process.cwd();
                            if (~callingPath.indexOf('\\')) { callingPath = callingPath.replace(/\\/g, '/'); }
                            appPath = callingPath + "/" + appPath;
                            var app = $s.include(appPath) || {};
                            if (!process.listeners('uncaughtException').length) {
                                $s.logit("listening for uncaught errors");
                                process.on('uncaughtException', function (err) {
                                    if (err.errno === 'EADDRINUSE') { console.error('caught address in use'); }
                                    else { console.error(err); }
                                    console.error(err, err.stack);
                                });
                            }
                            if (app.port || port) {
                                app.port = app.port || parseInt(port);
                                var query = request.url.split('?')[1] || "";
                                query && (query = "?" + query);
                                return require('http').get("http://localhost:" + app.port + "/" + path + query).on('response', function (response) {
                                    var body = '';
                                    response.on('data', function (chunk) { body += chunk; });
                                    response.on('end', function () { cray.end(body); });
                                });
                            }
                        }
                        cray.echo.out = "";

                        function _cleanup (val) {
                            value = $s.isNull(val, value);

                            if (!value && !cray.DEFER_END) {
                                cray.send(404, cray.RESPONSES["404"]);
                            }
                            if (value && !cray.response_sent) {
                                cray.send(value);
                            }
                        }
                        if ($s.isGenerator(callback)) {
                            eval("$s.syncroit(function* (){ return (yield* callback.call(cray, request, response, value)); }).then(_cleanup);");
                        } else if ($s.isAsync(callback)) {
                            eval("(async function (){ return (await callback.call(cray, request, response, value)); })().then(_cleanup);");
                        } else {
                            _cleanup(callback.call(cray, request, response, value));
                        }

                    }
                } catch (e) {
                    error('createServer.onRequestReceived', e);
                    response.writeHead(500, header.headers);
                    return cray.end(JSON.stringify(cray.RESPONSES["500"]));
                    throw e;
                } finally {

                }
            }

            if (/delete|post|put/i.test(request.method)) {
                var body = "";
                request.on('data', function (data) {
                    body += data;
                    // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
                    if (body.length > 1e6) {
                        // FLOOD ATTACK OR FAULTY CLIENT, NUKE REQUEST
                        request.connection.destroy();
                    }
                });
                request.on('end', function () {
                    cray.raw = body;
                    if (request.method == "POST") { body = cray.$PAYLOAD(); }
                    var ct = cray.$HEADER('content-type','i') || "";
                    if (~ct.indexOf('/json')) {
                        body = $s.tryEval(body);
                    } else if (~ct.indexOf('/x-www-form-urlencoded') || ~ct.indexOf('text/plain')) {
                        body = $s.toObject(body);
                    }
                    onRequestReceived(["all", request.method.toLowerCase(),"middleware"], body);
                });
            } else {
                onRequestReceived(["all", "get","middleware"]);
            }
        });
        http.loadBalance = function (ips) {
            var list = $s.isString(ips) ? ips.split(',') : ips;
            $c.BALANCE_SERVER_LIST = list;

            if ($s.isArray(list)) {
                var ip, i = 0;
                while (ip = list[i++]) {
                    if (!/^\d{1,3}\.\d{1,3}\.\d{1,3}.\d{1,3}$/.test(ip)) { break; }
                    if (i == len) { return this; }
                }
            }
            throw "parameter must be a string or an array of ip addresses";
        };

        http.routes = [];
        http.use = function(path, callback){
            if (($s.isFunction(path) || $s.isGenerator(path) || $s.isAsync(path)) && !callback) {
                callback = path;
                path = '/*';
            }
            callback = callback || [];
            if($s.isFunction(callback) || $s.isGenerator(path) || $s.isAsync(path)) { callback = [callback]; }
            http.routes.push({path: path, callback: callback,method:'middleware'});
        };
        if ($c.EXPOSE_ROUTE_API && $c.ROUTE_API_PATH) {
            var api_path_config = {path: $c.ROUTE_API_PATH, callback: [__rest_docs]};
            http.routes.get.push(api_path_config);
            http.routes.post.push(api_path_config);
        }
        http.delete = function (path, callback) { __set_path("delete",http,path,callback); };
        http.get = function (path, callback) { __set_path("get",http,path,callback); };
        http.post = function (path, callback) { __set_path("post",http,path,callback); };
        http.put = function (path, callback) { __set_path("put",http,path,callback); };
        http.all = function (path, callback) { __set_path("all",http,path,callback); };
        return http;
    }
    function echo (output) {
        /*|{
            "info": "Echo to buffer and use in response",
            "category": "HTTP",
            "parameters":[
                {"output": "(String) Data to send in response"}],

            "overloads":[],

            "url": "http://www.craydent.com/library/1.9.3/docs#echo",
            "returnType":"(void)"
        }|*/
        try { echo.out += output; } catch (e) { error('echo', e); }
    }
    function end(status, output, encoding) {
        /*|{
            "info": "Call the next function(s) in queue",
            "category": "HTTP",
            "parameters":[],

            "overloads":[
                {"parameters":[
                    {"status?": "(Integer) HTTP status code."},
                    {"output?": "(String) output to send as response."},
                    {"encoding?": "(String) encoding for the response."}]}],

            "url": "http://www.craydent.com/library/1.9.3/docs#emit",
            "returnType":"(void)"
        }|*/
        if (this.response_sent) { return; }
        if (status && !$s.isInt(status)) {
            encoding = output;
            output = status;
            status = undefined;
        }
        output = output || "";
        var response = this.response;
        if (encoding && !$s.isString(encoding)) { response = encoding; }
        // response already ended
        if (!response) { return; }

        try {
            // Release memory for objects
            var obj;
            while (obj = $c.GarbageCollector.splice(0,1)[0]) { obj.destruct && obj.destruct(); }
            this.writeSession();
            var heads = typeof header != "undefined" ? header : {headers:{}},
                eco = (typeof echo != "undefined" ? echo : this.echo);

            var headers = $s.merge(heads.headers, this.header.headers),
                code = status || heads.code || this.header.code,
                eco = (typeof echo != "undefined" && echo.out || "") + (this.echo.out || "") + output;

            if (!eco) {
                code = 404;
                var ctype = headers.contentType || headers['ContentType'] || headers['Content-type'] || headers['content-type'] || headers['Content-Type'] || "";

                switch (true) {
                    case !!~ctype.indexOf('/plain'):
                        eco = "Resource Not Found";
                        break;
                    case !!~ctype.indexOf('/html'):
                        eco = $c.HTTP_STATUS_TEMPLATE[404] || "<html><head></head><body><h1>"+code+": Resource Not Found</h1><p>The resource you are trying to receive was not found</p></body></html>";
                        break;
                    case !!~ctype.indexOf('/json'):
                        eco = JSON.stringify($c.RESPONSES["404"]);
                        break;
                }

            }

            var cb = this.$GET('callback'), pre = "", post = "";
            if (cb) {
                pre = cb+"(";
                post = ")";
            }

            !response.headersSent && response.writeHead(code, headers);
            response.end($s.isString(output) ? pre + eco + post : output, encoding);
            this.respond_sent = true;
            $s.logit('end*******************************************************');
        } catch(e) {
            response.writeHead(500, this.header.headers);
            response.end($c.DEBUG_MODE ? e.stack : JSON.stringify($c.RESPONSES["500"]));
        } finally {
            $s.logit("response ended");
        }
    }
    function getSessionID() {
        /*|{
            "info": "Retrieve the session id when used in conjunction with createServer",
            "category": "HTTP",
            "parameters":[],

            "overloads":[],

            "url": "http://www.craydent.com/library/1.9.3/docs#getSessionID",
            "returnType": "(String)"
        }|*/
        try {
            return this.sessionid;
        } catch (e) {
            error('getSessionID', e);
        }
    }
    function getSession(sid, callback) {
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
            return new Promsie(function(res,rej){
                callback = callback || $s.foo;
                var cb = function(sessionObject){
                    callback(sessionObject);
                    res(sessionObject);
                };
                this._getSession(sid,cb);
            });
        } catch (e) {
            error('getSession', e);
        }
    }
    function getSessionSync(sid) {
        /*|{
            "info": "Syncronously retrieve the session object when used in conjunction with createServer",
            "category": "HTTP",
            "parameters":[
                {"sid": "(String) Session id of the session object to retrieve syncronously."}],

            "overloads":[],

            "url": "http://www.craydent.com/library/1.9.3/docs#getSessionSync",
            "returnType": "(Session)"
        }|*/
        try {
            return this._getSession(sid);
        } catch (e) {
            error('getSessionSync', e);
        }
    }
    function header(headers, code) {
        /*|{
            "info": "Set Http Headers to send",
            "category": "HTTP",
            "parameters":[
                {"header": "(Header) Http header."},
                {"code?": "(Integer) Http response code."}],

            "overloads":[],

            "url": "http://www.craydent.com/library/1.9.3/docs#header",
            "returnType": "(void)"
        }|*/
        try {
            if ($s.isString(headers) && !code) {
                if (!~headers.indexOf(':')) {
                    code = parseInt(headers.replace(/.*?([\d]{3}).*/, '$1'));
                }
                if (headers.toLowerCase().indexOf('http/') == 0) {
                    headers = {'Content-Type': 'text/html'};
                } else {
                    var parts = headers.split(':');
                    headers = {};
                    headers[parts[0].trim()] = parts[1].trim();
                }
            }
            header.headers = $s.merge(header.headers,headers);
            if (code && $s.isInt(code)) { header.code = code; }

        } catch (e) {
            error('header', e);
        }
    }
    function send (status, data) {
        /*|{
            "info": "Recursively require the entire directory and returns an object containing the required modules.",
            "category": "HTTP",
            "parameters":[
                {"data": "(Object) Object to send in response."}],

            "overloads":[
                {"parameters":[
                    {"status": "(Integer) Status code for response."},
                    {"data": "(Object) Object to send in response."}]}],

            "url": "http://www.craydent.com/library/1.9.3/docs#send",
            "returnType": "(void)"
        }|*/
        if (!data && typeof status == "object") {
            data = status;
            status = undefined;
        }
        if (typeof data == "object") { this.header({'Content-Type': 'application/json'}); }
        this.end(status, JSON.stringify(data));
    }
    function var_dump() {
        /*|{
            "info": "Dump of variables to response.",
            "category": "HTTP",
            "parameters":[
                {"...infinite": "(any) any number of arguments can be passed."}],

            "overloads":[],

            "url": "http://www.craydent.com/library/1.9.3/docs#var_dump",
            "returnType": "(void)"
        }|*/
        try {
            var type = "", value;
            for (var i = 0, len = arguments.length; i < len; i++) {
                value = type = arguments[i];
                if (type !== undefined || type !== null) {
                    type = value.constructor.toString().replace(/function (.*)?\(.*/, '$1');
                    switch (type) {
                        case "String":
                        case "Array":
                            type += " (" + value.length + ") " + JSON.stringify(value);
                            break;
                        case "Date":
                        case "Number":
                        case "Boolean":
                            type += " (" + JSON.stringify(value) + ") ";
                            break;
                        default:
                            type += JSON.stringify(value);
                    }
                }
                echo.out += type + " ";
            }
        } catch (e) {
            error('var_dump', e);
        }
    }
    function writeSession() {
        /*|{
            "info": "Writes session to filesystem to be retrieved later.",
            "category": "HTTP",
            "parameters":[],

            "overloads":[],

            "url": "http://www.craydent.com/library/1.9.3/docs#writeSession",
            "returnType": "(void)"
        }|*/
        try {
            var fs = require('fs'), sessionid = this.sessionid, session = this.session;
            if (sessionid) {
                if ($c.BALANCE_SERVER_LIST) {
                    var otherServers = $c.BALANCE_SERVER_LIST.filter(function (ip) {
                        return $c.PUBLIC_IP != ip;
                    });
                    // save session to other load balanced servers
                    for (var i = 0, len = otherServers.length; i < len; i++) {
                        if ($s.getProperty(this,'response.setHeader') && !$s.getProperty(this,'response.headersSent')) {
                            this.response.setHeader("Set-Cookie", ["NODEJSSESSION=" + sessionid + "; path=/"]);
                        }
                        fs.writeFile('craydent/session/' + sessionid, JSON.stringify(session), $s.foo);
                    }
                }
                // save session to this server
                if ($s.getProperty(this,'response.setHeader') && !$s.getProperty(this,'response.headersSent')) {
                    this.response.setHeader("Set-Cookie", ["NODEJSSESSION=" + sessionid + "; path=/"]);
                }
                fs.writeFile('craydent/session/' + sessionid, JSON.stringify(session), $s.foo);
            }

        } catch (e) {
            error('writeSession', e);
        }
    }

    function __set_context (ctx) {
        ctx.$COOKIE = $COOKIE;
        ctx.$DELETE = $DELETE;
        ctx.$DEL = $DEL;
        ctx.$GET = $GET;
        ctx.$HEADER = $HEADER;
        ctx.$PAYLOAD = $PAYLOAD;
        ctx.$POST = $POST;
        ctx.$PUT = $PUT;

        ctx.ChromeVersion = ChromeVersion;
        ctx.FirefoxVersion = FirefoxVersion;
        ctx.IEVersion = IEVersion;
        ctx.OperaVersion = OperaVersion;
        ctx.SafariVersion = SafariVersion;
        ctx.isAmaya = isAmaya;
        ctx.isAndroid = isAndroid;
        ctx.isBlackBerry = isBlackBerry;
        ctx.isChrome = isChrome;
        ctx.isFirefox = isFirefox;
        ctx.isGecko = isGecko;
        ctx.isIE6 = isIE6;
        ctx.isIE = isIE;
        ctx.isIPad = isIPad;
        ctx.isIPhone = isIPhone;
        ctx.isIPod = isIPod;
        ctx.isKHTML = isKHTML;
        ctx.isLinux = isLinux;
        ctx.isMac = isMac;
        ctx.isMobile = isMobile;
        ctx.isOpera = isOpera;
        ctx.isPalmOS = isPalmOS;
        ctx.isPresto = isPresto;
        ctx.isPrince = isPrince;
        ctx.isSafari = isSafari;
        ctx.isSymbian = isSymbian;
        ctx.isTrident = isTrident;
        ctx.isWebkit = isWebkit;
        ctx.isWindows = isWindows;
        ctx.isWindowsMobile = isWindowsMobile;

        ctx.createServer = createServer;
        ctx.echo = echo;
        ctx.end = end;
        ctx.getSessionID = getSessionID;
        ctx.getSession = getSession;
        ctx.getSessionSync = getSessionSync;
        ctx.header = header;
        ctx.send = send;
        ctx.var_dump = var_dump;
        ctx.writeSession = writeSession;
    }

    __set_context($c);
    $c.context = Craydent;

    module.exports = $c;
}
