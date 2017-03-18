/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.8.0                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/

/*----------------------------------------------------------------------------------------------------------------
/-	Global CONSTANTS and variables
/---------------------------------------------------------------------------------------------------------------*/
var _craydent_version = '0.8.0',
	__GLOBALSESSION = [], $c;
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
	$g.$c = $c = $g.$c || {};
	function Craydent(req, res) {
		var self = this;

		var fs = require('fs');

		this.sessionid;
		this.session;
		this.request = req;
		this.response = res;
		this.$l;
		this.location;
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
			hash = "", i = 0, cookie;

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
					code_result = "",
					j = 0, mr;

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
					var var_match = matches[m]
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
					if (!~code.indexOf("${" + prop + "}") || !declared.hasOwnProperty(prop)) {
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
				for (var prop in ovars) {
					if (!ovars.hasOwnProperty(prop)) { continue; }
					variable_initialization += "${" + prop + "=" + declared[prop] + ",null}";
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
					if (!~code.indexOf("${" + prop + "}")) { continue; }
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
						var ifm = ifmatch[i],
							ife = $c.condense(ifm.match(ifsyntax)),
							condition = ife[1],
							value = "undefined" == condition ? false : $c.tryEval(condition),
							sindex = code.indexOf(ifm) + ifm.length;

						if (condition && condition.length && condition != 'null' && !$c.contains(condition, vsyntax) && value === null) {
							value = condition;
						}

						if (value !== undefined && value) {
							var eindex = code.indexOf(ifmatch[i + 1]);
							if (!~eindex) {
								return pre + code.substring(sindex, endindex) + post;
							}
							return pre + code.substring(sindex, eindex) + post;
						} else if (ifm.match(IF["else"])) {
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
				var block = code.substring(sindex + slen, eindex), str = "",
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
var _ao, _df, _irregularNouns = {
	"addendum":"addenda",
	"alga":"algae",
	"alumna":"alumnae",
	"apparatus":"apparatuses",
	"appendix":"appendices",
	"bacillus":"bacilli",
	"bacterium":"bacteria",
	"beau":"beaux",
	"bison":"bison",
	"bureau":"bureaus",
	"child":"children",
	"corps":"corps",
	"corpus":"corpora",
	"curriculum":"curricula",
	"datum":"data",
	"deer":"deer",
	"die":"dice",
	"diagnosis":"diagnoses",
	"erratum":"errata",
	"fireman":"firemen",
	"focus":"focuses",
	"foot":"feet",
	"genus":"genera",
	"goose":"geese",
	"index":"indices",
	"louse":"lice",
	"man":"men",
	"matrix":"matrices",
	"means":"means",
	"medium":"media",
	"memo":"memos",
	"memorandum":"memoranda",
	"moose":"moose",
	"mouse":"mice",
	"nebula":"nebulae",
	"ovum":"ova",
	"ox":"oxen",
	"person":"people",
	"radius":"radii",
	"series":"series",
	"sheep":"sheep",
	"scissors":"scissors",
	"species":"species",
	"stratum":"strata",
	"syllabus":"syllabi",
	"tableau":"tableaux",
	"that":"those",
	"this":"these",
	"tooth":"teeth",
	"vertebra":"vertebrae",
	"vita":"vitae",
	"woman":"women",
	"zero":"zeros"
};

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
		ctx.JSZip = JSZip;
		ctx.OrderedList = OrderedList;
		ctx.Queue = Queue;
		ctx.Set = Set;
		ctx.addObjectPrototype = addObjectPrototype;
		ctx.ajax = ajax;
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
			for (var prop in obj) {
				if (obj.hasOwnProperty(prop)) {
					props.push(prop);
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

	var  j, pairs = OrderedList([], function (a, b) {
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
		var value;
		switch (field) {
			case "$add":
				value = 0;
				var i = 0, sexp;
				while (sexp = expr["$add"][i++]) {
					value += __processExpression(doc, sexp);
				}
				return value;
			case "$subtract":
				return __processExpression(doc, expr["$subtract"][0]) - __processExpression(doc, expr["$subtract"][1]);
			case "$multiply":
				value = 1;
				var i = 0, sexp;
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
		var i = 1, exp, j = 0, st;
		switch (field) {
			case "$setEquals":
				while (exp = expr[field][i++]) {
					var set1 = $c.duplicate(__processExpression(doc, expr[field][i - 2])),
						set2 = $c.duplicate(__processExpression(doc, exp));
					if (!$c.isArray(set1) || !$c.isArray(set2)){
						//noinspection ExceptionCaughtLocallyJS
						throw "Exception: All operands of $setEquals must be arrays. One argument is of type: " +
						$c.capitalize(typeof (!$c.isArray(set1) ? set1 : set2));
					}
					$c.toSet(set1);
					$c.toSet(set2);
					if (set1.length != set2.length) { return false; }
					for (var jlen = set1.length; j < jlen; j++) {
						if (!~set2.indexOf(set1[j])) { return false; }
					}
				}
				return true;
			case "$setIntersection":
				var rtnSet = $c.duplicate(__processExpression(doc, expr[field][0])),
					errorMessage = "Exception: All operands of $setIntersection must be arrays. One argument is of type: ";
				if(!$c.isArray(rtnSet)) {
					//noinspection ExceptionCaughtLocallyJS
					throw errorMessage + $c.capitalize((typeof rtnSet));
				}
				$c.toSet(rtnSet);
				while (exp = expr[field][i++]) {
					var set1 = $c.duplicate(__processExpression(doc, exp));
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
					for (var jlen = rtnSet.length; j < jlen; j++) {
						if (!~set1.indexOf(rtnSet[j])) { $c.removeAt(rtnSet,j--); jlen--; }
					}
					if (!rtnSet.length) { return rtnSet; }
				}
				return rtnSet;
			case "$setUnion":
				var rtnSet = $c.duplicate(__processExpression(doc, expr[field][0])),
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
				var arr1 = $c.duplicate(__processExpression(doc, expr[field][0])),
					arr2 = $c.duplicate(__processExpression(doc, expr[field][1])),
					rtnSet = [];
				if (!$c.isArray(arr1) || !$c.isArray(arr2)){
					//noinspection ExceptionCaughtLocallyJS
					throw "Exception: All operands of $setEquals must be arrays. One argument is of type: " +
						$c.capitalize(typeof (!$c.isArray(arr1) ? arr1 : arr2));
				}
				for (var jlen = arr1.length; j < jlen; j++) {
					var st = arr1[j];
					if (!~arr2.indexOf(st) && !~rtnSet.indexOf(st)) {
						rtnSet.push(st);
					}
				}
				return rtnSet;
			case "$setIsSubset":
				var arr1 = $c.duplicate(__processExpression(doc, expr[field][0])),
					arr2 = $c.duplicate(__processExpression(doc, expr[field][1])),
					rtnSet = [];
				if (!$c.isArray(arr1) || !$c.isArray(arr2)){
					//noinspection ExceptionCaughtLocallyJS
					throw "Exception: All operands of $setEquals must be arrays. One argument is of type: " +
						$c.capitalize(typeof (!$c.isArray(arr1) ? arr1 : arr2));
				}
				return $c.isSubset(arr1,arr2);
			case "$anyElementTrue":
				var arr1 = $c.duplicate(__processExpression(doc, expr[field][0])),
					falseCondition = [undefined,null,0,false];

				while (st = arr1[j++]) {
					if (!~falseCondition.indexOf(st)) { return true; }
				}
				return false;
			case "$allElementsTrue":
				var arr1 = $c.duplicate(__processExpression(doc, expr[field][0])),
					falseCondition = [undefined,null,0,false];

				for (var jlen = arr1.length; j < jlen; j++) {
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
					rmProps = [], rtn = null, i = 0, rmprop;
				for (var prop in vars) {
					if (!vars.hasOwnProperty(prop)) { continue; }
					doc["$" + prop] = __processExpression(doc, vars[prop]);
					rmProps.push(prop);
				}
				rtn = __processExpression(doc, expr[field]["in"]);
				for (var i = 0, len = rmProps.length; i < len; i++) {
					delete doc[rmProps[i]];
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
function __processAttributes(node) {
	try {
		var obj = {},
			tagend = node.indexOf('>'),
			tag = node.substring(1, tagend),
			attIndex = $c.indexOfAlt(tag,/\s|>/),
			nodename = !~attIndex ? tag : tag.substring(0, $c.indexOfAlt(tag,/\s|>/)),
			attr = !~attIndex ? "" : tag.substring($c.indexOfAlt(tag,/\s|>/)),
			text = node.substring(tagend + 1, node.indexOf('<', tagend));

		if (attr) {
			obj['#text'] = text;
			var attributes = attr.split(' ');
			for (var i = 0, len = attributes.length; i < len; i++) {
				var attribute = attributes[i];
				if (!attribute) { continue; }
				var key_val = attribute.split('=');
				obj['@attributes'] = obj['@attributes'] || {};
				obj['@attributes'][key_val[0].trim()] = $c.tryEval(key_val[1]) || key_val[1].trim();
			}
		}
		return obj;
	} catch (e) {
		error('xmlToJson.__processAttributes', e);
	}
}
function __processChildren(nodename, children) {
	try {
	var child, i = 0, obj = {};
	while (child = children[i++]) {
		var index = child.indexOf('>'),
			lindex = child.lastIndexOf('</'),
			attributes = __processAttributes(child),
			childXML = $c.strip(child.substring(index + 1, lindex),'\n').trim();
		if (children.length == 1) {
			obj[nodename] = $c.merge(xmlToJson(childXML), attributes);
		} else {
			obj[nodename] = obj[nodename] || [];
			obj[nodename].push($c.merge(attributes,$c.xmlToJson(childXML)));
		}
	}
	return obj;
} catch (e) {
		error('xmlToJson.__processChildren', e);
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
function __processStage(docs, stage) {
	try {
		var operator = "", value = {};
		for (var opts in stage) {
			if (!stage.hasOwnProperty(opts)) { continue; }
			if (operator) {
				//noinspection ExceptionCaughtLocallyJS
				throw "Exception: A pipeline stage specification object must contain exactly one field.";
			}
			operator = opts;
			value = stage[opts];
		}
		switch (opts) {
			case "$project":
				return $c.where(docs,{}, value);
			case "$match":
				return $c.where(docs,value);
			case "$redact":
				return _redact(docs, value);
			case "$limit":
				return docs.slice(0, value);
			case "$skip":
				return docs.slice(value);
			case "$unwind":
				return _unwind(docs, value);
			case "$group":
				return __processGroup(docs, value);
			case "$sort":
				var sorter = [];
				for (var prop in value) {
					if (!value.hasOwnProperty(prop)) { continue; }
					var pre = "";
					if (!~value[prop]) { pre = "!"; }
					sorter.push(pre+prop);
				}
				return $c.sortBy(docs,sorter);
			case "$out":
				var rtnDocs = $c.duplicate(docs,true);
				if ($c.isString(value)) {
					$g[value] = rtnDocs;
				} else if ($c.isArray(value)) {
					$c.removeAll(value);
					rtnDocs = $c.merge(value,rtnDocs);
				}
				return rtnDocs;
			case "$sample":
				var arr = [], i = 0, eindex = docs.length - 1;
				while (i < value.size) {
					arr.push(docs[Math.round($c.rand(0,eindex,true))]);
					i++;
				}
				docs.sample = arr;
				return docs;
			case "$lookup":
				var i = 0, doc, arr = value.from,key = value.localField, fkey = value.foreignField, prop = value.as;
				while(doc = docs[i++]) {
					var query = {};
					query[fkey] = doc[key] || {$exists:false};
					doc[prop] = $c.where(arr,query);
				}
		}
		return docs;
	} catch (e) {
		error('aggregate.__processStage', e);
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
function __universal_trim(chars) {
	/*|{
		"info": "Array class extension to remove all white space/chars from the beginning and end of all string values in the array & String class extension to remove characters from the beginning and end of the string.",
		"category": "Array",
		"parameters":[],

		"overloads":[
			{"parameters":[
				{"ref":"(Boolean) Whether or not to mutate the original array."}]},
			{"parameters":[
				{"character": "(Char[]) Character to remove in the String"}]}],

		"url": "http://www.craydent.com/library/1.9.3/docs#String.trim",
		"returnType": "(Bool)"
	}|*/
	try {
		if ($c.isString(this)) {
			return _trim(this, undefined, chars);
		}
		if ($c.isArray(this)) {
			var ref = chars,
					arr = [],
					alter = false;
			if ($c.isBoolean(ref)) { alter = true; }

			for (var i = 0, len = this.length; i < len; i++) {
				var item = this[i];
				$c.isString(item) && (arr[i] = item.toString().trim()) || (arr[i] = item);
				alter && (this[i] = arr[i]);
			}
			return arr;
		}
	} catch (e) {
		error($c.getName(this.constructor) + ".trim", e);
		return false;
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
function _even (num) {
	try {
		if (isNaN(num)) { return false; }
		//noinspection JSBitwiseOperatorUsage
		return !(num&1);
	} catch (e) {
		error('_even', e);
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
function addObjectPrototype(name, fn, override) {
	/*|{
		"info": "Method to extend the Object Class",
		"category": "Global",
		"parameters":[
			{"name": "(String) name of the method to add"},
			{"fn": "(Function) method implementation"}],

		"overloads":[{
		"parameters":[
			{"name": "(String) name of the method to add"},
			{"fn": "(Function) method implementation"},
			{"override": "(Bool) if true, override the previously defined prototype"}]}],

		"url": "http://www.craydent.com/library/1.9.3/docs#addObjectPrototype",
		"returnType": "(void)"
	}|*/
	try {
		if ($c.isNull($g.__craydentNoConflict) || !$g.__craydentNoConflict) {
			var shouldOverride = false;
			if (eval("typeof(" + name + ")") == "undefined") {
				shouldOverride = true;
			}
			(!override && Object.prototype[name]) || Object.defineProperty(Object.prototype, name, {
				writable: true,
				enumerable: false,
				configurable: true,
				value: fn
			});
			override = shouldOverride;
		}
	} catch (e) {
		error("addPrototype", e);
		try {
			Array.prototype[name] = !override && Array.prototype[name] || fn;
			Function.prototype[name] = !override && Function.prototype[name] || fn;
			String.prototype[name] = !override && String.prototype[name] || fn;
			Number.prototype[name] = !override && Number.prototype[name] || fn;
			Boolean.prototype[name] = !override && Boolean.prototype[name] || fn;

			if (navigator.geolocation) {
				var GeoLocation = navigator.geolocation.constructor;
				GeoLocation.prototype[name] = !override && GeoLocation.prototype[name] || fn;
			}
		} catch (ex) {
			error("addPrototype:Non-ECMAScript 5", e);
		}
	}
	return _df(name, fn, override);
}

_ao = addObjectPrototype;
_df = _defineFunction;

/*----------------------------------------------------------------------------------------------------------------
 /-	Benchmark testing Class
 /---------------------------------------------------------------------------------------------------------------*/
function Benchmarker() {
	/*|{
		"info": "Class used to measure the run time of code",
		"category": "Global",
		"parameters":[],

		"overloads":[],

		"url": "http://www.craydent.com/library/1.9.3/docs#Benchmarker",
		"returnType": "(void)"
	}|*/
	try {
		this.executionTime = 0;
		this.start = function () {
			this._start = new Date();
			this._end = 0;
		};
		this.stop = function () {
			this._end = new Date();
			return this.executionTime = (this._end - this._start) / 1000;
		};
		this.start();
	} catch (e) {
		error('BenchMarker', e);
	}
}

/*----------------------------------------------------------------------------------------------------------------
 /-	CLI Class
 /---------------------------------------------------------------------------------------------------------------*/
function CLI (params) {
	/*|{
		"info": "CLI parser for arguments and simplem method to execute shell commands",
		"category": "Global",
		"parameters":[],

		"overloads":[
			{"parameters":[
				{"options": "(Object[]) Array of options having properties option(required:command option ex: -c), type(data type returned using typeof, ex:string), description, required(default:false)."}]}],

		"url": "http://www.craydent.com/library/1.9.3/docs#CLI",
		"returnType": "(Cursor)"
	}|*/
	try {
		params = params || {};
		var args = process.argv, self = this, cself = self, sindex = 2,
			_commandIndex = [], _command_possible = args[sindex], _command_removed = false;
		self.Interpreter = args[0];
		self.ScriptPath = args[1];
		self.ScriptName = self.ScriptPath.substring(self.ScriptPath.lastIndexOf('/') + 1);
		self.Name = params.name || "";
		self.Info = params.info || "";
		self.Synopsis = params.synopsis || "";
		self.Copyright = params.copyright || "";
		self.OptionsDescription = params.optionsDescription || "";
		self.Description = params.description || "";
		self.UsingLabels = true;
		self.CommandName = "";
		self.Commands = params.commands || {/*
			command:[options]

	 	*/};
		self.Commands['*'] = self.Commands['*'] || [];
		self.Options = [/*{
			option: "-c",
			type:"string",
			description:"",
			default:"",
			command:"",
			required:false
		}*/];
		if (params.options) {
			for (var i = 0, len = params.options.length; i < len; i++) {
				add(params.options[i]);
			}
		}
		self.Arguments = [];
		self.Notes = params.notes || "";
		self.isMan = false;
		self.isHelp = false;

		if (args[sindex] != "man" && self.Commands[args[sindex]]) {
			self.CommandName = args[sindex++];
		} else if (!~_commandIndex.indexOf('*') && args[sindex] && args[sindex][0] == "-") {
			self.CommandName = "*";
		} else {
			self.CommandName = args[sindex] || "*";
		}

		if (self.CommandName == 'man') { // requesting man
			self.isMan = true;
		}
		if (self.CommandName == 'help') { // requesting man
			self.isHelp = true;
		}
		for (var i = sindex, len = args.length; i < len; i++) {
			var arg = args[i];
			if (!arg || arg[sindex] != '-' && arg[0] != '-') { // no label
				if (arg == 'man') { // requesting man
					self.isMan = true;
				}
				if (arg == 'help') { // requesting man
					self.isHelp = true;
				}
				self.UsingLabels = false;
				self.CommandName = "*";
				self.Arguments.push(arg);
			} else if (arg.startsWith('--')) { // this is a multi char label
				if (arg == '--help') { // requesting help
					self.isHelp = true;
				}
				if (!args[i + 1] || args[i + 1][0] == '-') {
					cself[$c.strip(arg,'-')] = true;
					continue;
				}
				i++;
				cself[$c.strip(arg,'-')] = args[i];
			} else if (arg[0] == '-') { // this is a single char label
				var opts = $c.strip(arg,'-');
				if (opts.length == 1) {
					if (!args[i + 1] || args[i + 1][0] == '-') {
						cself[opts] = true;
						continue;
					}
					i++;
					cself[opts] = args[i];
					continue;
				}
				for (var j = 0, jlen = opts.length; j < jlen; j++) {
					cself[opts[j]] = true;
				}
			}
		}
		self.isValid = function (){
			try { validate(); return true;} catch (e) { $c.logit(e); return false;}
		};
		self.validate = validate;
		function processOptions (option, value) {
			value = value || {};
			if (!$c.isObject(option)) { throw "Error: Option [" + JSON.stringify(option) + "] must be an object.  Option will be ignored.";}
			if (!option.option) { return [option]; }
			var o = option.option.split(',');
			if (o.length === 1) { return [option]; }
			var arr = [];
			for (var i = 0, len = o.length; i < len; i++) {
				var prop = $c.strip(o[i], '-');
				if (prop != "name" && self[prop]) { value.value = self[prop]; }
				arr.push({
					option:o[i],
					type:option.type,
					description:option.description,
					default:option.default,
					command:option.command,
					required:option.required,
					_property: prop
				});
			}
			return arr;
		}
		function validate () {
			var options = self.Options;
			if (self.CommandName) {
				options = self.Commands[self.CommandName] || [];
			}

			for (var i = 0, len = options.length; i < len; i++) {
				var option = options[i], copt = $c.strip(option.option.split(',')[0],'-');
				if (self[copt] === undefined) { self[copt] = self.UsingLabels && self.Arguments[i] || option.default; }
				if (option.required && $c.isNull(self[copt])) {
					throw 'Option ' + option.option + ' is required.';
				} else if (option.type && !$c.isNull(self[copt])){
					switch (option.type.toLowerCase()) {
						case "number":
							self[copt] = isNaN(Number(self[copt])) ? self[copt] : Number(self[copt]);
							break;
						case "array":
						case "object":
							self[copt] = $c.tryEval(self[copt],JSON.parse) || self[copt];
							break;
						case "bool":
						case "boolean":
							var tmp = $c.parseBoolean(self[copt]);
							self[copt] =  $c.isNull(tmp) ? self[copt] : tmp;
							break;
					}
				 	if (typeof self[copt] != option.type) {
						throw 'Option ' + option.option + ' must be a ' + option.type + '.';
					}
				}
			}
		}
		function add (opt) {
			try {
				opt.command = opt.command || "*";
				var value = {}, popt = processOptions(opt, value), options = self.Options;
				options = self.Commands[opt.command] = self.Commands[opt.command] || [];
				_commandIndex.push(opt.command);
				if (!$c.isNull(_command_possible) && _command_possible == opt.command) {
					for (var i = 0, len = self.Commands['*'].length; i < len; i++) {
						var topt = processOptions(self.Commands['*'][i]);

						for (var j = 0, jlen = topt.length; j < jlen; j++) {
							delete self[topt[j]._property];
						}
					}
					self.CommandName = _command_possible;
					_command_possible = null;
				}
				if(self.CommandName == opt.command) {
					if (self.Arguments[0] == self.CommandName && !_command_removed) {
						_command_removed = true;
						self.Arguments.splice(0,1);
					}
					var val = !self.UsingLabels && self.Arguments[options.length] || value.value || opt.default;
					for (var i = 0, len = popt.length; i < len && !$c.isNull(val); i++) {
						var v = val;
						switch (popt[i].type.toLowerCase()) {
							case "number":
								v = Number(v);
								v = isNaN(v) ? Number(popt[i].default) : v;
								break;
							case "array":
							case "object":
								v = $c.tryEval(v,JSON.parse) || v;
								break;
							case "bool":
							case "boolean":
								var tmp = $c.parseBoolean(v);
								v =  $c.isNull(tmp) ? v : tmp;
								break;
						}
						self[popt[i]._property] = v;
					}
				}
				options.push(opt);
				return self;
			} catch (e) {
				error('CLI.add', e);
			}
		}
		self.add = self.option = add;
		self.command = function (cmd, opts) {
			try {
				opts = opts || [];
				if ($c.isNull(cmd)) { throw "Command name must be provided. This operation will be ignored."; }
				var cindexCMD = cmd.split(/\s/)[0];
				_commandIndex.push(cindexCMD);
				if (args[2] == cindexCMD) { self.CommandName = cindexCMD; }
				if (!$c.isArray(opts)) { opts = [opts]; }
				for (var i = 0, len = opts.length; i < len; i++) {
					var opt = opts[i];
					if (!$c.isObject(opt)) {
						error('CLI.command', new Error("Option [" + JSON.stringify(opt) + "] must be an object.  Option will be ignored."));
						continue;
					}
					opt.command = cmd;
					add(opt);
				}
				self.Commands[cmd] = self.Commands[cmd] || [];
				return self;
			} catch (e) {
				error('CLI.command', e);
			}
		};
		self.action = function (name, cb) {
			if ($c.isFunction(name) || $c.isGenerator(name) || $c.isAsync(name)) {
				cb = name;
				name = $c.last(_commandIndex);
			}

			if (self.CommandName == name) {
				if ($c.isGenerator(cb)) {
					eval('$c.syncroit(function*(){ return yield* cb.call(self,args[2]); });');
                } else if ($c.isAsync(cb)) {
                    eval('(async function (){ return await cb.call(self,args[2]); })();');
                } else {
					cb.call(self, args[2]);
				}
			}
			return self;
		};
		self.renderMan = function () {
			try {
				var nlinetab = "\n\t", dline = "\n\n";
				var commands = "";
				for (var prop in self.Commands) {
					if (!self.Commands.hasOwnProperty(prop)) { continue; }
					if (!commands) { commands = "ADDITIONAL COMMANDS" + nlinetab; }
					commands += prop + renderOptions(self.Commands[prop],'\t',nlinetab) + '\n' + nlinetab;
				}
				commands += "\n";
				return "NAME" + nlinetab + self.Name + (self.Info ? " -- " + self.Info : "") + dline +
					"SYNOPSIS" + nlinetab + self.Synopsis + dline +
					"DESCRIPTION" + nlinetab + self.Description + dline +
					"OPTIONS" + renderOptions(self.Options) + dline +
					commands +
					"NOTES" + nlinetab + self.Notes + dline;
			} catch (e) {
				error('CLI.renderMan', e);
			}

		};
		var renderOptions = function (options, extratabs) {
			extratabs = extratabs || "";
			var content = "", nlinetab = "\n\t";
			for (var i = 0, len = options.length; i < len; i++) {
				var option = options[i], optnames = (option.option || "").split(","), sep = "";
				if (optnames.length > 1) {
					optnames.sort(function (a, b) { return a.length - b.length; });
					sep = ",";
				}
				content += nlinetab + extratabs + optnames[0] + sep + "\t\t" + (option.type ? "(" + option.type + ")" : "") + " " + option.description + (option.required ? "(required)" : "");
				for (var j = 1, jlen = optnames.length; j < jlen; j++) {
					if (j + 1 == jlen) { sep = ""; }
					content += nlinetab + extratabs + optnames[j] + sep;
				}
			}
			return content;
		};
		self.renderHelp = function () {
			try {
				var nlinetab = "\n\t", dline = "\n\n";

				var commands = "";
				var hasOptions = !!self.Options.length;
				for (var prop in self.Commands) {
					if (!self.Commands.hasOwnProperty(prop)) { continue; }
					commands += prop + renderOptions(self.Commands[prop],'\t', nlinetab) + '\n' + nlinetab;
					hasOptions = hasOptions || !!self.Commands[prop].length;
				}
				return "Description: " + self.Synopsis + dline +
						"Usage: " + self.ScriptName + (commands && " [command] ") + (hasOptions ? " [options] " : "") + nlinetab + commands + "\n" +
					"Options: " + renderOptions(self.Options) + dline;
			} catch (e) {
				error('CLI.renderMan', e);
			}

		};
		self.exec = _cli_exec;
		return self;
	} catch (e) {
		error('CLI', e);
	}
}
CLI.exec = _cli_exec;

/*----------------------------------------------------------------------------------------------------------------
 /-	Collection class
 /---------------------------------------------------------------------------------------------------------------*/
function Cursor (records) {
	/*|{
		"info": "Cursor class to facilitate iteration",
		"category": "Global",
		"parameters":[
			{"records": "(Array) Array used to create the iterator to iterate each item"}],

		"overloads":[
			{"parameters":[
			{"records": "(Object) Object used to create the iterator to iterate each property"}]}],

		"url": "http://www.craydent.com/library/1.9.3/docs#Cursor",
		"returnType": "(Cursor)"
	}|*/
	try {
		var props = [],
			currentIndex = 0,
			arr = $c.duplicate(records || [],true);
		if ($c.isObject(arr)) {
			for (var prop in arr) {
				if (!arr.hasOwnProperty(prop)) { continue; }
				props.push(prop);
			}
			props.sort();
		} else if ($c.isArray(arr)) {
			var i = 0, len = arr.length;
			while (i++ < len) {
				props.push(i - 1);
			}
		}
		arr.hasNext = function () { return currentIndex <  props.length; };
		arr.next = function () {
			this.current = this[props[currentIndex]];
			return {value:this[props[currentIndex++]], done:currentIndex >= this.size()};
		};
		arr.reset = function () { currentIndex = 0; };
		arr.setNextIndex = function (value) {
			value = parseInt(value) || 0;
			if (value < 0) { value = 0; }
			else if (value >= props.length) { value = props.length - 1; }
			currentIndex = value;
			arr.current = arr[props[currentIndex]];
		};
		arr.current = arr[props[currentIndex]];

		arr.size = function () { return props.length; };
		return arr;
	} catch (e) {
		error('Cursor', e);
	}
}
function OrderedList (records,sorter)  {
	/*|{
		"info": "Collection class that filters out duplicate values and maintains an ordered list",
		"category": "Global",
		"parameters":[],

		"overloads":[
			{"parameters":[
				{"records": "(Array) Array used to create the initial items in the ordered list"}]},
			{"parameters":[
				{"records": "(Array) Array used to create the initial items in the ordered list"},
				{"sorter": "(Function) Function for sorting logic"}]}],

		"url": "http://www.craydent.com/library/1.9.3/docs#OrderedList",
		"returnType": "(OrderedList)"
	}|*/
	try {
		sorter = sorter || function(a,b){if (a < b) {return -1;}if (a > b) {return 1;}return 0;};
		var arr = $c.duplicate(records || [],true).sort(sorter), nextIndex = 0;
		arr.add = function(value){
			if (!this.length) { return this.push(value); }
			var index = _orderListHelper(value, sorter, this);
			return $c.insertBefore(this,index, value);
		};
		arr.next = function () {
			return {value:this[nextIndex++], done:nextIndex >= this.size()};
		};
		arr.hasNext = function () { return nextIndex < this.size(); };
		arr.size = function(){return this.length;};
		return arr;
	} catch (e) {
		error('OrderedList', e);
	}
}
function Queue (records) {
	/*|{
		"info": "Collection class that follows FIFO",
		"category": "Global",
		"parameters":[
			{"records": "(Array) Array used to create the iterator to iterate each item"}],

		"overloads":[],

		"url": "http://www.craydent.com/library/1.9.3/docs#Queue",
		"returnType": "(Queue)"
	}|*/
	try {
		var arr = $c.duplicate(records || [],true), nextIndex = 0;
		arr.enqueue = function(value){ this.push(value); };
		arr.dequeue = function(){ return this.splice(0,1)[0]; };
		arr.next = function () { return {value:this[nextIndex++], done:nextIndex >= this.size()}; };
		arr.hasNext = function () { return nextIndex < this.size(); };
		arr.size = function(){return this.length;};
		return arr;
	} catch (e) {
		error('Queue', e);
	}
}
function Set (records) {
	/*|{
		"info": "Collection class that filters out duplicate values",
		"category": "Global",
		"parameters":[
			{"records": "(Array) Array used to create the iterator to iterate each item"}],

		"overloads":[],

		"url": "http://www.craydent.com/library/1.9.3/docs#Set",
		"returnType": "(Set)"
	}|*/
	try {
		var arr = $c.duplicate(records || []), nextIndex = 0;
		arr.add = function(value){
			var push = true;
			for (var i = 0, len = this.length; i < len; i++) {
				if ($c.equals(value,this[i])) {
					push = false;
					break;
				}
			}
			if (push) { return !!arr.push(value); }
			return false;
		};
		arr.clear = function(val,indexOf){$c.removeAll(this,val,indexOf);};
		arr.clean = function(){$c.toSet(this)};
		arr.next = function () { return {value:this[nextIndex++], done:nextIndex >= this.size()}; };
		arr.hasNext = function () { return nextIndex < this.size(); };
		arr.size = function(){ return this.length; };
		arr.clean();
		return arr;
	} catch (e) {
		error('Set', e);
	}
}


/*----------------------------------------------------------------------------------------------------------------
 /-	Ajax operations
 /---------------------------------------------------------------------------------------------------------------*/
function ajax(params, returnData){
	/*|{
		"info": "Method to make ajax calls",
		"category": "Global",
		"parameters":[
			{"params": "(Object) specs with common properties:<br />(String) url<br />(String) dataType<br />(Mixed) hitch<br />(Function[]) onerror<br />(Function[])onsuccess"}],

		"overloads":[
			{"parameters":[
				 {"params": "(Object) specs with common properties:<br />(String) url<br />(String) dataType<br />(Mixed) hitch<br />(Function[]) onerror<br />(Function[])onsuccess"},
				 {"returnData": "(String) Specifies which data to return when using Promise pattern"}]}],

		"url": "http://www.craydent.com/library/1.9.3/docs#ajax",
		"returnType": "(void)"
	}|*/
	try {
		if ($c.isString(params)) {
			params = { url : params };
		}
		var need_to_shard = false, browser_url_limit = 1500, query, url, rtn, alwaysResolve = params.alwaysResolve === false ?  false : true;
		params.dataType = params.dataType || 'json';
		params.hitch = params.hitch || "";
		params.onbefore = params.onbefore || [foo];
		params.oncomplete = params.oncomplete || [foo];
		params.ondata = params.ondata || [foo];
		params.onerror = params.onerror || params.onresponse || [foo];
		params.onsuccess = params.onsuccess || params.onresponse || [foo];
		params.query = params.data || params.query || "";
		params.timeout = params.timeout || 120000;

		if (!$c.isArray(params.onbefore)) {
			params.onbefore = [params.onbefore];
		}
		if (!$c.isArray(params.oncomplete)) {
			params.oncomplete = [params.oncomplete];
		}
		if (!$c.isArray(params.ondata)) {
			params.ondata = [params.ondata];
		}
		if (!$c.isArray(params.onerror)) {
			params.onerror = [params.onerror];
		}
		if (!$c.isArray(params.onresponse)) {
			params.onresponse = [params.onresponse];
		}
		if (!$c.isArray(params.onsuccess)) {
			params.onsuccess = [params.onsuccess];
		}

		if (params.onsuccess.length > 1 || params.onsuccess[0] == foo) {
			alwaysResolve = params.alwaysResolve || false;
		}
		// commented line below is a valid parameter value
		/*
		 params.query = params.query;
		 params.data = params.data;
		 params.url = params.url;
		 params.dataType = params.dataType;
		 params.hitch = params.hitch;
		 params.context = params.context;
		 params.header = params.header;
		 params.method = params.method;
		 params.contentType = params.contentType;
		 params.headers = params.headers;
		 params.onstatechange = params.onstatechange;
		 params.onbefore = params.onbefore;
		 params.oncomplete = params.oncomplete;
		 params.onfileload = params.onfileload;
		 params.onprogress = params.onprogress;
		 params.onabort = params.onabort;
		 params.ondata = params.ondata;
		 params.onerror = params.onerror;
		 params.onresponse = params.onresponse;
		 params.onsuccess = params.onsuccess;
		 params.onloadstart = params.onloadstart;
		 params.run = params.run;
		 */
		params.thiss = this;
		params.url = params.url || "";

		var httpRequest = require('http'),
			fileUpload = httpRequest.upload || {};
		params.method = params.method || "GET";
		params.headers = params.headers || {};

		if (params.query && $c.isObject(params.query)) {
			params.query = $c.toStringAlt(params.query, '=', '&', true);
		}
		params.query = (params.run ? "run=" + params.run :"") + (params.query || "");
		params.contentType = params.contentType || "application/json";
		params.onstatechange = params.onstatechange || foo;

		fileUpload.onload = params.onfileload || foo;
		fileUpload.onprogress = params.onprogress || foo;
		fileUpload.onabort = params.onabort || foo;
		fileUpload.onerror = params.onerror || foo;
		fileUpload.onloadstart = params.onloadstart || foo;

		if (params.method.toLowerCase() == "get") {
			params.url += params.query ? "?" + params.query : "";
			params.query = undefined;
		}

		_run_func_array.call((params.context||this),params.onbefore, [httpRequest, params.hitch, this]);

		var prms, defaults = {
			protocol: 'http',
			host: 'localhost',
			family: '',
			port: 80,
			localAddress: '',
			socketPath: '',
			method: "GET",
			path: '/',
			headers: '',
			auth: '',
			agent: '',
			createConnection: ''
		}/*, options = {
		 protocol: params.protocol || 'http',
		 host: params.host || params.hostname || 'localhost',
		 family: params.family,
		 port: params.port || 80,
		 localAddress: params.localAddress,
		 socketPath: params.socketPath,
		 method: params.method || "GET",
		 path: params.path || '/',
		 headers: params.headers,
		 auth: params.auth,
		 agent: params.agent,
		 createConnection: params.createConnection
		 }*/;
		params.headers['Content-Type'] = params.headers['Content-Type'] || params.contentType;
		prms = new Promise(function(resolve, reject) {
			if (params.url) {
				var parts = params.url.match(/^(https?):\/\/(.*?)(?::([0-9]*)?)?(\/.*)$/);
				if (parts) {
					params.protocol = (params.protocol || parts[1]) + ":";
					params.host = params.host || parts[2];
					var port = params.port || parts[3];
					port && (params.port = port);
					params.path = params.path || parts[4];
				}
			}
			try {
				if (params.protocol && ~params.protocol.indexOf('https')) { httpRequest = require('https'); }
				var req = httpRequest.request($c.merge(defaults, params,{clone:true,intersect:true}), function (res) {
					var body = {data:""}, ctx = params.context || res;
					res.on('data', function (chunk) {
						body.data += chunk;
						_run_func_array.call(ctx, params.ondata, [chunk, body, req, params.hitch, this]);
					});
					res.on('error', function () {
						if (params.dataType.toLowerCase() == 'json') {
							body.data = $c.tryEval(body.data, JSON.parse) || body.data;
						}
						var resrej = alwaysResolve ? resolve : reject;
						_run_func_array.call(ctx, params.onerror, [body.data, params.hitch, this, res.statusCode]);
						_run_func_array.call(ctx, params.oncomplete, [body.data, params.hitch, this, res.statusCode]);
						resrej(body.data);
					});
					res.on('end', function () {
						if (params.dataType.toLowerCase() == 'json') {
							body.data = $c.tryEval(body.data, JSON.parse) || body.data;
						}
						var methods = params.onsuccess;
						if (!$c.isBetween(res.statusCode,200,299,true)) {
							methods = params.onerror;
						}
						_run_func_array.call(ctx, methods, [body.data, params.hitch, this, res.statusCode]);
						_run_func_array.call(ctx, params.oncomplete, [body.data, params.hitch, this, res.statusCode]);

						var rtn = body.data;
						if (returnData == "response" || returnData == "res") {
							rtn = res;
						} else if (returnData == "request" || returnData == "req") {
							rtn = req;
						}

						resolve(rtn);
					});
				});
				req.on('error', function(e) {
					if (e.errno != "ETIMEDOUT") {
						_run_func_array.call(req, params.onerror, [null, params.hitch, this, e.code]);
						_run_func_array.call(req, params.oncomplete, [null, params.hitch, this, e.code]);
						var resrej = alwaysResolve ? resolve : reject;
						return resrej(e);
					}
					logit(e);
				});

				req.setTimeout(params.timeout, function(socket){
					_run_func_array.call(params.thiss, params.onerror, ['', params.hitch, this, 504]);
					_run_func_array.call(params.thiss, params.oncomplete, ['', params.hitch, this, 504]);
					var e = new Error('connect ETIMEDOUT ' + params.host);
					e.address = params.host;
					e.code = "ETIMEDOUT";
					e.errno = "ETIMEDOUT";
					e.message = 'connect ETIMEDOUT ' + params.host;
					e.port = params.port;
					var resrej = alwaysResolve ? resolve : reject;
					resrej(e);
				});
				req.write(($c.isObject(params.data) ? JSON.stringify(params.data) : params.data) || '');
				req.end();
			} catch (e) {
				logit(e);
				error("ajax.Promise", e);
			}
		});


		if (params.onsuccess.length == 1 && params.onsuccess[0] !== foo) {
			prms._then = prms.then || foo;
			prms.then = function (res, rej) { //noinspection CommaExpressionJS
				alwaysResolve = params.alwaysResolve || false;
				params.onsuccess.push(res);
				params.onerror.push(rej);
				return this;
			};
		}
		prms.otherwise = function (callback) { //noinspection CommaExpressionJS
			alwaysResolve = params.alwaysResolve || false;
			return params.onerror.push(callback),this; };
		prms['finally'] = function (callback) { //noinspection CommaExpressionJS
			alwaysResolve = params.alwaysResolve || false;
			return params.oncomplete.push(callback),this; };
		return prms;
	} catch (e) {
		logit(e);
		error("ajax", e);
	}
}

/*----------------------------------------------------------------------------------------------------------------
 /-	helper operations
 /---------------------------------------------------------------------------------------------------------------*/
/*  $COOKIE
 *  options can have the properties:
 *      expiration : int
 *      path : string
 **/
function $COOKIE(key, value, options) {
	/*|{
		"info": "Get/set Cookies",
		"category": "Global",
		"featured": true,
		"parameters":[
			{"key": "(String) Key for cookie value"}],

		"overloads":[
			{"parameters":[
				{"key": "(String) Key for cookie"},
				{"option": "(Object) Specify delete"}]},
			{"parameters":[
				{"keyValue": "(Object) Specify the key value pair"},
				{"option": "(Object) Specify path, domain, and/or expiration of cookie"}]},
			{"parameters":[
				{"key": "(String) Key for cookie value"},
				{"value": "(String) Value to store"},
				{"option": "(Object) Specify path and/or expiration of cookie"}]}],

		"url": "http://www.craydent.com/library/1.9.3/docs#$COOKIE",
		"returnType": "(Mixed)"
	}|*/
	try {
		options = options || {};
		var c = $c.getProperty(this, 'request.headers.cookie');
		options.cookie && (c = options.cookie);
		if($c.isObject(key)) {
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

		if (!c && !values.length) { return {}; }
		if (options.path && $c.isString(options.path)) {path = 'path=' + (options.path || '/') + ';'}
		if (options.domain && $c.isString(options.domain)) {domain = 'domain=' + options.domain + ';'}
		if (options["delete"]) {
			this.response.setHeader("Set-Cookie", [key + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;' + path + domain]);
			return true;
		}

		if (values.length) {
			var expires = "";
			if ($c.isInt(options.expiration)) {
				var dt = new Date();
				dt.setDate(dt.getDate() + options.expiration);
				expires = ";expires=" + dt.toUTCString();
			}
			var j = 0, key;
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
				value = parts.length > 1 ? decodeURIComponent($c.rtrim(parts[1])) : null;
			cookies[name] = $c.tryEval(value) || value;
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
		"category": "Global",
		"featured": true,
		"parameters":[],

		"overloads":[
			{"parameters":[
				{"key": "(String) key for query value"}]},
			{"parameters":[
				{"key": "(String) key for query value"},
				{"options": "(Object) Options to defer, ignore case, etc"}]}],

		"url": "http://www.craydent.com/library/1.9.3/docs#$DELETE",
		"returnType": "(Mixed)"
	}|*/
	try {
		return _verb_payload_helper.call(this, variable, options);
	} catch (e) {
		logit('$DELETE');
		logit(e);
	}
}
function $DEL () {
	/*|{
		"info": "Retrieve all or specific variables in the Body",
		"category": "Global",
		"featured": true,
		"parameters":[],

		"overloads":[
			{"parameters":[
				{"key": "(String) key for query value"}]},
			{"parameters":[
				{"key": "(String) key for query value"},
				{"options": "(Object) Options to defer, ignore case, etc"}]}],

		"url": "http://www.craydent.com/library/1.9.3/docs#$DELETE",
		"returnType": "(Mixed)"
	}|*/
	return $DELETE.apply(this,arguments);
}
function $GET(variable, options) {
	/*|{
		"info": "Retrieve all or specific variables in the url",
		"category": "Global",
		"featured": true,
		"parameters":[],

		"overloads":[
			{"parameters":[
				{"key": "(String) key for query value"}]},
			{"parameters":[
				{"key": "(String) key for query value"},
				{"options": "(Object) Options to defer, ignore case, etc"}]}],

		"url": "http://www.craydent.com/library/1.9.3/docs#$GET",
		"returnType": "(Mixed)"
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

		if (options.url || $c && $c.isString && ($c.isString(options) && (~options.indexOf("?") || ~options.indexOf("#")))) {
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
		logit('$GET');
		logit(e);
	}
}
function $HEADER(variable, options) {
	/*|{
		"info": "Retrieve all or specific variables in the headers",
		"category": "Global",
		"featured": true,
		"parameters":[],

		"overloads":[
			{"parameters":[
				{"key": "(String) key for query value"}]},
			{"parameters":[
				{"key": "(String) key for query value"},
				{"options": "(Object) Options to defer, ignore case, etc"}]}],

		"url": "http://www.craydent.com/library/1.9.3/docs#$HEADER",
		"returnType": "(Mixed)"
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
		logit('$HEADER');
		logit(e);
	}
}
function $PAYLOAD(variable, options) {
	/*|{
		"info": "Retrieve all or specific variables in the Body",
		"category": "Global",
		"featured": true,
		"parameters":[],

		"overloads":[
			{"parameters":[
				{"key": "(String) key for query value"}]},
			{"parameters":[
				{"key": "(String) key for query value"},
				{"options": "(Object) Options to defer, ignore case, etc"}]}],

		"url": "http://www.craydent.com/library/1.9.3/docs#$PAYLOAD",
		"returnType": "(Mixed)"
	}|*/
	try {
		return _verb_payload_helper.call(this, variable, options);
	} catch (e) {
		logit('$PAYLOAD');
		logit(e);
	}
}
function $POST(variable, options) {
	/*|{
		"info": "Retrieve all or specific variables in the Body",
		"category": "Global",
		"featured": true,
		"parameters":[],

		"overloads":[
			{"parameters":[
				{"key": "(String) key for query value"}]},
			{"parameters":[
				{"key": "(String) key for query value"},
				{"options": "(Object) Options to defer, ignore case, etc"}]}],

		"url": "http://www.craydent.com/library/1.9.3/docs#$POST",
		"returnType": "(Mixed)"
	}|*/
	try {
		return _verb_payload_helper.call(this, variable, options);
	} catch (e) {
		logit('$POST');
		logit(e);
	}
}
function $PUT(variable, options) {
	/*|{
		"info": "Retrieve all or specific variables in the Body",
		"category": "Global",
		"featured": true,
		"parameters":[],

		"overloads":[
			{"parameters":[
				{"key": "(String) key for query value"}]},
			{"parameters":[
				{"key": "(String) key for query value"},
				{"options": "(Object) Options to defer, ignore case, etc"}]}],

		"url": "http://www.craydent.com/library/1.9.3/docs#$PUT",
		"returnType": "(Mixed)"
	}|*/
	try {
		return _verb_payload_helper.call(this, variable, options);
	} catch (e) {
		logit('$PUT');
		logit(e);
	}
}
function catchAll (callback, append) {
	/*|{
		"info": "Creates an catch all for exceptions in the current node service.",
		"category": "Global",
		"featured": true,
		"parameters":[
			{"callback": "(Function) Callback function to call when there is an uncaught exception"}],

		"overloads":[
			{"parameters":[
	 			{"callback": "(Function) Callback function to call when there is an uncaught exception"},
				{"append": "(Boolean) Options to defer, ignore case, etc"}]}],

		"desciption": "This method will create, add, or replace catch all listeners.  If called multiple times with the same callback, the listener is preserved and not added unless the append argument is set to true.",

		"url": "http://www.craydent.com/library/1.9.3/docs#$PUT",
		"returnType": "(Mixed)"
	}|*/
	try {
		catchAll.listeners = catchAll.listeners || [];

		// if this callback exists
		var index = catchAll.listeners.indexOf(callback.toString());

		if (!~index || append) {
			catchAll.listeners.push(callback.toString());
			process.on('uncaughtException', callback);
			logit("listening for uncaught errors");
		}
	} catch (e) {
		logit('catchAll');
		logit(e);
	}
}
function clearCache (module) {
	/*|{
		"info": "Clear a module from the require cache.",
		"category": "Global",
		"parameters":[
			{"module": "(String) Single module to remove."}],

		"overloads":[
			{"parameters":[]}],

		"url": "http://www.craydent.com/library/1.9.3/docs#clearCache",
		"returnType": "(Boolean)"
	}|*/
	try {
		if (module) {
			delete require.cache[require.resolve(module)];
			return true;
		}
		for (var prop in require.cache) {
			if (!require.cache.hasOwnProperty(prop)) {
				continue;
			}
			delete require.cache[prop];
		}
		return true;
	} catch (e) {
		error('clearCache', e);
		return false;
	}
}
function clusterit(options, callback){
	/*|{
		"info": "Enable clustering",
		"category": "Global",
		"parameters":[
			{"callback": "Method to call for Workers.  Callback is passed the cluster object as an argument."}],

		"overloads":[],

		"url": "http://www.craydent.com/library/1.9.3/docs#clusterit",
		"returnType": "(void)"
	}|*/
	try {
		if (!callback && $c.isFunction(options)) {
			callback = options;
			options = {};
		}
		const cluster = require('cluster');
		const CPUs = require('os').cpus().length;
		const numCPUs = Math.min($c.isNull(options.max_cpu,CPUs), CPUs);

		if (cluster.isMaster) {
			// Fork workers.
			for (var i = 0; i < numCPUs; i++) {
				var child = cluster.fork();
				(options.onfork || $c.foo)(child);
				if (options.auto_spawn) {
					child.on('exit', function(worker, code, signal){
						(options.onexit || $c.foo)(worker, code, signal);
						callback(cluster.fork());
					});
				}
			}
			return cluster;

		}
		// child process
		callback(cluster);

		return {
			isMaster: false,
			disconnect: $c.foo,
			fork: $c.foo,
			isWorker:true,
			schedulingPolicy: 0,
			settings: {},
			setupMaster: $c.foo,
			worker:{},
			workers:{},
			on: $c.foo
		}
	} catch (e) {
		error('clusterit', e);
	}
}
function cout(){
	/*|{
		"info": "Log to console when DEBUG_MODE is true and when the console is available",
		"category": "Global",
		"parameters":[
			{"infinite": "any number of arguments can be passed."}],

		"overloads":[],

		"url": "http://www.craydent.com/library/1.9.3/docs#cout",
		"returnType": "(void)"
	}|*/
	try {
		if($c && $c.DEBUG_MODE && console && console.log){
			for (var i = 0, len = arguments.length; i < len; i++) {
				console.log(arguments[i]);
			}
		}
	} catch (e) {
		error('cout', e);
	}
}
function createServer (callback, options) {
	/*|{
		"info": "Create http server, ability to run middleware, and define routes.",
		"category": "Global",
		"parameters":[
			{"callback": "(Function) Function to callback when a request is received"}],

		"overloads":[{
			"parameters":[
				{"callback": "(Function) Function to callback when a request is received"},
				{"createServer": "(Object) Options for creating the server (ex: {createServer:require('http').createServer})"}]}],

		"url": "http://www.craydent.com/library/1.9.3/docs#createServer",
		"returnType": "(Server)"
	}|*/
	if (!callback || $c.isObject(callback)) {
		options = callback;
		callback = foo;
	}
	options = options || {};
	if (options.logo_url) {
        $c.ROUTE_LOGO_URL = options.logo_url;
	}
	var http = (options.createServer || require('http').createServer)(function (request, response) {
		var cray = new Craydent(request, response);
		cray.server = http;
		$c.GarbageCollector = [];
		if (request.url == '/favicon.ico') {
			var code = 404;
			var cb = function (err, data) {
				if (err) { $c.logit(err); code = 500; }
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
				var url = $c.strip(request.url.split(/[?#]/)[0],'/'), params = $c.merge(body, cray.$GET() || {}), haveRoutes = false;

				if (!$c.equals(params,{})) {
					cray.callback = params.callback || "";
					delete params.callback;
				}
				var routes = $c.where(http.routes,{method:{$in:methods}});
				var i = 0, route, execute = [];
				while (route = routes[i++]) {
					cray.rest = haveRoutes = true;

					var cbs = route.callback;
					if (route.path != "/*" && route.path != "*") {
						var rout_parts = $c.condense($c.strip(route.path,"*").split('/')),
							requ_parts = url.split('/'), vars = {};

						if (rout_parts.length > requ_parts.length + $c.itemCount(params)) {
							continue;
						}
						rout_parts = $c.condense(route.path.split('/'))

						var var_regex = /\$\{(.*?)\}/;
						for (var k = 0, l = 0, klen = Math.max(rout_parts.length, requ_parts.length); k < klen; k++, l++) {
							var ro = rout_parts[k], re = decodeURIComponent($c.replace_all(requ_parts[l],'+', '%20')), prop = (ro || "").replace(var_regex, '$1'),
								qVal = params[prop], no_route = false;
							if (ro == "*") {
								break;
							}
							if (var_regex.test(ro)) {
								if (qVal) {
									qVal = decodeURIComponent($c.replace_all(qVal,'+', '%20'));
									vars[prop] = $c.tryEval(qVal) || qVal;
									l--;
									continue;
								}
								vars[prop] = $c.tryEval(re) || re;
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
							vars[prop] = isNull(params[prop]) ? undefined : ($c.isString(val) ? decodeURIComponent($c.replace_all(val,'+', '%20')) : val);

							obj = $c.tryEval(vars[prop],JSON.parse) || vars[prop];
							// this is probably a date
							if ($c.isNumber(obj) && obj.toString() != vars[prop]) {
								continue;
							}
							vars[prop] = obj;
						}
						var parameters = route.parameters || [],
							p = 0, parameter, bad = [];
						while (parameter = parameters[p++]) {
							var name = parameter.name, type = (parameter.type || "").toLowerCase();
							if (parameter.required && isNull(vars[name])) {
								bad.push("Required parameter " + name + " was not provided.");
								continue;
							}
							vars[name] = vars[name] || parameter.default;
							if (type == "string") { continue; }
							if (type == "date") {
								var dt = new Date(vars[name]);
								if ($c.isValidDate(dt)) {
									vars[name] = dt;
								} else {
									bad.push("Invalid parameter type, " + name + " must be a " + type + ".");
								}
								continue;
							}

							if (type && type != "string") {
								if (type == "regexp") { type = "RegExp"; }
								var checker = "is"+type.capitalize(), value = $c.tryEval(vars[name],JSON.parse);

								if(!$c[checker](value) && !$c[checker](vars[name])) {
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
						if ($c.isFunction(exec[0])) {
							return function() {
								exec[0] && exec[0].call(cray, request, response, execute['v' + i],setUpNext(exec.slice(1), i));
							}
						}
                        if ($c.isGenerator(exec[0])) {
                            return eval("function* () {exec[0] && exec[0].call(cray, request, response, execute['v' + i], setUpNext(exec.slice(1), i));}");
                        }
                        if ($c.isAsync(exec[0])) {
                            return eval("(async function () {exec[0] && (await exec[0].call(cray, request, response, execute['v' + i], setUpNext(exec.slice(1), i)));})()");
                        }
					}
					if ($c.isGenerator(execute[0])) {
						eval("$c.syncroit(function*(){_complete(yield* execute[0].call(cray, request, response, execute['v1'], setUpNext(execute.slice(1), 1)));});");
					} else if ($c.isAsync(execute[0])) {
                        eval("(async function(){_complete(await execute[0].call(cray, request, response, execute['v1'], setUpNext(execute.slice(1), 1)));})();");
                    } else {
						_complete(execute[0].call(cray, request, response, execute['v1'],setUpNext(execute.slice(1), 1)));
					}


				} else { _complete(); }
				function _complete(value) {
					if (haveRoutes && callback == foo) {
						return cray.send(404, cray.RESPONSES["404"]);
					}


					// look for other node apps
					if (~url.indexOf(':')) {
						var parts = url.split(':'),
							appPath = parts[0],
							sindex = ~parts[1].indexOf('/') ? parts[1].indexOf('/') : 0,
							port = parts[1].substring(0, sindex),
							path = $c.strip(parts[1].substring(sindex),'/'),
							callingPath = process.cwd();
						if (~callingPath.indexOf('\\')) { callingPath = callingPath.replace(/\\/g, '/'); }
						appPath = callingPath + "/" + appPath;
						var app = include(appPath) || {};
						if (!process.listeners('uncaughtException').length) {
							logit("listening for uncaught errors");
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
						value = $c.isNull(val, value);

						if (!value && !cray.DEFER_END) {
							cray.send(404, cray.RESPONSES["404"]);
						}
						if (value && !cray.response_sent) {
							cray.send(value);
						}
					}
					if ($c.isGenerator(callback)) {
						eval("$c.syncroit(function*(){yield* callback.call(cray, request, response, value);}).then(_cleanup);");
					} else if ($c.isAsync(callback)) {
                        eval("(async function(){ await callback.call(cray, request, response, value);})().then(_cleanup);");
                    } else {
						_cleanup(callback.call(cray, request, response, value));
					}

				}
			} catch (e) {
				logit(e);
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
					body = $c.tryEval(body);
				} else if (~ct.indexOf('/x-www-form-urlencoded') || ~ct.indexOf('text/plain')) {
					body = $c.toObject(body);
				}
				onRequestReceived(["all", request.method.toLowerCase(),"middleware"], body);
			});
		} else {
			onRequestReceived(["all", "get","middleware"]);
		}
	});
	http.loadBalance = function (ips) {
		var list = ips.isString() ? ips.split(',') : ips
		$c.BALANCE_SERVER_LIST = list;

		if ($c.isArray(list)) {
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
		if (($c.isFunction(path) || $c.isGenerator(path) || $c.isAsync(path)) && !callback) {
			callback = path;
			path = '/*';
		}
		callback = callback || [];
		if($c.isFunction(callback) || $c.isGenerator(path) || $c.isAsync(path)) { callback = [callback]; }
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
function cuid(msFormat) {
	/*|{
		"info": "Creates a Craydent/Global Unique Identifier",
		"category": "Global",
		"parameters":[
			{"msFormat": "(Bool) use microsoft format if true"}],

		"overloads":[],

		"url": "http://www.craydent.com/library/1.9.3/docs#cuid",
		"returnType": "(String)"
	}|*/
	try {
		var pr = "", pt = "";
		//noinspection CommaExpressionJS
		msFormat && (pr="{",pt="}");
		return pr + 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
			return v.toString(16);
		}) + pt;
	} catch (e) {
		error('cuid', e);
	}
}
function emit(ev) {
	/*|{
		"info": "Call the next function(s) in queue",
		"category": "Global",
		"parameters":[
			{"event": "Event to trigger."}],

		"overloads":[
			{"parameters":[
				{"event": "Event to trigger."},
				{"infinite": "any number of arguments can be passed and will be applied to listening functions."}]}],

		"url": "http://www.craydent.com/library/1.9.3/docs#emit",
		"returnType":"(void)"
	}|*/
	try {
		var args = arguments, vals = [];
		if (!$c.isArray(args)) {
			args = [];
			for (var prop in arguments) {
				args[prop] = arguments[prop];
			}
			args.callee = arguments.callee;
		}
		if (args.callee.caller['_emit']) {
			vals = vals.concat(_run_func_array.call(this, args.callee.caller['_emit'], args));
		}
		if (ev && args.callee.caller['_'+ev]) {
			vals = vals.concat(_run_func_array.call(this, args.callee.caller['_' + ev], args.splice(1)));
		}
		return vals;
	} catch (e) {
		return e != 'catch' && _run_func_array.call(this, arguments.callee.caller['_catch'], args.length == arguments.length ? args.splice(1) : args);
	}
}
function echo (output) {
	/*|{
		"info": "Echo to buffer and use in response",
		"category": "Global",
		"parameters":[
			{"output": "Data to send in response"}],

		"overloads":[],

		"url": "http://www.craydent.com/library/1.9.3/docs#echo",
		"returnType":"(void)"
	}|*/
	try { echo.out += output; } catch (e) { error('echo', e); }
}
function end(status, output, encoding) {
	/*|{
		"info": "Call the next function(s) in queue",
		"category": "Global",
		"parameters":[
			{"event": "Event to trigger."}],

		"overloads":[
			{"parameters":[
				{"event": "Event to trigger."},
				{"infinite": "any number of arguments can be passed and will be applied to listening functions."}]}],

		"url": "http://www.craydent.com/library/1.9.3/docs#emit",
		"returnType":"(void)"
	}|*/
	if (this.response_sent) { return; }
	if (status && !$c.isInt(status)) {
		encoding = output;
		output = status;
		status = undefined;
	}
	output = output || "";
	var response = this.response;
	if (encoding && !encoding.isString()) { response = encoding; }
	// response already ended
	if (!response) { return; }

	try {
		// Release memory for objects
		var obj;
		while (obj = $c.GarbageCollector.splice(0,1)[0]) { obj.destruct && obj.destruct(); }
		this.writeSession();
		var heads = typeof header != "undefined" ? header : {headers:{}},
			eco = (typeof echo != "undefined" ? echo : this.echo);

		var headers = $c.merge(heads.headers, this.header.headers),
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
					eco = JSON.stringify(this.RESPONSES["404"]);
					break;
			}

		}

		var cb = this.$GET('callback'), pre = "", post = "";
		if (cb) {
			pre = cb+"(";
			post = ")";
		}

		!response.headersSent && response.writeHead(code, headers);
		response.end($c.isString(output) ? pre + eco + post : output, encoding);
		this.respond_sent = true;
		logit('end*******************************************************');
	} catch(e) {
		response.writeHead(500, this.header.headers);
		response.end($c.DEBUG_MODE ? e.stack : JSON.stringify(this.RESPONSES["500"]));
	} finally {
		logit("response ended");
	}
}
function error(fname, e) {
	/*|{
		"info": "User implemented place holder function to handle errors",
		"category": "Global",
		"parameters":[
			{"fname": "(String) The function name the error was thrown"},
			{"e": "(Error) Exception object thrown"}],

		"overloads":[],

		"url": "http://www.craydent.com/library/1.9.3/docs#error",
		"returnType": "(void)"
	}|*/
	try {
		$c.DEBUG_MODE && cout("Error in " + fname + "\n" + (e.description || e), e, e.stack);
	} catch (e) {
		cout("Error in " + fname + "\n" + (e.description || e));
	}
}
function exclude(list) {
	/*|{
		"info": "Exclude prototyping",
		"category": "Global",
		"parameters":[
			{"list": "(String[]) Array of strings in containing the property to exclude from prototyping."}],

		"overloads":[],
		"description": "This method enables the ability exclude prototyping on a specific property or property to a specific class.  The format for the string is a single property such as 'map' or property on a specific class 'Array:map'.",
		"url": "http://www.craydent.com/library/1.9.3/docs#exclude",
		"returnType": "(void)"
	}|*/
	try {
		list = list || [];
		for (var i = 0, len = list.length; i < len; i++) {
			var name = list[i] || "";
			if (~name.indexOf(':')) {
				var parts = name.split(':');
				delete $w[$c.capitalize((parts[0] || "").toLowerCase())];
				continue;
			}

			delete Array.prototype[name];
			delete Function.prototype[name];
			delete String.prototype[name];
			delete Number.prototype[name];
			delete Boolean.prototype[name];
			delete Date.prototype[name];
		}
	} catch (e) {
		error('cuid', e);
	}
}
function fillTemplate (htmlTemplate, objs, offset, max, newlineToHtml) {
	/*|{
	 "info": "Function for templetizing",
	 "category": "Global",
	 "featured": true,
	 "parameters":[
		 {"htmlTemplate": "(String) Template to be used"},
		 {"objs": "(Objects[]) Objects to fill the template variables"}],

	 "overloads":[
		{"parameters":[
			{"htmlTemplate": "(String) Template to be used"},
			{"objs": "(Objects[]) Objects to fill the template variables"},
			{"max": "(Int) The maximum number of records to process"}]}
		 {"parameters":[
			{"htmlTemplate": "(String) Template to be used"},
			{"objs": "(Objects[]) Objects to fill the template variables"},
			{"options": "(Object) Options to use: max,offset,newlineToHtml"}]},
		 {"parameters":[
			 {"htmlTemplate": "(String) Template to be used"},
			 {"objs": "(Objects[]) Objects to fill the template variables"},
			 {"offset": "(Int) The start index of the Object array"},
			 {"max": "(Int) The maximum number of records to process"}]},
		{"parameters":[
			{"htmlTemplate": "(String) Template to be used"},
			{"objs": "(Objects[]) Objects to fill the template variables"},
			{"offset": "(Int) The start index of the Object array"},
			{"max": "(Int) The maximum number of records to process"},
			{"newlineToHtml":"(Boolean) Flag to replace all new line chars (\\n) to the HTML <br /> tag.  Default is true."}]}],

	 "url": "http://www.craydent.com/library/1.9.3/docs#fillTemplate",
	 "returnType": "(String)"
	 }|*/
	try {
		var nested = true;
		if (!fillTemplate.declared && !fillTemplate.refs) {
			nested = false;
			fillTemplate.declared = {};
			fillTemplate.refs = [];
		}
		if (!htmlTemplate || !$c.isString(htmlTemplate)) { fillTemplate.declared = fillTemplate.refs = undefined; return ""; }
		if ($c.isObject(offset)) {
			max = offset.max || 0;
			newlineToHtml = isNull(offset.newlineToHtml, true);
			offset = offset.offset;
		} else if (!isNull(offset) && isNull(max)) {
			max = offset;
			offset = 0;
		}
		if (htmlTemplate.trim() == "" || $c.isString(objs) && !(objs = tryEval(objs))) { return ""; }

		objs = objs || [{}];
		if (!$c.isArray(objs)) { objs = [objs]; }
		var html = "", variable, value, ttc = $c.TEMPLATE_TAG_CONFIG, tvs = $c.TEMPLATE_VARS,
			hasDataProps = !!~htmlTemplate.indexOf('${dataproperties}'),
			vsyntax = ttc.VARIABLE,
			vnsyntax = ttc.VARIABLE_NAME, j = 0, tv, decl = false;
		while (tv = tvs[j++]) {
			variable = tv.variable || tv.name;
			value = tv.value;
			if (!variable) { continue; }
			value = $c.isFunction(value) ? value(variable, j - 1):value;
			htmlTemplate = $c.replace_all(htmlTemplate,"${"+variable+"}", value);
		}

		max = max || objs.length;
		offset = offset || 0;

		var props = $c.condense(htmlTemplate.match(vsyntax) || [], true);

		for (var i = offset; i < max; i++) {
			var obj = objs[i], regex, template = htmlTemplate, match, bind = "";

			if (~template.indexOf("${this}") || ~template.indexOf("${index}")) {
				var uid = __add_fillTemplate_ref(obj);
				template = $c.replace_all(template, ["${this}","${index}"],["fillTemplate.refs['" + uid + "']",i]);
			}


			while (~template.indexOf("${this.") && (match=/\$\{this\.(.+?)\}/.exec(template))) {
				value = $c.getProperty(obj, match[1]);
				if (typeof value == "object") {
					value = "fillTemplate.refs['" + __add_fillTemplate_ref(value) + "']";
				} else {
					value = parseRaw(value, $c.isString(value));
				}
				template = $c.replace_all(template,"${this."+match[1]+"}", value);
			}
			var objval, expression;
			for (var j = 0, jlen = props.length; j < jlen; j++) {
				expression = props[j];
				var property = $c.isFunction(vnsyntax) ? vnsyntax(expression) : vnsyntax.exec && vnsyntax.exec(expression);
				if (!obj.hasOwnProperty(property) && !$c.getProperty(obj,property)) { continue; }
				if (~template.indexOf(expression) && !isNull(objval = $c.getProperty(obj,property,null,{noInheritance:true}))) {
					if (typeof objval == "object") {
						objval = "fillTemplate.refs['" + __add_fillTemplate_ref(objval) + "']";
					} else {
						objval = parseRaw(objval, $c.isString(objval));
					}
					var replacee_arr = [';'], replacer_arr = [';\\'];
					if (newlineToHtml) {
						replacee_arr.push('\n');
						replacer_arr.push('<br />');
					}
					objval = $c.replace_all(objval,replacee_arr,replacer_arr);
					if (~objval.indexOf('${')) {
						objval = fillTemplate(objval,[obj]);
					}
					template = $c.replace_all(template,expression, objval);

					if (hasDataProps) {
						template = $c.replace_all(template,'${dataproperties}', "data-" + property + "='" + (objval.indexOf('<') && "" || objval) + "' ${dataproperties}");
					}
				}
			}
			template = $c.replace_all(template,'\n', "fillTemplate.refs['newline']");
			// special run sytax
			template = ~template.indexOf("${COUNT") ? template.replace(/\$\{COUNT\[(.*?)\]\}/g, '${RUN[__count;$1]}') : template;
			template = ~template.indexOf("${ENUM") ? template.replace(/\$\{ENUM\[(.*?)\]\}/g, '${RUN[__enum;$1]}') : template;
			template = ~template.indexOf("${RUN") ? __run_replace(/\$\{RUN\[(.+?)\]\}/, template, true, obj) : template;
			var tmp, rptmp, skiplogicals = false;
			if (~template.indexOf('||') && (tmp = /\$\{(.+?\|\|?.+?)\}/.exec(template)) && tmp[1]) {
				for (var tag in $c.TEMPLATE_TAG_CONFIG) {
					if (!$c.TEMPLATE_TAG_CONFIG[tag].begin) { continue; }
					if ($c.TEMPLATE_TAG_CONFIG[tag].begin.test(tmp[0])) {
						skiplogicals = true;
						break;
					}
				}
				if (!skiplogicals) {
					tmp = $c.strip(tmp[1], '|').replace(/\|{3,}/, '');
					if (~tmp.indexOf('||')) {
						rptmp = (tmp && "__or|" + $c.replace_all(tmp, '||', "|") || "");
						template = $c.replace_all(template, tmp, rptmp);
					}
					template = template.replace("||", '|');
				}
			}
			if (~template.indexOf('&&') && (tmp = /\$\{(.+?\&\&?.+?)\}/.exec(template)) && tmp[1]) {
				for (var tag in $c.TEMPLATE_TAG_CONFIG) {
					if (!$c.TEMPLATE_TAG_CONFIG[tag].begin) { continue; }
					if ($c.TEMPLATE_TAG_CONFIG[tag].begin.test(tmp[0])) {
						skiplogicals = true;
						break;
					}
				}
				if (!skiplogicals) {
					tmp = tmp[1];
					rptmp = (tmp && "__and|" + $c.replace_all(tmp, '&&', "|") || "");
					template = $c.replace_all(template, tmp, rptmp);
				}
			}
			var leftovervars = template.match(vsyntax);
			if (leftovervars) {
				for (var k = 0, klen = leftovervars.length; k < klen; k++) {
					var variable = leftovervars[k];
					if (~variable.indexOf('|')) {
						var regex = new RegExp($c.replace_all(variable,['$','{','}','|'],['\\$','\\{(',')\\}','\\|']));
						template = __run_replace (regex, template, false, obj);
					}
				}
			}
			template = /\$\{.*?(\|.*?)+?\}/.test(template) && !/\$\{.*?(\|\|.*?)+?\}/.test(template) ? __run_replace (/\$\{(.+?(\|?.+?)+)\}/, template, false,obj) : template;

			var declarations = template.match($c.addFlags(ttc.DECLARE.syntax,'g')) || []
			for (var j = 0, jlen = declarations.length; j < jlen; j++) {
				template = ttc.DECLARE.parser(template, declarations[j]);
			}
			template = __logic_parser(template, obj, bind);
			html += $c.replace_all((vsyntax.test(template) ? template.replace(vsyntax,"") : template),';\\', ';');
		}

		if (!nested) {
			html = html.replace(/fillTemplate.refs['newline']/g,"\n").replace(/fillTemplate.refs\['.*?']/g,"");
			fillTemplate.declared = fillTemplate.refs = undefined;
		}
		return html;
	} catch (e) {
		error('fillTemplate', e);
	}
}
function foo () {
	/*|{
		"info": "Place holder function for a blank function",
		"category": "Global",
		"parameters":[],

		"overloads":[],

		"url": "http://www.craydent.com/library/1.9.3/docs#foo",
		"returnType": "(void)"
	}|*/
}
function getSessionID() {
	/*|{
		"info": "Retrieve the session id when used in conjunction with createServer",
		"category": "Global",
		"parameters":[],

		"overloads":[],

		"url": "http://www.craydent.com/library/1.9.3/docs#getSessionID",
		"returnType": "(void)"
	}|*/
	try {
		return this.sessionid;
	} catch (e) {
		error('getSessionID', e);
	}
}
function getSession(sid, callback) {
	/*|{
		"info": "Retrieve the session object when used in conjunction with createServer",
		"category": "Global",
		"parameters":[
			{"sid": "(String) Session id of the session object to retrieve syncronously."}],

		"overloads":[
			{"parameters":[
	 			{"sid": "(String) Session id of the session object to retrieve."},
	 			{"callback": "(Function) callback function to invoke once the session object is retrieved."}]}],

		"url": "http://www.craydent.com/library/1.9.3/docs#getSession",
		"returnType": "(void)"
	}|*/
	try {
		if (arguments.length == 0) {
			return this.getSessionSync(sid);
		}
		return this._getSession(sid,callback);
	} catch (e) {
		error('getSession', e);
	}
}
function getSessionSync(sid) {
	/*|{
		"info": "Syncronously retrieve the session object when used in conjunction with createServer",
		"category": "Global",
		"parameters":[
			{"sid": "(String) Session id of the session object to retrieve syncronously."}],

		"overloads":[],

		"url": "http://www.craydent.com/library/1.9.3/docs#getSessionSync",
		"returnType": "(void)"
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
		"category": "Global",
		"parameters":[
			{"header": "(String) Http header."}],

		"overloads":[
			{"parameters":[
				{"headers": "(Object) Http headers."}]},

			{"parameters":[
	 			{"header": "(String) Http header."},
	 			{"code": "(Integer) Http response code."}]},

	 		{"parameters":[
				 {"headers": "(Object) Http headers."},
				 {"code": "(Integer) Http response code."}]}],

		"url": "http://www.craydent.com/library/1.9.3/docs#header",
		"returnType": "(void)"
	}|*/
	try {
		if ($c.isString(headers) && !code) {
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
		header.headers = $c.merge(header.headers,headers);
		if (code && $c.isInt(code)) { header.code = code; }

	} catch (e) {
		error('header', e);
	}
}
function include(path, refresh){
	/*|{
		"info": "Require without erroring when module does not exist.",
		"category": "Global",
		"parameters":[
			{"path": "(String) Module or Path to module."}],

		"overloads":[
			{"parameters":[
	 			{"path": "(String) Module or Path to module."},
	 			{"refresh": "(Boolean) Flag to clear cache for the specific include."}]}],

		"url": "http://www.craydent.com/library/1.9.3/docs#include",
		"returnType": "(Mixed)"
	}|*/
	try {
		if (refresh) { $c.clearCache(path); }
		if ( $c.startsWithAny(path, ['/','.'])) {
			return require(__relativePathFinder(path));
		}
		return require(path);
	} catch (e) {
		try {
			return require(__relativePathFinder(path));
		} catch (err) {
			return false;
		}
	}
}
function isNull(value, defaultValue) {
	/*|{
		"info": "Check if a value is Null",
		"category": "Global",
		"parameters":[
			{"value": "(Mixed) Value to check"}],

		"overloads":[
			{"parameters":[
				{"value": "(Mixed) Value to check"},
				{"defaultValue": "(Mixed) Value to return if null"}]}],

		"url": "http://www.craydent.com/library/1.9.3/docs#isNull",
		"returnType": "(Mixed)"
	}|*/
	var isnull = value == null || value == undefined;
	if (arguments.length === 1) {
		return isnull;
	}
	return isnull ? defaultValue : value;
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
		var location = "", err = new Error(), args = [], arg, i = 0;

		$c.VERBOSE_LOGS && err.stack && (location = "\t\t\t\t    " + err.stack.split('\n')[2]);
		for (var i = 0, len = arguments.length; i < len; i++) { args.push( arguments[i]); }
		if ($c.VERBOSE_LOGS) { args.push(location); }
		cout.apply(this, arguments);
	} catch (e) {
		error('logit', e);
	}
}
function md5(str) {
	/*|{
		"info": "MD5 encode a string.",
		"category": "Global",
		"parameters":[
			{"str": "(String) String to encode."}],

		"overloads":[],

		"url": "http://www.craydent.com/library/1.9.3/docs#md5",
		"returnType": "(String)"
	}|*/
	try {
		var crypto = require('crypto'),
			md5sum = crypto.createHash('md5');
		md5sum.update(str);
		return md5sum.digest('hex');
	} catch (e) {
		error('md5', e);
	}
}
function mkdirRecursive(path, callback, _processedPath) {
	/*|{
		"info": "Recursively create folders.",
		"category": "Global",
		"parameters":[
			{"path": "(String) Path to create."},
			{"callback": "(Function) Method to call when directories are created (Gets passed error object as an argument and is null if there were no errors)."}],

		"overloads":[],

		"url": "http://www.craydent.com/library/1.9.3/docs#mkdirRecursive",
		"returnType": "(void)"
	}|*/
	try {
		var absolute = false;
		if (path.startsWith('/')) {
			absolute = true;
			path = path.substring(1);
		}
		_processedPath = _processedPath || process.cwd();
		var fs = require('fs'),
			dirparts = path.split("/"),
			dir = dirparts[0],
			dirPath = _processedPath + "/" + dir;

		if (!dir && dirparts <= 1) { return callback(null, _processedPath.replace(process.cwd(),'')); }

		fs.exists(dirPath, function (exists) {
			if (!exists) {
				fs.mkdir(dirPath, function (err) {
					if (err) {return callback(err);}
					return mkdirRecursive(dirparts.splice(1, dirparts.length - 1).join('/'), callback, _processedPath + "/" + dir);
				});
			} else {
				return mkdirRecursive(dirparts.splice(1, dirparts.length - 1).join('/'), callback, _processedPath + "/" + dir);
			}
		});
	} catch(e) {
		error('mkdirRecursive', e);
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
		$c.setProperty($c.namespaces, name + "." + className, clazz);
		$g[name] = ($g[name] || "") + clazz.toString();
		fn && fn.call(clazz);
		return clazz;
	} catch (e) {
		error('namespace', e);
	}
}
function next () {
	/*|{
		"info": "Call the next function(s) in queue",
		"category": "Global",
		"parameters":[
			{"infinite": "any number of arguments can be passed."}],

		"overloads":[],

		"url": "http://www.craydent.com/library/1.9.3/docs#next",
		"returnType":"(void)"
	}|*/
	try {
		var args = arguments;
		if (!$c.isArray(args)) {
			args = [];
			for (var prop in arguments) {
				args[prop] = arguments[prop];
			}
			args.callee = arguments.callee;
		}
		return _run_func_array.call(this, arguments.callee.caller._then, arguments);
	} catch (e) {
		return e != 'catch' && _run_func_array.call(this, arguments.callee.caller['_catch'], args.length == arguments.length ? args.splice(1) : args);
	}
}
function now (format) {
	/*|{
		"info": "Get the DateTime of now",
		"category": "Global",
		"parameters":[],

		"overloads":[
			{"parameters":[
				{"format": "(String) Format syntax to return formatted string of now"}]}],

		"url": "http://www.craydent.com/library/1.9.3/docs#now",
		"returnType":"(Mixed)"
	}|*/
	try {
		return format ? $c.format((new Date()),format) : new Date();
	} catch (e) { error('now', e); }
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
		if ($c.isString(value)) {
			value = value.toLowerCase();
			return (value == "true" ? true : value == "false" ? false : value == "1" ? true : value == "0" ? false : undefined);
		} else if ($c.isNumber(value)) {
			return (value === 1 ? true : value === 0 ? false : undefined);
		} else if ($c.isBoolean(value)) {
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
		if ($c.isString(value)) {
			raw = (!skipQuotes ? "\"" + $c.replace_all(value,'"','\\"') + "\"" : value);
		} else if ($c.isArray(value)) {
			var tmp = [];
			for (var i = 0, len = value.length; i < len; i++) {
				tmp[i] = parseRaw(value[i], skipQuotes, saveCircular, __windowVars, __windowVarNames);
			}
			raw = "[" + tmp.join(',') + "]";
		} else if ($c.isDate(value)) {
			return "new Date('" + value.toString() + "')";
		} else if ($c.isRegExp(value)) {
			return value.toString();
		} else if (value instanceof Object && !$c.isFunction(value) && !$c.isGenerator(value) && !$c.isAsync(value)) {
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
function requireDirectory(path, options, __basepath, __objs, __fs){
	/*|{
		"info": "Recursively require the entire directory and returns an object containing the required modules.",
		"category": "Global",
		"parameters":[
			{"path": "(String) Path to directory."}],

		"overloads":[
			{"parameters":[
				{"path": "(String) Path to directory."},
				{"options": "(Char) 'r' Flag to use to indicate recursively require"}]}],

		"url": "http://www.craydent.com/library/1.9.3/docs#requireDirectory",
		"returnType": "(Object)"
	}|*/
	var delimiter = "/";

	path = __relativePathFinder(path);

	options = options || {};
	__basepath = __basepath || path;
	__objs = __objs || {};
	__fs = __fs || require('fs');
	if (!path.endsWith(delimiter)) {
		path += delimiter;
	}
	var files = __fs.readdirSync(path);
	for(var i = 0, len = files.length; i < len; i++) {
		var rpath = path+files[i];
		if (__fs.statSync(rpath).isDirectory()) {
			if (options != "r" && !options.recursive) { continue; }
			if (!rpath.endsWith(delimiter)) {
				rpath += delimiter;
			}
			$c.requireDirectory(rpath,options,__basepath,__objs,__fs);
		}
		if (!rpath.endsWith('/')) {
			var filename = rpath.substring(path.lastIndexOf('/') + 1);
			if (!$c.startsWithAny(filename,['_','.'])) {
				__objs[rpath.replace(__basepath, '')] = require(rpath);
			}

		}
	}
	return __objs;
}
function send (status, data) {
	/*|{
		"info": "Recursively require the entire directory and returns an object containing the required modules.",
		"category": "Global",
		"parameters":[
			{"data": "(Object) Object to send in response."}],

		"overloads":[
			{"parameters":[
				{"status": "(Integer) Status code for response."},
				{"data": "(Object) Object to send in response."}]}],

		"url": "http://www.craydent.com/library/1.9.3/docs#send",
		"returnType": "(Object)"
	}|*/
	if (!data && typeof status == "object") {
		data = status;
		status = undefined;
	}
	if (typeof data == "object") { this.header({'Content-Type': 'application/json'}); }
	this.end(status, JSON.stringify(data));
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
function syncroit(gen) {
	/*|{
		"info": "Generator based control flow to allow for more \"syncronous\" programing structure",
		"category": "Global",
		"parameters":[
			{"gen": "(GeneratorFunction) Generator function to execute"}],

		"overloads":[],

		"url": "http://www.craydent.com/library/1.9.3/docs#syncroit",
		"returnType": "(Promise)"
	}|*/
	try {
		return new Promise(function(res){
			var geno = gen();
			try {
				$c.isGenerator(gen) && (function cb(value) {
					var obj = geno.next(value);

					if (!obj.done) {
						if ($c.isPromise(obj.value)) {
							return obj.value.then(cb).catch(cb);
						}
						setTimeout(function () {
							cb(obj.value);
						}, 0);
					} else {
						res($c.isNull(obj.value, value));
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
function var_dump() {
	/*|{
		"info": "Dump of variables to response.",
		"category": "Global",
		"parameters":[
			{"infinite": "any number of arguments can be passed."}],

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
/*timing functions*/
function wait(condition) { // TODO: allow for nested wait calls
	/*|{
		"info": "Stops execution until the condition is satisfied",
		"category": "Global",
		"parameters":[
			{"condition": "(Mixed) Condition equivalent to js true to resume execution"}],

		"overloads":[],

		"url": "http://www.craydent.com/library/1.9.3/docs#wait",
		"returnType": "(void)"
	}|*/
	try {
		var args = arguments.callee.caller.arguments,
			funcOriginal = arguments.callee.caller.toString().
				replace(/\/\/.*?[\r\n]/gi,'').
				replace(/[\t\r\n]*/gi, '').
				replace(/\/\*.*?\*\//gi, ''),
			func = funcOriginal,
			funcArgNames = func.trim().replace(/^function\s*?\((.*?)\).*/, '$1').replace(/\s*/gi,'').split(','),
			fname = func.replace(/function\s*?(.*?)\s*?\(.*/,'$1'),
			fnBefore = func.substr(0, func.indexOf('return wait')),
			variableGroups = fnBefore.match(/var .*?;/gi),
			condition = func.replace(/.*?(return)*\s*?wait\((.*?)\);.*/, '$2'),
			fregex = /\s*?function\s*?\(\s*?\)\s*?\{/;
		func = func.replace(fname, '').replace(/(function\s*?\(.*?\)\s*?\{).*?(return)*\s*?wait\((.*?)\);/, '$1');
		for (var a = 0, alen = funcArgNames.length; a < alen; a++) {
			var argName = funcArgNames[a];
			if (argName) {
				func = func.replace(fregex, 'function(){var ' + argName + '=' + parseRaw(args[a]) + ';');
			}
		}
		for (var i = 0, len = variableGroups.length; i < len; i++) {
			variableGroups[i] = variableGroups[i].replace(/^var\s(.*)?;/,'$1');
			var variables = variableGroups[i].split(/^(?!.*\{.*,).*$/g);
			if (!variables[0]) {
				variables = variableGroups[i].split(',');
			}
			for (var j = 0, jlen = variables.length; j < jlen; j++) {
				var variable = variables[j], regex, values;
				if (~variable.indexOf('=')) {
					variable = variable.split('=')[0].trim();
				}
				regex = new RegExp(variable + '\\s*?=\\s*?.*?\\s*?[,;]', 'gi');
				values = fnBefore.match(regex) || [];
				for (var k = values.length - 1; k >= 0; k--){
					try {
						var value = eval(values[k].replace(/.*?=\s*?(.*?)\s*?;/, '$1').trim());
						func = func.replace(fregex, 'function(){var ' + variable + '=' + parseRaw(value) + ';');
					} catch (e) {
						error("wait.eval-value", e)
					}
				}
			}
		}

		if ($c.isNumber(condition)) {
			setTimeout(eval(func), condition);
		} else {
			var delayFunc = function(){
				if (eval(condition)) {
					(eval("(" + func + ")"))();
				} else {
					setTimeout(delayFunc, 1);
				}
			};
			setTimeout(delayFunc, 1);
		}
	} catch (e) {
		error('wait', e);
	}
}
function writeSession() {
	/*|{
		"info": "Writes session to filesystem to be retrieved later.",
		"category": "Global",
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
					if ($c.getProperty(this,'response.setHeader') && !$c.getProperty(this,'response.headersSent')) {
						this.response.setHeader("Set-Cookie", ["NODEJSSESSION=" + sessionid + "; path=/"]);
					}
					fs.writeFile('craydent/session/' + sessionid, JSON.stringify(session), foo);
				}
			}
			// save session to this server
			if ($c.getProperty(this,'response.setHeader') && !$c.getProperty(this,'response.headersSent')) {
				this.response.setHeader("Set-Cookie", ["NODEJSSESSION=" + sessionid + "; path=/"]);
			}
			fs.writeFile('craydent/session/' + sessionid, JSON.stringify(session), foo);
		}

	} catch (e) {
		error('writeSession', e);
	}
}
function xmlToJson(xml, ignoreAttributes) {
	/*|{
		"info": "Converts XML to JSON",
		"category": "Global",
		"parameters":[
			{"xml": "(Mixed) XML string or XML DOM"}],

		"overloads":[
			{"parameters":[
				{"xml": "(Mixed) XML string or XML DOM"},
				{"ignoreAttributes": "(Bool) Flag to ignore attributes"}]}],

		"url": "http://www.craydent.com/library/1.9.3/docs#xmlToJson",
		"returnType": "(Object)"
	}|*/
	try {
		xml = $c.strip(xml.replace(/<\?.*?\?>/,''),'\n').replace(/>\s*?\n\s*/g,'>');
		var obj = {};

		var index = xml.indexOf('>'),
			nodename = xml.substring(0, index + 1).replace(/<(\S*)?(?:\s?.*?)>/,'$1');

		if (!nodename) { return xml; }

		var parts = xml.split(nodename), child = "", children = [], part;

		// break down construct string of children
		for (var i = 0, len = parts.length; i < len; i++) {
			var part = parts[i] = $c.strip(parts[i],'\n');

			if (part == ">" || part == "><") {
				child += ">";
				children.push(child);
				child = part.substr(1) + nodename;
			} else {
				child += part + nodename;
			}
		}

		// when there are different nodes
		if (xml && !children.length) {
			return __processSiblings(xml);
		}
		return __processChildren(nodename, children);
	} catch (e) {
		error('xmlToJson', e);
	}
}
function yieldable(value,context,callbackIndex) {
	/*|{
		"info": "Makes a value yieldable via a Promise.",
		"category": "Global",
		"parameters":[
			{"value": "(Mixed) Value to make yieldable"}],

		"overloads":[
	 		{"parameters":[
				{"func": "(Function) Function to make yieldable"},
				{"context": "(Mixed) Context to use to execute func."}]},

			{"parameters":[
				{"func": "(Function) Function to make yieldable"},
				{"callbackIndex": "(Integer) Index of callback argument."}]},

			{"parameters":[
				{"func": "(Function) Function to make yieldable"},
				{"context": "(Mixed) Context to use to execute func."},
				{"callbackIndex": "(Integer) Index of callback argument."}]}],

		"url": "http://www.craydent.com/library/1.9.3/docs#yieldable",
		"returnType": "(Promise)"
	}|*/
	try {
		if (value.constructor == Function) {
			context = context || this;
			return function () {
				var args = [];
				for (var i = 0, len = arguments.length; i < len; i++) {
					args.push(arguments[i]);
				}
				return new Promise(function(res){
					var fn = function () {
						if (arguments.length == 1) {
							return res(arguments[0]);
						}
						return res(arguments);
					};
					if ($c.isNull(callbackIndex)) {
						args.push(fn);
					} else {
						$c.insertAt(args, callbackIndex, fn);
					}
					value.apply(context,args);
				});
			};
		}
		return new Promise(function(res){ return res(value); });

	} catch (e) {
		error('yieldable', e);
	}
}
function zipit(files, content/*=NULL*/) {
	/*|{
		"info": "Download a zip of files from file contents",
		"category": "Global",
		"featured": true,
		"parameters":[
			{"files": "(Object[]) Objects containing properties name for file name and content for file content"}],

		"overloads":[
			{"parameters":[
				{"files": "(String) Name of the file"},
				{"content": "(String) contents of the file"}]}],

		"url": "http://www.craydent.com/library/1.9.3/docs#zipit",
		"returnType": "(void)"
	}|*/
	try {
		files = (content && $c.isString(files) && [{
				name:files,
				content:content
			}]) || $c.isObject(files) && [files] || $c.isArray(files) && files;
		var zip = new JSZip();
		for (var i = 0, len = files.length; i < len; i++) {
			var file = files[i];
			content = file.content;
			if ($c.isObject(content)) {
				file.content = JSON.stringify(content,null,"\t");
			}

			zip.add(file.name, (file.pretext || "") + file.content + (file.posttext || ""));
		}

		content = zip.generate();
		return content;
	} catch (e) {
		error('zipit', e);
	}
}

/*----------------------------------------------------------------------------------------------------------------
 /-	Browser helper operations
 /---------------------------------------------------------------------------------------------------------------*/
function ChromeVersion (){
	/*|{
		"info": "Get Chrome version",
		"category": "Global",
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
		"category": "Global",
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
		"category": "Global",
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
		"category": "Global",
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
		"category": "Global",
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
		"category": "Global",
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
		"category": "Global",
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
		"category": "Global",
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
		"category": "Global",
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
		"category": "Global",
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
		"category": "Global",
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
		"category": "Global",
		"parameters":[],

		"overloads":[],

		"url": "http://www.craydent.com/library/1.9.3/docs#isIE6",
		"returnType": "(Bool)"
	}|*/
	try {
		var rv = IEVersion();
		return (~rv && rv < 7.0);
	} catch (e) {
		error('isIE6', e);
	}
}
function isIE() {
	/*|{
		"info": "Check if browser is Internet Explorer",
		"category": "Global",
		"parameters":[],

		"overloads":[],

		"url": "http://www.craydent.com/library/1.9.3/docs#isIE",
		"returnType": "(Bool)"
	}|*/
	try {
		return (!!~IEVersion());
	} catch (e) {
		error('isIE', e);
	}
}
function isIPad() {
	/*|{
		"info": "Check if device is iPad",
		"category": "Global",
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
		"category": "Global",
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
		"category": "Global",
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
		"category": "Global",
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
		"category": "Global",
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
		"category": "Global",
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
		"category": "Global",
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
		"category": "Global",
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
		"category": "Global",
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
		"category": "Global",
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
		"category": "Global",
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
		"category": "Global",
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
		"category": "Global",
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
		"category": "Global",
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
		"category": "Global",
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
		"category": "Global",
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
		"category": "Global",
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

/*----------------------------------------------------------------------------------------------------------------
 /-	String class Extensions
 /---------------------------------------------------------------------------------------------------------------*/
_ext(String, 'acronymize', function (capsOnly, delimiter) {
	/*|{
		"info": "String class extension to capitalize parts of the string",
		"category": "String",
		"parameters":[
			{"capsOnly": "(Boolean) Flag to indicate to use capital letters only."}],

		"overloads":[
			{"parameters":[
				{"match": "(RegExp) Pattern to match to qualify the Acronym."}]},

			{"parameters":[
				{"capsOnly": "(Boolean) Flag to indicate to use capital letters only."},
				{"delimiter": "(String) Character that delimits the string."}]},

			{"parameters":[
				{"match": "(RegExp) Pattern to match to qualify the Acronym."},
				{"delimiter": "(String) Character that delimits the string."}]},

			{"parameters":[
				{"capsOnly": "(Boolean) Flag to indicate to use capital letters only."},
				{"delimiter": "(RegExp) RegExp pattern that delimits the string."}]},

			{"parameters":[
				{"match": "(RegExp) Pattern to match to qualify the Acronym."},
				{"delimiter": "(RegExp) RegExp pattern that delimits the string."}]}],

		"url": "http://www.craydent.com/library/1.9.3/docs#string.capitalize",
		"returnType": "(String)"
	}|*/
	try {
		delimiter = delimiter || " ";
		if ($c.isBoolean(capsOnly)) {
			if (capsOnly) {
				capsOnly = /[A-Z]/
			} else {
				capsOnly = /[a-zA-Z]/
			}
		}
		var words = this.split(delimiter),
			acronym = "";
		for (var i = 0, len = words.length; i < len; i++) {
			if (capsOnly.test(words[0])) { acronym += words[0]; }
		}
		return acronym.toUpperCase();
	} catch (e) {
		error("String.acronymize", e);
	}
}, true);
_ext(String, 'capitalize', function (pos, everyWord) {
	/*|{
		"info": "String class extension to capitalize parts of the string",
		"category": "String",
		"parameters":[
			{"pos": "(Int[]) Index of the string to capitalize"}],

		"overloads":[
			{"parameters":[
				{"pos": "(Int) Index of the string to capitalize"},
				{"everyWord": "(Bool) Flag to capital every word"}]}],

		"url": "http://www.craydent.com/library/1.9.3/docs#string.capitalize",
		"returnType": "(String)"
	}|*/
	try {
		pos = pos || [0];
		!$c.isArray(pos) && (pos = [pos]);
		var wordArray = everyWord ? this.split(' ') : ([this]);
		for (var i = 0; i < pos.length; i++) {
			for (var j = 0; j < wordArray.length; j++) {
				wordArray[j] = wordArray[j].substring(0,pos[i]) + wordArray[j].charAt(pos[i]).toUpperCase() + wordArray[j].slice(pos[i] + 1);
			}
		}
		return wordArray.join(' ');
	} catch (e) {
		error("String.capitalize", e);
	}
}, true);
_ext(String, 'convertUTCDate', function (delimiter) 	{
	/*|{
		"info": "String class extension to convert date string to UTC format",
		"category": "String",
		"parameters":[
			{"delimiter": "(String) Character that delimits the date string"}],

		"overloads":[],

		"url": "http://www.craydent.com/library/1.9.3/docs#string.convertUTCDate",
		"returnType": "(String)"
	}|*/
	try {
		var dateAsString = this;
		if (dateAsString.substring(dateAsString.length - 2) == ".0") {
			dateAsString = dateAsString.substring(0, dateAsString.length - 2);
		}
		var pattern = new RegExp( "(\\d{4})" + delimiter + "(\\d{2})" + delimiter + "(\\d{2}) (\\d{2}):(\\d{2}):(\\d{2})" );
		var parts = dateAsString.match( pattern );

		return parts ? parts[2] + "/" + parts[3] + "/" + parts[1] + " " + parts[4] + ":" + parts[5] + ":" + parts [6] : dateAsString;
	} catch (e) {
		error('String.convertUTCDate', e);
	}
}, true);
_ext(String, 'cut', function (si, ei, replacement) {
	/*|{
		"info": "String class extension to remove between the provided indexes",
		"category": "String",
		"parameters":[
			{"start_index": "(Integer) Start index to cut"},
			{"end_index": "(Integer) End index to cut"}],

		"overloads":[{
			"parameters":[
				{"start_index": "(Integer) Start index to cut"},
				{"end_index": "(Integer) End index to cut"},
				{"replacement": "(String) String to put in place of the cut"}]}],

		"url": "http://www.craydent.com/library/1.9.3/docs#string.cut",
		"returnType": "(String)"
	}|*/
	try {
		if (isNull(si) || isNull(ei)) { return this; }
		if (ei == 0 && si != 0) { ei = si; }
		return this.slice(0, si) + (replacement || "")+ this.slice(ei);
	} catch (e) {
		error("String.cut", e);
	}
}, true);
_ext(String, 'ellipsis', function (before, after) {
	/*|{
		"info": "String class extension to shorten by ellipsis",
		"category": "String",
		"parameters":[
			{"before": "(Int) Number of characters to use before using ellipsis"}],

		"overloads":[
			{"parameters":[
				{"before": "(Int) Number of characters to use before using ellipsis"},
				{"after": "(Int) Number of characters to use after the ellipsis"}]}],

		"url": "http://www.craydent.com/library/1.9.3/docs#string.ellipsis",
		"returnType": "(String)"
	}|*/
	try {
		after = after || 0;
		if (before + after > this.length) { return this; }
		return $c.cut(this,before, -1*after, "...");
	} catch (e) {
		error('String.ellipsis', e);
	}
});
_ext(String, 'endItWith', function (ending) {
	/*|{
		"info": "String class extension to guarantee the original string ends with the passed string",
		"category": "String",
		"parameters":[
			{"ending": "(String) String to end with"}],

		"overloads":[],

		"url": "http://www.craydent.com/library/1.9.3/docs#string.endItWith",
		"returnType": "(String)"
	}|*/
	try {
		if (this.slice(-(ending.length)) == ending) { return this; }
		return this + ending;
	} catch (e) {
		error('String.endItWith', e);
	}
});
_ext(String, 'endsWith', _endsWith);
_ext(String, 'endsWithAny', _endsWith);
_ext(String, 'fillTemplate', function (arr_objs, offset, max, bound) {
	/*|{
		"info": "String class extension to fill template based on template syntax",
		"category": "String",
		"featured": true,
		"parameters":[
			{"objs": "(Objects[]) Objects to fill the template variables"}],

		"overloads":[
			{"parameters":[
				{"objs": "(Objects[]) Objects to fill the template variables"},
				{"offset": "(Int) The start index of the Object array"},
				{"max": "(Int) The maximum number of records to process"}]},
			{"parameters":[
				{"objs": "(Objects[]) Objects to fill the template variables"},
				{"max": "(Int) The maximum number of records to process"}]}],

		"url": "http://www.craydent.com/library/1.9.3/docs#string.fillTemplate",
		"returnType": "(String)"
	}|*/
	try {
		return fillTemplate(this, arr_objs, offset, max, bound);
	} catch (e) {
		error('String.fillTemplate', e);
	}
});
_ext(String, 'highlight', function (search, cssClass, tag) {
	/*|{
		"info": "String class extension to surround search words with the given tag(default span) and class (default chighlight)",
		"category": "String",
		"parameters":[
			{"search": "(String) String to search"}],

		"overloads":[
			{"parameters":[
				{"search": "(RegExp) Regular expression to search"}]},
			{"parameters":[
				{"search": "(String) String to search"},
				{"cssClass": "(String) Class to add for highlighting"}]},
			{"parameters":[
				{"search": "(RegExp) Regular expression to search"},
				{"cssClass": "(String) Class to add for highlighting"}]},
			{"parameters":[
				{"search": "(String) String to search"},
				{"cssClass": "(String) Class to add for highlighting"},
				{"tag": "(String) Tag to use to surround the search"}]},
			{"parameters":[
				{"search": "(RegExp) Regular expression to search"},
				{"cssClass": "(String) Class to add for highlighting"},
				{"tag": "(String) Tag to use to surround the search"}]}],

		"url": "http://www.craydent.com/library/1.9.3/docs#string.cut",
		"returnType": "(String)"
		}|*/
	try {
		cssClass = cssClass || "chighlight";
		tag = tag || "span";
		var txt = "", flags = "g";
		if ($c.isRegExp(search) && !~search.source.indexOf("(")) {
			txt = "(" + search.source + ")";
			if (search.ignoreCase) { flags += "i"; }
			if (search.multiline) { flags += "m"; }
		} else if (!~search.indexOf("(")) {
			txt = "(" + search + ")";
		}
		return this.replace($c.addFlags((new RegExp(txt)),flags),"<" + tag + " class=\"" + cssClass + "\">$1</" + tag + ">");
	} catch (e) {
		error("String.highlight", e);
	}
}, true);
_ext(String, 'indexOfAlt', _indexOfAlt, true);
_ext(String, 'ireplace_all', function(replace, subject) {
	/*|{
		"info": "String class extension to replace all substrings ignoring case",
		"category": "String",
		"parameters":[
			{"replace": "(String) String to replace"},
			{"subject": "(String) String to replace with"}],

		"overloads":[],

		"url": "http://www.craydent.com/library/1.9.3/docs#string.ireplace_all",
		"returnType": "(String)"
	}|*/
	try {
		return _replace_all.call(this, replace, subject, "gi")
	} catch (e) {
		error("String.ireplace_all", e);
	}
}, true);
_ext(String, 'isCuid', function (msFormat) {
	/*|{
		"info": "String class extension to check if the string is a cuid",
		"category": "String",
		"parameters":[
			{"msFormat": "(Bool) use microsoft format if true"}],

		"overloads":[],

		"url": "http://www.craydent.com/library/1.9.3/docs#string.isCuid",
		"returnType": "(Bool)"
	}|*/
	try {
		var pre = "", post = "", length = 36;
		msFormat && ((pre = "{") && (post = "}"),length += 2);
		return this.length == length && (new RegExp(pre+"[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}"+post)).test(this);
	} catch (e) {
		error("String.isCuid", e);
	}
}, true);
_ext(String, 'isBlank', function () {
	/*|{
		"info": "String class extension to check if the string is empty",
		"category": "String",
		"parameters":[],

		"overloads":[],

		"url": "http://www.craydent.com/library/1.9.3/docs#string.isBlank",
		"returnType": "(Bool)"
	}|*/
	try {
		return !this.length;
	} catch (e) {
		error("String.isBlank", e);
	}
}, true);
_ext(String, 'isValidEmail', function () {
	/*|{
		"info": "String class extension to check if string is a valid email",
		"category": "String",
		"parameters":[],

		"overloads":[],

		"url": "http://www.craydent.com/library/1.9.3/docs#string.isValidEmail",
		"returnType": "(Bool)"
	}|*/
	try {
		if (!$c.isBlank(this) && !isNull(this)) {
			var reg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
			return (reg.test(this));
		}
		return false;
	} catch (e) {
		error("String.isValidEmail", e);
	}
}, true);
_ext(String, 'lastIndexOfAlt', function(regex, pos) {
	/*|{
		"info": "String class extension to find the last index based on a regular expression",
		"category": "String",
		"parameters":[
			{"regex": "(RegExp) Regular expression to check value against"}],

		"overloads":[
			{"parameters":[
				{"regex": "(RegExp) Regular expression to check value against"},
				{"pos": "(Int) Max index to go up to in the search"}]}],

		"url": "http://www.craydent.com/library/1.9.3/docs#string.lastIndexOfAlt",
		"returnType": "(Int)"
	}|*/
	try {
		regex = (regex.global) ? regex : new RegExp(regex.source, "g" + (regex.ignoreCase ? "i" : "") + (regex.multiLine ? "m" : ""));
		pos = $c.isNull(pos, this.length);
		if(pos < 0) { pos = 0; }
		var str = this.substring(0, pos + 1),
			lindex = -1,
			next = 0,
			result;

		while((result = regex.exec(str)) != null) {
			lindex = result.index;
			regex.lastIndex = ++next;
		}
		return lindex;
	} catch (e) {
		error("String.lastIndexOfAlt", e);
	}
}, true);
_ext(String, 'ltrim', function (character) {
	/*|{
		"info": "String class extension to remove characters from the beginning of the string",
		"category": "String",
		"parameters":[
			{"character": "(Char[]) Character to remove"}],

		"overloads":[],

		"url": "http://www.craydent.com/library/1.9.3/docs#string.ltrim",
		"returnType": "(String)"
	}|*/
	try {
		return _trim(this, 'l', character);
	} catch (e) {
		error("String.ltrim", e);
	}
}, true);
_ext(String, 'pluralize', function () {
	/*|{
		"info": "String class extension to do a best guess pluralization of the string",
		"category": "String",
		"parameters":[],

		"overloads":[],

		"url": "http://www.craydent.com/library/1.9.3/docs#string.pluralize",
		"returnType": "(String)"
	}|*/
	try {
		var str = this;

		if (_irregularNouns[str]) {
			str = _irregularNouns[str];
		} else if (str.slice(-1) in {"s":1,"x":1,"o":1} || str.slice(-2) in {"ch":1,"sh":1,"is":1}) {
			str += "es";
		} else if (str.slice(-1) == "f") {
			str = str.slice(0,-1) + "ves";
		} else if (str.slice(-2) == "fe") {
			str = str.slice(0,-2) + "ves";
		} else if (str.slice(-1) == "y") {
			str = str.slice(0,-1) + "ies";
		} else if (str.slice(-2) == "us") {
			str = str.slice(0,-2) + "i";
		} else if (str.slice(-2) == "tion") {
			str = str.slice(0,-2) + "tions";
		} else if (str.slice(-2) == "on") {
			str = str.slice(0,-2) + "a";
		} else { // regular nouns
			str += "s";
		}
		return str;
	} catch (e) {
		error('String.pluralize', e);
	}
});
_ext(String, 'replace_all', function(replace, subject) {
	/*|{
		"info": "String class extension to replace all substrings (case sensitive)",
		"category": "String",
		"parameters":[
			{"replace": "(String) String to replace"},
			{"subject": "(String) String to replace with"}],

		"overloads":[{
			"parameters":[
				{"replace": "(String[]) Array of string to replace"},
				{"subject": "(String[]) Array of string to replace with"}]}],

		"url": "http://www.craydent.com/library/1.9.3/docs#string.replace_all",
		"returnType": "(String)"
	}|*/
	try {
		return _replace_all.call(this, replace, subject, "g")
	} catch (e) {
		error("String.replace_all", e);
	}
}, true);
_ext(String, 'reverse', function () {
	/*|{
		"info": "String class extension to reverse the string",
		"category": "String",
		"parameters":[],

		"overloads":[],

		"url": "http://www.craydent.com/library/1.9.3/docs#string.reverse",
		"returnType": "(String)"
	}|*/
	try {
		return this.split('').reverse().join('');
	} catch (e) {
		error("String.reverse", e);
	}
}, true);
_ext(String, 'rtrim', function (character) {
	/*|{
		"info": "String class extension to remove characters from the end of the string",
		"category": "String",
		"parameters":[
			{"character": "(Char[]) Character to remove"}],

		"overloads":[],

		"url": "http://www.craydent.com/library/1.9.3/docs#string.rtrim",
		"returnType": "(String)"
	}|*/
	try {
		return _trim(this, 'r', character);
	} catch (e) {
		error("String.rtrim", e);
	}
}, true);
_ext(String, 'sanitize', function () {
	/*|{
		"info": "String class extension to remove potential XSS threats",
		"category": "String",
		"parameters":[],

		"overloads":[],

		"url": "http://www.craydent.com/library/1.9.3/docs#string.sanitize",
		"returnType": "(String)"
	}|*/
	try {
		return this.replace(/&/gi, "&#38;").
		replace(/#/gi, "&#35;").
		replace(/%/gi, "&#37;").
		replace(/;/gi, "&#59;").
		replace(/\+/gi, "&#43;").
		replace(/\-/gi, "&#45;").
		replace(/\'/gi, "&#39;").
		replace(/\\"/gi, "&#34;").
		replace(/\(/gi, "&#40;").
		replace(/\)/gi, "&#41;").
		replace(/\</gi, "&#60;").
		replace(/\>/gi, "&#62;");
	} catch (e) {
		error("String.sanitize", e);
	}
}, true);
_ext(String, 'singularize', function () {
	/*|{
		"info": "String class extension to do a best guess singularization of the string",
		"category": "String",
		"parameters":[],

		"overloads":[],

		"url": "http://www.craydent.com/library/1.9.3/docs#string.singularize",
		"returnType": "(String)"
	}|*/
	try {
		var str = this, key;

		if (key = $c.keyOf(_irregularNouns, str)) {
			str = key;
		} else if (str.slice(-3) == "ves") {
			if (str[str.length - 4] in {a:1,e:1,i:1,o:1,u:1}) {
				str = str.slice(0,-3) + "fe";
			} else {
				str = str.slice(0,-3) + "f";
			}
		} else if (str.slice(-3) == "ies") {
			str = str.slice(0,-3) + "y";
		} else if (str.slice(-1) == "a") {
			str = str.slice(0,-1) + "on";
		} else if (str.slice(-1) == "i") {
			str = str.slice(0,-1) + "us";
		} else if (str.slice(-3) in {"ses":1,"xes":1,"oes":1} || str.slice(-4) in {"ches":1,"shes":1,"ises":1}) {
			str = str.slice(0,-2);
		} else { // regular nouns
			str = str.slice(0,-1);
		}
		return str;
	} catch (e) {
		error('String.singularize', e);
	}
});
_ext(String, 'startItWith', function (starting) {
	/*|{
		"info": "String class extension to guarantee the original string starts with the passed string",
		"category": "String",
		"parameters":[
			{"starting": "(String) String to start with"}],

		"overloads":[],

		"url": "http://www.craydent.com/library/1.9.3/docs#string.startItWith",
		"returnType": "(String)"
	}|*/
	try {
		if (this.slice(-(starting.length)) == starting) { return this; }
		return this + starting;
	} catch (e) {
		error('String.startItWith', e);
	}
});
_ext(String, 'startsWith', _startsWith);
_ext(String, 'startsWithAny', _startsWith);
_ext(String, 'strip', function(character) {
	/*|{
		"info": "String class extension to remove characters from the beginning and end of the string",
		"category": "String",
		"parameters":[
			{"character": "(Char[]) Character to remove"}],

		"overloads":[],

		"url": "http://www.craydent.com/library/1.9.3/docs#string.strip",
		"returnType": "(String)"
	}|*/
	return _strip(this, character);
}, true);
_ext(String, 'toCurrencyNotation', _toCurrencyNotation, true);
_ext(String, 'toDateTime', function (options) {
	/*|{
		"info": "String class extension to convert string to datetime",
		"category": "String",
		"parameters":[],

		"overloads":[
			{"parameters":[
				{"options": "(Object) specs with optional properties:<br />(Bool) gmt<br />(Int) offset<br />(String) format"}]}],

		"url": "http://www.craydent.com/library/1.9.3/docs#string.toDateTime",
		"returnType": "(Mixed)"
	}|*/
	try {
		/*
		 *  options properties:
		 *  gmt:true - convert to GMT
		 *  offset:offset from GMT
		 *  format:format used in Datetime.format
		 **/
		options = options || {};
		var strDatetime = this;
		var dt = new Date(strDatetime);
		if (/\d\d\d\d-\d\d-\d\d$/.test(strDatetime)) {
			dt = new Date(this.replace("-","/").replace("-","/"));
		}
		if (!dt.getDate() && $c.isString(strDatetime)) {
			dt = new Date(strDatetime.replace(/(am|pm)/i,' $1'));
		}
		if (!dt.getDate()) {
			var parts = [],
				dtstring = this[0] == "(" ? this.substring(1,this.length-1) : this,
				chars = ["\\.","\\/","-","\\s*?"], c, i = 0;

			while (c = chars[i++] && !dt.getDate()) {
				// using format m(m).d(d).yy(yy) or d(d).m(m).yy(yy) or yy(yy).m(m).d(d) or yy(yy).d(d).m(m)
				// using format m(m)/d(d)/yy(yy) or d(d)/m(m)/yy(yy) or yy(yy)/m(m)/d(d) or yy(yy)/d(d)/m(m)
				// using format m(m)-d(d)-yy(yy) or d(d)-m(m)-yy(yy) or yy(yy)-m(m)-d(d) or yy(yy)-d(d)-m(m)
				var c = chars[i - 1],
					regex = new RegExp("(\\d{1,4})" + c + "\\s*?(\\d{1,2})" + c + "\\s*?(\\d{2,4})(.*)");
				if ((parts = dtstring.match(regex)) && parts.length > 1) {
					// assume year is first
					if (parts[1].length == 4) {
						parts[0] = parts[1];
						parts[1] = parts[2];
						parts[3] = parts[0];
					}
					// assume month is first
					if (parseInt(parts[1]) >= 1  && parseInt(parts[1]) <= 12) {
						dt = new Date(parts[1] + "/" + parts[2] + "/" + parts[3] + parts[4]);
					} else { // day is first
						dt = new Date(parts[2] + "/" + parts[1] + "/" + parts[3] + parts[4]);
					}
				}
				if (!dt.getDate() && (parts = dtstring.match(/(\d{1,2})\/(\d{1,2})\/(\d{2,4})(.*)/)) && parts.length > 1) {
					dt = new Date(parts[2] + "/" + parts[1] + "/" + parts[3] + parts[4]);
				} else if (!dt.getDate() && (parts = dtstring.match(/(\d{1,2})-([a-zA-Z]{3,9})-(\d{2,4})(.*)/)) && parts.length > 1) {
					dt = new Date(dtstring.replace("-", " "));
				}
			}
		}
		if (options.gmt) {
			var offset = isNull(options.offset, _getGMTOffset.call(!dt.getDate() ? new Date() : dt));
			dt = new Date(dt.valueOf() - offset * 60*60000);
		}
		return options.format ? $c.format(dt,options.format) : dt;
	} catch (e) {
		error("String.toDateTime", e);
	}
}, true);
_ext(String, 'toObject', function(assignmentChar, delimiter) {
	/*|{
		"info": "String class extension to convert to JSON",
		"category": "String",
		"parameters":[],

		"overloads":[
			{"parameters":[
				{"assignmentChar": "(Char) Character to use as assignment delimiter. Defaults to '='."}]},
			{"parameters":[
				{"assignmentChar": "(Char) Character to use as assignment delimiter. Defaults to '&'."},
				{"delimiter": "(Char) Character to use as pair delimiter"}]}],

		"url": "http://www.craydent.com/library/1.9.3/docs#string.toObject",
		"returnType": "(Object)"
	}|*/
	try {
		assignmentChar = assignmentChar || "=";
		delimiter = delimiter || "&";
		var rtn = {}, kv_pairs = this.split(delimiter);
		for (var i = 0, len = kv_pairs.length; i < len; i++) {
			var kv = kv_pairs[i].split(assignmentChar);
			rtn[kv[0]] = kv[1];
		}
		return rtn;
	} catch (e) {
		error("String.indexOfAlt", e);
	}
}, true);
_ext(String, 'trim', __universal_trim, true);

/*----------------------------------------------------------------------------------------------------------------
 /-	Array class Extensions
 /---------------------------------------------------------------------------------------------------------------*/

_ext(Array, 'aggregate', function (pipelines) {
	/*|{
		"info": "Array class extension to perform mongo style aggregation",
		"category": "Array",
		"featured": true,
		"parameters":[
			{"pipelines": "(Object[]) Array of stages defined in mongodb"}],

		"overloads":[],

		"url": "http://www.craydent.com/library/1.9.3/docs#array.aggregate",
		"returnType": "(Array)"
	}|*/
	try {
		var rtn = this, pipeline, i = 0, hasGroup = false;
		while (pipeline = pipelines[i++]){
			if (pipeline["$group"]) { hasGroup = true; }
			rtn = __processStage(rtn, pipeline);
		}
		return rtn.sample && !hasGroup ? rtn.sample : rtn;
	} catch (e) {
		error("Array.aggregate", e);
	}
}, true);
_ext(Array, 'average', function () {
	/*|{
		"info": "Array class extension to perform average of all the values (any value which is not a number is 0).",
		"category": "Array",
		"featured": true,
		"parameters":[],

		"overloads":[],

		"url": "http://www.craydent.com/library/1.9.3/docs#array.aggregate",
		"returnType": "(Array)"
	 }|*/
	try {
		var length = 0, sum = 0;
		for (var i = 0, len = this.length; i < len; i++) {
			if ($c.isNumber(this[i])) {
				sum += this[i];
				length++;
			}
		}
		return sum/length;
	} catch (e) {
		error("Array.average", e);
	}
}, true);
_ext(Array, 'buildTree', function (parentFinder,childFinder,options) {
	/*|{
		"info": "Array class extension to create a parent/child hierarchy",
		"category": "Array",
		"parameters":[
			{"parentFinder": "(Function) Function to determine the parent.   Should return a boolean value and is passed the current item as an argument."},
			{"childFinder": "(String) Property name of the object to use as a grouping."}],

		"overloads":[
			{"parameters":[
				{"parentFinder": "(Function) Function to determine the parent.   Should return a boolean value and is passed the current item as an argument."},
				{"childFinder": "(Function) Function to determine the grouping."}]},

			{"parameters":[
				{"parentFinder": "(Function) Function to determine the parent.   Should return a boolean value and is passed the current item as an argument."},
				{"childFinder": "(String) Property name of the object to use as a grouping."},
				{"options":"(Object) Options to customize properties,  Valid property is:<br />childProperty"}]},

			{"parameters":[
				{"parentFinder": "(Function) Function to determine the parent.   Should return a boolean value and is passed the current item as an argument."},
				{"childFinder": "(String) Property name of the object to use as a grouping."},
				{"options":"(Object) Options to customize properties,  Valid property is:<br />childProperty"}]}],

		"url": "http://www.craydent.com/library/1.9.3/docs#array.buildTree",
		"returnType": "(Array)"
	}|*/
	try {
		options = options || {};
		var rtnArr = [];
		var i = 0,objt,cats=[],catDict={},tmp={}, singles = {};
		var cprop = options.childProperty || "children";
		while(objt=this[i++]){
			var cat = $c.isFunction(childFinder) ? childFinder(objt) : objt[childFinder],
				rootFound = $c.contains(cats, cat);

			objt[cprop] = objt[cprop] || [];
			if (parentFinder(objt)) {
				delete singles[cat];

				if (!rootFound && tmp[cat]) {
					objt[cprop] = tmp[cat];
				}
				tmp[cat] = objt[cprop];

				cats.push(cat);
				catDict[cat] = objt;
				rtnArr.push(objt);
				continue;
			}

			// root not found yet
			if (!rootFound) {
				singles[cat] = singles[cat] || [];
				singles[cat].push(objt);
				tmp[cat] = tmp[cat] || [];
				tmp[cat].push(objt);
			} else {
				catDict[cat][cprop].push(objt);
			}
		}
		for (var prop in singles) {
			if (!singles.hasOwnProperty(prop)) { continue; }
			var j = 0, single;
			while (single = singles[prop][j++]) {
				single[cprop] = [];
			}
			rtnArr = rtnArr.concat(singles[prop]);
		}
		return rtnArr;
	} catch (e) {
		error('Array.buildTree', e);
	}
});
_ext(Array, 'condense', function (check_values) {
	/*|{
		"info": "Array class extension to reduce the size of the Array removing blank strings, undefined's, and nulls",
		"category": "Array",
		"parameters":[],

		"overloads":[
			{"parameters":[
				{"check_values": "(Bool) Flag to remove duplicates"}]}],

		"url": "http://www.craydent.com/library/1.9.3/docs#array.condense",
		"returnType": "(Array)"
	}|*/
	return _condense(this, check_values);
}, true);
_ext(Array, 'createIndex', function (indexes) {
	/*|{
		"info": "Array class extension to create indexes for faster searches during where",
		"category": "Array",
		"parameters":[
	 		{"properties": "(String) Property or comma delimited property list to index."}],

		"overloads":[
			{"parameters":[
				{"indexes": "(String[]) Array of properties to index"}]}],

		"url": "http://www.craydent.com/library/1.9.3/docs#array.condense",
		"returnType": "(Array)"
	}|*/
	try {
		if (!indexes || !indexes.length) { return false; }
		if (!$c.isArray(indexes)) { indexes = indexes.split(','); }
		this.__indexes = {};

		for (var i = 0, len = indexes.length; i < len; i++) {
			var prop = indexes[i], arr = [];

			for (var j = 0, jlen = this.length; j < jlen; j++) {
				var index = _binarySearch(arr, prop, this[j][prop], null, null, true);
				$c.insertAt(arr,index,this[j]);

			}
			this.__indexes[prop] = arr;
		}
	} catch(e) {
		error("Array.createIndex", e);
		return false;
	}
});
_ext(Array, 'delete', function(condition, justOne) {
	/*|{
		"info": "Array class extension to delete records",
		"category": "Array",
		"parameters":[
			{"condition": "(Mixed) Query following find/where clause syntax"}],

		"overloads":[
			{"parameters":[
				{"condition": "(Mixed) Query following find/where clause syntax"},
				{"justOne": "(Boolean) Flag for deleting just one records [Default is: true]"}]}],

		"url": "http://www.craydent.com/library/1.9.3/docs#array.delete",
		"returnType": "(Array)"
	}|*/
	try {
		var thiz = this, _qnp = __queryNestedProperty,
			_clt = _contains_lessthan,
			_clte = _contains_lessthanequal,
			_cgt = _contains_greaterthan,
			_cgte = _contains_greaterthanequal,
			_ct = _contains_type, _cm = _contains_mod;
		justOne = parseBoolean($c.isNull(justOne) ? true : $c.isNull(justOne.justOne, justOne));
		// if no condition was given, remove all
		if (!condition) { return this.splice(0,justOne ? 1 : this.length); }

		var arr = [], indexes = [], cb = function (obj, i) {
			if (justOne) {
				arr = arr.concat(this.splice(i,1));
				return false
			}
			indexes.push(i);
			return true;
		};

		var _refs = [], ifblock = _subQuery(condition,null,null,_refs), func = "(function (record,i) {"+
			"	var values,finished;" +
			"	if ("+ifblock+") {" +
			"		if(!cb.call(thiz,record,i)) { throw 'keep going'; }" +
			"	}" +
			"})";
		if (_refs.length) {
			var varStrings = "";
			for (var i = 0, len = _refs.length; i < len; i++) {
				varStrings += "var __where_cb" + (i+1) + "=_refs["+i+"];"
			}
			eval(varStrings);
		}
		try {
			this.filter(eval(func));
		} catch(e) {
			if (e != 'keep going') { throw e;}
		}

		for (var i = indexes.length - 1; i >= 0; i--) {
			arr = this.splice(indexes[i],1).concat(arr);
		}

		return arr;
	} catch (e) {
		error("Array.delete", e);
		return false;
	}
}, true);
_ext(Array, 'distinct', function(fields, condition) {
	/*|{
		"info": "Array class extension to get all unique records by fields specified",
		"category": "Array",
		"parameters":[
			{"fields": "(String) Fields to use as the projection and unique comparison (comma delimited)"}],

		"overloads":[
			{"parameters":[
				{"fields": "(Array) Fields to use as the projection and unique comparison"}]},

			{"parameters":[
				{"fields": "(String) Fields to use as the projection and unique comparison (comma delimited)"},
				{"condition": "(String) Query following SQL where clause syntax"}]},

			{"parameters":[
				{"fields": "(Array) Fields to use as the projection and unique comparison (comma delimited)"},
				{"condition": "(String) Query following SQL where clause syntax"}]},

			{"parameters":[
				{"fields": "(String) Fields to use as the projection and unique comparison (comma delimited)"},
				{"condition": "(Object) Query following MongoDB find clause syntax"}]},

			{"parameters":[
				{"fields": "(Array) Fields to use as the projection and unique comparison (comma delimited)"},
				{"condition": "(Object) Query following MongoDB find clause syntax"}]}],

		"url": "http://www.craydent.com/library/1.9.3/docs#array.distinct",
		"returnType": "(Array)"
	}|*/
	try {
		if ($c.isString(fields)) { fields = fields.split(","); }

		var records = $c.group(this,{field:fields,cond:condition},true);
		if (fields.length == 1) {
			var arr = [];
			for (var i = 0, len = records.length; i < len; i++ ) {
				arr.push(records[i][fields[0]]);
			}
			return arr;
		}
		return records;
	} catch (e) {
		error("Array.distinct", e);
		return false;
	}
});
_ext(Array, 'every', function(callback, thisObject) {
	/*|{
		"info": "Array class extension to implement .every method",
		"category": "Array",
		"parameters":[
			{"callback": "(Function) Callback to test for each element"}],

		"overloads":[
			{"parameters":[
				{"callback": "(Function) Callback to test for each element"},
				{"thisObject": "(Object) Context for the callback function"}]}],

		"url": "http://www.craydent.com/library/1.9.3/docs#array.every",
		"returnType": "(Bool)"
	}|*/
	try {
		var thisObject = thisObject || this, thiz, i = 0;
		for (var i = 0, len = this.length; i < len; i++) {
			var thiz = this[i];
			if (thiz && !callback.call(thisObject, thiz, i, this)) { return false; }
		}
		return true;
	} catch (e) {
		error("Array.every", e);
	}
}, true);
_ext(Array, 'filter', function(func /*, thiss*/) {
	/*|{
		"info": "Array class extension to implement filter",
		"category": "Array",
		"parameters":[
			{"func": "(Function) Callback function used to determine if value should be returned"}],

		"overloads":[
			{"parameters":[
				{"func": "(Function) Callback function used to determine if value should be returned"},
				{"thiss": "(Mixed) Specify the context on callback function"}]}],

		"url": "http://www.craydent.com/library/1.9.3/docs#array.filter",
		"returnType": "(Array)"
	}|*/
	try {
		if (!$c.isFunction(func)) {
			//noinspection ExceptionCaughtLocallyJS
			throw new TypeError();
		}
		var filtered = [],
			thiss = arguments[1] || this;
		for (var i = 0; i < this.length; i++) {
			var val = this[i];
			if (func.call(thiss, val, i, this)) {
				filtered.push(val);
			}
		}

		return filtered;
	} catch (e) {
		error('Array.filter', e);
		return false;
	}
}, true);
_ext(Array, 'find', function(condition, projection) {
	/*|{
		"info": "Array class extension to use mongo or sql queries (Alias of Where minus the limit argument)",
		"category": "Array",
		"featured": true,
		"parameters":[
			{"condition": "(Mixed) Query following find/where clause syntax"}],

		"overloads":[
			{"parameters":[
				{"condition": "(Mixed) Query following find/where clause syntax"},
				{"projection": "(Mixed) Indicate which properties to return"}]},

			{"parameters":[
				{"condition": "(Mixed) Query following find/where clause syntax"},
				{"useReference": "(Bool) Flag to make a copy instead of using references"}]}],

		"url": "http://www.craydent.com/library/1.9.3/docs#array.where",
		"returnType": "(Array)"
	}|*/
	return $c.where(this,condition, projection);
});
_ext(Array, 'findOne', function(condition, projection) {
	/*|{
		"info": "Array class extension to use mongo or sql queries returning the first item match",
		"category": "Array",
		"featured": true,
		"parameters":[
			{"condition": "(Mixed) Query following find/where clause syntax"}],

		"overloads":[
			{"parameters":[
				{"condition": "(Mixed) Query following find/where clause syntax"},
				{"projection": "(Mixed) Indicate which properties to return"}]},

			{"parameters":[
				{"condition": "(Mixed) Query following find/where clause syntax"},
				{"useReference": "(Bool) Flag to make a copy instead of using references"}]}],

		"url": "http://www.craydent.com/library/1.9.3/docs#array.where",
		"returnType": "(Object)"
	}|*/
	return $c.where(this,condition, projection, 1)[0];
});
_ext(Array, 'group', function(params, removeProps) {
	/*|{
		"info": "Array class extension to group records by fields",
		"category": "Array",
		"parameters":[
			{"params": "(Object) specs with common properties:<br />(Object) key<br />(Mixed) cond<br />(Function) reduce<br />(Object) initial"}],

		"overloads":[],

		"url": "http://www.craydent.com/library/1.9.3/docs#array.group",
		"returnType": "(Array)"
	}|*/

	/*    parameters:[
	 *        {fields: "(Mixed) Fields to use as the projection and to group by"}],
	 *
	 *    overloads:[
	 *        {parameters:[
	 *            {fields: "(Mixed) Fields to use as the projection and to group by"},
	 *            {condition: "(Mixed) Query following find/where clause syntax"}]},
	 *        {parameters:[
	 *            {fields: "(Mixed) Fields to use as the projection and to group by"},
	 *            {condition: "(Mixed) Query following find/where clause syntax"},
	 *            {reduce: "(Function) Method that operates on the records during the grouping operation"}]},
	 *        {parameters:[
	 *            {fields: "(Mixed) Fields to use as the projection and to group by"},
	 *            {condition: "(Mixed) Query following find/where clause syntax"},
	 *            {reduce: ""},
	 *            {initial: ""}]}],*/
	try {
		var key = params.field || params.key,
			condition = params.cond || {},
			reduce = params.reduce || foo,
			initial = params.initial || {},
			keyf = params.keyf,
			finalize = params.finalize || function(o) { return o;};

		if ($c.isString(key)) { key = key.split(','); }
		if ($c.isArray(key)) {
			var tmp = {};
			for (var i = 0, len = key.length; i < len; i++) {
				tmp[key[i]] = 1;
			}
			key = tmp;
		}

		var props = $c.getKeys(initial),
			fields = $c.getKeys(key),
			arr = [], result = {}, id = suid(),
			cb = function (ob, i) {
				// _groupFieldHelper creates a grouping string based on the field value pairs
				if (!fields && keyf) {
					fields = $c.isFunction(keyf) ? keyf(doc) : keyf;
				}
				var prop = _groupFieldHelper(ob, fields), addit = false;
				if (!result[prop]) {
					addit = true;
					var tmp = $c.duplicate(initial);
					result[prop] = tmp;
				}
				var curr = $c.duplicate(ob), item;
				reduce(curr, result[prop]);
				item = _copyWithProjection(fields, ob, !removeProps);
				item[id] = prop;
				addit && arr.push(item);
				return true;
			};



		var thiz = this, _qnp = __queryNestedProperty,
			_clt = _contains_lessthan,
			_clte = _contains_lessthanequal,
			_cgt = _contains_greaterthan,
			_cgte = _contains_greaterthanequal,
			_ct = _contains_type, _cm = _contains_mod, _refs = [], ifblock = _subQuery(condition,null,null,_refs), func = "(function (record,i) {"+
			"	var values,finished;" +
			"	if ("+ifblock+") {" +
			"		if(!cb.call(thiz,record,i)) { throw 'keep going'; }" +
			"	}" +
			"})";
		if (_refs.length) {
			var varStrings = "";
			for (var i = 0, len = _refs.length; i < len; i++) {
				varStrings += "var __where_cb" + (i+1) + "=_refs["+i+"];"
			}
			eval(varStrings);
		}
		try {
			var rarr = this.filter(eval(func));
		} catch(e) {
			if (e != 'keep going') { throw e;}
		}

		var keyObj = $c.duplicate(initial);
		for (var prop in key) {
			if (!key.hasOwnProperty(prop)) { continue; }
			$c.setProperty(keyObj,prop,key[prop]);
		}
		for (var i = 0, len = arr.length; i < len; i++) {
			var merge1 = $c.merge(arr[i],result[arr[i][id]]);
			arr[i] = $c.merge(keyObj,finalize(merge1) || merge1,{clone:true,intersect:true});
		}
		return arr;
	} catch (e) {
		error("Array.group", e);
		return false;
	}
});
_ext(Array, 'indexOf', function(value) {
	/*|{
		"info": "Array class extension to implement indexOf",
		"category": "Array",
		"parameters":[
			{"value": "(Mixed) value to find"}],

		"overloads":[],

		"url": "http://www.craydent.com/library/1.9.3/docs#array.indexOf",
		"returnType": "(Int)"
	}|*/
	return _indexOf(this, value);
}, true);
_ext(Array, 'indexOfAlt', _indexOfAlt, true);
_ext(Array, "innerJoin", function (arr, on) {
	/*|{
		"info": "Array class extension to do an inner join on arrays",
		"category": "Array",
		"parameters":[
			{"arr": "(Array) Array to be joined with"},
			{"on": "(String) Condition to join on"}],

		"overloads":[],

		"url": "http://www.craydent.com/library/1.9.3/docs#array.innerJoin",
		"returnType": "(Array)"
	}|*/
	try {
		return _joinHelper(this, arr, on, true);
	} catch (e) {
		error('Array.innerJoin', e);
	}
});
_ext(Array, 'insert', function(value) {
	/*|{
		"info": "Array class extension to add to the array",
		"category": "Array",
		"parameters":[
			{"value": "(Mixed) value to add"}],

		"url": "http://www.craydent.com/library/1.9.3/docs#array.insert",
		"returnType": "(Bool)"
	}|*/
	try {
		if ($c.isArray(value)) {
			for (var i = 0, len = value.length; i < len; i++) {
				this.push(value[i]);
			}
		} else {
			this.push(value);
		}
		return true;
	} catch (e) {
		error("Array.insert", e);
		return false;
	}
}, true);
_ext(Array, 'insertAfter', function(index, value) {
	/*|{
		"info": "Array class extension to add to the array after a specific index",
		"category": "Array",
		"parameters":[
			{"index": "(Int) Index to add after"},
			{"value": "(Mixed) Value to add"}],

		"overloads":[],

		"url": "http://www.craydent.com/library/1.9.3/docs#array.insertAfter",
		"returnType": "(Bool)"
	}|*/
	try {
		this.splice(index + 1, 0, value);
		return true;
	} catch (e) {
		error("Array.insertAfter", e);
		return false;
	}
}, true);
_ext(Array, 'insertAt', function(index, value) {
	/*|{
		"info": "Array class extension to add to the array at a specific index and push the all indexes down",
		"category": "Array",
		"parameters":[
			{"index": "(Int) Index to add after"},
			{"value": "(Mixed) Value to add"}],

		"overloads":[],

		"url": "http://www.craydent.com/library/1.9.3/docs#array.insertAt",
		"returnType": "(Bool)"
	}|*/
	try {
		this.splice(index, 0, value);
		return true;
	} catch (e) {
		error("Array.insertAt", e);
		return false;
	}
}, true);
_ext(Array, 'insertBefore', function(index, value) {
	/*|{
		"info": "Array class extension to add to the array before a specific index",
		"category": "Array",
		"parameters":[
			{"index": "(Int) Index to add before"},
			{"value": "(Mixed) Value to add"}],

		"overloads":[],

		"url": "http://www.craydent.com/library/1.9.3/docs#array.insertBefore",
		"returnType": "(Bool)"
	}|*/
	try {
		this.splice(index, 0, value);
		return true;
	} catch (e) {
		error("Array.insertBefore", e);
		return false;
	}
}, true);
_ext(Array, "joinLeft", function (arr, on) {
	/*|{
		"info": "Array class extension to do an outer left join on arrays",
		"category": "Array",
		"parameters":[
			{"arr": "(Array) Secondary array to be joined with"},
			{"on": "(String) Condition to join on"}],

		"overloads":[],

		"url": "http://www.craydent.com/library/1.9.3/docs#array.joinLeft",
		"returnType": "(Array)"
	}|*/
	try {
		return _joinHelper(this, arr, on);
	} catch (e) {
		error('Array.joinLeft', e);
	}
});
_ext(Array, "joinRight", function (arr, on) {
	/*|{
		"info": "Array class extension to do an outer right join on arrays",
		"category": "Array",
		"parameters":[
			{"arr": "(Array) Secondary array to be joined with"},
			{"on": "(String) Condition to join on"}],

		"overloads":[],

		"url": "http://www.craydent.com/library/1.9.3/docs#array.joinRight",
		"returnType": "(Array)"
	}|*/
	try {
		return _joinHelper(arr, this, on);
	} catch (e) {
		error('Array.joinRight', e);
	}
});
_ext(Array, "last", function () {
	/*|{
		"info": "Array class extension to retrieve the last item in the array.",
		"category": "Array",
		"parameters":[],

		"overloads":[],

		"url": "http://www.craydent.com/library/1.9.3/docs#array.last",
		"returnType": "(Array)"
	}|*/
	try {
		return this[this.length - 1];
	} catch (e) {
		error('Array.last', e);
	}
}, true);
_ext(Array, 'limit', function(max, skip) {
	/*|{
		"info": "Array class extension to return a limited amount of items",
		"category": "Array",
		"parameters":[
			{"max": "(Int) Maximum number of items to return"}],

		"overloads":[
	 		{"parameters":[
	 			{"max": "(Int) Maximum number of items to return"},
	 			{"skip": "(Int) Number of items to skip"}]}],

		"url": "http://www.craydent.com/library/1.9.3/docs#array.limit",
		"returnType": "(Array)"
	}|*/
	try {
		skip = skip || 0;
		return this.slice(skip,max);
	} catch (e) {
		error("Array.limit", e);
	}
}, true);
_ext(Array, 'map', function(callback /*, thisObject*/) {
	/*|{
	"info": "Array class extension to implement map",
	"category": "Array",
	"parameters":[
		{"callback": "(Function) Callback function used to apply changes"}],

	"overloads":[
		{"parameters":[
			{"callback": "(Function) Callback function used to apply changes"},
			{"thisObject": "(Mixed) Specify the context on callback function"}]}],

	"url": "http://www.craydent.com/library/1.9.3/docs#array.map",
	"returnType": "(Array)"
	}|*/
	try {
		var thisObject = arguments[1] || this,
			other= new Array(this.length);
		for (var i = 0, n = this.length; i < n; i++) {
			if (i in this) {
				other[i] = callback.call(thisObject, this[i], i, this);
			}
		}
		return other;
	} catch (e) {
		error("Array.map", e);
	}
}, true);
_ext(Array, 'mapReduce', function(map, reduce, options) {
	/*|{
		"info": "Array class extension to run map-reduce aggregation over records",
		"category": "Array",
		"parameters":[
			{"map": "(Function) Function to apply to each item"},
			{"reduce": "(Function) Function used to condense the items"}],

		"overloads":[
			{"parameters":[
				{"map": "(Function) Function to apply to each item"},
				{"reduce": "(Function) Function used to condense the items"},
				{"options": "(Object) Options specified in the Mongo Doc"}]}],

		"url": "http://www.craydent.com/library/1.9.3/docs#array.mapReduce",
		"returnType": "(Array)"
	}|*/
	try {
		options = options || {};
		var obj = {}, results = $c.where(this,options.query,null,options.limit), rtnArr = [], final = options.finalize;
		if (options.sort) {
			if ($c.isObject(options.sort)) {
				var sortProps = [];
				for (var prop in options.sort) {
					if (!options.sort.hasOwnProperty(prop)) { continue; }
					if (options.sort[prop] == 1) { sortProps.push(prop); }
					if (!~options.sort[prop]) { sortProps.push("!"+prop); }
				}
				results = $c.sortBy(results,sortProps);
			} else {
				results = $c.sortBy(results,options.sort);
			}
		}
		$c.on(map,'emit',function(key,value){
			obj[key] = obj[key] || [];
			obj[key].push(value);
		});
		var result, i = 0;
		for (var i = 0, len = results.length; i < len; i++) { map.call(results[i]) };
		for (var key in obj) {
			if (!obj.hasOwnProperty(key)) { continue; }
			var reducedValue = reduce(key,obj[key]);
			if ($c.isFunction(final)) { reducedValue = final(key,reducedValue); }
			rtnArr.push({_id:key, value: reducedValue});
		}

		if ($c.isString(options.out)) {
			$g[options.out] = $c.duplicate(rtnArr,true);
		} else if ($c.isArray(options.out)) {
			$c.removeAll(options.out);
			return $c.merge(options.out,rtnArr);
		}
		return rtnArr;
	} catch (e) {
		error("Array.mapReduce", e);
		return false;
	}
});
_ext(Array, 'normalize', function () {
	/*|{
		"info": "Array class extension to normalize all properties in the object array",
		"category": "Array",
		"parameters":[],

		"overloads":[],

		"url": "http://www.craydent.com/library/1.9.3/docs#array.normalize",
		"returnType": "(Array)"
	}|*/
	try {
		var allProps = {}, arrObj = [], len = this.length;
		for(var i = 0; i < len; i++) {
			var json = this[i];
			if (!$c.isObject(json)) {
				error("normalize", {description:'index: ' + i + ' (skipped) is not an object'});
				continue;
			}
			for(var prop in json) {
				if (json.hasOwnProperty(prop)) {
					allProps[prop] = 1;
				}
			}
		}
		for(i = 0; i < len; i++) {
			for (var prop in allProps) {
				if (!allProps.hasOwnProperty(prop)) { continue; }
				this[i][prop] = this[i][prop] || null;
			}
			arrObj.push(this[i]);
		}
		return arrObj;
	} catch(e) {
		error("Array.normalize", e);
	}
}, true);
_ext(Array, 'parallelEach', function (gen, args) {
	/*|{
		"info": "Array class extension to execute each array item in parallel or run each item against a generator/function in parallel",
		"category": "Array",
		"parameters":[],

		"overloads":[
			{"parameters":[
				{"gen": "(Generator) Generator function to apply to each item"}]},

			{"parameters":[
				{"func": "(Function) Function to apply to each item"}]},

			{"parameters":[
				{"args": "(Array) Argument array to apply to pass to generator or function (only should be used when the array contains generators, promises, or functions)"}]}],

		"url": "http://www.craydent.com/library/1.9.3/docs#array.parallelEach",
		"returnType": "(Promise)"
	}|*/
	try {
		var self = this, arr = this;
		if ($c.isArray(gen)) {
			args = gen;
			gen = undefined;
		}
		if (!$c.isArray(args)) {
			args = [];
		}
		var len = arr.length, results = Array(len), completed = 0;
		if (!len) { return new Promise(function (res) { res(results); }); }
		if (gen) {
			var isgen = $c.isGenerator(gen), isfunc = $c.isFunction(gen), isasync = $c.isAsync(gen);
			return new Promise(function (res, rej) {
				for (var i = 0; i < len; i++) {
					if (isgen) {
						eval('$c.syncroit(function*(){ results[' + i + '] = yield* gen.call(self, arr[' + i + '],' + i + '); if (++completed == len) { res(results); } });');
                    } else if (isasync) {
                        eval('(async function (){ results[' + i + '] = await gen.call(self, arr[' + i + '],' + i + '); if (++completed == len) { res(results); } })();');
					} else if (isfunc) {
						results[i] = gen.call(self,arr[i],i);
						if (++completed == len) { res(results); }
					}
				}
			});
		}
		return new Promise(function (res, rej) {
			for (var i = 0; i < len; i++) {
				if ($c.isGenerator(arr[i])) {
					eval('$c.syncroit(function*(){ results[' + i + '] = yield* arr[' + i + '].apply(self,args); if (++completed == len) { res(results); } });');
				} else if ($c.isAsync(arr[i])) {
					eval('(async function () { results[' + i + '] = await arr[' + i + ']; if (++completed == len) { res(results); } })();');
                } else if ($c.isPromise(arr[i])) {
                    eval('$c.syncroit(function*(){ results[' + i + '] = yield arr[' + i + ']; if (++completed == len) { res(results); } });');
				} else if ($c.isFunction(arr[i])) {
					eval('setTimeout(function(){ results[' + i + '] = arr[' + i + '].apply(self,args);if (++completed == len) { res(results); } },0);');
				} else {
					results[i] = arr[i];
					if (++completed == len) { res(results); }
				}
			}
		});
	} catch(e) {
		error("Array.parallelEach", e);
	}
}, true);
_ext(Array, 'remove', function (value, indexOf) {
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
		indexOf = indexOf || this.indexOf;
		var index = indexOf.call(this, value);
		if(!~index) { return false; }
		return this.splice(index, 1)[0];
	} catch (e) {
		error("Array.remove", e);
	}
}, true);
_ext(Array, 'removeAll', function (value, indexOf) {
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
			indexOf = indexOf || this.indexOf;
			var  removed = [], index = indexOf.call(this, value);
			if (!~index) { return false; }
			while (~index && $c.isInt(index)) {
				removed.push($c.remove(this,value, indexOf));
				index = indexOf.call(this, value);
			}
			return removed;
		}
		return this.splice(0,this.length);

	} catch (e) {
		error("Array.removeAll", e);
	}
}, true);
_ext(Array, 'removeAt', function (index) {
	/*|{
		"info": "Array class extension to remove item at a specific index",
		"category": "Array",
		"parameters":[
			{"index": "(Int) Index of the item to remove"}],

		"url": "http://www.craydent.com/library/1.9.3/docs#array.removeAt",
		"returnType": "(Mixed)"
	}|*/
	try {
		if(this[index] === undefined) { return false; }
		return this.splice(index, 1)[0];
	} catch (e) {
		error("Array.removeAt", e);
	}
}, true);
_ext(Array, 'replaceAt', function(index, value) {
	/*|{
		"info": "Array class extension to replace item at a specific index",
		"category": "Array",
		"parameters":[
			{"index": "(Int) Index of the item to remove"},
			{"value": "(Mixed) Value to replace with"}],

		"overloads":[],

		"url": "http://www.craydent.com/library/1.9.3/docs#array.replaceAt",
		"returnType": "(Array)"
	}|*/
	try {
		return this.splice(index, 1, value)[0];
	} catch (e) {
		error("Array.replaceAt", e);
	}
}, true);
_ext(Array, 'scramble', function() {
	/*|{
		"info": "Array class extension to scramble the order.",
		"category": "Array",
		"parameters":[],

		"overloads":[],

		"url": "http://www.craydent.com/library/1.9.3/docs#array.scramble",
		"returnType": "(Array)"
	}|*/
	try {
		var min = 0, max = this.length;
		return this.sort(function(){ return Math.round($c.rand(min,max,true)); });
	} catch (e) {
		error("Array.scramble", e);
	}
}, true);
_ext(Array, 'sortBy', function(props, rev, primer, lookup, options){
	/*|{
		"info": "Array class extension to sort the array",
		"category": "Array",
		"parameters":[
			{"props": "(String) Property/Comma delimited list of properties to sort by. If the first character is '!', the sort order is reversed"}],

		"overloads":[
			{"parameters":[
				{"props": "(Array) Properties to sort by. If the first character is '!', the sort order is reversed"}]},

			{"parameters":[
				{"props": "(String) Property/Comma delimited list of properties to sort by. If the first character is '!', the sort order is reversed"},
				{"rev": "(Boolean) Flag to reverse the sort"}]},

			{"parameters":[
				{"props": "(Array) Properties to sort by. If the first character is '!', the sort order is reversed"},
				{"rev": "(Boolean) Flag to reverse the sort"}]},

			{"parameters":[
				{"props": "(String) Property/Comma delimited list of properties to sort by. If the first character is '!', the sort order is reversed"},
				{"rev": "(Boolean) Flag to reverse the sort"},
				{"primer": "(Function) Function to apply to values in the array."}]},

			{"parameters":[
				{"props": "(Array) Properties to sort by. If the first character is '!', the sort order is reversed"},
				{"rev": "(Boolean) Flag to reverse the sort"},
				{"primer": "(Function) Function to apply to values in the array."}]},

			{"parameters":[
				{"props": "(String) Property/Comma delimited list of properties to sort by. If the first character is '!', the sort order is reversed"},
				{"rev": "(Boolean) Flag to reverse the sort"},
				{"primer": "(Function) Function to apply to values in the array."},
				{"lookup": "(Object) Look up object to use as values instead of the array values."}]},

			{"parameters":[
				{"props": "(Array) Properties to sort by. If the first character is '!', the sort order is reversed"},
				{"rev": "(Boolean) Flag to reverse the sort"},
				{"primer": "(Function) Function to apply to values in the array."},
				{"lookup": "(Object) Look up object to use as values instead of the array values."}]},

			{"parameters":[
				{"props": "(String) Property/Comma delimited list of properties to sort by. If the first character is '!', the sort order is reversed"},
				{"rev": "(Boolean) Flag to reverse the sort"},
				{"primer": "(Function) Function to apply to values in the array."},
				{"lookup": "(Object) Look up object to use as values instead of the array values."},
				{"options": "(Object) Options to pass. Valid options are:<br />i<br />ignoreCase"}]},

			{"parameters":[
				{"props": "(Array) Properties to sort by. If the first character is '!', the sort order is reversed"},
				{"rev": "(Boolean) Flag to reverse the sort"},
				{"primer": "(Function) Function to apply to values in the array."},
				{"lookup": "(Object) Look up object to use as values instead of the array values."},
				{"options": "(Object) Options to pass. Valid options are:<br />i<br />ignoreCase"}]}],

		"url": "http://www.craydent.com/library/1.9.3/docs#array.sortBy",
		"returnType": "(Array)"
	}|*/
	try {
		options = ($c.isString(options) && options in {"i":1,"ignoreCase":1}) ? {i:1} : {};
		primer = primer || function(x){return x;};
		if($c.isString(props)){ props = props.split(','); }
		var key = function (x) { return primer(x[prop]); };
		var tmpVal;
		var prop_sort = function (a,b,p) {
			p = p||0;
			var prop = props[p],
				reverseProp = false;

			if(!prop){return -1;}
			if(prop[0] == "!"){
				prop = prop.replace('!','');
				reverseProp = true;
			}
			var aVal = primer.call(a, (lookup && lookup[a][prop]) || a[prop], prop),
				bVal = primer.call(b, (lookup && lookup[b][prop]) || b[prop], prop);

			if (options.i && aVal && bVal) {
				aVal = aVal.toLowerCase();
				bVal = bVal.toLowerCase();
			}
			tmpVal = aVal;
			aVal = ((aVal = parseInt(aVal)) && aVal.toString() == tmpVal && parseInt(tmpVal)) || tmpVal;
			tmpVal = bVal;
			bVal = ((bVal = parseInt(bVal)) && bVal.toString() == tmpVal && parseInt(tmpVal)) || tmpVal;



			if (aVal == bVal) {return prop_sort(a,b,p+1);}
			if (isNull(aVal)) {return 1;}
			if (isNull(bVal)) {return -1;}
			if(!reverseProp) {
				if (aVal > bVal) {return 1;}
				return -1;
			}
			if (aVal < bVal) {return 1;}
			return -1;
		};
		this.sort(prop_sort);
		if (rev) {
			this.reverse();
		}

		return this;
	} catch (e) {
		error('Array.sortBy', e);
	}
}, true);
_ext(Array, 'stdev', function (con) {
	/*|{
		"info": "Array class extension to perform standard deviation (any value which is not a number is 0).",
		"category": "Array",
		"featured": true,
		"parameters":[],

		"overloads":[],

		"url": "http://www.craydent.com/library/1.9.3/docs#array.stdev",
		"returnType": "(Array)"
	}|*/
	try {
		if (!this.length) { return 0; }
		var avg = $c.average(this),
			sum = null, sdlen = 0;
		for (var i = 0, len = this.length; i < len; i++) {
			if (!$c.isNumber(this[i])) { continue; }
			sdlen++;
			sum = sum || 0;
			var diff = this[i] - avg;
				sum += diff * diff;
		}
		return Math.sqrt(sum/sdlen);
	} catch (e) {
		error("Array.stdev", e);
	}
}, true);
_ext(Array, 'sum', function () {
	/*|{
		"info": "Array class extension to perform summation of all the values (any value which is not a number is 0).",
		"category": "Array",
		"featured": true,
		"parameters":[],

		"overloads":[],

		"url": "http://www.craydent.com/library/1.9.3/docs#array.sum",
		"returnType": "(Array)"
	}|*/
	try {
		var value = 0;
		for (var i = 0, len = this.length; i < len; i++) {
			value += $c.isNumber(this[i]) ? this[i] : 0;
		}
		return value;
	} catch (e) {
		error("Array.sum", e);
	}
}, true);
_ext(Array, 'toSet', function() {
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
				if ($c.equals(item,citem)) {
					$c.removeAt(this,j--);
					len--;
				}
			}
		}
	} catch (e) {
		error("Array.toSet", e);
		return false;
	}
}, true);
_ext(Array, 'trim', __universal_trim, true);
_ext(Array, 'update', function(condition, setClause, options) {
	/*|{
		"info": "Array class extension to update records in the array",
		"category": "Array",
		"parameters":[
			{"condition": "(Mixed) Query following find/where clause syntax"},
			{"setClause": "(Mixed) Set clause used to update the records"}],

		"overloads":[
			{"parameters":[
				{"condition": "(Mixed) Query following find/where clause syntax"},
				{"setClause": "(Mixed) Set clause used to update the records"},
				{"options": "(Object) Options to specify if mulit update and/or upsert"}]}],

		"url": "http://www.craydent.com/library/1.9.3/docs#array.update",
		"returnType": "(Array)"
	}|*/
	try {
		options = options || {};
		// if sql syntax convert to mongo object syntax
		if ($c.isString(condition)) {
			condition = _processClause(condition);
		}
		var setObject = $c.isObject(setClause) ? setClause : {'$set':null};
		if ($c.isString(setClause)) {
			setClause = setClause.split(',');
			setObject['$set'] = {};
			for (var i = 0, len = setClause.length; i < len; i++) {
				var keyVal = setClause[i].split("=");
				setObject['$set'][_trim(keyVal[0])] = _trim(keyVal[0]);
			}
		}
		var found = false, plainObject = true, operations = {"$set":1,"$unset":1,"$currentDate":1,"$inc":1,"$max":1,"$min":1,"$mul":1,"$bit":1,"$rename":1
			,"$":1,"$addToSet":1,"$pop":1,"$pullAll":1,"$pull":1,"$pushAll":1,"$push":1};
		for (var prop in setObject) {
			if (operations[prop]) {
				plainObject = false;
				break;
			}
		}

		var thiz = this, _qnp = __queryNestedProperty,
			_clt = _contains_lessthan,
			_clte = _contains_lessthanequal,
			_cgt = _contains_greaterthan,
			_cgte = _contains_greaterthanequal,
			_ct = _contains_type, _cm = _contains_mod, _refs= [], ifblock = _subQuery(condition,null,null,_refs), func = "(function (record,i) {"+
			"	var values,finished;" +
			"	if ("+ifblock+") {" +
			"		if(!cb.call(thiz,record,i)) { throw 'keep going'; }" +
			"	}" +
			"})", cb = function (obj, i) {
			found  = true;
			if (plainObject) {
				this.splice(i,1,setObject);
			}
			if (setObject['$set']) {
				for (var prop in setObject['$set']) {
					setObject['$set'].hasOwnProperty(prop) && $c.setProperty(obj, prop, setObject['$set'][prop]);
				}
			}
			if (setObject['$unset']) {
				for (var prop in setObject['$unset']) {
					setObject['$unset'].hasOwnProperty(prop) && delete obj[prop];
				}
			}
			if (setObject['$currentDate']) {
				for (var prop in setObject['$currentDate']) {
					setObject['$currentDate'].hasOwnProperty(prop) && (obj[prop] = new Date());
				}
			}
			if (setObject['$inc']) {
				for (var prop in setObject['$inc']) {
					setObject['$inc'].hasOwnProperty(prop) && (obj[prop] += setObject['$inc'][prop]);
				}
			}
			if (setObject['$max']) {
				for (var prop in setObject['$max']) {
					if (!setObject['$max'].hasOwnProperty(prop)) { continue; }
					obj[prop] = $c.isNull(obj[prop], setObject['$max'][prop]);
					var value = obj[prop];
					value < setObject['$max'][prop] && (obj[prop] = setObject['$max'][prop]);
				}
			}
			if (setObject['$min']) {
				for (var prop in setObject['$min']) {
					if (!setObject['$min'].hasOwnProperty(prop)) { continue; }
					obj[prop] = $c.isNull(obj[prop], setObject['$min'][prop]);
					var value = obj[prop];
					value > setObject['$min'][prop] && (obj[prop] = setObject['$min'][prop]);
				}
			}
			if (setObject['$mul']) {
				for (var prop in setObject['$mul']) {
					setObject['$mul'].hasOwnProperty(prop) && (obj[prop] *= setObject['$mul'][prop]);
				}
			}
			if (setObject['$bit']) {
				for (var prop in setObject['$bit']) {
					if (!setObject['$bit'].hasOwnProperty(prop) || !$c.isInt(obj[prop])) {continue;}
					if ($c.isInt(setObject['$bit'][prop]['and'])) {
						obj[prop] &= setObject['$bit'][prop]['and'];
					} else if ($c.isInt(setObject['$bit'][prop]['or'])) {
						obj[prop] |= setObject['$bit'][prop]['and'];
					} else if ($c.isInt(setObject['$bit'][prop]['xor'])) {
						obj[prop] ^= setObject['$bit'][prop]['and'];
					}
				}
			}
			if (setObject['$rename']) {
				for (var prop in setObject['$rename']) {
					if (!obj.hasOwnProperty(prop)) { continue; }
					var value = obj[prop];
					setObject['$rename'].hasOwnProperty(prop) && delete obj[prop] && (obj[setObject['$rename'][prop]] = value);
				}
			}

			// Array operations
			if (setObject['$']) {

			}
			if (setObject['$addToSet']) {
				for (var prop in setObject['$addToSet']) {
					if (!setObject['$addToSet'].hasOwnProperty(prop)) { continue; }
					var each;
					if (each = $c.getProperty(setObject,'$addToSet.'+prop+'.$each')) {
						for (var i = 0, len = each.length; i < len; i++) {
							obj[prop].push(each[i]);
						}
					} else {
						obj[prop].push(setObject['$addToSet'][prop]);
					}
				}
				$c.toSet(obj[prop]);
			}
			if (setObject['$pop']) {
				for (var prop in setObject['$pop']) {
					if(!setObject['$pop'].hasOwnProperty(prop) || !$c.isArray(obj[prop])) { continue; }
					if (setObject['$pop'][prop] == 1) { obj[prop].pop(); }
					else if (!~setObject['$pop'][prop]) { obj[prop].shift(); }
				}
			}
			if (setObject['$pullAll']) {
				for (var prop in setObject['$pullAll']) {
					var arr = $c.getProperty(obj,prop),
						values = setObject['$pullAll'][prop];
					if (!$c.isArray(arr)) { continue; }
					__pullHelper(arr,values);
				}
			}
			if (setObject['$pull']) {
				for (var prop in setObject['$pull']) {
					var arr = $c.getProperty(obj,prop),
						values = setObject['$pullAll'][prop];
					if (!$c.isArray(arr)) { continue; }
					if ($c.isArray(values)) {
						__pullHelper(arr,values);
					} else if ($c.isObject(values)) {
						$c.delete(values,false);
					}
				}
			}
			if (setObject['$push']) {
				for (var prop in setObject['$push']) {
					if (!setObject['$push'].hasOwnProperty(prop)) { continue; }
					var each = $c.getProperty(setObject,'$push.'+prop+'.$each'),
						slice = $c.getProperty(setObject,'$push.'+prop+'.$slice'),
						sort = $c.getProperty(setObject,'$push.'+prop+'.$sort'),
						position = $c.getProperty(setObject,'$push.'+prop+'.$position');


					if (each) {
						if ($c.isNull(position)) {
							for (var i = 0, len = each.length; i < len; i++) {
								obj[prop].push(each[i]);
							}
						} else {
							for (var i = 0, len = each.length; i < len; i++) {
								$c.insertBefore(obj[prop], position++, each[i]);
							}
						}

					} else {
						obj[prop].push(setObject['$push'][prop]);
					}

					if (each && sort) {
						var sorter = [];
						for (var p in sort) {
							if (!sort.hasOwnProperty(p)) { continue; }
							if (sort[p] == 1) {
								sorter.push(p)
							} else if (!~sort[p]) {
								sorter.push("!"+p)
							}
						}
						$c.sortBy(obj[prop],sorter);
					}

					if (each && !$c.isNull(slice)) {
						obj[prop] = obj[prop].slice(slice);
					}
				}
			}


			return  !!options.multi;
		};
		if (_refs.length) {
			var varStrings = "";
			for (var i = 0, len = _refs.length; i < len; i++) {
				varStrings += "var __where_cb" + (i+1) + "=_refs["+i+"];"
			}
			eval(varStrings);
		}
		try {
			this.filter(eval(func));
		} catch(e) {
			if (e != 'keep going') { throw e;}
		}


		if (!found && options.upsert) {
			this.push($c.update([{}],{},setObject)[0] || setObject);
		}

		return this;
	} catch (e) {
		error("Array.update", e);
		return false;
	}
}, true);
_ext(Array, 'upsert', function(records, prop, callback) {
	/*|{
		"info": "Array class extension to upsert records to array",
		"category": "Array",
		"parameters":[
			{"records": "(Array) Records to use to insert/update array"}],

		"overloads":[
			{"parameters":[
				{"records": "(Array) Records to use to insert/update array"},
				{"callback": "(Function) Method to use to determine if the records are equal"}]},

			{"parameters":[
				{"records": "(Array) Records to use to insert/update array"},
				{"prop": "(String) Property to use as the primary key"}]},

			{"parameters":[
				{"records": "(Array) Records to use to insert/update array"},
				{"prop": "(String) Property to use as the primary key"},
				{"callback": "(Function) Method to use to determine if the records are equal"}]}],

		"url": "http://www.craydent.com/library/1.9.3/docs#array.upsert",
		"returnType": "(Object)"
	}|*/
	try {
		var usePrimaryKey = true;
		if (!$c.isArray(records)) { records = [records]; }
		if ($c.isFunction(prop)) {
			callback = prop;
			prop = undefined;
		}
		if (!prop) { prop = "_id"; }
		if (callback) { usePrimaryKey = false; }

		var ids = [], refs = {}, insert = [];
		for (var i = 0, len = records.length; i < len; i++) {
			var record = records[i];
			refs[record[prop]] = {record:record,index:i};
			ids.push(record[prop]);
		}


		var condition = {}, uIndex = [], iIndex = [], sIndex = [], uArr = [], iArr = [], sArr = [], j = 0;
		condition[prop] = {$in:ids};

		var cb = function (obj,i) {
			var ref = refs[obj[prop]],
				record = ref.record,
				isEqual = callback && callback(obj,record),
				index = uIndex,
				arr = uArr;
			if ($c.isNull(isEqual, $c.equals(record,obj))) {
				index = sIndex;
				arr = sArr;
			} else {
				$c.merge(obj, record);
			}
			index.push(i);
			arr.push(obj);
			ids.splice(ref.index-(j++), 1);
			return true;
		};
		var _qnp = __queryNestedProperty,
			_clt = _contains_lessthan,
			_clte = _contains_lessthanequal,
			_cgt = _contains_greaterthan,
			_cgte = _contains_greaterthanequal,
			_ct = _contains_type, _cm = _contains_mod, _refs = [], ifblock = _subQuery(condition,null,null,_refs), func = "(function (record,i) {"+
			"	var values,finished;" +
			"	if ("+ifblock+") {" +
			"		cb(record,i);" +
			"	}" +
			"})";
		if (_refs.length) {
			var varStrings = "";
			for (var i = 0, len = _refs.length; i < len; i++) {
				varStrings += "var __where_cb" + (i+1) + "=_refs["+i+"];"
			}
			eval(varStrings);
		}
		this.filter(eval(func));

		for (var i = 0, len = ids.length; i < len; i++) {
			var objRef = refs[ids[i]];
			iIndex.push(this.length);
			iArr.push(objRef.record);
			this.push($c.duplicate(objRef.record));
		}

		return {
			insertedIndexes:iIndex,
			updatedIndexes:uIndex,
			unchangedIndexes:sIndex,
			inserted:iArr,
			updated:uArr,
			unchanged:sArr
		};
	} catch (e) {
		error("Array.upsert", e);
		return false;
	}
}, true);
_ext(Array, 'where', function(condition, projection, limit) {
	/*|{
		"info": "Array class extension to use mongo or sql queries",
		"category": "Array",
		"featured": true,
		"parameters":[
			{"condition": "(Mixed) Query following find/where clause syntax"}],

		"overloads":[
			{"parameters":[
				{"condition": "(Mixed) Query following find/where clause syntax"},
				{"projection": "(Mixed) Indicate which properties to return"}]},

			{"parameters":[
				{"condition": "(Mixed) Query following find/where clause syntax"},
				{"useReference": "(Bool) Flag to make a copy instead of using references"}]},

			{"parameters":[
				{"condition": "(Mixed) Query following find/where clause syntax"},
				{"projection": "(Mixed) Indicate which properties to return"},
				{"limit": "(Int) Limit the number of the results returned."}]},

			{"parameters":[
				{"condition": "(Mixed) Query following find/where clause syntax"},
				{"useReference": "(Bool) Flag to make a copy instead of using references"},
				{"limit": "(Int) Limit the number of the results returned."}]}],

		"url": "http://www.craydent.com/library/1.9.3/docs#array.where",
		"returnType": "(Array)"
	}|*/
	try {
		var useReference = !projection,
			_qnp = __queryNestedProperty,
			_clt = _contains_lessthan,
			_clte = _contains_lessthanequal,
			_cgt = _contains_greaterthan,
			_cgte = _contains_greaterthanequal,
			_ct = _contains_type, _cm = _contains_mod;

		// if no condition was given, return all
		if (!condition) { return this.slice(0,limit); }
		if (limit === 0) { return []; }


		if ($c.isFunction(condition) && !projection) {
			var arr = this.filter(function(item){ return condition.call(item); });
			return limit ? arr.slice(0,limit) : arr;
		}

		// check if there is query MongoDB syntax
		var simple = !projection;
		var condStr;
		try {
			condStr = simple && JSON.stringify(condition, function (key, val) {
				if (key[0] == "$") {
					simple = false;
					throw '';
				}
				return val;
			});
		} catch (e) { }

		if (simple) {
			limit = limit || 0;//this.length;
			var props = [],indexProps = [];
			if (this.__indexes) {
				for (var prop in condition) {
					if (condition.hasOwnProperty(prop)) {
						//props.push(prop);
						if (this.__indexes[prop]) {
							indexProps.push(prop);
						}
					}
				}
			}
			var arr = this,ipHasLength = !!indexProps.length;
			if (ipHasLength) {
				var prop, i = 0;

				var orderedLists = [], fi = 0,len = arr.length;
				while (prop = indexProps[i++]) {
					var ordered = _binarySearch(arr.__indexes[prop],prop,condition[prop]);
					if (len > ordered.length) {
						len = ordered.length;
						fi = i - 1;
					}
					orderedLists.push(ordered);
				}
				if (len < 1000) {
					var farr = orderedLists[fi];
					arr = [];
					for (var i = 0; i < len; i++) {
						var addit = true;
						for (var j = 0, jlen = orderedLists.length; j < jlen; j++) {
							if (fi == j) { continue; }
							if (!~orderedLists[j].indexOf(farr[i])) {
								addit = false;
								break;
							}
						}
						addit && arr.push(farr[i]);
					}
				}
			}
			var boolCond = "", useQueryNested = false, func = function (cobj,index,arr) {
				if (arr.temp_count++ < this.temp_limit) { return false; }
				for (var prop in condition) {
					if (~prop.indexOf('.')) {
						if (!$c.contains(_qnp(cobj, prop),condition[prop])) {
							return false;
						}
					} else if (cobj[prop] && cobj[prop] !== condition[prop] || $c.isNull(cobj[prop])) {
						return false;
					}
				}
				return true;
			};
			for (var prop in condition) {
				if (!condition.hasOwnProperty(prop) || ipHasLength && ~indexProps.indexOf(prop)) { continue; }
				if (~prop.indexOf('.')) { useQueryNested = true; break; }
				var q = $c.isString(condition[prop]) ? "\"" : "";
				if ($c.isRegExp(condition[prop])) {
					boolCond += condition[prop] + ".test(cobj[\"" + prop + "\"]) && ";
				} else if (typeof condition[prop] == "object") {
					boolCond += "$c.equals(cobj[\"" + prop + "\"]," + JSON.stringify(condition[prop]) + ") && ";
				} else {
					boolCond += "cobj[\"" + prop + "\"]==" + q + condition[prop] + q + " && ";
				}
			}
			if (!useQueryNested) {
				var limitLogic = "";
				limit && (limitLogic = "arr.temp_count++ < arr.temp_limit && ");
				func = (eval("(function(cobj,index,arr){ return " + limitLogic + boolCond + "true;})") || func);
			}
			arr.temp_count = 0;
			arr.temp_limit = limit;

			arr = arr.filter(func);
			delete arr.temp_count;
			delete arr.temp_limit;

			return arr;
		}

		var arr = [], rarr, _refs = [];
		var ifblock = _subQuery(condition,null,null,_refs),
			func = eval("(function (record) {var values;" +
				(limit ? "if (arr.length == limit) { throw 'keep going'; } " : "") +
				"return " + (useReference ? ifblock : ifblock + " && arr.push(_copyWithProjection(projection, record))") + ";})");

		if (_refs.length) {
			var varStrings = "";
			for (var i = 0, len = _refs.length; i < len; i++) {
				varStrings += "var __where_cb" + (i+1) + "=_refs["+i+"];"
			}
			eval(varStrings);
		}
		try {
			rarr = this.filter(func);
		} catch(e) {
			if (e != 'keep going') { throw e;}
		}
		if (!useReference) { return arr; }
		return rarr;
	} catch (e) {
		error("Array.where", e);
		return false;
	}
}, true);

/*----------------------------------------------------------------------------------------------------------------
 /-	Date class Extensions
 /---------------------------------------------------------------------------------------------------------------*/
_ext(Date, 'format', function (format, options) {
	/*|{
		"info": "Date class extension to convert to formatted string",
		"category": "Date",
		"featured": true,
		"parameters":[
			{"format": "(String) Format syntax to use to to format date"}],

		"overloads":[
			{"parameters":[
				{"format": "(String) Format syntax to use to to format date"},
				{"options": "(Object) specs with optional properties:<br />(Bool) gmt<br />(Int) offset"}]}],

		"description":"<h2>Format syntax is as follows:</h2><br /><h3>Day Options</h3><p>d or %d: 2 digit day leading 0<br />D: textual representation of a day, three letters<br />j: day without leading 0<br />l (lower case L): full textual representation of the day of the week<br />N: ISO-8601 numeric representation of the day of the week<br />S: English ordinal suffix for the day of the month, 2 characters<br />w: Numeric representation of the day of the week (starting from 1)<br />%w: Numeric representation of the day of the week (starting from 0)<br />z: The day of the year (starting from 0)<br />%j: day of the year (starting from 1)</p><h3>Week Options</h3><p>W: ISO-8601 week number of the year, weeks starting on Monday<br />U: ISO-8601 week number of the year, weeks starting on Monday with leading 0<br /></p><h3>Month Options</h3><p>F: full textual representation of a month, such as January or March<br />m or %m: Numeric representation of a month, with leading zeros<br />M or %M: short textual representation of a month, three letters<br />n: Numeric representation of a month, without leading zeros<br />t: Number of days in the given month<br /></p><h3>Year Options</h3><p>L: 0 or 1 indicating whether it's a leap year<br />o: full numeric representation of a year, 4 digits.  If 'W' belongs to the previous or next year, that year is used instead.<br />Y or %Y: full numeric representation of a year, 4 digits<br />y: two digit representation of a year<br /></p><h3>Time Options</h3><p>a: Lowercase Ante Meridiem and Post Meridiem<br />A: Uppercase Ante Meridiem and Post Meridiem<br />B: Swatch Internet time<br />g: 12-hour format of an hour without leading zeros<br />G: 24-hour format of an hour without leading zeros<br />h: 12-hour format of an hour with leading zeros<br />H or %H: 24-hour format of an hour with leading zeros<br />i: Minutes with leading zeros<br />s or %S: Seconds, with leading zeros<br />u: Microseconds<br />%L: Milliseconds<br /></p><h3>Timezone Options</h3><p>e: Timezone identifier<br />I: 0 or 1 indicating whether or not the date is in daylight saving time<br />O: Difference to Greenwich time (GMT) in hours<br />P: Difference to Greenwich time (GMT) with colon between hours and minutes<br />T: Timezone abbreviation<br />Z: Timezone offset in seconds. The offset for timezones west of UTC is always negative, and for those east of UTC is always positive<br /></p><h3>Other Options</h3><p>c: ISO 8601 date<br />r: RFC 2822 formatted date<br />U: Seconds since the Unix Epoch (January 1 1970 00:00:00 GMT)</p>",
		"url": "http://www.craydent.com/library/1.9.3/docs#date.format",
		"returnType": "(String)"
	}|*/
	try {
		if(!$c.isValidDate(this)) { return; }
		options = options || { offset : 0 };
		/*
		 *  options properties:
		 *  gmt:true - convert to GMT
		 *  offset:offset from GMT
		 **/
		var localTimeZoneOffset = _getGMTOffset.call(this),
			datetime = options.offset ? new Date(this.valueOf() - (options.offset + (options.offset ? -1 : 1) * localTimeZoneOffset)*60*60000) : this;


		if (options.gmt) {
			datetime = new Date(datetime.valueOf() - localTimeZoneOffset*60*60000);
			currentTimezone = "\\G\\M\\T";
			GMTDiff = 0;
		}

		var hour = datetime.getHours(),
			uhour = datetime.getUTCHours(),
			minute = datetime.getMinutes(),
			second = datetime.getSeconds(),
			GMTDiff = options.offset || hour - (hour > uhour ? 24 : 0) - uhour,
			epoch = datetime.getTime(),
			timezones = {
				'Afghanistan Time':'AFT',
				'AIX specific equivalent of Central European Time':'DFT',
				'Alaska Daylight Time':'AKDT',
				'Alaska Standard Time':'AKST',
				'Arab Standard Time (Kuwait, Riyadh)':'AST',
				'Arab Standard Time':'AST',
				'Arabian Standard Time (Abu Dhabi, Muscat)':'AST',
				'Arabian Standard Time':'AST',
				'Arabic Standard Time (Baghdad)':'AST',
				'Arabic Standard Time':'AST',
				'Argentina Time':'ART',
				'Armenia Summer Time':'AMST',
				'Armenia Time':'AMT',
				'ASEAN Common Time':'ACT',
				'Atlantic Daylight Time':'ADT',
				'Atlantic Standard Time':'AST',
				'Australian Central Daylight Time':'ACDT',
				'Australian Central Standard Time':'ACST',
				'Australian Eastern Daylight Time':'AEDT',
				'Australian Eastern Standard Time':'AEST',
				'Australian Western Daylight Time':'AWDT',
				'Australian Western Standard Time':'AWST',
				'Azerbaijan Time':'AZT',
				'Azores Standard Time':'AZOST',
				'Baker Island Time':'BIT',
				'Bangladesh Standard Time':'BST',
				'Bhutan Time':'BTT',
				'Bolivia Time':'BOT',
				'Brasilia Time':'BRT',
				'British Indian Ocean Time':'BIOT',
				'British Summer Time (British Standard Time from Feb 1968 to Oct 1971)':'BST',
				'British Summer Time':'BST',
				'Brunei Time':'BDT',
				'Cape Verde Time':'CVT',
				'Central Africa Time':'CAT',
				'Central Daylight Time (North America)':'CDT',
				'Central Daylight Time':'CDT',
				'Central European Daylight Time':'CEDT',
				'Central European Summer Time (Cf. HAEC)':'CEST',
				'Central European Summer Time':'CEST',
				'Central European Time':'CET',
				'Central Standard Time (Australia)':'ACST',
				'Central Standard Time':'CST',
				'Central Standard Time (North America)':'CST',
				'Chamorro Standard Time':'CHST',
				'Chatham Daylight Time':'CHADT',
				'Chatham Standard Time':'CHAST',
				'Chile Standard Time':'CLT',
				'Chile Summer Time':'CLST',
				'China Standard Time':'CST',
				'China Time':'CT',
				'Christmas Island Time':'CXT',
				'Clipperton Island Standard Time':'CIST',
				'Cocos Islands Time':'CCT',
				'Colombia Summer Time':'COST',
				'Colombia Time':'COT',
				'Cook Island Time':'CKT',
				'Coordinated Universal Time':'UTC',
				'East Africa Time':'EAT',
				'Easter Island Standard Time':'EAST',
				'Eastern Caribbean Time (does not recognise DST)':'ECT',
				'Eastern Caribbean Time':'ECT',
				'Eastern Daylight Time (North America)':'EDT',
				'Eastern Daylight Time':'EDT',
				'Eastern European Daylight Time':'EEDT',
				'Eastern European Summer Time':'EEST',
				'Eastern European Time':'EET',
				'Eastern Standard Time (North America)':'EST',
				'Eastern Standard Time':'EST',
				'Ecuador Time':'ECT',
				'Falkland Islands Summer Time':'FKST',
				'Falkland Islands Time':'FKT',
				'Fiji Time':'FJT',
				'French Guiana Time':'GFT',
				'Further-eastern_European_Time':'FET',
				'Galapagos Time':'GALT',
				'Gambier Island Time':'GIT',
				'Georgia Standard Time':'GET',
				'Gilbert Island Time':'GILT',
				'Greenwich Mean Time':'GMT',
				'Gulf Standard Time':'GST',
				'Guyana Time':'GYT',
				'Hawaii Standard Time':'HST',
				'Hawaii-Aleutian Daylight Time':'HADT',
				'Hawaii-Aleutian Standard Time':'HAST',
				'Heard and McDonald Islands Time':'HMT',
				'Heure Avancée d\'Europe Centrale francised name for CEST':'HAEC',
				'Hong Kong Time':'HKT',
				'Indian Standard Time':'IST',
				'Indochina Time':'ICT',
				'Iran Standard Time':'IRST',
				'Irish Summer Time':'IST',
				'Irkutsk Time':'IRKT',
				'Israel Standard Time':'IST',
				'Israeli Daylight Time':'IDT',
				'Japan Standard Time':'JST',
				'Kamchatka Time':'PETT',
				'Korea Standard Time':'KST',
				'Krasnoyarsk Time':'KRAT',
				'Line Islands Time':'LINT',
				'Lord Howe Standard Time':'LHST',
				'Magadan Time':'MAGT',
				'Malaysia Time':'MYT',
				'Malaysian Standard Time':'MST',
				'Marquesas Islands Time':'MIT',
				'Mauritius Time':'MUT',
				'Middle European Saving Time Same zone as CEST':'MEST',
				'Middle European Time Same zone as CET':'MET',
				'Moscow Standard Time':'MSK',
				'Moscow Summer Time':'MSD',
				'Mountain Daylight Time (North America)':'MDT',
				'Mountain Daylight Time':'MDT',
				'Mountain Standard Time (North America)':'MST',
				'Mountain Standard Time':'MST',
				'Myanmar Standard Time':'MST',
				'Nepal Time':'NPT',
				'New Zealand Daylight Time':'NZDT',
				'New Zealand Standard Time':'NZST',
				'Newfoundland Daylight Time':'NDT',
				'Newfoundland Standard Time':'NST',
				'Newfoundland Time':'NT',
				'Norfolk Time':'NFT',
				'Omsk Time':'OMST',
				'Pacific Daylight Time (North America)':'PDT',
				'Pacific Daylight Time':'PDT',
				'Pacific Standard Time (North America)':'PST',
				'Pacific Standard Time':'PST',
				'Pakistan Standard Time':'PKT',
				'Philippine Standard Time':'PST',
				'Phoenix Island Time':'PHOT',
				'Reunion Time':'RET',
				'Samara Time':'SAMT',
				'Samoa Standard Time':'SST',
				'Seychelles Time':'SCT',
				'Singapore Standard Time':'SST',
				'Singapore Time':'SGT',
				'Solomon Islands Time':'SBT',
				'South African Standard Time':'SAST',
				'South Georgia and the South Sandwich Islands':'GST',
				'Sri Lanka Time':'SLT',
				'Tahiti Time':'TAHT',
				'Thailand Standard Time':'THA',
				'Uruguay Standard Time':'UYT',
				'Uruguay Summer Time':'UYST',
				'Venezuelan Standard Time':'VET',
				'Vladivostok Time':'VLAT',
				'West Africa Time':'WAT',
				'Western European Daylight Time':'WEDT',
				'Western European Summer Time':'WEST',
				'Western European Time':'WET',
				'Western Standard Time':'WST',
				'Yakutsk Time':'YAKT',
				'Yekaterinburg Time':'YEKT'
			},
			ct = datetime.toTimeString().replace(/.*?\((.*?)\).*?/, '$1'),
			ctkey = $c.keyOf(timezones,ct),
			currentTimezone = "\\"+(!ctkey ? (timezones[ct] || "") : ct).split('').join("\\"),
			currentTimezoneLong = "\\"+(ctkey || ct).split('').join("\\"),
			minuteWithZero = (minute < 10 ? "0" + minute : minute),
			secondsWithZero = (second < 10 ? "0" + second : second),
			date = datetime.getDate(),
			day = datetime.getDay(),
			month = datetime.getMonth() + 1,
			year = datetime.getFullYear(),
			firstMonday = new Date((new Date('1/6/' + year)).getTime() + (1-(new Date('1/6/' + year)).getDay())*(24*60*60*1000)),
			week = $c.getWeek(datetime) - 1,
			dayOfYear = $c.getDayOfYear(datetime),
			dayOfYearFrom1 = dayOfYear - 1,
			dayOfYearWithZero = (dayOfYearFrom1 < 10 ? "00" + dayOfYearFrom1 : (dayOfYearFrom1 < 100 ? "0" + dayOfYearFrom1 : dayOfYearFrom1)),

			dateWithZero = (date < 10 ? "0" + date : date),
			threeLetterDay = ['\\S\\u\\n','\\M\\o\\n','\\T\\u\\e\\s','\\W\\e\\d','\\T\\h\\u','\\F\\r\\i', '\\S\\a\\t'][day],
			threeLetterMonth = ['\\J\\a\\n','\\F\\e\\b','\\M\\a\\r','\\A\\p\\r','\\M\\a\\y','\\J\\u\\n','\\J\\u\\l','\\A\\u\\g','\\S\\e\\p','\\O\\c\\t','\\N\\o\\v','\\D\\e\\c'][month - 1],
			hour24 = (hour < 10 ? "0" + hour : hour),
			GMTDiffFormatted = (GMTDiff > 0 ? "+" : "-") + (Math.abs(GMTDiff) < 10 ? "0" : "") + Math.abs(GMTDiff) + "00",
			hr = hour < 10 ? "0" + hour : (hour > 12 && hour - 12 < 10) ? "0" + (hour - 12) : hour - 12;

		hr = hr == 0 ? 12: hr;

		// Double replace is used to fix concecutive character bug
		return format.
		// replace all d's with the 2 digit day leading 0
		/*option d or %d*/replace(/([^\\])%d|^%d|([^\\])d|^d/g, '$1$2' + dateWithZero).replace(/([^\\])%d|^%d|([^\\])d|^d/g, '$1$2' + dateWithZero).
		// replace all D's with A textual representation of a day, three letters
		/*option D*/replace(/([^\\])D|^D/g, '$1' + threeLetterDay).replace(/([^\\])D|^D/g, '$1' + threeLetterDay).
		// replace all j's with the day without leading 0
		/*option j*/replace(/([^\\%])j|^j/g, '$1' + date).replace(/([^\\%])j|^j/g, '$1' + date).
		// replace all l's (lower case L) with A full textual representation of the day of the week
		/*option l*/replace(/([^\\])l|^l/g, '$1' + ['\\S\\u\\n\\d\\a\\y','\\M\\o\\n\\d\\a\\y','\\T\\u\\e\\s\\d\\a\\y','\\W\\e\\d\\n\\e\\s\\d\\a\\y','\\T\\h\\u\\r\\s\\d\\a\\y','\\F\\r\\i\\d\\a\\y', '\\S\\a\\t\\u\\r\\d\\a\\y'][day]).replace(/([^\\])l|^l/g, '$1' + ['\\S\\u\\n\\d\\a\\y','\\M\\o\\n\\d\\a\\y','\\T\\u\\e\\s\\d\\a\\y','\\W\\e\\d\\n\\e\\s\\d\\a\\y','\\T\\h\\u\\r\\s\\d\\a\\y','\\F\\r\\i\\d\\a\\y', '\\S\\a\\t\\u\\r\\d\\a\\y'][day]).
		// replace all N's with ISO-8601 numeric representation of the day of the week
		/*option N*/replace(/([^\\])N|^N/g, '$1' + (day == 0 ? 7 : day)).replace(/([^\\])N|^N/g, '$1' + (day == 0 ? 7 : day)).
		// replace all S's with English ordinal suffix for the day of the month, 2 characters
		/*option S*/replace(/([^\\%]S)|^S/g, '$1' + (date > 3 ? '\\t\\h' : (date == 1 ? '\\s\\t' : (date == 2 ? '\\n\\d' : '\\r\\d')))).replace(/([^\\%]S)|^S/g, '$1' + (date > 3 ? '\\t\\h' : (date == 1 ? '\\s\\t' : (date == 2 ? '\\n\\d' : '\\r\\d')))).
		// replace all %w's with Numeric representation of the day of the week (starting from 0)
		/*option %w*/replace(/([^\\])%w|^%w/g, day + 1).replace(/([^\\])%w|^%w/g, day + 1).
		// replace all w's with Numeric representation of the day of the week (starting from 1)
		/*option w*/replace(/([^\\])w|^w/g, '$1' + day).replace(/([^\\])w|^w/g, '$1' + day).
		// replace all z's with The day of the year (starting from 0)
		/*option z*/replace(/([^\\])z|^z/g, '$1' + dayOfYearFrom1).replace(/([^\\])z|^z/g, '$1' + dayOfYearFrom1).
		// replace all %j's with The day of the year (starting from 1)
		/*option %j*/replace(/([^\\])%j|^%j/g, dayOfYear).replace(/([^\\])%j|^%j/g, dayOfYear).

		// replace all W's with ISO-8601 week number of the year, weeks starting on Monday
		/*option W*/replace(/([^\\])W|^W/g, '$1' + (week > 0 ? week : 52)).replace(/([^\\])W|^W/g, '$1' + (week > 0 ? week : 52)).
		// replace all %U's with ISO-8601 week number of the year, weeks starting on Monday with leading 0
		/*option W*/replace(/([^\\])%U|^%U/g, week < 10 ? "0" + week : week).replace(/([^\\])%U|^%U/g, week < 10 ? "0" + week : week).

		// replace all F's with A full textual representation of a month, such as January or March
		/*option F*/replace(/([^\\])F|^F/g, '$1' + ['\\J\\a\\n\\u\\a\\r\\y','\\F\\e\\b\\r\\u\\a\\r\\y','\\M\\a\\r\\c\\h','\\A\\p\\r\\i\\l','\\M\\a\\y','\\J\\u\\n\\e','\\J\\u\\l\\y','\\A\\u\\g\\u\\s\\t','\\S\\e\\p\\t\\e\\m\\b\\e\\r','\\O\\c\\t\\o\\b\\e\\r','\\N\\o\\v\\e\\m\\b\\e\\r','\\D\\e\\c\\e\\m\\b\\e\\r'][month - 1]).replace(/([^\\])F|^F/g, '$1' + ['\\J\\a\\n\\u\\a\\r\\y','\\F\\e\\b\\r\\u\\a\\r\\y','\\M\\a\\r\\c\\h','\\A\\p\\r\\i\\l','\\M\\a\\y','\\J\\u\\n\\e','\\J\\u\\l\\y','\\A\\u\\g\\u\\s\\t','\\S\\e\\p\\t\\e\\m\\b\\e\\r','\\O\\c\\t\\o\\b\\e\\r','\\N\\o\\v\\e\\m\\b\\e\\r','\\D\\e\\c\\e\\m\\b\\e\\r'][month - 1]).
		// replace all m's with Numeric representation of a month, with leading zeros
		/*option m* or %m*/replace(/([^\\])%m|^%m|([^\\])m|^m/g, '$1$2' + (month < 10 ? "0" + month : month)).replace(/([^\\])%m|^%m|([^\\])m|^m/g, '$1$2' + (month < 10 ? "0" + month : month)).
		// replace all M's with A short textual representation of a month, three letters
		/*option M or %M*/replace(/([^\\])%M|^%M|([^\\])M|^M/g, '$1$2' + threeLetterMonth).replace(/([^\\])%M|^%M|([^\\])M|^M/g, '$1$2' + threeLetterMonth).
		// replace all n's with Numeric representation of a month, without leading zeros
		/*option n*/replace(/([^\\])n|^n/g, '$1' + month).replace(/([^\\])n|^n/g, '$1' + month).
		// replace all t's with Number of days in the given month
		/*option t*/replace(/([^\\])t|^t/g, '$1' + (month == 2 && $c.isInt(year/4) ? 29 :[31,28,31,30,31,30,31,31,30,31,30,31][month - 1])).replace(/([^\\])t|^t/g, '$1' + (month == 2 && $c.isInt(year/4) ? 29 :[31,28,31,30,31,30,31,31,30,31,30,31][month - 1])).

		//replace all L's with Whether it's a leap year
		/*option L*/replace(/([^\\%])L|^L/g, '$1' + $c.isInt(year%4) ? 1 : 0).replace(/([^\\%])L|^L/g, '$1' + $c.isInt(year%4) ? 1 : 0).
		//replace all o's with A full numeric representation of a year, 4 digits.  If 'W' belongs to the previous or next year, that year is used instead.
		/*option o*/replace(/([^\\])o|^o/g, '$1' + (week > 0 ? year : year - 1)).replace(/([^\\])o|^o/g, '$1' + (week > 0 ? year : year - 1)).
		//replace all Y's with A full numeric representation of a year, 4 digits
		/*option Y or %Y*/replace(/([^\\])%Y|^%Y|([^\\])Y|^Y/g, '$1$2' + year).replace(/([^\\])%Y|^%Y|([^\\])Y|^Y/g, '$1$2' + year).
		//replace all t's with A two digit representation of a year
		/*option y*/replace(/([^\\])y|^y/g, '$1' + year.toString().substring(year.toString().length - 2)).replace(/([^\\])y|^y/g, '$1' + year.toString().substring(year.toString().length - 2)).

		//replace all a's with Lowercase Ante Meridiem and Post Meridiem
		/*option a*/replace(/([^\\])a|^a/g, '$1' + (hour > 11 ? "\\p\\m" : "\\a\\m")).replace(/([^\\])a|^a/g, '$1' + (hour > 11 ? "\\p\\m" : "\\a\\m")).
		//replace all A's with Uppercase Ante Meridiem and Post Meridiem
		/*option A*/replace(/([^\\])A|^A/g, '$1' + (hour > 11 ? "\\P\\M" : "\\A\\M")).replace(/([^\\])A|^A/g, '$1' + (hour > 11 ? "\\P\\M" : "\\A\\M")).
		//replace all B's with Swatch Internet time
		/*option B*/replace(/([^\\])B|^B/g, '$1' + Math.floor((((datetime.getUTCHours() + 1)%24) + datetime.getUTCMinutes()/60 + datetime.getUTCSeconds()/3600)*1000/24)).replace(/([^\\])B|^B/g, '$1' + Math.floor((((datetime.getUTCHours() + 1)%24) + datetime.getUTCMinutes()/60 + datetime.getUTCSeconds()/3600)*1000/24)).
		//replace all g's with 12-hour format of an hour without leading zeros
		/*option g*/replace(/([^\\])g|^g/g, '$1' + (hour == 0 ? 12 : hour > 12 ? hour - 12 : hour)).replace(/([^\\])g|^g/g, '$1' + (hour == 0 ? 12 : hour > 12 ? hour - 12 : hour)).
		//replace all G's with 24-hour format of an hour without leading zeros
		/*option G*/replace(/([^\\])G|^G/g, '$1' + hour).replace(/([^\\])G|^G/g, '$1' + hour).
		//replace all h's with 12-hour format of an hour with leading zeros
		/*option h*/replace(/([^\\])h|^h/g, '$1' + hr).replace(/([^\\])h|^h/g, '$1' + hr).
		//replace all H's with 24-hour format of an hour with leading zeros
		/*option H or %H*/replace(/([^\\])%H|^%H|([^\\])H|^H/g, '$1$2' + hour24).replace(/([^\\])%H|^%H|([^\\])H|^H/g, '$1$2' + hour24).
		//replace all i's with Minutes with leading zeros
		/*option i*/replace(/([^\\])i|^i/g, '$1' + minuteWithZero).replace(/([^\\])i|^i/g, '$1' + minuteWithZero).
		//replace all s's with Seconds, with leading zeros
		/*option s or %S*/replace(/([^\\])%S|^%S|([^\\])s|^s/g, '$1$2' + secondsWithZero).replace(/([^\\])%S|^%S|([^\\])s|^s/g, '$1$2' + secondsWithZero).
		//replace all u's with Microseconds
		/*option u*/replace(/([^\\])u|^u/g, '$1' + epoch*1000).replace(/([^\\])u|^u/g, '$1' + epoch*1000).
		//replace all L's with Milliseconds
		/*option %L*/replace(/([^\\])%L|^%L/g, epoch).replace(/([^\\])%L|^%L/g, epoch).

		//replace all e's with Timezone identifier
		/*option e*/replace(/([^\\])e|^e/g, '$1' + currentTimezoneLong).replace(/([^\\])e|^e/g, '$1' + currentTimezoneLong).
		//replace all I's with Whether or not the date is in daylight saving time
		/*option I*/replace(/([^\\])I|^I/g, '$1' + Math.max((new Date(datetime.getFullYear(), 0, 1)).getTimezoneOffset(), (new Date(datetime.getFullYear(), 6, 1)).getTimezoneOffset()) > datetime.getTimezoneOffset() ? 0 : 1).replace(/([^\\])I|^I/g, '$1' + Math.max((new Date(datetime.getFullYear(), 0, 1)).getTimezoneOffset(), (new Date(datetime.getFullYear(), 6, 1)).getTimezoneOffset()) > datetime.getTimezoneOffset() ? 0 : 1).

		//replace all O's with Difference to Greenwich time (GMT) in hours
		/*option O*/replace(/([^\\])O|^O/g, '$1' + GMTDiffFormatted).replace(/([^\\])O|^O/g, '$1' + GMTDiffFormatted).
		//replace all P's with Difference to Greenwich time (GMT) with colon between hours and minutes
		/*option P*/replace(/([^\\])P|^P/g, '$1' + GMTDiffFormatted.substr(0, 3) + ":" + GMTDiffFormatted.substr(3,2)).replace(/([^\\])P|^P/g, '$1' + GMTDiffFormatted.substr(0, 3) + ":" + GMTDiffFormatted.substr(3,2)).
		//replace all T's with Timezone abbreviation
		/*option T*/replace(/([^\\])T|^T/g, '$1' + currentTimezone).replace(/([^\\])T|^T/g, '$1' + currentTimezone).
		//replace all Z's with Timezone offset in seconds. The offset for timezones west of UTC is always negative, and for those east of UTC is always positive
		/*option Z*/replace(/([^\\])Z|^Z/g, '$1' + (-1 * GMTDiff * 60)).replace(/([^\\])T|^T/g, '$1' + currentTimezone).

		//replace all c's with ISO 8601 date
		/*option c*/replace(/([^\\])c|^c/g, '$1' + (datetime.toISOString ? datetime.toISOString() : "")).replace(/([^\\])c|^c/g, '$1' + (datetime.toISOString ? datetime.toISOString() : "")).
		//replace all r's with RFC 2822 formatted date
		/*option r*/replace(/([^\\])r|^r/g, '$1' + threeLetterDay + ', ' + dateWithZero + ' ' + threeLetterMonth + ' ' + year  + ' ' + hour24 + ':' + minuteWithZero + ':' + secondsWithZero + ' ' + GMTDiffFormatted).replace(/([^\\])r|^r/g, '$1' + threeLetterDay + ', ' + dateWithZero + ' ' + threeLetterMonth + ' ' + year  + ' ' + hour24 + ':' + minuteWithZero + ':' + secondsWithZero + ' ' + GMTDiffFormatted).
		//replace all U's with Seconds since the Unix Epoch (January 1 1970 00:00:00 GMT)
		/*option U*/replace(/([^\\])U|^U/g, '$1' + epoch / 1000).replace(/([^\\])U|^U/g, '$1' + epoch / 1000).
		replace(/\\/gi, "");
	} catch (e) {
		error("Date.format", e);
	}
}, true);
_ext(Date, 'getDayOfYear', function () {
	/*|{
		"info": "Date class extension to retrieve the day of the year",
		"category": "Date",
		"parameters":[],

		"overloads":[],

		"url": "http://www.craydent.com/library/1.9.3/docs#array.getDayOfYear",
		"returnType": "(Int)"
	}|*/
	try {
		return Math.floor((this - new Date(this.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
	} catch (e) {
		error("Date.getDayOfYear", e);
	}
});
_ext(Date, 'getWeek', function () {
	/*|{
		"info": "Date class extension to retrieve the week number in the year",
		"category": "Date",
		"parameters":[],

		"overloads":[],

		"url": "http://www.craydent.com/library/1.9.3/docs#array.getWeek",
		"returnType": "(Int)"
	}|*/
	try {
		var d = new Date(+this);
		d.setHours(0, 0, 0);
		var fdate = new Date(d.getFullYear(), 0, 1);
		return Math.ceil((((d - fdate) / 8.64e7) + 1 +fdate.getDay()) / 7);
	} catch (e) {
		error("Date.getWeek", e);
	}
});
_ext(Date, 'isValidDate', function () {
	/*|{
		"info": "Date class extension to check if the date is valid",
		"category": "Date",
		"parameters":[],

		"overloads":[],

		"url": "http://www.craydent.com/library/1.9.3/docs#array.isValidDate",
		"returnType": "(Bool)"
	}|*/
	try {
		return !isNaN(this.getTime());
	} catch (e) {
		error("Date.isValidDate", e);
	}
});

/*----------------------------------------------------------------------------------------------------------------
 /-	Number class Extensions
 /---------------------------------------------------------------------------------------------------------------*/
_ext(Number, 'aboutEqualTo', function (compare, giveOrTake) {
	/*|{
		"info": "Number class extension to check if values are approximately equal",
		"category": "Number",
		"parameters":[
			{"compare": "(Number) Number to compare"},
			{"giveOrTake": "(Number) Plus/minus value"}],

		"overloads":[],

		"url": "http://www.craydent.com/library/1.9.3/docs#number.aboutEqualTo",
		"returnType": "(Bool)"
	}|*/
	try {
		return $c.isBetween(this, compare - giveOrTake, compare + giveOrTake, true);
	} catch (e) {
		error("Number.aboutEqualTo", e);
	}
}, true);
_ext(Number, 'isEven', function () {
	/*|{
		"info": "Number class extension to check if number is even",
		"category": "Number",
		"parameters":[],

		"overloads":[],

		"url": "http://www.craydent.com/library/1.9.3/docs#number.",
		"returnType": "(Bool)"
	}|*/
	try {
		return _even(this);
	} catch (e) {
		error("Number.isEven", e);
	}
}, true);
_ext(Number, 'isOdd', function () {
	/*|{
		"info": "Number class extension to check if number is odd",
		"category": "Number",
		"parameters":[],

		"overloads":[],

		"url": "http://www.craydent.com/library/1.9.3/docs#number.",
		"returnType": "(Bool)"
	}|*/
	try {
		return !_even(this);
	} catch (e) {
		error("Number.isOdd", e);
	}
}, true);
_ext(Number, 'toCurrencyNotation', _toCurrencyNotation, true);

/*----------------------------------------------------------------------------------------------------------------
/-	Function and Generator class Extensions
/---------------------------------------------------------------------------------------------------------------*/
_ext(Function, 'getParameters', function () {
	/*|{
		"info": "Function class extension to get parameters in definition",
		"category": "Function",
		"parameters":[],

		"overloads":[],

		"url": "http://www.craydent.com/library/1.9.3/docs#function.getParameters",
		"returnType": "(Array)"
	}|*/
	try {
		return _getFuncArgs(this);
	} catch (e) {
		error("Function.getParameters", e);
	}
}, true);
_ext(Function, 'getName', function () {
	/*|{
		"info": "Function class extension to get the name of the function",
		"category": "Function",
		"parameters":[],

		"overloads":[],

		"url": "http://www.craydent.com/library/1.9.3/docs#function.getName",
		"returnType": "(String)"
	}|*/
	try {
		return this.name || _getFuncName(this);
	} catch (e) {
		error("Function.getName", e);
	}
}, true);
_ext(Function, 'extends',function(extendee, inheritAsOwn){
	/*|{
		"info": "Function class extension to extend another class",
		"category": "Function",
		"parameters":[
			{"extendee":"(Object) Class to extend"}],

		"overloads":[
			{"parameters":[
				{"extendee":"(Object) Class to extend"},
				{"inheritAsOwn":"(Boolean) Flag to inherit and for values hasOwnProperty to be true."}]}],

		"url": "http://www.craydent.com/library/1.9.3/docs#function.extends",
		"returnType": "(Function)"
	}|*/
	try {
		var className = $c.getName(this),
			cls = new extendee();
		$c.namespace[className] = $c.namespaces && $c.namespaces[className];
		for (var prop in cls) {
			if (inheritAsOwn && !cls.hasOwnProperty(prop)) { continue; }
			this.prototype[prop] = /* this[prop] || */ this.prototype[prop] || cls[prop];
		}
		if (!inheritAsOwn) {
			for (var prop in extendee) {
				if (!extendee.hasOwnProperty(prop)) {
					continue;
				}
				this[prop] = this[prop] || extendee[prop];
			}
		}
		this.prototype.construct = this.prototype.construct || cls.construct || foo;

		return this;
	} catch (e) {
		error("Function.extends", e);
	}
}, true);
_ext(Function, 'on',function(ev, func){
	/*|{
		"info": "Function listener to register events",
		"category": "Function",
		"parameters":[
			{"event":"(String) Event to listen on and invoked on emit"},
			{"func":"(Function) Function to call on emit"}],

		"overloads":[],

		"url": "http://www.craydent.com/library/1.9.3/docs#function.on",
		"returnType": "(String)"
	}|*/
	try {
		this["_"+ev] = this["_"+ev] || [];
		this["_"+ev].push(func);
	} catch (e) {
		error("Function.on", e);
	}
}, true);
var _genConstruct = $c.tryEval(('(function *(){}).constructor'));
_genConstruct && _ext(_genConstruct, 'toPromise',function(){
	/*|{
		"info": "Function listener to register events",
		"category": "Function",
		"parameters":[
			{"event":"(String) Event to listen on and invoked on emit"},
			{"func":"(Function) Function to call on emit"}],

		"overloads":[],

		"url": "http://www.craydent.com/library/1.9.3/docs#function.on",
		"returnType": "(String)"
	}|*/
	try {
		return new Promise(function(resolve,reject){
			$c.syncroit(_genConstruct);
		});
	} catch (e) {
		error("GeneratorFunction.toPromise", e);
	}
}, true);
_ext(Function, 'then',function(func){
	/*|{
		"info": "Function listener to register the then event",
		"category": "Function",
		"parameters":[
			{"func":"(Function) Function to call on emit"}],

		"overloads":[],

		"url": "http://www.craydent.com/library/1.9.3/docs#function.then",
		"returnType": "(String)"
	}|*/
	try {
		$c.on(this,'then',func);
	} catch (e) {
		error("Function.then", e);
	}
}, true);
_ext(Function, 'catch',function(func){
	/*|{
		"info": "Function listener to register the catch event",
		"category": "Function",
		"parameters":[
			{"func":"(Function) Function to call on emit"}],

		"overloads":[],

		"url": "http://www.craydent.com/library/1.9.3/docs#function.catch",
		"returnType": "(String)"
	}|*/
	try {
		$c.on(this,'catch',func);
	} catch (e) {
		error("Function.catch", e);
	}
}, true);

/*----------------------------------------------------------------------------------------------------------------
 /-	RegExp class Extensions
 /---------------------------------------------------------------------------------------------------------------*/
_ext(RegExp, 'addFlags',function(flags){
	/*|{
		"info": "RegExp class extension to add flags to regex",
		"category": "RegExp",
		"parameters":[
			{"flags": "(String) Flags to add"}],

		"overloads":[],

		"url": "http://www.craydent.com/library/1.9.3/docs#regexp.addFlag",
		"returnType": "(RegExp)"
	}|*/
	try {
		if (this.global && !~flags.indexOf('g')) { flags += "g"; }
		if (this.ignoreCase && !~flags.indexOf('i')) { flags += "i"; }
		if (this.multiline && !~flags.indexOf('m')) { flags += "m"; }

		return new RegExp(this.source, flags);
	} catch (e) {
		error("RegExp.addFlags", e);
	}
}, true);

/*----------------------------------------------------------------------------------------------------------------
 /-	Object class Extensions
 /---------------------------------------------------------------------------------------------------------------*/
_ao("changes", function(compare){
	/*|{
		"info": "Object class extension to compare properties that have changed",
		"category": "Object",
		"parameters":[
			{"compare": "(Object) Object to compare against"}],

		"overloads":[],

		"url": "http://www.craydent.com/library/1.9.3/docs#object.",
		"returnType": "(Object)"
	}|*/
	try {
		if (this.constructor != Object || compare.constructor != Object) {
			//noinspection ExceptionCaughtLocallyJS
			throw new TypeError();
		}
		var rtn = {$length:0,$add:[],$update:[],$delete:[]};
		// loop through each property of the original
		for (var prop in this) {
			if (this.hasOwnProperty(prop)) {
				if (!compare.hasOwnProperty(prop)) {
					rtn[prop] = null;
					rtn.$delete.push(prop);
					rtn.$length++;
				} else if (!$c.equals(compare[prop], this[prop])) {
					rtn[prop] = compare[prop];
					rtn.$update.push(prop);
					rtn.$length++;
				}
			}
		}
		// loop through each property of the compare to make sure
		// there are no properties from compare missing from the original
		for (var prop in compare) {
			if (compare.hasOwnProperty(prop) && !this.hasOwnProperty(prop)) {
				rtn[prop] = compare[prop];
				rtn.$add.push(prop);
				rtn.$length++;
			}
		}
		return rtn;

	} catch (e) {
		error("Object.changes", e);
	}
});
_ao("contains", function(val, func){
	/*|{
		"info": "Object class extension to check if value exists",
		"category": "Object",
		"parameters":[
			{"val": "(Mixed) Value to check or custom function to determine validity"}],

		"overloads":[
			{"parameters":[
				{"val": "(Mixed) Value to check"},
				{"func": "(Function) Callback function used to do the comparison"}]},

			{"parameters":[
				{"arr": "(Array) Array of values to return first matching value"}]}],

		"url": "http://www.craydent.com/library/1.9.3/docs#object.contains",
		"returnType": "(Bool)"
	}|*/
	try {
		if ($c.isFunction(val)) {
			for (var prop in this) {
				if (val(this[prop],prop,this)) { return true; }
			}
		}
		switch(true) {
			case $c.isArray(this):
				if (~this.indexOf(val)) { return true; }
				if ($c.isFunction(func) || $c.isRegExp(val)) {
					return !!~$c.indexOfAlt(this,val,func);
				} else if ($c.isString(func)) {
					var f = foo;
					switch(func){
						case "$lt":
							f = _contains_lessthan;
							break;
						case "$lte":
							f = _contains_lessthanequal;
							break;
						case "$gt":
							f = _contains_greaterthan;
							break;
						case "$gte":
							f = _contains_greaterthanequal;
							break;
						case "$mod":
							f = _contains_mod;
							break;
						case "$type":
							f = _contains_type;
							break;
					}
					return !!f(this,val);
				} else if ($c.isArray(val)) {
					for (var i = 0, len = val.length; i < len; i++) {
						var item = val[i];
						if ($c.contains(this,item,func)) {
							return item;
						}
					}
				}
				return false;
			case $c.isString(this):
				return !!~($c.isRegExp(val) ? this.search(val) : this.indexOf(val));
			case $c.isObject(this):
				for (var prop in this) {
					if (!this.hasOwnProperty(prop)) { continue; }
					if ((func && func(this[prop])) || this[prop] == val) {
						return true;
					}
				}
				break;
			case $c.isNumber(this):
				return !!~this.toString().indexOf(val);
		}
		return false;
	} catch (e) {
		error("Object.contains", e);
	}
});
_ao("copyObject", function () {
	/*|{
		"info": "Object class extension to copy an object excluding constructor",
		"category": "Object",
		"parameters":[],

		"overloads":[],

		"url": "http://www.craydent.com/library/1.9.3/docs#object.copyObject",
		"returnType": "(Object)"
	}|*/
	try {
		if (!this) { return undefined; }
		return _duplicate({}, this, true);
	} catch (e) {
		error("Object.copyObject", e);
	}
});
_ao("count", function(option){
	/*|{
		"info": "Object class extension to count the properties in the object/elements in arrays/characters in strings.",
		"category": "Object",
		"parameters":[],

		"overloads":[
			{"parameters":[
				{"option": "(Mixed) Query used in Array.where when counting elements in an Array"}]},
			{"parameters":[
				{"option": "(String) Word or phrase to count in the String"}]},
			{"parameters":[
				{"option": "(RegExp) Word or phrase pattern to count in the String"}]}],

		"url": "http://www.craydent.com/library/1.9.3/docs#object.count",
		"returnType": "(Int)"
	}|*/
	try {
		if ($c.isObject(this)) {
			var count = 0;
			for (var prop in this){
				if (this.hasOwnProperty(prop)) { count++; }
			}
			return count;
		}
		if ($c.isArray(this)) {
			return $c.where(this,option).length;
		}
		if ($c.isString(this)) {
			var word = option;
			if (!$c.isRegExp(word)) {
				word = new RegExp(word, "g");
			} else if (!option.global) {
				var reg_str = word.toString(),
						index = reg_str.lastIndexOf('/'),
						options = reg_str.substring(index + 1);
				word = new RegExp($c.strip(reg_str,'/'), "g"+options);
			}
			return (this.match(word) || []).length;
		}
		return undefined;
	} catch (e) {
		error('Object.count', e);
	}
});
_ao("duplicate", function (recursive) {
	/*|{
		"info": "Object class extension to copy an object including constructor",
		"category": "Object",
		"parameters":[],

		"overloads":[
			{"parameters":[
				{"recursive": "(Boolean) Flag to copy all child objects recursively"}]}],

		"url": "http://www.craydent.com/library/1.9.3/docs#object.duplicate",
		"returnType": "(Object)"
	}|*/
	try {
		return _duplicate(new this.constructor(), this, recursive);
	} catch (e) {
		error('Object.duplicate', e);
	}
});
_ao("eachProperty", function (callback) {
	/*|{
		"info": "Object class extension to loop through all properties where hasOwnValue is true.",
		"category": "Object",
		"parameters":[
			{"callback": "(Function) Function to call for each property.  Callback will have two arguments (the value of the object and the property name) passed"}],

		"overloads":[],

		"url": "http://www.craydent.com/library/1.9.3/docs#object.eachProperty",
		"returnType": "(Object)"
	}|*/
	try {
		for (var prop in this) {
			if (!this.hasOwnProperty(prop)) { continue; }
			if (callback.call(this, this[prop], prop)) { break; }
		}
	} catch (e) {
		error('Object.eachProperty', e);
	}
});
_ao("equals", function (compare, props){
	/*|{
		"info": "Object class extension to check if object values are equal",
		"category": "Object",
		"parameters":[
			{"compare": "(Object) Object to compare against"}],

		"overloads":[{"parameters":[
	 		{"compare": "(Object) Object to compare against"},
	 		{"props": "(String[]) Array of property values to compare against"}]}],

		"url": "http://www.craydent.com/library/1.9.3/docs#object.equals",
		"returnType": "(Bool)"
	}|*/
	try {
		if ($c.isArray(props)) {
			var j = 0;
			while (prop = props[j++]) {
				if (this.hasOwnProperty(prop) && compare.hasOwnProperty(prop) && !$c.equals(this[prop],compare[prop])
						|| (!this.hasOwnProperty(prop) && compare.hasOwnProperty(prop)) || (this.hasOwnProperty(prop) && !compare.hasOwnProperty(prop))) {
					return false;
				}
			}
			return true;
		}
		if (($c.isObject(this) && $c.isObject(compare)) || ($c.isArray(this) && $c.isArray(compare))) {
			for (var prop in compare){
				if (!compare.hasOwnProperty(prop)) { continue; }
				if (!$c.equals(this[prop], compare[prop])) { return false; }
			}
			for (var prop in this){
				if (!this.hasOwnProperty(prop)) { continue; }
				if (!$c.equals(this[prop], compare[prop])) { return false; }
			}
			return true;
		}
		if (this === undefined && compare !== undefined || this !== undefined && compare === undefined) { return false; }
		if (this === null && compare !== null || this !== null && compare === null) { return false; }
		if ($c.isRegExp(compare)) { return compare.test(this.toString()); }
		return (this.toString() == compare.toString() && this.constructor == compare.constructor);
	} catch (e) {
		error('Object.equals', e);
	}
});
_ao("every", function(callback, thisObject) {
	/*|{
		"info": "Object class extension to check property values against a function",
		"category": "Object",
		"parameters":[
			{"callback": "(Function) Callback to apply to each value"}],

		"overloads":[
			{"parameters":[
				{"callback": "(Function) Callback to apply to each value"},
				{"thisObject": "(Mixed) Context for the callback function"}]}],

		"url": "http://www.craydent.com/library/1.9.3/docs#object.every",
		"returnType": "(Bool)"
	}|*/
	try {
		thisObject = thisObject || this;
		for (var prop in this)
			if (/*this[prop] && */!callback.call(thisObject, this[prop], prop, this))
				return false;
		return true;
	} catch (e) {
		error("Object.every", e);
	}
});
_ao("getClass", function() {
	/*|{
		"info": "Object class extension to get the constructor name",
		"category": "Object",
		"parameters":[],

		"overloads":[],

		"url": "http://www.craydent.com/library/1.9.3/docs#object.getClass",
		"returnType": "(String)"
	}|*/
	try {
		return _getFuncName(this.constructor);
	} catch (e) {
		error('Object.getClass', e)
	}
});
_ao("getProperty", function (path, delimiter, options) {
	/*|{
		"info": "Object class extension to retrieve nested properties without error when property path does not exist",
		"category": "Object",
		"featured": true,
		"parameters":[
			{"path": "(String) Path to nested property"}],

		"overloads":[
			{"parameters":[
				{"path": "(String) Path to nested property"},
				{"delimiter": "(Char) Separator used to parse path"}]},

			{"parameters":[
				{"path": "(RegExp) Regex match for the property"}]},

	 		{"parameters":[
				{"path": "(String) Path to nested property"},
				{"options": "(Object) Options for ignoring inheritance, validPath, etc"}]},

			{"parameters":[
				{"path": "(String) Path to nested property"},
				{"delimiter": "(Char) Separator used to parse path"},
				{"options": "(Object) Options for ignoring inheritance, validPath, etc"}]}],

		"url": "http://www.craydent.com/library/1.9.3/docs#object.getProperty",
		"returnType": "(Mixed)"
	}|*/
	try {
		if ($c.isRegExp(path)) {
			for (var prop in this) {
				if(!this.hasOwnProperty(prop)){ continue; }
				if (path.test(prop)) { return this[prop]; }
			}
			return undefined;
		}

		if ($c.isObject(delimiter)) {
			options = delimiter;
			delimiter = undefined;
		}
		options = options || {};
		delimiter = delimiter || ".";
		path = $c.strip(path, delimiter);
		var props = path.split(delimiter);
		var value = this, i = 0, prop;
		while (prop = props[i++]) {
			if (isNull(value[prop])
					|| (options.noInheritance && !value.hasOwnProperty(prop))) {
				if (!value.hasOwnProperty(prop)) { options.validPath = 0; }
				return undefined;
			}
			value = value[prop];
		}
		options.validPath = 1;
		return value;
	} catch (e) {
		error('Object.getProperty', e);
	}
});
_ao("getValue" ,function (args, dflt) {
	/*|{
		"info": "Object class extension to retrieve value of an object property",
		"category": "Object",
		"parameters":[],

		"overloads":[
			{"parameters":[
				{"dflt": "(Mixed) Default value to return if context is not a function"}]},

			{"parameters":[
				{"args": "(Mixed[]) An array of arguments to pass to context when it is a function"},
	 			{"dflt": "(Mixed) Default value to return if context is not a function"}]}],

		"url": "http://www.craydent.com/library/1.9.3/docs#object.getProperty",
		"returnType": "(Mixed)"
	}|*/
	try {
		if (!$c.isFunction(this)) {
			if (args && !dflt) { dflt = args; }
			return $c.isNull(this, dflt) || this;
		}
		var rtn = this.apply(this, args);
		return rtn === undefined ? dflt : rtn;
	} catch (e) {
		error('Object.getValue', e);
	}
});
_ao("has", function(){
	/*|{
		"info": "Alias to Object.prototype.hasOwnProperty",
		"category": "Object",
		"parameters":[
			{"property": "(String) Property name to check"}],

		"overloads":[],

		"url": "http://www.craydent.com/library/1.9.3/docs#object.has",
		"returnType": "(Boolean)"
	}|*/
	var args = arguments;
	if (arguments.length > 1 && this == args[0]) {
		args = [];
		for (var i = 1, len = arguments.length; i < len; i++) {
			args.push(arguments[i]);
		}

	}
	return Object.prototype.hasOwnProperty.apply(this,args);
});
_ao("isArray", function () {
	/*|{
		"info": "Object class extension to check if object is an array",
		"category": "Object",
		"parameters":[],

		"overloads":[],

		"url": "http://www.craydent.com/library/1.9.3/docs#object.isArray",
		"returnType": "(Bool)"
	}|*/
	return _isArray(this);
});
_ao("isAsync", function() {
	/*|{
		"info": "Object class extension to check if object is a async function",
		"category": "Object",
		"parameters":[],

		"overloads":[],

		"url": "http://www.craydent.com/library/1.9.3/docs#object.isAsnyc",
		"returnType": "(Bool)"
	}|*/
    try {
        if ($c.isNull(this)) {return false;}
        return (this.constructor.name == "AsyncFunction");
    } catch (e) {
        error('Object.isAsync', e);
    }
});
_ao("isBetween", function(lowerBound, upperBound, inclusive) {
	/*|{
		"info": "Object class extension to check if object is between lower and upper bounds",
		"category": "Object",
		"parameters":[
			{"lowerBound": "(Mixed) Lower bound comparison"},
			{"upperBound": "(Mixed) Upper bound comparison"}],

		"overloads":[
			{"parameters":[
				{"lowerBound": "(Mixed) Lower bound comparison"},
				{"upperBound": "(Mixed) Upper bound comparison"},
				{"inclusive": "(Bool) Flag to include give bounds"}]}],

		"url": "http://www.craydent.com/library/1.9.3/docs#object.isBetween",
		"returnType": "(Bool)"
	}|*/
	try {
		if (isNull(this)) {return false;}
		if (inclusive) {
			return (this >= lowerBound && this <= upperBound);
		} else {
			return (this > lowerBound && this < upperBound);
		}
	} catch (e) {
		error('Object.isBetween', e);
	}
});
_ao("isBoolean", function() {
	/*|{
		"info": "Object class extension to check if object is a boolean",
		"category": "Object",
		"parameters":[],

		"overloads":[],

		"url": "http://www.craydent.com/library/1.9.3/docs#object.isBoolean",
		"returnType": "(Bool)"
	}|*/
	try {
		if (isNull(this)) {return false;}
		return (this.constructor == Boolean);
	} catch (e) {
		error('Object.isBoolean', e);
	}
});
_ao("isDate", function() {
	/*|{
		"info": "Object class extension to check if object is a date",
		"category": "Object",
		"parameters":[],

		"overloads":[],

		"url": "http://www.craydent.com/library/1.9.3/docs#object.isDate",
		"returnType": "(Bool)"
	}|*/
	try {
		if (isNull(this)) {return false;}
		return (this.constructor == Date);
	} catch (e) {
		error('Object.isDate', e);
	}
});
_ao("isDomElement", function() {
	/*|{
		"info": "Object class extension to check if object is a DOM element",
		"category": "Object",
		"parameters":[],

		"overloads":[],

		"url": "http://www.craydent.com/library/1.9.3/docs#object.isDomElement",
		"returnType": "(Bool)"
	}|*/
	try {
		if (isNull(this)) {return false;}
		return (this.nodeType == 1);
	} catch (e) {
		error('Object.isDomElement', e);
	}
});
_ao('isEmpty', function() {
	/*|{
		"info": "Object class extension to check if it is empty",
		"category": "Object",
		"parameters":[],

		"overloads":[],

		"url": "http://www.craydent.com/library/1.9.3/docs#object.isEmpty",
		"returnType": "(Bool)"
	}|*/
    try {
        if ($c.isArray(this) || $c.isString(this)) { return !this.length; }
        if ($c.isObject(this)) { return !$c.itemCount(this); }
        if ($c.isFunction(this)) {
            return /function.*?\(.*?\)\{\}/.test(this.toString().replace(/[\n ]/g,''));
        }
        return false;
    } catch (e) {
        error("Object.isEmpty", e);
        return false;
    }
}, true);
_ao('isError', function() {
	/*|{
		"info": "Object class extension to check if object is a boolean",
		"category": "Object",
		"parameters":[],

		"overloads":[],

		"url": "http://www.craydent.com/library/1.9.3/docs#object.isBoolean",
		"returnType": "(Bool)"
	}|*/
    try {
        if (isNull(this)) { return false; }
        return (this.constructor == Error);
    } catch (e) {
        error('Object.isError', e);
    }
});
_ao("isFloat", function() {
	/*|{
		"info": "Object class extension to check if object is a float",
		"category": "Object",
		"parameters":[],

		"overloads":[],

		"url": "http://www.craydent.com/library/1.9.3/docs#object.isFloat",
		"returnType": "(Bool)"
	}|*/
	try {
		if (isNull(this)) {return false;}
		return ($c.isNumber(this) && (parseFloat(this) == this || parseFloat(this) === 0));
	} catch (e) {
		error('Object.isFloat', e);
	}
});
_ao("isFunction", function() {
	/*|{
		"info": "Object class extension to check if object is a function",
		"category": "Object",
		"parameters":[],

		"overloads":[],

		"url": "http://www.craydent.com/library/1.9.3/docs#object.isFunction",
		"returnType": "(Bool)"
	}|*/
	try {
		if (isNull(this)) {return false;}
		return (this.constructor == Function);
	} catch (e) {
		error('Object.isFunction', e);
	}
});
_ao("isGenerator", function() {
	/*|{
		"info": "Object class extension to check if object is a generator function",
		"category": "Object",
		"parameters":[],

		"overloads":[],

		"url": "http://www.craydent.com/library/1.9.3/docs#object.isGenerator",
		"returnType": "(Bool)"
	}|*/
	try {
		if ($c.isNull(this)) {return false;}
		return (this.constructor.name == "GeneratorFunction");
	} catch (e) {
		error('Object.isGenerator', e);
	}
});
_ao("isGeolocation", function () {
	/*|{
		"info": "Object class extension to check if object is a geolocation",
		"category": "Object",
		"parameters":[],

		"overloads":[],

		"url": "http://www.craydent.com/library/1.9.3/docs#object.isGeoLocation",
		"returnType": "(Bool)"
	}|*/
	try {
		if (isNull(this)) {return false;}
		return (this.constructor.toString().indexOf('function Geolocation') == 0);
	} catch (e) {
		error('Object.isGeolocation', e);
	}
});
_ao("isInt", function () {
	/*|{
		"info": "Object class extension to check if object is an integer",
		"category": "Object",
		"parameters":[],

		"overloads":[],

		"url": "http://www.craydent.com/library/1.9.3/docs#object.isInt",
		"returnType": "(Bool)"
	}|*/
	try {
		if (isNull(this) || $c.isArray(this)) {return false;}
		return (parseInt(this) == this || parseInt(this) === 0);
	} catch (e) {
		error('Object.isInt', e);
	}
});
_ao("isNumber", function() {
	/*|{
		"info": "Object class extension to check if object is a number",
		"category": "Object",
		"parameters":[],

		"overloads":[],

		"url": "http://www.craydent.com/library/1.9.3/docs#object.isNumber",
		"returnType": "(Bool)"
	}|*/
	try {
		if (isNull(this)) {return false;}
		return (this.constructor == Number);
	} catch (e) {
		error('Object.isNumber', e);
	}
});
_ao("isPromise", function() {
	/*|{
		"info": "Object class extension to check if object is a promise object",
		"category": "Object",
		"parameters":[],

		"overloads":[],

		"url": "http://www.craydent.com/library/1.9.3/docs#object.isPromise",
		"returnType": "(Bool)"
	}|*/
	try {
		if (isNull(this) || typeof Promise == "undefined") {return false;}
		return (this.constructor == Promise);
	} catch (e) {
		error('Object.isPromise', e);
	}
});
_ao("isObject", function (check_instance) {
	/*|{
		"info": "Object class extension to check if object is an object",
		"category": "Object",
		"parameters":[],

		"overloads":[],

		"url": "http://www.craydent.com/library/1.9.3/docs#object.isObject",
		"returnType": "(Bool)"
	}|*/
	try {
		if (isNull(this)) {return false;}
		return (this.constructor == Object || (!!check_instance && this instanceof Object));
	} catch (e) {
		error('Object.isObject', e);
	}
});
_ao("isRegExp", function() {
	/*|{
		"info": "Object class extension to check if object is a RegExp",
		"category": "Object",
		"parameters":[],

		"overloads":[],

		"url": "http://www.craydent.com/library/1.9.3/docs#object.isRegExp",
		"returnType": "(Bool)"
	}|*/
	try {
		if (isNull(this)) {return false;}
		return (this.constructor == RegExp);
	} catch (e) {
		error('Object.isRegExp', e);
	}
});
_ao("isString", function () {
	/*|{
		"info": "Object class extension to check if object is a string",
		"category": "Object",
		"parameters":[],

		"overloads":[],

		"url": "http://www.craydent.com/library/1.9.3/docs#object.isString",
		"returnType": "(Bool)"
	}|*/
	return _isString(this);
});
_ao("isSubset", function (compare, sharesAny){
	/*|{
		"info": "Object class extension to check if item is a subset",
		"category": "Object",
		"parameters":[
			{"compare": "(Mixed) Superset to compare against"}],

		"url": "http://www.craydent.com/library/1.9.3/docs#object.isSubset",
		"returnType": "(Bool)"
	}|*/
	try {
		var isArray = $c.isArray(this) && $c.isArray(compare);
		if (($c.isObject(this) && $c.isObject(compare)) || isArray) {

			for (var prop in this){
				if (!this.hasOwnProperty(prop)) { continue; }
				if (!isArray && !compare.hasOwnProperty(prop) || isArray && !compare.contains(this[prop])) { return false; }
				if (sharesAny) { return true; }
			}

			return true;
		} else {
			return ~this.toString().indexOf(compare.toString()) && this.constructor == compare.constructor;
		}
	} catch (e) {
		error('Object.isSubset', e);
	}
});
_ao("itemCount", function () {
	/*|{
		"info": "Object class extension to count the properties in item",
		"category": "Object",
		"parameters":[],

		"overloads":[],

		"url": "http://www.craydent.com/library/1.9.3/docs#object.itemCount",
		"returnType": "(Int)"
	}|*/
	try {
		if ($c.isObject(this)) {
			var count = 0;
			for (var prop in this){
				if (this.hasOwnProperty(prop)) { count++; }
			}
			return count;
		}
		return undefined;
	} catch (e) {
		error('Object.itemCount', e);
	}
});
_ao("keyOf", function (value) {
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
});
_ao("getKeys", function () {
	/*|{
		"info": "Object class extension to get the keys of the object",
		"category": "Object",
		"parameters":[],

		"overloads":[],

		"url": "http://www.craydent.com/library/1.9.3/docs#object.getKeys",
		"returnType": "(Array)"
	}|*/
	try {
		if(Object.keys(foo)) {
			return  Object.keys(this);
		}
		var arr = [];
		for(var prop in this) {
			if(this.hasOwnProperty(prop)) {
				arr.push(prop);
			}
		}
		return arr;
	} catch (e) {
		error('Object.getKeys', e);
	}
});
_ao("map", function(callback, thisObject) {
	/*|{
		"info": "Object class extension to apply method to every value",
		"category": "Object",
		"parameters":[
			{"callback": "(Function) Callback to apply to each value"}],

		"overloads":[
			{"parameters":[
				{"callback": "(Function) Callback to apply to each value"},
				{"thisObject": "(Mixed) Context for the callback function"}]}],

		"url": "http://www.craydent.com/library/1.9.3/docs#object.map",
		"returnType": "(void)"
	}|*/
	try {
		thisObject = thisObject || this;
		for (var prop in this) {
			if (this.hasOwnProperty(prop)) {
				this[prop] = callback.call(thisObject, this[prop]);
			}
		}
	} catch (e) {
		error('Object.map', e)
	}
});
_ao("merge", function (secondary, condition) {
	/*|
		{"info": "Object class extension to merge objects",
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
			objtmp = (condition == "clone" || condition.clone) ? $c.duplicate(this,true) : this,
			compareFunction = $c.isFunction(condition) ? condition : condition.compareFunction,
			intersectObj = {};

		for (var prop in secondary){
			if (secondary.hasOwnProperty(prop)) {
				if (intersect && objtmp.hasOwnProperty(prop)) {
					intersectObj[prop] = secondary[prop];
				} else if (shared) {
					// passing share Only
					if (objtmp.hasOwnProperty(prop)) {
						objtmp[prop] = secondary[prop];
					}
				} else if (compareFunction && $c.isFunction(compareFunction)) {
					if ($c.isArray(objtmp) && objtmp.hasOwnProperty(prop) && compareFunction(objtmp[prop], secondary[prop])) {
						objtmp[prop] = secondary[prop];
						continue;
					}
					objtmp.push($c.duplicate(secondary[prop]));
				} else {
					if ($c.isArray(objtmp) && ($c.isNull(condition) || recurse)) {
						if (!~objtmp.indexOf(secondary[prop])) {
							objtmp.push(secondary[prop]);
						}
					} else if (recurse && ($c.isArray(objtmp[prop]) || $c.isObject(objtmp[prop])) && ($c.isArray(secondary[prop]) || $c.isObject(secondary[prop]))) {
						objtmp[prop] = $c.merge(objtmp[prop],secondary[prop],condition);
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
});
_ao("setProperty", function (path, value, delimiter, options) {
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
		path = $c.strip(path, delimiter);
		var props = path.split(delimiter);
		var obj = this, i = 0, prop, len = props.length, pobj, pprop;
		while (prop = props[i++]) {
			if (i == len) {
				return obj[prop] = value, true;
			}
			if (pobj && pprop && !$c.isArray(pobj[pprop]) && parseInt(prop) >= 0) {
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
});
_ao("toStringAlt", function (delimiter, prefix, urlEncode) {
	/*|{
		"info": "Object class extension for an alternate way to stringify object to formatted string",
		"category": "Object",
		"parameters":[],

		"overloads":[
			{"parameters":[
				{"delimiter": "(Char) Character to separate the property from the value"}]},

			{"parameters":[
				{"delimiter": "(Char) Character to separate the property from the value"},
				{"prefix": "(Char) Character to prefix the property name"}]},

			{"parameters":[
				{"delimiter": "(Char) Character to separate the property from the value"},
				{"prefix": "(Char) Character to prefix the property name"},
				{"urlEncode": "(Bool) Flag to url encode the property and value"}]}],

		"url": "http://www.craydent.com/library/1.9.3/docs#",
		"returnType": "(String)"
	}|*/
	try {
		delimiter = delimiter || '=';
		prefix = prefix || '&';
		var str = '';
		for (var prop in this) {
			if (this.hasOwnProperty(prop)) {
				var value = $c.isObject(this[prop]) ? JSON.stringify(this[prop]) : this[prop];
				urlEncode &&
                    (str += prefix + encodeURIComponent(prop) + delimiter + encodeURIComponent(value)) || (str += prefix + prop + delimiter + value);
			}
		}
		return str;
	} catch (e) {
		error('Object.toStringAlt', e);
	}
}, true);

// retrieve public and local IP Addresses
var nics = require('os').networkInterfaces();
for (var nic in nics) {
	if (!nics.hasOwnProperty(nic)) {
		continue;
	}
	// filter for address that is IPv4
	var iface = nics[nic].filter(function (ic) {return ic.family=='IPv4';})[0];
	if (iface) {
		if (nic.startsWith('lo')) {
			$c.LOCAL_IP = iface.address;
		} else if (nic.startsWith('eth') || nic.startsWith('en')) {
			$c.PUBLIC_IP = iface.address
		}
	}
	// break if local and public ips are found
	if ($c.LOCAL_IP && $c.PUBLIC_IP) {
		break
	}
}

// RTF converter
var control_words = ['\\'], rtf_delimiter = "";
function rftToHtml (text) {

}

var JSZip = foo;
try {
	// load node jszip module if available;
	JSZip = require('jszip');
} catch (e) {
	/**

	 JSZip - A Javascript class for generating Zip files
	 <http://jszip.stuartk.co.uk>

	 (c) 2009 Stuart Knightley <stuart [at] stuartk.co.uk>
	 Licenced under the GPLv3 and the MIT licences

	 Usage:
	 zip = new JSZip();
	 zip.add("hello.txt", "Hello, World!").add("tempfile", "nothing");
	 zip.folder("images").add("smile.gif", base64Data, {base64: true});
	 zip.add("Xmas.txt", "Ho ho ho !", {date : new Date("December 25, 2007 00:00:01")});
	 zip.remove("tempfile");

	 base64zip = zip.generate();

	 **/

	JSZip = function (compression)
	{
		// default : no compression
		this.compression = (compression || "STORE").toUpperCase();
		this.files = [];

		// Where we are in the hierarchy
		this.root = "";

		// Default properties for a new file
		this.d = {
			base64: false,
			binary: false,
			dir: false,
			date: null
		};

		if (!JSZip.compressions[this.compression]) {
			throw compression + " is not a valid compression method !";
		}
	}
	/**
	 * Add a file to the zip file
	 * @param   name  The name of the file
	 * @param   data  The file data, either raw or base64 encoded
	 * @param   o     File options
	 * @return  this JSZip object
	 */
	JSZip.prototype.file = function(name, data, o){
		o = o || {};
		name = this.root+name;
		if (o.base64 === true && o.binary == null) o.binary = true;
		for (var opt in this.d){
			o[opt] = o[opt] || this.d[opt];
		}

		// date
		// @see http://www.delorie.com/djgpp/doc/rbinter/it/52/13.html
		// @see http://www.delorie.com/djgpp/doc/rbinter/it/65/16.html
		// @see http://www.delorie.com/djgpp/doc/rbinter/it/66/16.html

		o.date = o.date || new Date();
		var dosTime, dosDate;

		dosTime = o.date.getHours();
		dosTime = dosTime << 6;
		dosTime = dosTime | o.date.getMinutes();
		dosTime = dosTime << 5;
		dosTime = dosTime | o.date.getSeconds() / 2;

		dosDate = o.date.getFullYear() - 1980;
		dosDate = dosDate << 4;
		dosDate = dosDate | (o.date.getMonth() + 1);
		dosDate = dosDate << 5;
		dosDate = dosDate | o.date.getDate();

		if (o.base64 === true) data = JSZipBase64.decode(data);
		// decode UTF-8 strings if we are dealing with text data
		if(o.binary === false) data = this.utf8encode(data);


		var compression    = JSZip.compressions[this.compression];
		var compressedData = compression.compress(data);

		var header = "";

		// version needed to extract
		header += "\x0A\x00";
		// general purpose bit flag
		header += "\x00\x00";
		// compression method
		header += compression.magic;
		// last mod file time
		header += this.decToHex(dosTime, 2);
		// last mod file date
		header += this.decToHex(dosDate, 2);
		// crc-32
		header += this.decToHex(this.crc32(data), 4);
		// compressed size
		header += this.decToHex(compressedData.length, 4);
		// uncompressed size
		header += this.decToHex(data.length, 4);
		// file name length
		header += this.decToHex(name.length, 2);
		// extra field length
		header += "\x00\x00";

		// file name

		this.files[name] = {
			header: header,
			data: compressedData,
			dir: o.dir
		};

		return this;
	};

	/**
	 * Add a directory to the zip file
	 * @param   name  The name of the directory to add
	 * @return  JSZip object with the new directory as the root
	 */
	JSZip.prototype.folder = function(name)
	{
		// Check the name ends with a /
		if (name.substr(-1) != "/") name += "/";

		// Does this folder already exist?
		if (typeof this.files[name] === "undefined") this.add(name, '', {
			dir:true
		});

		// Allow chaining by returning a new object with this folder as the root
		var ret = this.clone();
		ret.root = this.root+name;
		return ret;
	};

	/**
	 * Compare a string or regular expression against all of the filenames and
	 * return an informational object for each that matches.
	 * @param  needle string/regex The regular expression to test against
	 * @return  An array of objects representing the matched files. In the form
	 *          {name: "filename", data: "file data", dir: true/false}
	 */
	JSZip.prototype.find = function(needle)
	{
		var result = [], re;
		if (typeof needle === "string")
		{
			re = new RegExp("^"+needle+"$");
		}
		else
		{
			re = needle;
		}

		for (var filename in this.files)
		{
			if (re.test(filename))
			{
				var file = this.files[filename];
				result.push({
					name: filename,
					data: file.data,
					dir: !!file.dir
				});
			}
		}

		return result;
	};

	/**
	 * Delete a file, or a directory and all sub-files, from the zip
	 * @param   name  the name of the file to delete
	 * @return  this JSZip object
	 */
	JSZip.prototype.remove = function(name)
	{
		var file = this.files[name];
		if (!file)
		{
			// Look for any folders
			if (name.substr(-1) != "/") name += "/";
			file = this.files[name];
		}

		if (file)
		{
			if (name.match("/") === null)
			{
				// file
				delete this.files[name];
			}
			else
			{
				// folder
				var kids = this.find(new RegExp("^"+name));
				for (var i = 0; i < kids.length; i++)
				{
					if (kids[i].name == name)
					{
						// Delete this folder
						delete this.files[name];
					}
					else
					{
						// Remove a child of this folder
						this.remove(kids[i].name);
					}
				}
			}
		}

		return this;
	};

	/**
	 * Generate the complete zip file
	 * @return  A base64 encoded string of the zip file
	 */
	JSZip.prototype.generate = function(asBytes)
	{
		asBytes = asBytes || false;

		// The central directory, and files data
		var directory = [], files = [], fileOffset = 0;

		for (var name in this.files)
		{
			if( !this.files.hasOwnProperty(name) ) {
				continue;
			}

			var fileRecord = "", dirRecord = "";
			fileRecord = "\x50\x4b\x03\x04" + this.files[name].header + name + this.files[name].data;

			dirRecord = "\x50\x4b\x01\x02" +
						// version made by (00: DOS)
					"\x14\x00" +
						// file header (common to file and central directory)
					this.files[name].header +
						// file comment length
					"\x00\x00" +
						// disk number start
					"\x00\x00" +
						// internal file attributes
					"\x00\x00" +
						// external file attributes
					(this.files[name].dir===true?"\x10\x00\x00\x00":"\x00\x00\x00\x00")+
						// relative offset of local header
					this.decToHex(fileOffset, 4) +
						// file name
					name;

			fileOffset += fileRecord.length;

			files.push(fileRecord);
			directory.push(dirRecord);
		}

		var fileData = files.join("");
		var dirData = directory.join("");

		var dirEnd = "";

		// end of central dir signature
		dirEnd = "\x50\x4b\x05\x06" +
					// number of this disk
				"\x00\x00" +
					// number of the disk with the start of the central directory
				"\x00\x00" +
					// total number of entries in the central directory on this disk
				this.decToHex(files.length, 2) +
					// total number of entries in the central directory
				this.decToHex(files.length, 2) +
					// size of the central directory   4 bytes
				this.decToHex(dirData.length, 4) +
					// offset of start of central directory with respect to the starting disk number
				this.decToHex(fileData.length, 4) +
					// .ZIP file comment length
				"\x00\x00";

		var zip = fileData + dirData + dirEnd;
		return (asBytes) ? zip : JSZipBase64.encode(zip);

	};

	/*
	 * Compression methods
	 * This object is filled in as follow :
	 * name : {
	 *    magic // the 2 bytes indentifying the compression method
	 *    compress // function, take the uncompressed content and return it compressed.
	 * }
	 *
	 * STORE is the default compression method, so it's included in this file.
	 * Other methods should go to separated files : the user wants modularity.
	 */
	JSZip.compressions = {
		"STORE" : {
			magic : "\x00\x00",
			compress : function (content) {
				return content; // no compression
			}
		}
	};

	// Utility functions

	JSZip.prototype.decToHex = function(dec, bytes)
	{
		var hex = "";
		for(var i=0;i<bytes;i++) {
			hex += String.fromCharCode(dec&0xff);
			dec=dec>>>8;
		}
		return hex;
	};

	/**
	 *
	 *  Javascript crc32
	 *  http://www.webtoolkit.info/
	 *
	 **/

	JSZip.prototype.crc32 = function(str, crc)
	{

		if (str === "") return "\x00\x00\x00\x00";

		var table = "00000000 77073096 EE0E612C 990951BA 076DC419 706AF48F E963A535 9E6495A3 0EDB8832 79DCB8A4 E0D5E91E 97D2D988 09B64C2B 7EB17CBD E7B82D07 90BF1D91 1DB71064 6AB020F2 F3B97148 84BE41DE 1ADAD47D 6DDDE4EB F4D4B551 83D385C7 136C9856 646BA8C0 FD62F97A 8A65C9EC 14015C4F 63066CD9 FA0F3D63 8D080DF5 3B6E20C8 4C69105E D56041E4 A2677172 3C03E4D1 4B04D447 D20D85FD A50AB56B 35B5A8FA 42B2986C DBBBC9D6 ACBCF940 32D86CE3 45DF5C75 DCD60DCF ABD13D59 26D930AC 51DE003A C8D75180 BFD06116 21B4F4B5 56B3C423 CFBA9599 B8BDA50F 2802B89E 5F058808 C60CD9B2 B10BE924 2F6F7C87 58684C11 C1611DAB B6662D3D 76DC4190 01DB7106 98D220BC EFD5102A 71B18589 06B6B51F 9FBFE4A5 E8B8D433 7807C9A2 0F00F934 9609A88E E10E9818 7F6A0DBB 086D3D2D 91646C97 E6635C01 6B6B51F4 1C6C6162 856530D8 F262004E 6C0695ED 1B01A57B 8208F4C1 F50FC457 65B0D9C6 12B7E950 8BBEB8EA FCB9887C 62DD1DDF 15DA2D49 8CD37CF3 FBD44C65 4DB26158 3AB551CE A3BC0074 D4BB30E2 4ADFA541 3DD895D7 A4D1C46D D3D6F4FB 4369E96A 346ED9FC AD678846 DA60B8D0 44042D73 33031DE5 AA0A4C5F DD0D7CC9 5005713C 270241AA BE0B1010 C90C2086 5768B525 206F85B3 B966D409 CE61E49F 5EDEF90E 29D9C998 B0D09822 C7D7A8B4 59B33D17 2EB40D81 B7BD5C3B C0BA6CAD EDB88320 9ABFB3B6 03B6E20C 74B1D29A EAD54739 9DD277AF 04DB2615 73DC1683 E3630B12 94643B84 0D6D6A3E 7A6A5AA8 E40ECF0B 9309FF9D 0A00AE27 7D079EB1 F00F9344 8708A3D2 1E01F268 6906C2FE F762575D 806567CB 196C3671 6E6B06E7 FED41B76 89D32BE0 10DA7A5A 67DD4ACC F9B9DF6F 8EBEEFF9 17B7BE43 60B08ED5 D6D6A3E8 A1D1937E 38D8C2C4 4FDFF252 D1BB67F1 A6BC5767 3FB506DD 48B2364B D80D2BDA AF0A1B4C 36034AF6 41047A60 DF60EFC3 A867DF55 316E8EEF 4669BE79 CB61B38C BC66831A 256FD2A0 5268E236 CC0C7795 BB0B4703 220216B9 5505262F C5BA3BBE B2BD0B28 2BB45A92 5CB36A04 C2D7FFA7 B5D0CF31 2CD99E8B 5BDEAE1D 9B64C2B0 EC63F226 756AA39C 026D930A 9C0906A9 EB0E363F 72076785 05005713 95BF4A82 E2B87A14 7BB12BAE 0CB61B38 92D28E9B E5D5BE0D 7CDCEFB7 0BDBDF21 86D3D2D4 F1D4E242 68DDB3F8 1FDA836E 81BE16CD F6B9265B 6FB077E1 18B74777 88085AE6 FF0F6A70 66063BCA 11010B5C 8F659EFF F862AE69 616BFFD3 166CCF45 A00AE278 D70DD2EE 4E048354 3903B3C2 A7672661 D06016F7 4969474D 3E6E77DB AED16A4A D9D65ADC 40DF0B66 37D83BF0 A9BCAE53 DEBB9EC5 47B2CF7F 30B5FFE9 BDBDF21C CABAC28A 53B39330 24B4A3A6 BAD03605 CDD70693 54DE5729 23D967BF B3667A2E C4614AB8 5D681B02 2A6F2B94 B40BBE37 C30C8EA1 5A05DF1B 2D02EF8D";

		if (typeof(crc) == "undefined") {
			crc = 0;
		}
		var x = 0;
		var y = 0;

		crc = crc ^ (-1);
		for( var i = 0, iTop = str.length; i < iTop; i++ ) {
			y = ( crc ^ str.charCodeAt( i ) ) & 0xFF;
			x = "0x" + table.substr( y * 9, 8 );
			crc = ( crc >>> 8 ) ^ x;
		}

		return crc ^ (-1);

	};

	// Inspired by http://my.opera.com/GreyWyvern/blog/show.dml/1725165
	JSZip.prototype.clone = function()
	{
		var newObj = new JSZip();
		for (var i in this)
		{
			if (typeof this[i] !== "function")
			{
				newObj[i] = this[i];

			}
		}

		return newObj;
	};


	JSZip.prototype.utf8encode = function(input)

	{
		input = encodeURIComponent(input);

		input = input.replace(/%.{2,2}/g, function(m) {

			var hex = m.substring(1);

			return String.fromCharCode(parseInt(hex,16));

		});
		return input;

	};

	/**

	 *
	 *  Base64 encode / decode

	 *  http://www.webtoolkit.info/

	 *
	 *  Hacked so that it doesn't utf8 en/decode everything

	 **/

	var JSZipBase64 = function() {
		// private property
		var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

		return {
			// public method for encoding
			encode : function(input, utf8) {
				var output = "",
						chr1, chr2, chr3, enc1, enc2, enc3, enc4,
						i = 0;

				while (i < input.length) {
					chr1 = input.charCodeAt(i++);
					chr2 = input.charCodeAt(i++);
					chr3 = input.charCodeAt(i++);

					enc1 = chr1 >> 2;
					enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
					enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
					enc4 = chr3 & 63;

					if (isNaN(chr2)) {
						enc3 = enc4 = 64;
					} else if (isNaN(chr3)) {
						enc4 = 64;
					}
					output = output +
							_keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
							_keyStr.charAt(enc3) + _keyStr.charAt(enc4);
				}
				return output;
			},
			// public method for decoding

			decode : function(input, utf8) {
				var output = "",
						chr1, chr2, chr3,
						enc1, enc2, enc3, enc4,
						i = 0;

				input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

				while (i < input.length) {
					enc1 = _keyStr.indexOf(input.charAt(i++));
					enc2 = _keyStr.indexOf(input.charAt(i++));
					enc3 = _keyStr.indexOf(input.charAt(i++));
					enc4 = _keyStr.indexOf(input.charAt(i++));

					chr1 = (enc1 << 2) | (enc2 >> 4);
					chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
					chr3 = ((enc3 & 3) << 6) | enc4;

					output = output + String.fromCharCode(chr1);

					if (enc3 != 64) {
						output = output + String.fromCharCode(chr2);
					}
					if (enc4 != 64) {
						output = output + String.fromCharCode(chr3);
					}
				}
				return output;
			}
		};
	}();
}

if (typeof JSON.parseAdvanced !== 'function') {
	JSON.parseAdvanced = function (text, reviver, values, base_path) {
		base_path = base_path || "";
		var err;
		try { text = JSON.parse(text, reviver) || text; } catch (e) { err = e; }
		if (!$c.isObject(text)) {
			base_path = text.substring(0,text.lastIndexOf('/'));
			text = $c.include(__relativePathFinder(text));
			if (!text) { throw err; }
		}
		if (base_path && base_path.slice(-1) != "/") {
			base_path += "/";
		}
		return _parseAdvanced(text, null, values, base_path, 0);
	};
	function _parseAdvanced (obj,_original,values,base_path,depth, _parent, _current_path) {
		_current_path = _current_path || base_path || "";
		if (!obj) { return; }
		_original = _original || obj;
		for (var prop in obj) {
			if (!obj.hasOwnProperty(prop)) { continue; }
			var nprop = $c.fillTemplate(prop.toString(), values);
			if (~nprop.indexOf('.') && $c.count(nprop,/\./) == 1) {
				var parts = nprop.split('.'),
					name = parts[1],
					type = parts[0],
					value = $c.fillTemplate(obj[prop], values) || obj[prop];
				if (type == "Number") {
					value = Number(value);
				} else if (type == "Function") {
					value = $c.tryEval(value);
				} else if (type == "RegExp") {
					value = new RegExp($c.strip(value, '/'));
				} else if ($g[type]) {
					value = new $g[type](value);
				} else {
					name = nprop;
					if ($c.isObject(value) || $c.isArray(obj[prop])) {
						value = _parseAdvanced(value,_original,values,base_path,depth + 1,obj, _current_path + "/" + prop);
					}
				}

				obj[name] = value;
				name != prop && delete obj[prop];
			} else if (prop == '$ref') {
				var value = $c.fillTemplate(obj[prop],values),
					hashIndex = value.indexOf('#'),
					refobj = obj,
					parts = value.split('#'),
					filepath = parts[0],
					fieldpath = parts[1];
				if (hashIndex == 0) {
					value = value.substring(1);
					if (value[0] == "/") {
						refobj = _original;
					} else if (!$c.startsWith(value,"../")) {
						refobj = _parent;
					} else {
						var refpath = _current_path;
						while ($c.startsWith(value,"../")) {
							value = value.substring(3);
							refpath = refpath.substring(0,refpath.lastIndexOf("/"));
							if (!refpath) { return undefined; }
						}
					}
					return $c.getProperty(refobj, value, '/');
				}
				if (filepath.startsWith('/')) {
					var pkg = require("./package.json");
					filepath = (base_path ? "" : __dirname.replace(new RegExp("/node_modules/"+pkg.name+"$"),'')) + filepath;
				}
				try {
					var module = __relativePathFinder(base_path + filepath,depth + 1);
					$c.clearCache(module);
					refobj = _parseAdvanced(require(module),null,values,base_path,depth + 1,obj,_current_path + "/" + prop);
				} catch(e) {
					error('JSON.parseAdvanced._parseAdvanced', e);
					return null;
				}
				return fieldpath ? $c.getProperty(refobj, fieldpath, '/') : refobj;
			} else if ($c.isObject(obj[prop]) || $c.isArray(obj[prop])) {
				obj[nprop] = _parseAdvanced(obj[prop],_original,values,base_path,depth + 1,obj,_current_path + "/" + prop);
				nprop != prop && delete obj[prop];
			} else {
				var value = obj[prop];
				var newval = $c.isString(value) ? $c.fillTemplate(value, values) : value;
				if (newval != value) { obj[prop] = value = newval; }
				if (nprop != prop) { delete obj[prop]; obj[nprop] = value; }
			}
		}
		return obj;
	}
}
if (typeof JSON.stringifyAdvanced !== 'function') {
	JSON.stringifyAdvanced = function (obj, replacer, space) {
		return JSON.stringify(_stringifyAdvanced (obj), replacer, space);
	};
	function _stringifyAdvanced (obj, _nobj ,_objs, _paths, _cpath) {
		_nobj = _nobj || ($c.isObject(obj) ? {}: ($c.isArray(obj) ? [] : obj));
		_objs = _objs || [obj];
		_paths = _paths || ["/"];
		_cpath = _cpath || "";
		for (var prop in obj) {
			if (!obj.hasOwnProperty(prop)) { continue; }
			var val = obj[prop];
			if ($c.isObject(obj[prop]) || $c.isArray(obj[prop])){
				var index;
				if (~(index = _objs.indexOf(obj[prop]))) {
					val = { "$ref":"#" + _paths[index] };
				} else {
					_objs.push(obj[prop]);
					_paths.push(_cpath + "/" + prop);
					val = _stringifyAdvanced(obj[prop], ($c.isObject(obj[prop]) ? {} : []), _objs, _paths, "/" + prop);
				}
			}
			$c.setProperty(_nobj, "/" + prop, val, '/');
		}
		return _nobj;
	}

}