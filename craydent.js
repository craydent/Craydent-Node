/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.4.0                                /*/
/*/	Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/	(http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/

/*----------------------------------------------------------------------------------------------------------------
 /-	Global CONSTANTS and variables
 /---------------------------------------------------------------------------------------------------------------*/
GLOBAL.$g = GLOBAL;
$g.navigator = $g.navigator || {};
$g.$c = {};
function Craydent(req, res) {
	var self = this;

	var cookies, sessionid,
			fs = require('fs'),
			session;

	this.request = req;
	this.response = res;
	this.$l;
	this.location;
	this.navigator = {};

	//this.sessionid = "";
	this.getSessionID = function () {
		return sessionid;
	};
	this.getSession = function (sid, callback) {
		if (arguments.length == 0) {
			return self.getSessionSync(sid);
		}
		//sid = sid || sessionid;
		return self._getSession(callback, sid);
	};
	this.getSessionSync = function (sid) {
		return self._getSession(sid);
	};
	this._sessionFileCreatAndRetrieve = function (dir, path, sync, callback) {
		if (sync) {
			if(!fs.existsSync(path)){
				if (!fs.existsSync(dir)) {
					var dirPath = "";
					// create all missing parent directories sync
					for (var i = 0, dirs = dir.split('/'),dir = dirs[i]; dir; dir = dirs[++i]) {
						dirPath += dir + '/';
						if (!fs.existsSync(dirPath)) {
							fs.mkdirSync(dirPath);
						}
					}
				}
				// creates the file
				fs.openSync(path,'w+');
			}
			return tryEval(fs.readFileSync(path).toString()) || {};
		} else {
			fs.exists(path, function (exists) {
				if (!exists) {
					// create all missing parent directories async
					mkdirRecursive(dir,function () {
						// create the file
						fs.open(path,'w+',function () {
							callback({});
						});
					});
				} else {
					fs.readFile(path,function (err,data) {
						callback(tryEval(data));
					});
				}
			});
		}
		return;
	};
	this._getSession = function (callback, sid) {
		try {
			var request = self.request;
			if (session || __GLOBALSESSION[sessionid]) {
				session = session ? (__GLOBALSESSION[sessionid] = session) : (__GLOBALSESSION[sessionid]);
				return callback ? callback(session) : session;
			}
			var sync = !callback;

			var cookies, sessionCookieKey = "NODEJSSESSION";
			cookies = (request.propertyValue('headers.cookie') || '').split('; ');
			// get thes session cookie cuid from the cookie
			var sessionCookie = cookies.filter(function (c) {return c.contains(sessionCookieKey + "=");})[0];
			if (sessionCookie) {
				sessionid = sessionCookie.substring(sessionCookieKey.length + 1);
			} else {
				sessionid = cuid();
			}

			if (true || !__GLOBALSESSION[sessionid] && __GLOBALSESSION.length > 1000000) {
				// make room for this session to be store globally
				for (var prop in __GLOBALSESSION) {
					delete __GLOBALSESSION[prop];
					break;
				}

				var dir = 'craydent/session',
						path = dir + "/" + sessionid;

				var csession = self._sessionFileCreatAndRetrieve(dir, path, sync, function(retrievedSession){
					__GLOBALSESSION[sessionid] = session = retrievedSession;
					callback && callback(session);
				});
				if (csession) {
					return __GLOBALSESSION[sessionid] = session = csession;
				}
			} else {
				return callback ? callback(__GLOBALSESSION[sessionid]) : __GLOBALSESSION[sessionid];
			}
		} catch(e) {
			logit(e);
		}
	};

	this.end = function (output, encoding) {
		output = output || "";
		var response = self.response;
		if (encoding && !encoding.isString()) {
			response = encoding;
		}
		if (!response) {// response already ended
			return;
		}

		try {
			// Release memory for objects
			var obj;
			while (obj = $g.GarbageCollector.splice(0,1)[0]) {
				obj.destruct();
			}
			self.writeSession();
			var heads = typeof header != "undefined" ? header : {headers:{}},
					eco = (typeof echo != "undefined" ? echo : self.echo);

			var headers = $c.merge(heads.headers, self.header.headers),
					code = heads.code || self.header.code,
					eco = (typeof echo != "undefined" && echo.out || "") + (self.echo.out || "");


			!response.headersSent && response.writeHead(code, headers);
			response.end(eco + output, encoding);
			logit('end*******************************************************');
			//logit(echo.out);
		} catch(e) {
			response.writeHead(500, this.header.headers);
			response.end($c.DEBUG_MODE ? e.toString() : "");
		} finally {
			logit("response ended");
		}
	};
	this.writeSession = function () {
		var fs = require('fs');
		if (sessionid) {
			if($c.BALANCE_SERVER_LIST) {
				var otherServers = $c.BALANCE_SERVER_LIST.filter(function (ip) {
					return $c.PUBLIC_IP != ip;
				});
				// save session to other load balanced servers
				for (var i = 0, len = otherServers.length; i < len; i++) {
					if (self.propertyValue('response.setHeader') && !self.propertyValue('response.headersSent')) {
						self.response.setHeader("Set-Cookie", ["NODEJSSESSION=" + sessionid + "; path=/"]);
					}
					fs.writeFile('craydent/session/' + sessionid, JSON.stringify(session), foo);
				}
			}
			// save session to this server
			if (self.propertyValue('response.setHeader') && !self.propertyValue('response.headersSent')) {
				self.response.setHeader("Set-Cookie", ["NODEJSSESSION=" + sessionid + "; path=/"]);
			}
			fs.writeFile('craydent/session/' + sessionid, JSON.stringify(session), foo);
		}
	};
	this.header = function (headers, code) {
		if (headers.isString() && !code) {
			if (!headers.contains(':')) {
				code = parseInt(headers.replace(/.*?([\d]{3}).*/,'$1'));
			}
			if (headers.toLowerCase().indexOf('http/') == 0) {
				headers = {'Content-Type':'text/html'};
			} else {
				var parts = headers.split(':');
				headers = {};
				headers[parts[0].trim()] = parts[1].trim();
			}
		}
		self.header.headers = self.header.headers.merge(headers);
		if (code && code.isInt()) {
			self.header.code = code;
		}
	};
	this.header.headers = {'Content-Type': 'text/plain'};
	this.header.code = 200;
	this.echo = function (output) {
		echo.out += output;
	};
	this.echo.out = "";
	this.var_dump = function () {
		var type = "", value;
		for (var i = 0, len = arguments.length; i < len; i++) {
			value = type = arguments[i];
			if (type !== undefined || type !== null ) {
				type = arguments[i].constructor.toString().replace(/function (.*)?\(.*/, '$1');
				switch(type) {
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
	};

	this.$COOKIE = function (key, value, options) {
		options = options || {};
		var c = self.propertyValue('request.headers.cookie');
		if (options.cookie) {
			c = options.cookie;
		}
		if (!c) {
			return;
		}
		if(key.isObject) {
			for (var prop in key) {
				value = key[prop];
				key = prop;
				options = value;
				break;
			}
		}
		var cookies = {},
				arr = c.split(/[,;]/);
		if (value) {
			var expires = "", path = "";
			if (options.expiration.isInt()) {
				var dt = new Date();
				dt.setDate(dt.getDate() + options.expiration);
				expires = "; expires=" + dt.toUTCString();
			}
			if (options.path.isString()) {
				path = "; path=/" + options.path;
			}
			key = encodeURIComponent(key);
			value = encodeURIComponent(value);
			self.response.setHeader("Set-Cookie", [key + "=" + value + expires + path]);
			return;
		}
		for (var i = 0, len = arr.length; i < len; i++) {
			var cookie = arr[i],
					parts = cookie.split(/=/, 2),
					name = decodeURIComponent($c.ltrim(parts[0])),
					value = parts.length > 1 ? decodeURIComponent($c.rtrim(parts[1])) : null;
			cookies[name] = value;
			if (key && key == name) {
				return value;
			}
		}

		if (key) {
			return false;
		}
		return cookies;
	};
	this.$GET = function (variable, options) {//used to retrieve variables in the url
		try {
			if (!variable) {
				var allkeyvalues = {},
						mapFunc = function(value){
							if (value == "") {
								return;
							}
							var keyvalue = value.split('='),
									len = keyvalue.length;
							if (len > 2) {
								for (var i = 2; i < len; i++) {
									keyvalue[1] += keyvalue[i];
								}
							}
							return allkeyvalues[keyvalue[0]] = keyvalue[1];
						};

				(self.$l.search[0] == "?" ? self.$l.search.substr(1) : self.$l.search).split('&').map(mapFunc);
				(self.$l.hash[0] == "#" ? self.$l.hash.substr(1) : self.$l.hash).split('@').map(mapFunc);
				return allkeyvalues;
			}
			options = options || {};
			var ignoreCase = options.ignoreCase || options == "ignoreCase" ? "i" : "",
//            defer = typeof $COMMIT != "undefined" && !!$COMMIT.update && (options.defer || options == "defer"),
					regex = new RegExp("[\?|&|@]?" + variable + "=", ignoreCase),
					attr = "search",
					location = {};
			location.hash = self.$l.hash;
			location.search = self.$l.search;

			/*if (defer) {
			 location.hash = $COMMIT.hash || "";
			 location.search = $COMMIT.search || "";
			 } else*/ if (options.url || $c && $c.isString && ($c.isString(options) && (options.indexOf("?") != -1 || options.indexOf("#") != -1))) {
				var query = options.url || options,
						hindex, qindex = query.indexOf("?");

				qindex != -1 && (query = query.substr(qindex));

				hindex = query.indexOf("#");
				if (hindex != -1) {
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
	};
	this.isIE6 = function () {
		try {
			var rv = self.IEVersion();
			return (rv != -1 && rv < 7.0);
		} catch (e) {
			error('isIE6', e);
		}
	};
	this.isIE = function () {
		try {
			return (self.IEVersion() != -1);
		} catch (e) {
			error('isIE', e);
		}
	};
	this.IEVersion = function  () {
		try {
			var rv = -1;
			if (self.navigator.appName == 'Microsoft Internet Explorer') {
				var ua = self.navigator.userAgent,
						re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
				if (re.exec(ua) != null) {
					rv = parseFloat(RegExp.$1);
				}
			}
			return rv;
		} catch (e) {
			error('IEVersion', e);
		}
	};
	this.isChrome = function (){
		try {
			return (self.navigator.userAgent.indexOf("Chrome") != -1);
		} catch(e){
			error('isChrome', e);
		}
	};
	this.isSafari = function (){
		try {
			return (self.navigator.userAgent.indexOf("Chrome") == -1) && (self.navigator.userAgent.indexOf("Apple") != -1);
		} catch(e){
			error('isSafari', e);
		}
	};
	this.isOpera = function (){
		try {
			return (self.navigator.userAgent.indexOf("Chrome") == -1)
					&& (self.navigator.userAgent.indexOf("Apple") == -1)
					&& (self.navigator.userAgent.indexOf("Opera") != -1);
		} catch(e){
			error('isOpera', e);
		}
	};
	this.isFirefox = function (){
		try {
			return (self.navigator.userAgent.indexOf("Chrome") == -1)
					&& (self.navigator.userAgent.indexOf("Apple") == -1)
					&& (self.navigator.userAgent.indexOf("Opera") == -1)
					&& (self.navigator.userAgent.indexOf("Firefox") != -1);
		} catch(e){
			error('isFirefox', e);
		}
	};

	this._getBrowserVersion = function (browser){
		try {
			var index = self.navigator.userAgent.indexOf(browser);
			if (index == -1 && self["is"+browser]()) return -1;
			return parseFloat(self.navigator.userAgent.substring(index+browser.length+1));
		} catch(e){
			error('_getBrowserVersion', e);
		}
	};
	this.ChromeVersion = function  (){
		try {
			var browser = "Chrome"
			return self._getBrowserVersion(browser);
		} catch(e){
			error('ChromeVersion', e);
		}
	};
	this.SafariVersion = function  (){
		try {
			var browser = "Safari"
			return self._getBrowserVersion(browser);
		} catch(e){
			error('SafariVersion', e);
		}
	};
	this.OperaVersion = function  (){
		try {
			var browser = "Opera"
			return self._getBrowserVersion(browser);
		} catch(e){
			error('OperaVersion', e);
		}
	};
	this.FirefoxVersion = function  (){
		try {
			var browser = "Firefox"
			return self._getBrowserVersion(browser);
		} catch(e){
			error('FirefoxVersion', e);
		}
	};

	this.isIPhone = function (){
		try{
			return !self.isIPad() && self.navigator.userAgent.indexOf("iPhone") != -1;
		} catch (e) {
			error('isIPhone', e);
		}
	};
	this.isIPod = function () {
		try {
			var navUserAgent = self.navigator.userAgent;
			return (/ipod/i.test(navUserAgent));
		} catch (e) {
			error('isIPod', e);
		}
	};
	this.isIPad = function () {
		try {
			var navUserAgent = self.navigator.userAgent;
			return (/iPad|iPhone OS 3_[1|2]_2/i.test(navUserAgent));
		} catch (e) {
			error('isIPad', e);
		}
	};
	this.isAndroid = function (){
		try {
			var navUserAgent = self.navigator.userAgent;
			return (/android/i.test(navUserAgent));
		} catch (e) {
			error('isAndroid', e);
		}
	};
	this.isWindowsMobile = function () {
		try {
			var navUserAgent = self.navigator.userAgent;
			return (/windows ce/i.test(navUserAgent));
		} catch (e) {
			error('isWindowsMobile', e);
		}
	};
	this.isBlackBerry = function () {
		try {
			var navUserAgent = self.navigator.userAgent;
			return (/blackberry/i.test(navUserAgent));
		} catch (e) {
			error('isBlackBerry', e);
		}
	};
	this.isPalmOS = function (){
		try {
			var navUserAgent = self.navigator.userAgent;
			return (/palm/i.test(navUserAgent));
		} catch (e) {
			error('isIPad', e);
		}
	};
	this.isSymbian = function  () {
		try {
			var navUserAgent = self.navigator.userAgent;
			return (self.isWebkit() && (/series60/i.test(navUserAgent) || /symbian/i.test(navUserAgent)));
		} catch (e) {
			error('isIPad', e);
		}
	};
	this.isWebkit = function () {
		try {
			var navUserAgent = self.navigator.userAgent;
			return (/webkit/i.test(navUserAgent));
		} catch (e) {
			error('isWebkit', e);
		}
	};
	this.isAmaya = function () {
		try {
			var navUserAgent = self.navigator.userAgent;
			return (/amaya/i.test(navUserAgent));
		} catch (e) {
			error('isAmaya', e);
		}
	};
	this.isGecko = function () {
		try {
			var navUserAgent = self.navigator.userAgent;
			return (/gecko/i.test(navUserAgent));
		} catch (e) {
			error('isGecko', e);
		}
	};
	this.isKHTML = function () {
		try {
			var navUserAgent = self.navigator.userAgent;
			return (/khtml/i.test(navUserAgent));
		} catch (e) {
			error('isKHTML', e);
		}
	};
	this.isPresto = function () {
		try {
			var navUserAgent = self.navigator.userAgent;
			return (/presto/i.test(navUserAgent));
		} catch (e) {
			error('isPresto', e);
		}
	};
	this.isPrince = function () {
		try {
			var navUserAgent = self.navigator.userAgent;
			return (/prince/i.test(navUserAgent));
		} catch (e) {
			error('isPrince', e);
		}
	};
	this.isTrident = function () {
		try {
			var navUserAgent = self.navigator.userAgent;
			return (/trident/i.test(navUserAgent));
		} catch (e) {
			error('isTrident', e);
		}
	};
	this.isWindows = function (){
		try{
			return self.navigator.platform.indexOf("Win") != -1;
		} catch (e) {
			error('isWindows', e);
		}
	};
	this.isMac = function (){
		try{
			return self.navigator.platform.indexOf("Mac") != -1;
		} catch (e) {
			error('isMac', e);
		}
	};
	this.isLinux = function (){
		try{
			return self.navigator.platform.indexOf("Linux") != -1;
		} catch (e) {
			error('isLinux', e);
		}
	};

	var parts = req.headers.host.split(":"),
			queryparts = req.url.split("?"),
			query = queryparts.length > 1 ? queryparts[1] : queryparts[0],
			protocol = "http" + (req.connection.encrypted ? "s" : ""),
			cookies = (req.headers.cookie || "").split('; '),
			hash = "";

	for (var i = 0, len = cookies.length; i < len; i++) {
		if(cookies[i].contains("CRAYDENTHASH=")){
			hash = cookies[i].substring(13);
			break;
		}
	}

	this.location = this.$l = {
		hash: hash,
		host: req.headers.host,
		hostname: parts[0],
		href: protocol + "://" + req.headers.host + req.url + (hash && "#" + hash),
		method:req.headers.method,
		origin: protocol + "://" + req.headers.host,
		pathname: req.url,
		port: parts[1],
		protocol: protocol,
		search: query
	};
	this.navigator = {userAgent:req.headers['user-agent'],platform:req.headers['user-agent']};

	this.PAGE_NAME = (function () {
		var pn = self.$l.href.substring(self.$l.href.lastIndexOf('/') + 1).replace(/([^#^?]*).*/gi,'$1');
		return !pn || pn.indexOf('.') == -1 ? "index.html" : pn;
	})();
	this.PAGE_NAME_RAW = (function () {
		var pn = self.$l.href.substring(self.$l.href.lastIndexOf('/') + 1).replace(/(.*)?\?.*/gi,'$1');
		return !pn || pn.indexOf('.') == -1 ? "index.html" : pn;
	})();
	$c.DEBUG_MODE = $c.DEBUG_MODE || false;//!!$GET("debug", this.$l.href);
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
	this.LOCAL_IP =$c.LOCAL_IP;


	var _amay = self.isAmaya(),
			_bbery = self.isBlackBerry(),
			_chrm = self.ChromeVersion(),
			_droid = self.isAndroid(),
			_ff = self.FirefoxVersion(),
			_ie = self.IEVersion(),
			_gekk = self.isGecko(),
			_ifon = self.isIPhone(),
			_ipad = self.isIPad(),
			_ipod = self.isIPod(),
			_khtm = self.isKHTML(),
			_linx = self.isLinux(),
			_mac = self.isMac(),
			_op = self.OperaVersion(),
			_palm = self.isPalmOS(),
			_pres = self.isPresto(),
			_prin = self.isPrince(),
			_saf = self.SafariVersion(),
			_trid = self.isTrident(),
			_symb = self.isSymbian(),
			_webk = self.isWebkit(),
			_win = self.isWindows(),
			_winm = self.isWindowsMobile(),

			_browser = (_ie != -1 && 'Internet Explorer') || (_chrm != -1 && 'Chrome') || (_ff != -1 && 'Firefox') || (_saf != -1 && 'Safari'),
			_os = (_droid && 'Android') || (_bbery && 'BlackBerry') || (_linx && 'Linux') || ((_ipad || _ifon || _ipod) && 'iOS') || (_mac && 'Mac') || (_palm && 'PalmOS') || (_symb && 'Symbian') || (_win && 'Windows') || (_winm && 'Windows Mobile'),
			_device = (_droid && 'Android') || (_bbery && 'BlackBerry') || (_ipad && 'iPad') || (_ifon && 'iPhone') || (_ipod && 'iPod') || (_linx && 'Linux') || (_mac && 'Mac') || (_palm && 'PalmOS') || (_symb && 'Symbian') || (_win && 'Windows') || (_winm && 'Windows Mobile'),
			_engine = (_amay && 'Amaya') || (_gekk && 'Gekko') || (_khtm && 'KHTML') || (_pres && 'Presto') || (_prin && 'Prince') || (_trid && 'Trident') || (_webk && 'WebKit');
	this.browser = {
		CURRENT: _browser,
		CURRENT_VERSION:(_ie != -1 && _ie) || (_chrm != -1 && _chrm) || (_ff != -1 && _ff) || (_saf != -1 && _saf),
		IE:self.isIE(),
		IE_VERSION:_ie,
		IE6:(_ie < 7.0 && _ie >= 6.0),
		IE7:(_ie < 8.0 && _ie >= 7.0),
		IE8:(_ie < 9.0 && _ie >= 8.0),
		CHROME:self.isChrome(),
		CHROME_VERSION:_chrm,
		FIREFOX:self.isFirefox(),
		FIREFOX_VERSION:_ff,
		OPERA:self.isOpera(),
		OPERA_VERSION:_op,
		SAFARI:self.isSafari(),
		SAFARI_VERSION:_saf
	};
	this.client = {
		browser: _browser,
		device: _device,
		engine: _engine,
		os:_os
	};
	this.engine = {
		CURRENT:_engine,
		AMAYA:_amay,
		GEKKO:_gekk,
		KHTML:_khtm,
		PRESTO:_pres,
		PRINCE:_prin,
		TRIDENT:_trid,
		WEBKIT:_webk
	};
	this.os = {
		CURRENT:_os,
		ANDROID:_droid,
		BLACKBERRY:_bbery,
		LINUX:_linx,
		IOS:(_ipad || _ifon || _ipod),
		MAC:_mac,
		PALM:_palm,
		SYMBIAN:_symb,
		WINDOWS:_win,
		WINDOWS_MOBILE:_winm
	};
	this.device = {
		CURRENT:_device,
		ANDROID:_droid,
		BLACKBERRY:_bbery,
		IPAD:_ipad,
		IPHONE:_ifon,
		IPOD: _ipod,
		LINUX:_linx,
		MAC:_mac,
		PALM:_palm,
		SYMBIAN:_symb,
		WINDOWS:_win,
		WINDOWS_MOBILE:_winm
	};
	this.ANDROID = _droid;
	this.AMAYA = _amay;
	this.BLACKBERRY = _bbery;
	this.CHROME = self.isChrome();
	this.CHROME_VERSION = _chrm;
	this.FIREFOX = self.isFirefox();
	this.FIREFOX_VERSION = self.FirefoxVersion();
	this.FIREFOX = self.isFirefox();
	this.GEKKO = self.isGecko();
	this.IE = self.isIE();
	this.IE_VERSION = _ie;
	this.IE6 = (_ie < 7.0 && _ie >= 6.0);
	this.IE7 = (_ie < 8.0 && _ie >= 7.0);
	this.IE8 = (_ie < 9.0 && _ie >= 8.0);
	this.IPAD = self.isIPad();
	this.IPHONE = self.isIPhone();
	this.IPOD =  self.isIPod();
	this.KHTML = self.isKHTML();
	this.LINUX = self.isLinux();
	this.MAC = self.isMac();
	this.OPERA = self.isOpera();
	this.OPERA_VERSION = self.OperaVersion();

	this.PALM = self.isPalmOS();
	this.PRESTO = self.isPresto();
	this.PRINCE = self.isPrince();
	this.SAFARI = self.isSafari();
	this.SAFARI_VERSION = self.SafariVersion();
	this.SYMBIAN = self.isSymbian();
//    this.TEMPLATE_VARS = [];
	this.TRIDENT = self.isTrident();
	this.WEBKIT = self.isWebkit();
	this.WINDOWS = self.isWindows();
	this.WINDOWS_MOBILE = self.isWindowsMobile();

}
exports.createServer = function(callback, createServer) {
	var http = (createServer || require('http').createServer)(function(request, response) {
		var cray = new Craydent(request, response);

		$g.GarbageCollector = [];
		if (request.url == '/favicon.ico') {
			return;
		}
		if (request.method == 'POST') {

			request.on('data', function (data) {
				body += data;
				// 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
				if (body.length > 1e6) {
					// FLOOD ATTACK OR FAULTY CLIENT, NUKE REQUEST
					request.connection.destroy();
				}
			});
			request.on('end', function () {

				var POST = qs.parse(body);
				// use POST

			});
		}
		try {
			cray.echo.out = "";

			callback.call(cray, request, response);

			if (!cray.DEFER_END) {
				cray.end();
			}
		} catch(e) {
			throw e;
			logit(e);
			response.writeHead(500, header.headers);
			response.end();
		} finally {
//            echo.out = "";
//            $SESSION = {};
		}
	});
	http.loadBalance = function (ips) {
		var list = ips.isString() ? ips.split(',') : ips
		$c.BALANCE_SERVER_LIST = list;

		if (list.isArray()) {
			var ip, i = 0;
			while (ip = list[i++]) {
				if (!/^\d{1,3}\.\d{1,3}\.\d{1,3}.\d{1,3}$/.test(ip)) {
					break;
				}
				if (i == len) {
					return this;
				}
			}
		}
		throw "parameter must be a string or an array of ip addresses";
	};
	return http;
};
exports.Craydent = Craydent;

function __cleanUp() {
	try {
		delete $w.__current;
		delete $w.__thisVersion;
		delete $w.__thisIsNewer;
		delete $w.__isNewer;
		delete $w.__version;
		delete $w._ie;
		delete $w._droid;
		delete $w._amay;
		delete $w._browser;
		delete $w._os;
		delete $w._device;
		delete $w._engine;
	} catch(e) {
		$w.__current = undefined;
		$w.__thisVersion = undefined;
		$w.__thisIsNewer = undefined;
		$w.__isNewer = undefined;
		$w.__version = undefined;
		$w._ie = undefined;
		$w._droid = undefined;
		$w._amay = undefined;
		$w._browser = undefined;
		$w._os = undefined;
		$w._device = undefined;
		$w._engine = undefined;
	}
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
		var len = arguments.length;
		for(var a = 0; a<len; a++){
			if(!arguments[a]){
				return arguments[a - 1] || "";
			}
		}
		return arguments[len - 1];
	} catch (e) {
		error('fillTemplate.__and', e);
	}
}
function __andNotHelper (record, query, operands, index) {
	try {
		for (var i = 0, len = query.length; i < len; i++) {
			for (var prop in query[i]) {
				if (!query[i].hasOwnProperty(prop)) {
					continue;
				}
				if (!(prop in operands
						&& _subQuery(record, query[i][prop], prop, index)
						|| _subQuery(record, query[i][prop], "$equals", prop, index)
					)) {
					return false;
				}
			}
		}
		return true;
	} catch (e) {
		error('where.__andNotHelper', e);
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
		}
		if ($c.isObject(obj)) {
			for (var prop in obj) {
				if (obj.hasOwnProperty(prop)) {
					props.push(prop);
				}
			}
		}
		for (var i = 0, len = props.length; i < len; i++) {
			var pre = prePost[0].replace_all(['{ENUM_VAR}','{ENUM_VAL}'],[props[i],obj[props[i]]]),
				post = prePost[1].replace_all(['{ENUM_VAR}','{ENUM_VAL}'],[props[i],obj[props[i]]]);
			str += pre + props[i] + post + delimiter;
		}
		return str.slice(0,-1*delimiter.length);
	} catch (e) {
		error('fillTemplate.enum', e);
	}
}
function __logic_parser (code, obj, bind) {
	if (!code) {
		return "";
	}
	var ttc = $c.TEMPLATE_TAG_CONFIG, indexes = [], logic = {};
	code = code.replace_all(ttc.IGNORE_CHARS,['']);
	$c.eachProperty(ttc, function (value) {
		if (!value.begin) { return; }
		var index = code.indexOfAlt(value.begin);
		indexes.push(index);
		logic[index] = value;
	});
	var index = Math.min.apply(Math,indexes.condense([-1]));

	if (!logic[index]) { return code; }

	return code.substring(0,index) + logic[index].parser(code.substring(index),obj, bind);
}
function __or (){
	try {
		for(var a = 0, len = arguments.length; a<len; a++){
			if(arguments[a]){
				return arguments[a];
			}
		}
		return "";
	} catch (e) {
		error('fillTemplate.__or', e);
	}
}
function __processBlocks (start, end, code, lookups) {
	lookups = lookups || {};
	var blocks = [], sindexes = [], sindex = 0, eindexes = [], eindex = 0;
	while ((sindex = code.indexOfAlt(start, sindex)) != -1 && (eindex = code.indexOfAlt(end, eindex)) != -1) {
		sindex != -1 && (sindexes.push(sindex), sindex++);
		eindex != -1 && (eindexes.push(eindex), eindex++);
	}
	// if true syntax error, start end missmatch
	if (sindexes.length != eindexes.length) {
		blocks.push({id: uid, block: "", body:"", code: code});
		return blocks;
	}

	var  j, pairs = OrderedList([], function (a, b) {
		if (a.end < b.end) { return -1; }
		if (a.end > b.end) { return 1; }
		return 0;
	});

	j = 0;
	while (j < sindexes.length) {
		var e = 0;
		while (eindexes[0] > sindexes[e]) {
			e++;
		}
		e--;
		pairs.add({begin: sindexes[e], end: eindexes[0]});
		sindexes.removeAt(e);
		eindexes.removeAt(0);
	}



	var endlength = code.match(end)[0].length;
	for (var k = 0, len = pairs.size(); k < len; k++) {
		var uid = "##" + suid() + "##",
			block = code.slice(pairs[k].begin, pairs[k].end + endlength),
			beginLength = block.match(start)[0].length,
			body = code.slice(pairs[k].begin + beginLength, pairs[k].end);
		code = code.replace(block, uid);
		blocks.push({id: uid, block: block, body: body, code: code});
		lookups[uid] = block;

		for (var i = k + 1; i < len; i++) {
			var offset = block.length - uid.length;
			pairs[i].end -= offset;
			if (pairs[i].begin > pairs[k].end) {
				pairs[i].begin -= offset;
			}
		}
	}

	return blocks.reverse();
}
function __parseArithmeticExpr (doc,expr,field) {
	try {
		var value;
		switch (field) {
			case "$add":
				value = 0;
				for (var i = 0, len = expr["$add"].length; i < len; i++) {
					value += __processExpression(doc, expr["$add"][i]);
				}
				return value;
			case "$subtract":
				return __processExpression(doc, expr["$subtract"][0]) - __processExpression(doc, expr["$subtract"][1]);
			case "$multiply":
				value = 1;
				for (var i = 0, len = expr["$multiply"].length; i < len; i++) {
					value *= __processExpression(doc, expr["$multiply"][i]);
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
				return (__processExpression(doc, expr, field) || []).length;
		}
	} catch (e) {
		error('aggregate.__parseArrayExpr', e);
	}
}
function __parseBooleanExpr (doc,expr,field) {
	try {
		var arr = [];
		switch (field) {
			case "$and":
				arr = expr["$and"];
				for (var i = 0, len = arr.length; i < len; i++) {
					if (!__processExpression(doc, expr[i])) {
						return false;
					}
				}
				return true;
			case "$or":
				arr = expr["$or"];
				for (var i = 0, len = arr.length; i < len; i++) {
					if (__processExpression(doc, expr[i])) {
						return true;
					}
				}
				return false;
			case "$not":
				arr = expr["$not"];
				return !__processExpression(doc, expr[0]);
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
				RegExp],

			value1 = __processExpression(doc, expr[field][0]),
			value2 = __processExpression(doc, expr[field][1]),
			cmp = null;

		if (value1 == value2) { cmp = 0; }
		if (value1 < value2) { cmp = -1; }
		if (value1 > value2) { cmp = 1; }

		if (isNull(cmp)) {
			value1 = sortOrder.indexOf([null, undefined].contains(value1) ? value1 : value1.constructor);
			value2 = sortOrder.indexOf([null, undefined].contains(value2) ? value2 : value2.constructor);

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
		if (!$c.isObject(expr) || !expr['$cond']) {
			return expr;
		}
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
		//return [doc].where(boolExpression).length ? thenStatement : elseStatement;
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
				return isNull(value) ? __processExpression(doc, expr["$ifNull"][1]) : value;
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
				return dt.format(expr[field].format)
		}
	} catch (e) {
		error('aggregate.__parseDateExpr', e);
	}
}
function __parseSetExpr (doc,expr,field) {
	try {
		switch (field) {
			case "$setEquals":
				for (var i = 1, len = expr[field].length; i < len; i++) {
					var set1 = $c.duplicate(__processExpression(doc, expr[field][i - 1])),
						set2 = $c.duplicate(__processExpression(doc, expr[field][i]));
					if (!$c.isArray(set1) || !$c.isArray(set2)){
						//noinspection ExceptionCaughtLocallyJS
						throw "Exception: All operands of $setEquals must be arrays. One argument is of type: " +
						(typeof (!$c.isArray(set1) ? set1 : set2)).captialize();
					}
					set1.toSet();
					set2.toSet();
					if (set1.length != set2.length) { return false; }
					for (var j = 0, jlen = set1.length; j < jlen; j++) {
						if (!set2.contains(set1[j])) { return false; }
					}
				}
				return true;
			case "$setIntersection":
				var rtnSet = $c.duplicate(__processExpression(doc, expr[field][0])),
					errorMessage = "Exception: All operands of $setIntersection must be arrays. One argument is of type: ";
				if(!$c.isArray(rtnSet)) {
					//noinspection ExceptionCaughtLocallyJS
					throw errorMessage + (typeof rtnSet).captialize();
				}
				rtnSet.toSet();
				for (var i = 1, len = expr[field].length; i < len; i++) {
					var set1 = $c.duplicate(__processExpression(doc, expr[field][i]));
					if (!$c.isArray(set1)){
						//noinspection ExceptionCaughtLocallyJS
						throw errorMessage + + (typeof set1).captialize();
					}
					set1.toSet();
					if (set1.length < rtnSet.length) {
						var settmp = set1;
						set1 = rtnSet;
						rtnSet = settmp;
					}
					for (var j = 0; j < rtnSet.length; j++) {
						if (!set1.contains(rtnSet[j])) {
							rtnSet.removeAt(j);
							j--;
						}
					}
					if (!rtnSet.length) { return rtnSet; }
				}
				return rtnSet;
			case "$setUnion":
				var rtnSet = $c.duplicate(__processExpression(doc, expr[field][0])),
					errorMessage = "Exception: All operands of $setUnion must be arrays. One argument is of type: ";
				if(!$c.isArray(rtnSet)) {
					//noinspection ExceptionCaughtLocallyJS
					throw errorMessage + (typeof rtnSet).captialize();
				}
				//rtnSet.toSet();
				for (var i = 1, len = expr[field].length; i < len; i++) {
					var arr = $c.duplicate(__processExpression(doc, expr[field][i]));
					if (!$c.isArray(arr)){
						//noinspection ExceptionCaughtLocallyJS
						throw errorMessage + + (typeof arr).captialize();
					}
					rtnSet = rtnSet.concat(arr);
				}
				return rtnSet.toSet();
			case "$setDifference":
				var arr1 = $c.duplicate(__processExpression(doc, expr[field][0])),
					arr2 = $c.duplicate(__processExpression(doc, expr[field][1])),
					rtnSet = [];
				if (!$c.isArray(arr1) || !$c.isArray(arr2)){
					//noinspection ExceptionCaughtLocallyJS
					throw "Exception: All operands of $setEquals must be arrays. One argument is of type: " +
					(typeof (!$c.isArray(arr1) ? arr1 : arr2)).captialize();
				}
				for (var i = 0, len = arr1.length; i < len; i++) {
					var item = arr1[i];
					if (!arr2.contains(item) && !rtnSet.contains(item)) {
						rtnSet.push(item);
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
					(typeof (!$c.isArray(arr1) ? arr1 : arr2)).captialize();
				}
				return $c.isSubset(arr1,arr2);
			case "$anyElementTrue":
				var arr1 = $c.duplicate(__processExpression(doc, expr[field][0])),
					falseCondition = [undefined,null,0,false];

				for (var i = 0, len = arr1.length; i < len; i++) {
					var item = arr1[i];
					if (!falseCondition.contains(item)) {
						return true;
					}
				}
				return false;
			case "$allElementsTrue":
				var arr1 = $c.duplicate(__processExpression(doc, expr[field][0])),
					falseCondition = [undefined,null,0,false];

				for (var i = 0, len = arr1.length; i < len; i++) {
					var item = arr1[i];
					if (falseCondition.contains(item)) {
						return false;
					}
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
				var value = "";
				for (var i = 0, len = expr["$concat"].length; i < len; i++) {
					value += __processExpression(doc, expr["$concat"][i]);
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
				if (value1 == value2) {
					return 0;
				}
				if (value1 < value2) {
					return -1;
				}
				if (value1 > value2) {
					return 1;
				}
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
					if (!vars.hasOwnProperty(prop)) {
						continue;
					}
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
		var value = __processExpression(doc, accumulator["$sum"] || accumulator["$avg"] || accumulator["$first"] || accumulator["$last"] || accumulator["$max"] || accumulator["$min"] || accumulator["$push"] || accumulator["$addToSet"]);
		switch (true) {
			case !!accumulator["$sum"]:
				return value + (previousValue || 0);
			case !!accumulator["$avg"]:
				previousValue = previousValue || {n:0,avg:0};
				previousValue.avg = ((previousValue.avg / (previousValue.n || 1)) + value) / previousValue.n;
				if (meta.length == meta.index + 1) { previousValue = previousValue.avg; }
				return previousValue;
			case !!accumulator["$first"]:
				if(isNull(previousValue)) { previousValue = value; }
				return previousValue;
			case !!accumulator["$last"]:
				return value;
			case !!accumulator["$max"]:
				return Math.max(value, (previousValue || -9007199254740991));
			case !!accumulator["$min"]:
				return Math.min(value, (previousValue || 9007199254740991));
			case !!accumulator["$push"]:
				return (previousValue || []).push(value);
			case !!accumulator["$addToSet"]:
				previousValue = previousValue || [];
				if (!previousValue.contains(value)) { previousValue.push(value); }
				return previousValue;
		}
	} catch (e) {
		error('aggregate.__processAccumulator', e);
	}
}
function __processExpression (doc,expr) {
	try {
		if ($c.isString(expr)) {
			if (expr[0] == "$") {
				expr = expr.substr(1);
			}
			return $c.getProperty(doc, expr.replace("$CURRENT.", ""));
		} else if (!$c.isObject(expr)) {
			return expr;
		}
		for (var field in expr) {
			if (!expr.hasOwnProperty(field)) {
				continue;
			}
			var value = expr[field],
				literalKeys = ["$literal"],
				boolKeys = ["$and", "$or", "$not"],
				setKeys = ["$setEquals", "$setIntersection", "$setUnion", "$setDifference", "$setIsSubset", "$anyElementTrue", "$allElementsTrue"],
				compareKeys = ["$cmp", "$eq", "$gt", "$gte", "$lt", "$lte", "$ne"],
				arithmeticKeys = ["$add", "$subtract", "$multiply", "$divide", "$mod"],
				stringKeys = ["$concat", "$substr", "$toLower", "$toUpper", "$strcasecmp"],
			//searchKeys = ["meta"],
				arrayKeys = ["$size"],
				variableKeys = ["$map", "$let"],
				dateKeys = ["$dayOfYear", "$dayOfMonth", "$dayOfWeek", "$year", "$month", "$week", "$hour", "$minute", "$second", "$millisecond", "$dateToString"],
				conditionalKeys = ["$cond", "$ifNull"];
			//accumulatorKeys = ["$sum", "$avg", "$first", "$last", "$max", "$min", "$push", "$addToSet"];

			switch (true) {
				case literalKeys.contains(field):
					return expr;
				case boolKeys.contains(field):
					return __parseBooleanExpr(doc, expr, field);
				case setKeys.contains(field):
					return __parseSetExpr(doc, expr, field);
				case compareKeys.contains(field):
					return __parseComparisonExpr(doc, expr, field);
				case arithmeticKeys.contains(field):
					return __parseArithmeticExpr(doc, expr, field);
				case stringKeys.contains(field):
					return __parseStringExpr(doc, expr, field);
				//case searchKeys.contains(field):
				//    return __parseTextSearchExpr (doc,expr);
				case arrayKeys.contains(field):
					return __parseArrayExpr(doc, expr, field);
				case variableKeys.contains(field):
					return __parseVariableExpr(doc, expr, field);
				case dateKeys.contains(field):
					return __parseDateExpr(doc, expr, field);
				case conditionalKeys.contains(field):
					return __parseConditionalExpr(doc, expr, field);
				//case accumulatorKeys.contains(field):
				//    return __parseAccumulatorExpr(doc, expr, field);
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
		var _ids = expr._id, doc, i = 0, groupings = {}, results = [], meta = {index:0,length:docs.length/*,stop:false*/};
		//while(doc = docs[i++]) {
		for (var i = 0, len = docs.length; i < len; i++,meta.index = i) {
			var doc = docs[i],result, key = "null", keys;
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
				result[prop] = __processAccumulator(doc, expr[prop],result[prop], meta);
				//if (meta.stop) { break; }
			}
		}
		return results;
	} catch (e) {
		error('aggregate.__processGroup', e);
	}
}
function __processStage(docs, stage) {
	try {
		var operator = "", value = {};
		for (var opts in stage) {
			if (!stage.hasOwnProperty(opts)) {
				continue;
			}
			if (operator) {
				//noinspection ExceptionCaughtLocallyJS
				throw "Exception: A pipeline stage specification object must contain exactly one field.";
			}
			operator = opts;
			value = stage[opts];
		}
		switch (opts) {
			case "$project":
				for (var i = 0, len = docs.length; i < len; i++) {
					var doc = {};
					for (var prop in value) {
						if (!value.hasOwnProperty(prop)) {
							continue;
						}
						if ($c.parseBoolean(value[prop])) {
							doc[prop] = docs[i];
						} else {
							doc[prop] = __processExpression(docs[i], value[prop]);
						}
					}
					docs.replaceAt(i, doc);
				}
				return docs.where({}, value);
			case "$match":
				return docs.where(value);
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
					if (value[prop] == -1) {
						pre = "!";
					}
					sorter.push(pre+prop);
				}
				return docs.sortBy(sorter);
			//case "$geoNear":
			//    break;
			case "$out":
				var rtnDocs = $c.duplicate(docs,true);
				if ($c.isString(value)) {
					$w[value] = rtnDocs;
				} else if ($c.isArray(value)) {
					value.removeAll();
					$c.merge(value,rtnDocs);
				}
				return rtnDocs;
		}
		return docs;
	} catch (e) {
		error('aggregate.__processStage', e);
	}
}
function __run_replace (reg, template, use_run, obj) {
	try {
		var pre = "", post = "", split_param = "|", match;
		//noinspection CommaExpressionJS
		use_run && (pre="RUN[",post="]", split_param=/;(?!\\)/);

		while ((match = reg.exec(template)) && match[1]) {
			var funcValue = [],
				func = "";

			funcValue = match[1].replace_all(['\\[','\\]'],['[',']']).split(split_param);
			while (funcValue[0].count("{") != funcValue[0].count("}")) {
				funcValue[0]+= funcValue[1]+($c.isString(split_param)?split_param:";");
				funcValue.splice(1,1);
			}
			func = funcValue.splice(0,1)[0].strip(";");

			for (var i = 0, len = funcValue.length; i < len; i++) {
				if (funcValue[i].contains("${")) {
					funcValue[i] = fillTemplate(funcValue[i], obj);
				}
				try {
					funcValue[i] = eval("(" + funcValue[i].replace_all([';\\'], [';']) + ")");
				} catch (e) {}
			}

			template = template.contains(match[1]) ? template.replace(match[1], (match[1] = match[1].replace_all(['\\[', '\\]'], ['[', ']']))) : template;
			template = template.replace_all("${" + pre + match[1] + post +"}",
				$w.getProperty(func) ? $w.getProperty(func).apply(obj, funcValue) : (tryEval("("+func+")")||foo)() || "");
		}
		return template;
	} catch (e) {
		error('fillTemplate.__run_replace', e);
	}
}

function _ajaxServerResponse(response) {
	try {
		if (response.readyState == 4 && response.status==200) {

			var objResponse = {};
			try {
				objResponse = eval(response.responseText.trim());
			} catch (e) {
				objResponse = eval("(" + response.responseText.trim() + ")");
			}
			if (!objResponse || objResponse.hasErrors) {
				return false;
			}
			return objResponse;
		}
		return false;
	} catch (e) {
		error("ajax._ajaxServerResponse", e);
		return false;
	}
}
function _condense (obj, check_values) {
	try {
		var skip = [], arr = [], without = false;
		if (check_values && check_values.constructor == Array) {
			without = true;
		}
		for (var i = 0, len = obj.length; i < len; i++) {
			if (check_values) {
				var index = i;
				if (without && check_values.contains(obj[i])) {
					skip.push(i);
					continue;
				}
				if (skip.indexOf(i) != -1) {
					continue;
				}
				while ((index = obj.indexOf(obj[i],index+1)) != -1) {
					skip.push(index);
				}

			}
			obj[i] != "" && !isNull(obj[i]) && (skip.indexOf && skip.indexOf(i) || _indexOf(skip, i)) == -1 && !isNull(obj[i]) && arr.push(obj[i]);
		}
		return arr;
	} catch (e) {
		error("_condence", e);
		return false;
	}
}
function _copyWithProjection(projection, record) {
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
		for (var i = 0; i < len; i++) {
			projection[arr[i]] = 1;
		}
	}
	for (var prop in projection) {
		if (projection.has(prop)) {
			if (prop == "*") {
				copy = $c.duplicate(record);
			} else if (record[prop] && !$c.isArray(record[prop])) {
				copy[prop] = record[prop];
			} else if (record[prop]) {
				var del = true;
				if (prop.slice(-2) == ".$") {
					prop = prop.slice(0,-2);
					copy[prop] = record[prop].slice(0,1);
				} else if (projection[prop]['$elemMatch']) {
					copy[prop] = record[prop].where(projection[prop]['$elemMatch']).slice(0,1);
				} else if (projection[prop]['$slice']) {
					var start = 0, length = $c.isInt(projection[prop]['$slice']) ? projection[prop]['$slice'] : 0;

					if ($c.isArray(projection[prop]['$slice'])) {
						start = projection[prop]['$slice'][0];
						length = projection[prop]['$slice'][1];
					}
					copy[prop] = record[prop].slice(start, length);
				} else if (projection[prop]) {
					del = false;
					copy[prop] = record[prop];
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
			fstr = func.toString().replace(/this/g,'obj'),
			exec = "",

		// extra code to account for when this == window
			extra_code = "if(isNull(obj) && this == $c){return;}",
			fnew = args.length === 0 || (args.length === 1 && !_trim(args[0])) ?
				//    fstr.toString().replace(/(\(\s*?\)\s*?\{)/, ' ' + name + '(obj){'+extra_code) :
				fstr.toString().replace(/(\(\s*?\)\s*?\{)/, ' (obj){'+extra_code) :
			"(" + fstr.toString().replace(/\((.*?)\)\s*?\{/, '(obj,$1){'+extra_code) + ")";

		if (!override && eval("typeof("+name+")") !== "undefined") {
			eval("$c."+name+" = "+fnew);
			return;
		}
		eval("$c."+name+" = "+fnew);
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
		var ref = arguments[argIndex] || {objects:[{obj:original,path:"this"}]},
			current_path = arguments[argIndex+1] || "this";
		(arguments[argIndex+2] || (arguments[argIndex+2] = {})) && (arguments[argIndex+2].command = arguments[argIndex+2].command || "");
		if (!(ref.objects.length == 1)) {
			for (var prop in obj){
				if (obj.hasOwnProperty(prop)) {
					delete obj[prop];
				}
			}
		}
		var loop_func = function (prop, original) {
			if (original.hasOwnProperty(prop) && original[prop] && (!$c.isFunction(original[prop]) || !recursive)) {
				var index = ref.objects.indexOfAlt(original[prop],function(obj,value){
						return obj.obj===value;
					}),
					new_path = current_path+"["+parseRaw(prop)+"]";

				if (index != -1) {
					arguments[argIndex+1].command += new_path + "="+ref.objects[index].path+";";
					return;
				}

				if (typeof(original[prop]) == "object" && recursive) {
					obj[prop] = typeof(original[prop].constructor) == "function" ? new original[prop].constructor() : {};
					ref.objects.push({obj:original[prop],path:new_path});
					_duplicate(obj[prop], original[prop], true, ref, new_path, arguments[argIndex+1]);
					return;
				}
			} else if (!original.hasOwnProperty(prop)) {
				return;
			}
			obj[prop] = original[prop];
		};
		if ($c.isArray(original)) {
			for (var i = 0, len = original.length; i < len; i++){
				loop_func.call(obj, i, original, ref, current_path, arguments[argIndex+2]);
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
function _endsWith (/*str, str1*/) {
	/*|{
		"info": "String class extension to check if the string ends with the given string",
		"category": "String",
		"parameters":[
			{"infinite": "any number of arguments can be passed"}],

		"overloads":[],

		"description": "http://www.craydent.com/library/1.8.0/docs#string.endsWith",
		"returnType": "(Bool)"
	}|*/
	try {
		for (var i = 0, len = arguments.length; i < len; i++) {
			if (arguments[i] == this) {
				continue;
			}
			if (arguments[i] == this.slice(-arguments[i].length)) {
				return arguments[i];
			}
		}
		return false;
	} catch (e) {
		error('String.endsWith', e);
	}
}
function _ext (cls, property, func, override) {
	try {
		cls['prototype'][property] = cls['prototype'][property] || func;
		_df(property, func, override);
	} catch (e) {
		error('_ext', e);
	}
}
function _even (num) {
	try {
		if (isNaN(num)) {
			return false;
		}
		//noinspection JSBitwiseOperatorUsage
		return !(num&1);
	} catch (e) {
		error('_even', e);
	}
}

function _getBrowserVersion(browser){
	try {
		var index = self.navigator.userAgent.indexOf(browser);
		if (index == -1 && self["is"+browser]()) return -1;
		return parseFloat(self.navigator.userAgent.substring(index+browser.length+1));
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
		return this.getHours() - 24 - this.getUTCHours();
	} catch (e) {
		error('_getGMTOffset', e);
	}
}
function _groupFieldHelper (obj, fields) {
	var prop = "";
	for (var j = 0, jlen = fields.length; j < jlen; j++) {
		prop += fields[j] + ":" + obj[fields[j]] + ",";
	}
	return prop;
}
function _indexOf (obj, value) {
	try {
		var len = obj.length,
			i = 0;
		while (i < len) {
			if (obj[i] === value) return i;
			++i;
		}
		return -1;
	} catch (e) {
		error("_indexOf", e);
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
function _joinHelper (obj, arr, on, exclusive) {
	var records = [], propRef = [], objRef = arr[0] || {};

	if ($c.isString(on)) {
		on = on.split('=');
		if (on.length == 1) {
			on = [on,on];
		}
		var name = arguments.callee.caller.getName();
		on = on.trim();
		name == "joinRight" && (on = [on[1],on[0]]);
	}

	for (var prop in objRef) {
		if (objRef.hasOwnProperty(prop)) {
			propRef.push(prop);
		}
	}
	for (var i = 0, len = obj.length; i < len; i++)  {
		var record = $c.copyObject(obj[i]), query = {},results;
		query[on[1]] = record[on[0]];
		results = arr.where(query);
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
		if (sorter(value, arr[0]) == -1) { return 0; }
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
		var index = clause.indexOfAlt(/between/i);
		if (index != -1) { // contains between predicate
			//replace AND in the between to prevent confusion for AND clause separator
			clause.replace(/between( .*? )and( .*?)( |$)/gi,'between$1&and$2$3');
		}

		var ORs = clause.split(/ or /i), query = {"$or":[]};
		for (var i = 0, len = ORs.length; i < len; i++) {
			var ANDs = ORs[i].split(/ and /i),
				aquery = {'$and':[]};
			for (var j = 0, jlen = ANDs.length; j < jlen; j++) {
				var predicateClause = ANDs[j],
					cond = {};

				//=, <>, >, >=, <, <=, IN, BETWEEN, LIKE, IS NULL or IS NOT NULL
				switch (true) {
					case (index = predicateClause.indexOf('=')) != -1 :
						cond[predicateClause.substring(0, index).trim()] = {'$equals':tryEval(predicateClause.substring(index + 1).trim())};
						aquery['$and'].push(cond);
						break;
					case (index = predicateClause.indexOf('<>')) != -1 :
						cond[predicateClause.substring(0, index).trim()] = {'$ne':tryEval(predicateClause.substring(index + 1).trim())};
						aquery['$and'].push(cond);
						break;
					case (index = predicateClause.indexOf('>')) != -1 :
						cond[predicateClause.substring(0, index).trim()] = {'$gt':tryEval(predicateClause.substring(index + 1).trim())};
						aquery['$and'].push(cond);
						break;
					case (index = predicateClause.indexOf('>=')) != -1 :
						cond[predicateClause.substring(0, index).trim()] = {'$gte':tryEval(predicateClause.substring(index + 1).trim())};
						aquery['$and'].push({'$gte':cond});
						break;
					case (index = predicateClause.indexOf('<')) != -1 :
						cond[predicateClause.substring(0, index).trim()] = {'$lt':tryEval(predicateClause.substring(index + 1).trim())};
						aquery['$and'].push(cond);
						break;
					case (index = predicateClause.indexOf('<=')) != -1 :
						cond[predicateClause.substring(0, index).trim()] = {'$lte':tryEval(predicateClause.substring(index + 1).trim())};
						aquery['$and'].push(cond);
						break;
					case predicateClause.indexOfAlt(/between/i) == 0 :
						var nums = predicateClause.replace(/between (.*?) &and (.*?) ( |$)/i,'$1,$2').split(',');
						aquery['$and'].push({'$gte':tryEval(nums[0])});
						aquery['$and'].push({'$lte':tryEval(nums[1])});
						break;
					case (index = predicateClause.indexOfAlt(/ in /i)) != -1 :
						var _in = tryEval(predicateClause.substring(index + 4).trim().replace(/\((.*)\)/,'[$1]'));
						if (!_in) {
							//noinspection ExceptionCaughtLocallyJS
							throw "Invalid syntax near 'in'";
						}
						cond[predicateClause.substring(0, index).trim()] = _in;
						aquery['$and'].push({'$in':cond});
						break;
					case (index = predicateClause.indexOfAlt(/is null/i)) != -1 :
						cond[predicateClause.substring(0, index).trim()] = null;
						aquery['$and'].push({'$equals':cond});
						break;
					case (index = predicateClause.indexOfAlt(/is not null/i)) != -1 :
						cond[predicateClause.substring(0, index).trim()] = null;
						aquery['$and'].push({'$ne':cond});
						break;
					case (index = predicateClause.indexOfAlt(/ like /i)) != -1 :
						var likeVal = "^" + _trim(predicateClause.substring(index + 6),null,[' ', "'", '"']).replace_all("%",".*?") + "$";
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
		var result = [];
		for (var i = 0, len = docs.length; i < len; i++) {
			var doc = docs[i], action = __parseCond(doc, expr);
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
				//return undefined;
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
		if (!$c.isArray(replace) && !$c.isArray(subject)) {
			replace = [replace];
			subject = [subject];
		}
		var str = this;
		for (var i = 0, len = replace.length; i < len; i++)
		{
			var reg = new RegExp(__convert_regex_safe(replace[i]), flag)
			if (!str.contains(reg)) {
				continue;
			}
			str = str.replace(reg, subject[i] || subject[0]);
		}
		return str.toString();
	} catch (e) {
		error("_replace_all", e);
	}
}
function _run_func_array(funcs, args) {
	try {
		!$c.isArray(funcs) && (funcs = [funcs]);
		for (var i = 0, len = funcs.length; i < len; i++) {
			funcs[i].apply(this, args);
		}
	} catch (e) {
		error("_run_func_array", e);
	}
}
function _startsWith (/*str, str1*/) {
	/*|{
		"info": "String class extension to check if the string starts with the given string",
		"category": "String",
		"parameters":[
			{"infinite": "any number of arguments can be passed"}],

		"overloads":[],

		"description": "http://www.craydent.com/library/1.8.0/docs#string.startsWith",
		"returnType": "(Bool)"
	}|*/
	try {
		for (var i = 0, len = arguments.length; i < len; i++) {
			if (arguments[i] == this) {
				continue;
			}
			if (arguments[i] == this.slice(0, arguments[i].length)) {
				return arguments[i];
			}
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
		if (!$c.isObject(obj)) {
			return false;
		}

		for (var prop in obj) {
			if (!obj.hasOwnProperty(prop)) { continue; }
			if (prop in operands) {
				return prop;
			}
		}
		return false;
	} catch (e) {
		error('_subFieldHelper', e);
	}
}
function _subQuery(record, query, operator, field, index) {
	try {
		if (isNull(index)) {
			index = field;
			field = null;
		}
		var operands = {
				"$or":1,
				"$and":1,
				"$in":1,
				"$nin":1,
				"$regex":1,
				"$gt":1,
				"$lt":1,
				"$gte":1,
				"$lte":1,
				"$exists":1,
				"$equals":1,
				"$ne":1,
				"$nor":1,
				"$type":1,
				"$text":1,
				"$mod":1,
				"$all":1,
				"$size":1,
				"$where":1,
				"$elemMatch":1,
				"$not":1},
			value = $c.getProperty(record, field || ""),
			opt = operator,
			rtn = false;

		// prep multiple subqueries
		for (var prop in query) {
			if (query.hasOwnProperty(prop) && prop in operands) {
				if(!$c.isArray(opt)) {
					opt = [];
				}
				opt.push(prop);
			}
		}

		if (!$c.isArray(opt)) {
			opt = [opt];
		}

		for (var i = 0, len = opt.length; i < len; i++) {
			if (!rtn && i > 0) {
				return rtn;
			}
			switch(opt[i]) {
				// value is the record in the array
				// q is the conditional value
				case "$equals":
					if (isNull(query) || isNull(value)) {
						return false;
					}
					var q = $c.getValue(query.hasOwnProperty("$equals") ? query['$equals'] : query);

					rtn = $c.isRegExp(q) ? q.test(value) :
						($c.isFunction(q) ? q(record, field, index) : value == q);
					break;

				case "$ne":
					if (isNull(query) || isNull(value)) {
						return false;
					}
					var q = query['$ne'];
					rtn = !($c.isRegExp(q) ? q.test(value) : value == q);
					break;

				case "$lt":
					if (isNull(value)) {
						return false;
					}
					rtn = value < query['$lt'];
					break;

				case "$lte":
					if (isNull(value)) {
						return false;
					}
					rtn = value <= query['$lte'];
					break;
				case "$gt":
					if (isNull(value)) {
						return false;
					}
					rtn = value > query['$gt'];
					break;
				case "$gte":
					if (isNull(value)) {
						return false;
					}
					rtn = value >= query['$gte'];
					break;
				case "$nor":
					for(var i = 0, len = query.length; i < len; i++) {
						if (_subQuery(record,[query[i]],'$or',field, index)) {
							return false;
						}
					}
					rtn = true;
					break;
				case "$regex":
					if (isNull(value)) {
						return false;
					}
					rtn = query["$regex"].test(value);
					break;
				case "$exists":
					var finished = {validPath:0};
					$c.getProperty(record, field,".",finished);
					rtn = finished.validPath == query["$exists"];
					break;
				case "$type":
					if (isNull(value) && isNull(query) || !isNull(value) && value.constructor == query) {
						//                        return true;
						rtn = true;
						break;
					}
					return false;
					break;
				case "$text":
					//return record.getProperty(field).contains(query['$search']);
					break;
				case "$mod":
					if (!$c.isArray(query) || isNull(value)) {
						return false;
					}
					rtn = value % query[0] == query[1];
					break;
				case "$all":
					if (!$c.isArray(value) || !$c.isArray(query)) {
						return false;
					}
					for (var i = 0, len = query.length; i < len; i++) {
						if (!$c.contains(value, query[i])) {
							return false;
						}
					}
					rtn = true;
					break;
				case "$size":
					var val = parseInt(query);
					if (!$c.isArray(value) || !val && val !== 0) {
						return false;
					}
					rtn = value.length == val;
					break;
				case "$where":
					rtn = $c.isFunction(query) ? query.call(record) : tryEval.call(record, "(function(){"+query+"}).call(this)");
					break;
				case "$elemMatch":
					//query = { student: "Jane", grade: { $gt: 85 } } } };
					if (!$c.isArray(value)) {
						return false;
					}
					for (var i = 0, brk = false, len = value.length; i < len && !brk; i++) {
						var obj = value[i],
							val, operand;
						for (var prop in query) {
							if (!query.hasOwnProperty(prop)) {
								continue;
							}
							if ($c.isObject(query[prop])) {
								val = [query[prop]];
								operand = "$or";
							} else {
								val = query[prop];
								operand = "$equals";
							}
							if (_subQuery(record, val, operand, prop, index)) {
								brk = true;
								break;
								//                                return true;
							}
						}
					}
					rtn = brk;
					break;
				case "$or":
					if (!$c.isArray(query)) {
						return false;
					}
					var satisfied = false;
					for (var i = 0, len = query.length; i < len && !satisfied; i++) {
						for (var prop in query[i]) {
							if (!query[i].hasOwnProperty(prop)) {
								continue;
							}
							var subprop = _subFieldHelper(query[i][prop], operands);
							if (!(satisfied = prop in operands?
									_subQuery(record, query[i][prop], prop, index) :
									(subprop ? _subQuery(record, query[i][prop], subprop, prop, index) :
										_subQuery(record, query[i][prop], "$equals", prop, index)))) {
								break;
							}
						}
					}
					rtn = satisfied;
					break;
				case "$and":
					rtn = __andNotHelper (record, query, operands, index);
					break;
				case "$not":
					if ($c.isObject(query)) {
						rtn = !__andNotHelper (record, query, operands, index);
						break;
					}
					rtn = $c.isRegExp(query) ? query.test(value) : value == query;
					break;


				case "$in":
				case "$nin":
					var isNIN = operator == "$nin";
					rtn = isNIN;
					for (var fieldProp in query) {
						if (!query.hasOwnProperty(fieldProp)) {
							continue;
						}
						value = $c.getProperty(record, field);
						for (var k = 0, klen = query[fieldProp].length; k < klen; k++) {
							var isRegex = $c.isRegExp(query[fieldProp][k] && query[fieldProp][k]); //array of values
							if (($c.isArray(value) && value.contains(query[fieldProp][k]))
								|| (isRegex ? query[fieldProp][k].test(value) : value == query[fieldProp][k])) {
								rtn = true;
								if (isNIN) {
									return !rtn;
								}
								break;
							}
						}
						break;
					}
					break;
			}
		}
		return rtn;
	} catch (e) {
		error('_subQuery', e);
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
				trimChars = eval('({"'+characters+'":1})');
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
		var results = [], doc, i = 0;
		while (doc = docs[i++]) {
			var arr = __processExpression(doc, path);
			if (isNull(arr) || $c.isArray(arr) && arr.isEmpty()) {
				continue;
			} else if (!$c.isArray(arr)) {
				//noinspection ExceptionCaughtLocallyJS
				throw "Exception: Value at end of $unwind field path '"+path+"' must be an Array, but is a " + (typeof arr).capitalize() +".";
			}
			for (var j = 0, jlen = arr.length; j < jlen; j++) {
				var dup = $c.duplicate(doc);
				$c.setProperty(dup, path, arr[j]);
				results.push(dup);
			}
		}
		return results;
	} catch (e) {
		error('aggregate._unwind', e);
	}
}
function _whereHelper(objs,condition,callback) {
	var returnAll = true;
	for (var prop in condition) {
		if (condition.hasOwnProperty(prop)) {
			returnAll = false;
			break;
		}
	}
	// if sql syntax convert to mongo object syntax
	if ($c.isString(condition) && condition) {
		condition = _processClause(condition);
		returnAll = false;
	}


	for (var i = 0, len = objs.length; i < len; i++) {
		if (returnAll || _subQuery(objs[i], [condition],'$or', i)) {
			if(!callback.call(objs, objs[i], i)) {
				break;
			}
		}
	}
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

		"description": "http://www.craydent.com/library/1.8.0/docs#addObjectPrototype",
		"returnType": "(void)"
	}|*/
	try {
		var shouldOverride = false;
		if (eval("typeof("+name+")") == "undefined") {
			shouldOverride = true;
		}
		(!override && Object.prototype[name]) || Object.defineProperty(Object.prototype, name, {
			writable: true,
			enumerable: false,
			configurable: true,
			value: fn
		});
		override = shouldOverride;

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
	_df(name, fn, override);
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

		"description": "http://www.craydent.com/library/1.8.0/docs#Benchmarker",
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

		"description": "http://www.craydent.com/library/1.8.0/docs#Cursor",
		"returnType": "(Cursor)"
	}|*/
	try {
		var props = [],
			currentIndex = 0,
			arr = $c.copyObject(records || []);
		if ($c.isObject(arr)) {
			for (var prop in arr) {
				if (!arr.hasOwnProperty(prop)) { continue; }
				props.push(prop);
			}
			props.sort();
		} else if ($c.isArray(arr)) {
			for (var i = 0, len = arr.length; i < len; i++) {
				props.push(i);
			}
		}
		arr.hasNext = function () { return currentIndex <  props.length; };
		arr.next = function () {
			this.current = this[props[currentIndex]];
			return {value:this[props[currentIndex++]], done:currentIndex >= this.size()};
		};
		arr.reset = function () { currentIndex = 0; };
		arr.setIndex = function (value) { currentIndex = parseInt(value) || 0; };
		arr.current = arr[props[currentIndex]];

		arr.size = function () { return isNull(this.length) ? $c.itemCount(this) : this.length; };
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

		"description": "http://www.craydent.com/library/1.8.0/docs#OrderedList",
		"returnType": "(OrderedList)"
	}|*/
	try {
		sorter = sorter || function(a,b){if (a < b) {return -1;}if (a > b) {return 1;}return 0;};
		var arr = $c.copyObject(records || []).sort(sorter), nextIndex = 0;
		arr.add = function(value){
			if (!this.length) { return this.push(value); }
			var index = _orderListHelper(value, sorter, this);
			return this.insertBefore(index, value);
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

		"description": "http://www.craydent.com/library/1.8.0/docs#Queue",
		"returnType": "(Queue)"
	}|*/
	try {
		var arr = $c.copyObject(records || []), nextIndex = 0;
		arr.enqueue = function(value){
			this.push(value);
		};
		arr.dequeue = function(){
			return this.slice(0,1);
		};
		arr.next = function () {
			return {value:this[nextIndex++], done:nextIndex >= this.size()};
		};
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

		"description": "http://www.craydent.com/library/1.8.0/docs#Set",
		"returnType": "(Set)"
	}|*/
	try {
		var arr = $c.copyObject(records || []), nextIndex = 0;
		arr.add = function(value){
			if (!this.contains(value)) {
				return !!arr.push(value);
			}
			return false;
		};
		arr.clear = arr.removeAll;
		arr.clean = arr.toSet;
		arr.next = function () {
			return {value:this[nextIndex++], done:nextIndex >= this.size()};
		};
		arr.hasNext = function () { return nextIndex < this.size(); };
		arr.size = function(){return this.length;};
		arr.clean();
		return arr;
	} catch (e) {
		error('Set', e);
	}
}


/*----------------------------------------------------------------------------------------------------------------
 /-	Ajax operations
 /---------------------------------------------------------------------------------------------------------------*/
function ajax(params){
	/*|{
		"info": "Method to make ajax calls",
		"category": "Global",
		"parameters":[
			{"params": "(Object) specs with common properties:<br />(String) url<br />(String) dataType<br />(Mixed) hitch<br />(Function[]) onerror<br />(Function[])onsuccess"}],

		"overloads":[],

		"description": "http://www.craydent.com/library/1.8.0/docs#ajax",
		"returnType": "(void)"
	}|*/
	try {
		var need_to_shard = false, browser_url_limit = 1500, query, url, rtn;
		params.dataType = params.dataType || 'json';
		params.hitch = params.hitch || "";
		params.oncomplete = params.oncomplete || foo;
		params.onbefore = params.onbefore || foo;
		params.onerror = params.onerror || params.onresponse || foo;
		params.onsuccess = params.onsuccess || params.onresponse || foo;
		params.query = params.data || params.query || "";
		params.jsonp = (params.jsonp || "callback") + "=";
		// commented line below is a valid parameter value
		/*
		 params.shard_data = params.shard_data;
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
		 params.onerror = params.onerror;
		 params.onresponse = params.onresponse;
		 params.onsuccess = params.onsuccess;
		 params.onloadstart = params.onloadstart;
		 params.run = params.run;
		 params.jsonp = params.jsonp;
		 params.jsonpCallback = params.jsonpCallback
		 */
		params.thiss = this;
		params.url = params.url || "";

		if (params.dataType.toLowerCase() == 'jsonp') {
			var head = $d.getElementsByTagName('head')[0],
				func = params.jsonpCallback || '_cjson' + Math.floor(Math.random() * 1000000),
				insert = 'insertBefore',
				tag = $d.createElement('script');
			while (!params.jsonpCallback && $w[func]) {
				func = '_cjson' + Math.floor(Math.random() * 1000000);
			}
			params.jsonpCallback && (params.onsuccess = $w[func]);
			$w[func] = function (data) {
				if (params.query) {
					var thiss = params.thiss;
					delete params.thiss;
					ajax.call(thiss, params);
				} else {
					(!data.hasErrors &&
					(_run_func_array.call((params.context||params.thiss),params.onsuccess, [data, params.hitch, params.thiss, params.context]) || true)) ||
					_run_func_array.call((params.context||params.thiss),params.onerror,[data, params.hitch, params.thiss, params.context]);

					_run_func_array.call((params.context||this),params.oncomplete);
					if (params.jsonpCallback) {
						$w[func] = params.onsuccess;
					} else {
						try { delete $w[func] } catch(e){ $w[func] = undefined; }
					}
				}
			};
			if (params.shard_data && params.query && !$c.isObject(params.query) && params.query.length > browser_url_limit) {
				need_to_shard = true;
				var query_parts = params.query;
				params.query = {};
				query_parts = query_parts.indexOf('?') == 0 ? query_parts.substr(1) : query_parts;
				query_parts = query_parts.split("&");
				// params.query now has the object representation of the query
				query_parts.map(function(str){
					var name_value = str.split('=');
					this[encodeURIComponent(name_value[0])] = encodeURIComponent(name_value[1]);
				},params.query);
			} else if (params.query && $c.isObject(params.query)) {
				query = $c.toStringAlt(params.query, '=', '&',true);
				if (query.length > browser_url_limit) {
					need_to_shard = true;
				} else {
					params.query = query;
				}
			}

			// if need_to_shard is true then params.query is an object
			// and if if need_to_shard is false, params.query is a string ready by sent
			query = params.query;
			url = params.url;
			if (need_to_shard) {
				params.__FIRST = isNull(params.__FIRST);
				params.__EOF = true;
				query = "&EOQ=false";
				for (var prop in params.query) {
					if ((query + prop +"xxx").length > browser_url_limit) {
						break;
					}
					query += '&' + encodeURIComponent(prop) + "=" + encodeURIComponent(params.query[prop]);
					if (query.length > browser_url_limit) {
						var left_over = query.substr(browser_url_limit);
						query = query.substr(0, browser_url_limit);
						params.query[prop] = left_over;
						break;
					}
					delete params.query[prop];
				}
			} else {
				params.__EOF && (params.__EOF = "true");
				delete params.query;
			}
			query = (params.run ? "&run=" + params.run :"") +
				(query || "") +
				((params.__EOF && params.__EOF === "true" && ("&EOQ=true")) || "") +
				((params.__FIRST && ("&FIRST=true")) || "");
			url += (params.url.indexOf('?') != -1 ? "&" : "?") + (params.jsonp || "callback=") + func + (query || "");

			tag['type'] = "text/javascript";
			tag.async = "async";
			tag['src'] = url;

			// Attach handlers for all browsers
			tag.onload = tag.onreadystatechange = function(ev) {
				try {
					if (!this.readyState || /complete|loaded/.test( this.readyState.toString() ) ) {
						// Handle memory leak in IE
						this.onload = this.onreadystatechange = null;

						// Remove the script
						if ( head && this.parentNode && IEVersion () == -1) {
							head.removeChild( this );
						}
					}
				} catch (e) {
					error('ajax.tag.statechange', e);
				}
			};
			_run_func_array.call((params.context||this),params.onbefore, [tag, this]);
			head[insert](tag, head.firstChild);
			rtn = tag;
		} else {
			var httpRequest = new Request(),
				fileUpload = httpRequest.upload || {};
			params.method = params.method || "POST";
			params.headers = params.headers || [];

			if (params.query && $c.isObject(params.query)) {
				params.query = $c.toStringAlt(params.query, '=', '&', true);
			}
			params.query = (params.run ? "run=" + params.run :"") + (params.query || "");
			params.contentType = params.contentType || "application/x-www-form-urlencoded";
			params.onstatechange = params.onstatechange || foo;

			fileUpload.onload = params.onfileload || foo;
			fileUpload.onprogress = params.onprogress || foo;
			fileUpload.onabort = params.onabort || foo;
			fileUpload.onerror = params.onerror || foo;
			fileUpload.onloadstart = params.onloadstart || foo;

			if (params.method == "GET") {
				params.url += params.query ? "?" + params.query : "";
				params.query = undefined;
			}
			_run_func_array.call((params.context||this),params.onbefore, [httpRequest, this]);
			httpRequest.onreadystatechange = function (xp) {
				params.onstatechange(xp);
				var data = _ajaxServerResponse(this);
				if (data) {
					_run_func_array.call((params.context||this),params.onsuccess, [data, params.hitch, params.thiss, params.context, this.status]);
				} else if (this.readyState == 4) {
					try {
						_run_func_array.call((params.context||this),params.onerror, [eval(this.responseText), params.hitch, params.thiss, params.context, this.status]);
					} catch (e) {
						_run_func_array.call((params.context||this),params.onerror, [this.responseText, params.hitch, params.thiss, params.context, this.status]);
					}
				}
				_run_func_array.call((params.context||this),params.oncomplete);
			};
			httpRequest.open(params.method, params.url, true);
			httpRequest.setRequestHeader("Content-type", params.contentType);

			for (var i = 0; i < params.headers.length; i++) {
				var header = params.headers[i];
				httpRequest.setRequestHeader(header.type, header.value);
			}
			httpRequest.send(params.query);
			rtn = httpRequest;
		}
		rtn.then = function (callback) { //noinspection CommaExpressionJS
			return params.onsuccess.push(callback),this; };
		rtn.otherwise = function (callback) { //noinspection CommaExpressionJS
			return params.onerror.push(callback),this; };
		rtn['finally'] = function (callback) { //noinspection CommaExpressionJS
			return params.complete.push(callback),this; };
		return rtn
	} catch (e) {
		error("ajax", e);
	}
}
function Request() {
	/*|
		{"info": "Create cross browser XMLHttpRequest object",
		"category": "Global",
		"parameters":[],

		"description": "http://www.craydent.com/library/1.8.0/docs#Request",
		"returnType": "(XMLHttpRequest)"}
	|*/
	var ajaxHttpCaller;
	try {
		//request object for mozilla
		ajaxHttpCaller = new XMLHttpRequest();
	} catch (ex) {
		//request object for IE
		try {
			ajaxHttpCaller = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (ex) {
			try {
				ajaxHttpCaller = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (ex) //noinspection JSConstructorReturnsPrimitive
			{
				error("Request", e);
				return null;
			}
		}
	}
	return ajaxHttpCaller;
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

	 "description": "http://www.craydent.com/library/1.8.0/docs#$COOKIE",
	 "returnType": "(Mixed)"
	 }|*/
	try {
		options = options || {};
		var c = $d.cookie, path = "", domain = "",keys = [], values=[];
		options.cookie && (c = options.cookie);
		if($c.isObject(key)) {
			options = value;
			for (var prop in key) {
				if (!key.hasOwnProperty(prop)) { continue; }
				//value = key[prop];
				//key = prop;
				//break;
				value.push(JSON.stringify(key[prop]));
				keys.push(prop);
			}
		} else if (arguments.length > 1) {
			keys.push(key);
			values.push(JSON.stringify(value));
		}

		if (!c && !values.length) { return {}; }
		if (options.path && $c.isString(options.path)) {path = 'path=' + options.path + ';'}
		if (options.domain && $c.isString(options.domain)) {domain = 'domain=' + options.domain + ';'}
		if (options["delete"]) {
			$d.cookie = key + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;' + path + domain;
			return true;
		}

		if (values.length) {
			var expires = "";
			if ($c.isInt(options.expiration)) {
				var dt = new Date();
				dt.setDate(dt.getDate() + options.expiration);
				expires = ";expires=" + dt.toUTCString();
			}
			for (var j = 0, jlen = keys.length; j < jlen; j++) {
				//key = encodeURIComponent(keys[i]);
				//value = encodeURIComponent(values[i]);
				$d.cookie = encodeURIComponent(keys[j]) + "=" + encodeURIComponent(values[j]) + expires + path + domain;
			}
			return true;
		}
		var cookies = {},
			arr = c.split(/[,;]/);
		for (var i = 0, len = arr.length; i < len; i++) {
			var cookie = arr[i],
				parts = cookie.split(/=/, 2),
//                name = decodeURIComponent($c.ltrim(parts[0])),
				name = decodeURIComponent(parts[0] && parts[0].ltrim && parts[0].ltrim() || ""),
				value = parts.length > 1 ? decodeURIComponent($c.rtrim(parts[1])) : null;
			cookies[name] = tryEval(value) || value;
			if (key && key == name) {
				return cookies[name];
			}
		}

		if (key) {
			return false;
		}
		return cookies;
	} catch (e) {
		error('$COOKIE', e);
	}
}
function $GET(variable, options) {
	/*|{
		"info": "Retrieve all or specific variables in the url",
		"category": "Global",
		"featured": true,
		"parameters":[],

		"overloads":[
			{"parameters":[
				{"keyValue": "(Object) specify the key value pair"}]}
			{"parameters":[
				{"keyValue": "(Object) specify the key value pair"},
				{"options": "(Object) options to defer, ignore case, etc"}]},
			{"parameters":[
				{"key": "(String) key for query value"},
				{"value": "(String) value to store"}]},
			{"parameters":[
				{"key": "(String) key for query value"},
				{"value": "(String) value to store"},
				{"options": "(Object) Options to defer, ignore case, etc"}]}],

		"description": "http://www.craydent.com/library/1.8.0/docs#$GET",
		"returnType": "(Mixed)"
	}|*/
	try {
		if (!variable) {
			var allkeyvalues = {},
				mapFunc = function(value){
					if (value == "") {
						return;
					}
					var keyvalue = value.split('='),
						len = keyvalue.length;
					if (len > 2) {
						for (var i = 2; i < len; i++) {
							keyvalue[1] += keyvalue[i];
						}
					}
					return allkeyvalues[keyvalue[0]] = keyvalue[1];
				};

			($l.search[0] == "?" ? $l.search.substr(1) : $l.search).split('&').map(mapFunc);
			($l.hash[0] == "#" ? $l.hash.substr(1) : $l.hash).split('@').map(mapFunc);
			return allkeyvalues;
		}
		options = options || {};
		var ignoreCase = options.ignoreCase || options == "ignoreCase" ? "i" : "",
			defer = !!$COMMIT.update && (options.defer || options == "defer"),
			regex = new RegExp("[\?|&|@]" + variable + "=", ignoreCase),
			attr = "search",
			location = {};
		location.hash = $l.hash;
		location.search = $l.search;

		if (defer) {
			location.hash = $COMMIT.hash || "";
			location.search = $COMMIT.search || "";
		} else if (options.url || $c && $c.isString && ($c.isString(options) && (options.indexOf("?") != -1 || options.indexOf("#") != -1))) {
			var query = options.url || options,
				hindex, qindex = query.indexOf("?");

			qindex != -1 && (query = query.substr(qindex));

			hindex = query.indexOf("#");
			if (hindex != -1) {
				location.hash = query.substr(hindex);
				query = query.substr(0,hindex);
			}
			location.search = query;
		}

		var delimiter = "&";
		if (regex.test(location.hash)) {
			attr = 'hash';
			delimiter = "@";
		} else if (!regex.test(location.search)){
			return false;
		}
		regex = new RegExp('(.*)?(' + variable +'=)(.*?)(([' + delimiter + '])(.*)|$)', ignoreCase);
		return decodeURI(location[attr].replace(regex, '$3'));
	} catch (e) {
		logit('$GET');
		logit(e);
	}
}
function cout(){
	/*|{
		"info": "Log to console when DEBUG_MODE is true and when the console is available",
		"category": "Global",
		"parameters":[
			{"infinite": "any number of arguments can be passed."}],

		"overloads":[],

		"description": "http://www.craydent.com/library/1.8.0/docs#cout",
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
function cuid(msFormat) {
	/*|{
		"info": "Creates a Craydent/Global Unique Identifier",
		"category": "Global",
		"parameters":[
			{"msFormat": "(Bool) use microsoft format if true"}],

		"overloads":[],

		"description": "http://www.craydent.com/library/1.8.0/docs#cuid",
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
function error(fname, e) {
	/*|{
		"info": "User implemented place holder function to handle errors",
		"category": "Global",
		"parameters":[
			{"fname": "(String) The function name the error was thrown"},
			{"e": "(Error) Exception object thrown"}],

		"overloads":[],

		"description": "http://www.craydent.com/library/1.8.0/docs#error",
		"returnType": "(void)"
	}|*/
	try {
		$c.DEBUG_MODE && cout("Error in " + fname + "\n" + (e.description || e), e);
	} catch (e) {
		cout("Error in " + fname + "\n" + (e.description || e));
	}
}
function fillTemplate (htmlTemplate, objs, offset, max, bound) {
	/*|{
		"info": "Function for templetizing",
		"category": "Global",
		"featured": true,
		"parameters":[
			{htmlTemplate: "(String) Template to be used"},
			{objs: "(Objects[]) Objects to fill the template variables"}],

		"overloads":[
			{"parameters":[
				{"htmlTemplate": "(String) Template to be used"},
				{"objs": "(Objects[]) Objects to fill the template variables"},
				{"max": "(Int) The maximum number of records to process"}]},
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
				{"bound": "(Boolean) Flag to automatically bind the object to the rendered DOM"}]}],

		"description": "http://www.craydent.com/library/1.8.0/docs#fillTemplate",
		"returnType": "(String)"
	}|*/
	try {
		var nested = true;
		if (!fillTemplate.binding && !fillTemplate.declared && !fillTemplate.refs) {
			nested = false;
			fillTemplate.binding = {original:[],replacer:[]};
			fillTemplate.declared = {};
			fillTemplate.refs = [];
		}
		if (!htmlTemplate) { return ""; }
		if ($c.isBoolean(offset)) {
			bound = offset;
			max = offset = 0;
		} else if (!isNull(offset) && isNull(max)) {
			max = offset;
			offset = 0;
		}

		var domRef;
		$c.isDomElement(htmlTemplate) && (domRef = htmlTemplate, htmlTemplate = htmlTemplate.toString());
		if (htmlTemplate.trim() == "") {
			return "";
		}
		if ($c.isString(objs)) {
			try {
				objs = eval("(" + objs + ")");
			} catch (ex) {
				return "";
			}
		}
		objs = objs || [{}];
		if (!$c.isArray(objs)) {
			objs = [objs];
		}
		var html = "", variable, value, ttc = $c.TEMPLATE_TAG_CONFIG, tv = $c.TEMPLATE_VARS,
			hasDataProps = htmlTemplate.contains('${dataproperties}'),
			vsyntax = ttc.VARIABLE,
			vnsyntax = ttc.VARIABLE_NAME,
			declarations = htmlTemplate.match(ttc.DECLARE.syntax.addFlags('g')) || [];
		for (var j = 0, jlen = tv.length; j < jlen; j++) {
			variable = tv[j].variable;
			value = tv[j].value;
			if (!variable) {continue;}
			value = $c.isFunction(value) ? value(variable,j):value;
			htmlTemplate = htmlTemplate.replace_all("${"+variable+"}", value);
		}
		for (var j = 0, jlen = declarations.length; j < jlen; j++) {
			htmlTemplate = ttc.DECLARE.parser(htmlTemplate, declarations[j]);
		}

		max = max || objs.length;
		offset = offset || 0;

		var props = (htmlTemplate.match(vsyntax) || []).condense(true);
		// prep template to allow binding
		if (bound) {
			var nodes = htmlTemplate.toDomElement();
			function __setBindAttribute(n,value,id) {
				var prop, k = 0;
				while (prop = props[k++]) {
					if (value.contains(prop)) {
						var ca = n.getAttribute("data-craydent-bind") || "",
							property = $c.isFunction(vnsyntax) ? vnsyntax(prop) : vnsyntax.exec && vnsyntax.exec(prop);
						!ca.contains("${craydent_bind}." + property) &&
						n.setAttribute("data-craydent-bind", (ca ? ca + "," : id+":") + "${craydent_bind}." + property);
					}
				}
			}
			function __processNodes(n) {
				var id = suid();
				for (var i = 0, len = n.attributes.length; i < len; i++) {
					__setBindAttribute(n,n.attributes[i].value,id);
				}
				var child, j = 0;
				while (child = n.childNodes[j++]) {
					if (child.nodeType == 3) { // is text node
						__setBindAttribute(n,child.nodeValue,id);
					} else {
						__processNodes(child);
					}
				}
				fillTemplate._micro_templates[id] = {template:n.toString()};

			}
			if (!nodes.length) { nodes = [nodes]; }
			var node, i = 0;
			while (node = nodes[i++]) {
				__processNodes(node);
			}
			htmlTemplate = "";
			i = 0;
			while (node = nodes[i++]) {
				htmlTemplate += node.toString();
			}
		}
		var bindTemplate = {html: htmlTemplate}, _observing = fillTemplate._observing;

		for (var i = offset; i < max; i++) {
			var obj = objs[i], regex, template = htmlTemplate, match, bind = "";

			if (bound) {
				$c.observe(obj);
				bind = _observing["hash_"+_observing.indexOf(obj)];
				_observing[bind] = {item:obj,template:bindTemplate};
				template = template.replace_all("${craydent_bind}", bind);
			}

			if (template.contains("${this}")) {
				var uid = __add_fillTemplate_ref(obj);
				//template = template.replace_all(["${this}","${index}"],[parseRaw(obj, true).replace_all([';','[',']'], [';\\','\\[','\\]']),i]);
				template = template.replace_all(["${this}","${index}"],["fillTemplate.refs['" + uid + "']",i]);
			}


			while (template.contains("${this.") && (match=/\$\{this\.(.+?)\}/.exec(template))) {
				value = $c.getProperty(obj, match[1]);
				if (typeof value == "object") {
					value = "fillTemplate.refs['" + __add_fillTemplate_ref(value) + "']";
				} else {
					value = parseRaw(value, $c.isString(value));
				}
				//value = parseRaw($c.getProperty(obj, match[1]), true);

				//template= template.replace_all("${this."+match[1]+"}", value);
				template= template.replace_all("${this."+match[1]+"}", value);
			}
			var objval;
			for (var j = 0, jlen = props.length; j < jlen; j++) {
				var property = $c.isFunction(vnsyntax) ? vnsyntax(props[j]) : vnsyntax.exec && vnsyntax.exec(props[j]);
				if (!obj.hasOwnProperty(property)) { continue; }
				var expression = props[j];
				if (template.contains(expression) && !isNull(objval = $c.getProperty(obj,property,null,{noInheritance:true}))) {
					if (typeof objval == "object") {
						objval = "fillTemplate.refs['" + __add_fillTemplate_ref(objval) + "']";
					} else {
						objval = parseRaw(objval, $c.isString(objval));
					}
					objval = objval.replace_all(['\n',';'],['<br />',';\\']);
					if (objval.contains('${')) {
						objval = fillTemplate(objval,[obj]);
					}
					template = template.replace_all(expression, objval);

					if (hasDataProps) {
						template = template.replace_all('${dataproperties}', "data-" + property + "='" + (objval.indexOf('<') && "" || objval) + "' ${dataproperties}");
					}
				}
			}
			template = template.replace_all('\n', '');
			// special run sytax
			template = template.contains("${COUNT") ? template.replace(/\$\{COUNT\[(.*?)\]\}/g, '${RUN[__count;$1]}') : template;
			template = template.contains("${ENUM") ? template.replace(/\$\{ENUM\[(.*?)\]\}/g, '${RUN[__enum;$1]}') : template;
			template = template.contains("${RUN") ? __run_replace(/\$\{RUN\[(.+?)\]\}/, template, true, obj) : template;
			var tmp, rptmp;
			if (template.contains('||') && (tmp = /\$\{(.+?\|\|?.+?)\}/.exec(template)) && tmp[1]) {
				tmp = tmp[1].strip('|').replace(/\|{3,}/,'');
				if (tmp.contains('||')) {
					rptmp = (tmp && "__or|" + tmp.replace_all('||', "|") || "");
					template = template.replace_all(tmp, rptmp);
				}
				template = template.replace("||",'|');
			}
			if (template.contains('&&') && (tmp = /\$\{(.+?\&\&?.+?)\}/.exec(template)) && tmp[1]) {
				tmp = tmp[1];
				rptmp = (tmp && "__and|"+tmp.replace_all('&&', "|") || "");
				template = template.replace_all(tmp, rptmp);
			}
			var leftovervars = template.match(vsyntax);
			if (leftovervars) {
				for (var k = 0, klen = leftovervars.length; k < klen; k++) {
					var variable = leftovervars[k];
					if (variable.contains('|')) {
						var regex = new RegExp(variable.replace_all(['$','{','}','|'],['\\$','\\{(',')\\}','\\|']));
						template = __run_replace (regex, template, false,obj);
					}
				}
			}

			template = __logic_parser(template, obj, bind);
			html += (template.contains(vsyntax) ? template.replace(vsyntax,"") : template).replace_all(';\\', ';');
		}

		if (domRef) {
			domRef.parentNode.replaceChild(html.toDomElement(),domRef);
		}
		html = html.replace_all(fillTemplate.binding.original, fillTemplate.binding.replacer);
		if (!nested) {
			fillTemplate.binding = fillTemplate.declared = fillTemplate.refs = undefined;
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

		"description": "http://www.craydent.com/library/1.8.0/docs#foo",
		"returnType": "(void)"
	}|*/
}
function logit(){
	/*|{
		"info": "Log to console when DEBUG_MODE is true and when the console is available",
		"category": "Global",
		"parameters":[
			{"infinite": "any number of arguments can be passed."}],

		"overloads":[],

		"description": "http://www.craydent.com/library/1.8.0/docs#logit",
		"returnType": "(void)"
	}|*/
	try {
		var location = "", err = new Error(), args = [];

		$c.VERBOSE_LOGS && err.stack && (location = "\t\t\t\t    " + err.stack.split('\n')[2]);
		for (var i = 0, len = arguments.length; i < len; i++) {
			args.push(arguments[i]);
		}
		if ($c.VERBOSE_LOGS) {
			args.push(location);
		}
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

		"description": "http://www.craydent.com/library/1.8.0/docs#namespace",
		"returnType":"(void)"
	}|*/
	try {
		var className = clazz.getName();
		$w[className] = namespace[className] || clazz;
		$w.setProperty(name + "." + className, clazz);
		fn && fn.call(clazz);
	} catch (e) {
		error('namespace', e);
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

		"description": "http://www.craydent.com/library/1.8.0/docs#now",
		"returnType":"(Mixed)"
	}|*/
	try {
		return format ? (new Date()).format(format) : new Date();
	} catch (e) { error('now', e); }
}
function parseBoolean(value) {
	/*|{
		"info: "Try to parse value to a Boolean",
		"category": "Global",
		"parameters":[
			{"value": "(Mixed) value to parse as boolean"}],

		"overloads":[],

		"description": "http://www.craydent.com/library/1.8.0/docs#parseBoolean",
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

		"description": "http://www.craydent.com/library/1.8.0/docs#parseRaw",
		"returnType": "(String)"
	}|*/
	try {
		if (isNull(value)) {
			return value + "";
		}
		var raw = "";
		if ($c.isString(value)) {
			raw = (!skipQuotes ? "\"" + value.replace_all('"','\\"') + "\"" : value);
		} else if ($c.isArray(value)) {
			var tmp = [];
			for (var i = 0, len = value.length; i < len; i++) {
				tmp[i] = parseRaw(value[i], skipQuotes, saveCircular, __windowVars, __windowVarNames);
			}
			raw = "[" + tmp.join(',') + "]";
		} else if ($c.isDate(value)) {
			return "new Date('"+value.toString()+"')";
		} else if (value instanceof Object && !$c.isFunction(value)) {
			if (!__windowVars) {
				__windowVars = [];
				__windowVarNames = [];
				if (saveCircular) {
					for (var prop in $w) {
						if (!$w.hasOwnProperty(prop)) {
							continue;
						}
						if (value.hasOwnProperty(prop)) {
							__windowVars.push($w[prop]);
							__windowVarNames.push(prop);
						}
					}
				}
			}
			var index = __windowVars.indexOf(value);
			if (index == -1) {
				if (saveCircular) {
					__windowVars.push(value);
					__windowVarNames.push(suid());
				}
				raw = "{";
				for (var prop in value) {
					if (value.hasOwnProperty(prop)) {
						raw += "\"" + prop + "\": " + parseRaw(value[prop], skipQuotes, saveCircular, __windowVars, __windowVarNames) + ",";
					}
				}
				raw = raw.slice(0,-1) + "}";
			} else {
				if (!saveCircular) {
					raw = "{}";
				} else {
					raw = "$w['" + __windowVarNames[index ] +"']";
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

		"description": "http://www.craydent.com/library/1.8.0/docs#rand",
		"returnType": "(Number)"
	}|*/
	try {
		if (inclusive) {
			if (num1 < num2) {
				num1 -= 0.1;
				num2 += 0.1;
			} else if (num1 > num2) {
				num1 += 0.1;
				num2 -= 0.1;
			}
		}
		return (num2 - num1)*Math.random() + num1;
	} catch (e) {
		error('rand', e);
	}
}
function suid(length) {
	/*|{
		"info": "Creates a short Craydent/Global Unique Identifier",
		"category": "Global",
		"parameters":[],

		"overloads":[
			{"parameters":[
				{"length": ("Integer) Custom length of the short unique identifier"}]}],

		"description": "http://www.craydent.com/library/1.8.0/docs#suid",
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

		"description": "http://www.craydent.com/library/1.8.0/docs#tryEval",
		"returnType": "(Mixed)"
	}|*/
	try {
		return (evaluator || eval)(expression);
	} catch(e) {
		try {
			return eval("("+expression+")");
		} catch(e) {
			return null;
		}
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

		"description": "http://www.craydent.com/library/1.8.0/docs#wait",
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
			if (funcArgNames[a]) {
				func = func.replace(fregex, 'function(){var ' + funcArgNames[a] + '=' + parseRaw(args[a]) + ';');
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
				if (variable.indexOf('=') != -1) {
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
function xmlToJson(xml, ignoreAttributes) {
	// TODO: implement updated version
	/*|{
		"info": "Converts XML to JSON",
		"category": "Global",
		"parameters":[
			{"xml": "(Mixed) XML string or XML DOM"}],

		"overloads":[
			{"parameters":[
				{"xml": "(Mixed) XML string or XML DOM"},
				{"ignoreAttributes": "(Bool) Flag to ignore attributes"}]}],

		"description": "http://www.craydent.com/library/1.8.0/docs#xmlToJson",
		"returnType": "(Object)"
	}|*/
	try {
		// Create the return object
		var obj = {};
		if ($c.isString(xml)) {
			xml = xml.replace(/&(?!amp;)/gi, '&amp;');
			if ($w.DOMParser) {
				xml = (new DOMParser()).parseFromString(xml, 'text/xml');
			} else {
				var doc;
				doc = new ActiveXObject('Microsoft.XMLDOM');
				doc.async='false';
				xml = doc.loadXML(xml) && doc;
			}
		}

		if (xml.nodeType == 1 && !ignoreAttributes) { // element
			// do attributes
			if (xml.attributes.length > 0) {
				obj["@attributes"] = {};
				for (var j = 0; j < xml.attributes.length; j++) {
					var attribute = xml.attributes.item(j);
					obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
				}
			}
		} else if (xml.nodeType == 3) { // text
			obj = xml.nodeValue;
		}

		// do children
		if (xml.hasChildNodes()) {
			for(var i = 0; i < xml.childNodes.length; i++) {
				var item = xml.childNodes.item(i);
				var nodeName = item.nodeName;
				if (typeof(obj[nodeName]) == "undefined") {
					if (nodeName != "#text" || !ignoreAttributes) {
						obj[nodeName] = xmlToJson(item, ignoreAttributes);
					} else if (xml.childNodes.length == 1) {
						obj = xmlToJson(item, ignoreAttributes);
					}
				} else {
					if (!$c.isArray(obj[nodeName]) || typeof(obj[nodeName].length) == "undefined") {
						var old = obj[nodeName];
						obj[nodeName] = [];
						obj[nodeName].push(old);
					}
					obj[nodeName].push(xmlToJson(item, ignoreAttributes));
				}
			}
		}
		return obj;
	} catch (e) {
		error('xmlToJson', e);
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

		"description": "http://www.craydent.com/library/1.8.0/docs#zipit",
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

		"description": "http://www.craydent.com/library/1.8.0/docs#ChromeVersion",
		"returnType": "(Float)"
	}|*/
	try {
		return _getBrowserVersion("Chrome");
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

		"description": "http://www.craydent.com/library/1.8.0/docs#FirefoxVersion",
		"returnType": "(Float)"
	}|*/
	try {
		return _getBrowserVersion("Firefox");
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

		"description": "http://www.craydent.com/library/1.8.0/docs#IEVersion",
		"returnType": "(Float)"
	}|*/
	try {
		var rv = -1;
		if (navigator.appName == 'Microsoft Internet Explorer') {
			var ua = navigator.userAgent,
				re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
			if (re.exec(ua) != null) {
				rv = parseFloat(RegExp.$1);
			}
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

		"description": "http://www.craydent.com/library/1.8.0/docs#OperaVersion",
		"returnType": "(Float)"
	}|*/
	try {
		return _getBrowserVersion("Opera");
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

		"description": "http://www.craydent.com/library/1.8.0/docs#SafariVersion",
		"returnType": "(Float)"
	}|*/
	try {
		return _getBrowserVersion("Safari");
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

		"description": "http://www.craydent.com/library/1.8.0/docs#isAmaya",
		"returnType": "(Bool)"
	}|*/
	try {
		return (/amaya/i.test(navigator.userAgent));
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

		"description": "http://www.craydent.com/library/1.8.0/docs#isAndroid",
		"returnType": "(Bool)"
	}|*/
	try {
		return (/android/i.test(navigator.userAgent));
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

		"description": "http://www.craydent.com/library/1.8.0/docs#isBlackBerry",
		"returnType": "(Bool)"
	}|*/
	try {
		return (/blackberry/i.test(navigator.userAgent));
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

		"description": "http://www.craydent.com/library/1.8.0/docs#isChrome",
		"returnType": "(Bool)"
	}|*/
	try {
		return (/chrome/i.test(navigator.userAgent));
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

		"description": "http://www.craydent.com/library/1.8.0/docs#isFirefox",
		"returnType": "(Bool)"
	}|*/
	try {
		var nu = navigator.userAgent;
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

		"description": "http://www.craydent.com/library/1.8.0/docs#isGecko",
		"returnType": "(Bool)"
	}|*/
	try {
		return (/gecko/i.test(navigator.userAgent));
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

		"description": "http://www.craydent.com/library/1.8.0/docs#isIE6",
		"returnType": "(Bool)"
	}|*/
	try {
		var rv = IEVersion();
		return (rv != -1 && rv < 7.0);
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

		"description": "http://www.craydent.com/library/1.8.0/docs#isIE",
		"returnType": "(Bool)"
	}|*/
	try {
		return (IEVersion() != -1);
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

		"description": "http://www.craydent.com/library/1.8.0/docs#isIPad",
		"returnType": "(Bool)"
	}|*/
	try {
		return (/iPad|iPhone OS 3_[1|2]_2/i.test(navigator.userAgent));
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

		"description": "http://www.craydent.com/library/1.8.0/docs#isIphone",
		"returnType": "(Bool)"
	}|*/
	try{
		return !isIPad() && /iphone/i.test(navigator.userAgent);
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

		"description": "http://www.craydent.com/library/1.8.0/docs#isIPod",
		"returnType": "(Bool)"
	}|*/
	try {
		return (/ipod/i.test(navigator.userAgent));
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

		"description": "http://www.craydent.com/library/1.8.0/docs#isKHTML",
		"returnType": "(Bool)"
	}|*/
	try {
		return (/khtml/i.test(navigator.userAgent));
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

	"description": "http://www.craydent.com/library/1.8.0/docs#isLinux",
	"returnType": "(Bool)"
}|*/
	try{
		return /linux/i.test(navigator.platform);
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

		"description": "http://www.craydent.com/library/1.8.0/docs#isMac",
		"returnType": "(Bool)"
	}|*/
	try{
		return /mac/i.test(navigator.platform);
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

		"description": "http://www.craydent.com/library/1.8.0/docs#isMobile",
		"returnType": "(Bool)"
	}|*/
	try{
		return isAndroid() || isBlackBerry() || isIPad() || isIPhone() || isIPod() || isPalmOS() || isSymbian() || isWindowsMobile();
	} catch (e) {
		error('isMobile', e);
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

		"description": "http://www.craydent.com/library/1.8.0/docs#isNull",
		"returnType": "()"
	}|*/
	var isnull = value == null || value == undefined;
	if (defaultValue == null || defaultValue == undefined) {
		return isnull;
	}
	return isnull ? defaultValue : value;
}
function isOpera(){
	/*|{
		"info": "Check if browser is Opera",
		"category": "Global",
		"parameters":[],

		"overloads":[],

		"description": "http://www.craydent.com/library/1.8.0/docs#isOpera",
		"returnType": "(Bool)"
	}|*/
	try {
		var nu = navigator.userAgent;
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

		"description": "http://www.craydent.com/library/1.8.0/docs#isPalmOS",
		"returnType": "(Bool)"
	}|*/
	try {
		return (/palm/i.test(navigator.userAgent));
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

		"description": "http://www.craydent.com/library/1.8.0/docs#isPresto",
		"returnType": "(Bool)"
	}|*/
	try {
		return (/presto/i.test(navigator.userAgent));
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

		"description": "http://www.craydent.com/library/1.8.0/docs#isPrince",
		"returnType": "(Bool)"
	}|*/
	try {
		return (/prince/i.test(navigator.userAgent));
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

		"description": "http://www.craydent.com/library/1.8.0/docs#isSafari",
		"returnType": "(Bool)"
	}|*/
	try {
		var nu = navigator.userAgent;
		return (/chrome/i.test(nu)) && (/apple/i.test(nu));
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

		"description": "http://www.craydent.com/library/1.8.0/docs#isSymbian",
		"returnType": "(Bool)"
	}|*/
	try {
		var nu = navigator.userAgent;
		return (isWebkit() && (/series60/i.test(nu) || /symbian/i.test(nu)));
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

		"description": "http://www.craydent.com/library/1.8.0/docs#isTrident",
		"returnType": "(Bool)"
	}|*/
	try {
		return (/trident/i.test(navigator.userAgent));
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

		"description": "http://www.craydent.com/library/1.8.0/docs#isWebkit",
		"returnType": "(Bool)"
	}|*/
	try {
		return (/webkit/i.test(navigator.userAgent));
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

		"description": "http://www.craydent.com/library/1.8.0/docs#isWindows",
		"returnType": "(Bool)"
	}|*/
	try{
		return /win/i.test(navigator.platform);
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

		"description": "http://www.craydent.com/library/1.8.0/docs#isWindowsMobile",
		"returnType": "(Bool)"
	}|*/
	try {
		return (/windows ce/i.test(navigator.userAgent));
	} catch (e) {
		error('isWindowsMobile', e);
	}
}

var _ie = IEVersion(),
	_ie = IEVersion(),_chrm = ChromeVersion(),_ff = FirefoxVersion(),_op = OperaVersion(),_saf = SafariVersion(),
	_droid = isAndroid(),_bbery = isBlackBerry(),_ipad = isIPad(),_ifon = isIPhone(),_ipod = isIPod(),_linx = isLinux(),_mac = isMac(),_palm = isPalmOS(),_symb = isSymbian(),_win = isWindows(),_winm = isWindowsMobile(),
	_amay = isAmaya(),_gekk = isGecko(),_khtm = isKHTML(),_pres = isPresto(),_prin = isPrince(),_trid = isTrident(),_webk = isWebkit(),
	console = $w.console,
	_browser = (_ie != -1 && 'Internet Explorer') || (_chrm != -1 && 'Chrome') || (_ff != -1 && 'Firefox') || (_saf != -1 && 'Safari'),
	_os = (_droid && 'Android') || (_bbery && 'BlackBerry') || (_linx && 'Linux') || ((_ipad || _ifon || _ipod) && 'iOS') || (_mac && 'Mac') || (_palm && 'PalmOS') || (_symb && 'Symbian') || (_win && 'Windows') || (_winm && 'Windows Mobile'),
	_device = (_droid && 'Android') || (_bbery && 'BlackBerry') || (_ipad && 'iPad') || (_ifon && 'iPhone') || (_ipod && 'iPod') || (_linx && 'Linux') || (_mac && 'Mac') || (_palm && 'PalmOS') || (_symb && 'Symbian') || (_win && 'Windows') || (_winm && 'Windows Mobile'),
	_engine = (_amay && 'Amaya') || (_gekk && 'Gekko') || (_khtm && 'KHTML') || (_pres && 'Presto') || (_prin && 'Prince') || (_trid && 'Trident') || (_webk && 'WebKit');


	var Craydent = {
			browser:{
				CURRENT: _browser,
				CURRENT_VERSION:(_ie != -1 && _ie) || (_chrm != -1 && _chrm) || (_ff != -1 && _ff) || (_saf != -1 && _saf),
				IE:isIE(),
				IE_VERSION:_ie,
				IE6:(_ie < 7.0 && _ie >= 6.0),
				IE7:(_ie < 8.0 && _ie >= 7.0),
				IE8:(_ie < 9.0 && _ie >= 8.0),
				CHROME:isChrome(),
				CHROME_VERSION:_chrm,
				FIREFOX:isFirefox(),
				FIREFOX_VERSION:_ff,
				OPERA:isOpera(),
				OPERA_VERSION:_op,
				SAFARI:isSafari(),
				SAFARI_VERSION:_saf
			},
			client: {
				BROWSER: _browser,
				CORES_SUPPORT: _cors,
				DEVICE: _device,
				ENGINE: _engine,
				OS:_os
			},
			engine:{
				CURRENT:_engine,
				AMAYA:_amay,
				GEKKO:_gekk,
				KHTML:_khtm,
				PRESTO:_pres,
				PRINCE:_prin,
				TRIDENT:_trid,
				WEBKIT:_webk
			},
			os:{
				CURRENT:_os,
				ANDROID:_droid,
				BLACKBERRY:_bbery,
				LINUX:_linx,
				IOS:(_ipad || _ifon || _ipod),
				MAC:_mac,
				PALM:_palm,
				SYMBIAN:_symb,
				WINDOWS:_win,
				WINDOWS_MOBILE:_winm
			},
			device:{
				CURRENT:_device,
				ANDROID:_droid,
				BLACKBERRY:_bbery,
				IPAD:_ipad,
				IPHONE:_ifon,
				IPOD: _ipod,
				LINUX:_linx,
				MAC:_mac,
				PALM:_palm,
				SYMBIAN:_symb,
				WINDOWS:_win,
				WINDOWS_MOBILE:_winm
			},
			ANDROID:_droid,
			AMAYA:_amay,
			BLACKBERRY:_bbery,
			CHROME:isChrome(),
			CHROME_VERSION:_chrm,
			CLICK: "click",
			CORES_SUPPORT: _cors,
			DEBUG_MODE: !!$GET("debug"),
			FIREFOX:isFirefox(),
			FIREFOX_VERSION:FirefoxVersion(),
			FIREFOX:isFirefox(),
			GEKKO:isGecko(),
			HANDPOINT: "pointer",
			HIDDEN: "hidden",
			IE:isIE(),
			IE_VERSION:_ie,
			IE6:(_ie < 7.0 && _ie >= 6.0),
			IE7:(_ie < 8.0 && _ie >= 7.0),
			IE8:(_ie < 9.0 && _ie >= 8.0),
			IPAD:isIPad(),
			IPHONE:isIPhone(),
			IPOD: isIPod(),
			KHTML:isKHTML(),
			LINUX:isLinux(),
			MAC:isMac(),
			OBSERVE_CHECK_INTERVAL: 200,
			ONMOUSEDOWN: "onmousedown",
			ONMOUSEUP: "onmouseup",
			OPERA:isOpera(),
			OPERA_VERSION:OperaVersion(),
			PAGE_NAME: (function () {
				var pn = $l.href.substring($l.href.lastIndexOf('/') + 1).replace(/([^#^?]*).*/gi,'$1');
				return !pn || pn.indexOf('.') == -1 ? "index.html" : pn;
			})(),
			PAGE_NAME_RAW: (function () {
				var pn = $l.href.substring($l.href.lastIndexOf('/') + 1).replace(/(.*)?\?.*/gi,'$1');
				return !pn || pn.indexOf('.') == -1 ? "index.html" : pn;
			})(),
			PALM:isPalmOS(),
			POINTER: "default",
			PRESTO:isPresto(),
			PRINCE:isPrince(),
			PROTOCOL: $l.protocol,
			SAFARI:isSafari(),
			SAFARI_VERSION:SafariVersion(),
			SERVER: $l.host,
			SERVER_PATH: $l.pathname,
			SYMBIAN:isSymbian(),
			TEMPLATE_VARS: [],
			TEMPLATE_TAG_CONFIG: {
				IGNORE_CHARS:['\n'],
				/* loop config */
				FOR:{
					"begin":/(?:\$\{for (.*?);(.*?);(.*?\}?)\})|(?:\{\{for (.*?);(.*?);(.*?\}?)\}\})/i,
					"end":/(\$\{end for\})|(\{\{end for\}\})/i,
					"helper":function(code, body){
						var ttc = $c.TEMPLATE_TAG_CONFIG,
							mresult = code.match(ttc.FOR.begin),
							condition, exec, dvars, vars = "", ovars = {},code_result = "";

						for (var j = 1, jlen = mresult.length; j < jlen; j++) {
							if (!mresult[j]) {
								continue;
							}
							mresult[j] = mresult[j].replace_all(['\\[', '\\]'], ['[', ']']).toString();
						}

						condition = mresult[2] || mresult[5];
						exec = mresult[3] || mresult[6];
						dvars = (mresult[1] || mresult[4]).split(',');
						for (var i = 0, len = dvars.length; i < len; i++) {
							var parts = ttc.VARIABLE_NAME(dvars[i]).split('=');
							vars += "var " + parts[0] + "=" + parts[1] + ";";
							ovars[parts[0]] = parts[0];
						}
						eval(vars);
						while (eval(fillTemplate(condition,ovars))) {
							code_result += body;
							eval(ttc.VARIABLE_NAME(exec));
						}

						return code_result;
					},
					"parser":function (code, obj, bind){
						var FOR = $c.TEMPLATE_TAG_CONFIG.FOR,
							blocks = __processBlocks(FOR.begin, FOR.end, code),
							code_result = "";

						for (var i = 0, len = blocks.length; i < len; i++) {
							var obj = blocks[i],
								block = obj.block,
								id = obj.id;

							code_result = code_result || obj.code;
							if (!code_result.contains(obj.id)) { continue; }
							code_result = code_result.replace_all(id,FOR.helper(block,obj.body));
						}

						return __logic_parser(code_result);
					}
				},
				FOREACH:{
					"begin":/(?:\$\{foreach (.*?)\s+in\s+(.*?)\s*\})|(?:\{\{foreach (.*?)\s+in\s+(.*?)\s*\}\})/i,
					//begin:/(?:\$\{foreach (.*?)\s+in\s+(.*?\}?)\s*\})|(?:\{\{foreach (.*?)\s+in\s+(\\?\[\s*\{.*:.*?\}\s*\\?\])\s*\}\})/i,
					"end":/(?:\$\{end foreach\})|(?:\{\{end foreach\}\})/i,
					"helper":function (code, body,rtnObject,uid, obj, bind, ref_obj) {
						var ttc = $c.TEMPLATE_TAG_CONFIG,
							FOREACH = ttc.FOREACH,
							mresult = code.match(FOREACH.begin),
							objs, var_name,
							code_result = "";

						for (var j = 1, jlen = mresult.length; j < jlen; j++) {
							if (!mresult[j]) {
								continue;
							}
							mresult[j] = mresult[j].replace_all(['\\[', '\\]'], ['[', ']']).toString();
						}
						objs = tryEval(mresult[2] || mresult[4]);
						var_name = ttc.VARIABLE_NAME(mresult[1] || mresult[3]);

						//fillTemplate.binding.original.push(bind+"."+var_name);
						//fillTemplate.binding.replacer.push(fillTemplate.refs["ref_" + fillTemplate.refs.indexOf(objs)]);

						rtnObject = rtnObject || {};
						rtnObject[uid] += "var " + var_name + "s," + var_name + ";";
						rtnObject[var_name+"s"] = objs;
						if ($c.isArray(objs)) {
							fillTemplate.binding.original.push(bind + "." + var_name);
							var bindingCuids = "";
							for (var i = 0, len = objs.length; i < len; i++) {
								if (typeof objs[i] == "object") {

									bindingCuids += "," + fillTemplate._observing["hash_" + fillTemplate._observing.indexOf(objs[i])];
								}
								code_result += "${i="+i+","+var_name+"="+var_name+"s[i],null}" + body;
							}
							fillTemplate.binding.replacer.push(bindingCuids.substring(1));
						}

						return code_result;

					},
					"parser":function (code, ref_obj, bind){
						var ttc = $c.TEMPLATE_TAG_CONFIG,
							FOREACH = ttc.FOREACH,
							uid = "##"+suid()+"##",
							result_obj = {},
							code_result = "", post = "",
							blocks = __processBlocks(FOREACH.begin, FOREACH.end, code);
						//bindReplacers = {original:[],treplacer:[]};

						result_obj[uid] = "";

						for (var i = 0, len = blocks.length; i < len; i++) {
							var obj = blocks[i],
								block = obj.block,
								id = obj.id, index;
							if (!i && (index = obj.code.lastIndexOf("##")) != -1) {
								post = obj.code.substring(index + 2);
								obj.code = obj.code.substring(0,index + 2);
							}
							code_result = code_result || obj.code;
							if (!code_result.contains(obj.id)) { continue; }
							code_result = code_result.replace_all(id,FOREACH.helper(block,obj.body,result_obj,uid,obj,bind,ref_obj));
						}
						eval(result_obj[uid]);
						delete result_obj[uid];
						for (var prop in result_obj) {
							if (!result_obj.has(prop)) { continue; }
							eval(prop + "=" + "result_obj['" + prop + "']");
						}

						var matches = code_result.match(ttc.VARIABLE);
						matches.map(function (var_match) {
							var var_match_name = ttc.VARIABLE_NAME(var_match),
								str = "";
							try { str = eval(var_match_name); } catch(e){ return; }

							code_result = code_result.replace(var_match,str||"");

						});

						return __logic_parser(code_result + post, obj, bind);
					}
				},
				WHILE: {
					"begin": /(?:\$\{while\s*\((.*?)\)\s*\})|(?:\{\{while\s*\((.*?)\)\s*\}\})/i,
					"end": /(?:\$\{end while\})|(?:\{\{end while\}\})/i,
					"helper": function (code,body) {
						var ttc = $c.TEMPLATE_TAG_CONFIG,
							WHILE = ttc.WHILE,
							mresult = code.match(WHILE.begin),
							vars = "", ovars = {},code_result = "",
							declared = fillTemplate.declared,
							loop_limit = 100000;
						for (var prop in declared) {
							if (!code.contains("${"+prop+"}") || !declared.hasOwnProperty(prop)) { continue; }
							var val = declared[prop];
							vars += "var " + prop + "=" + val + ";";
							ovars[prop] = prop;
						}
						eval(vars);
						while (eval(fillTemplate(mresult[1] || mresult[2],ovars))) {
							loop_limit--;
							if (loop_limit < 1) {
								var msg = "fillTemplate While only support up to 100,000 iterations.  Possible infinite loop?";
								console.error(msg);
								throw msg;
							}
							code_result += body;
							(body.match(ttc.VARIABLE)||[]).map(function(var_matches){ eval(ttc.VARIABLE_NAME(var_matches)); });
						}
						fillTemplate.declared = declared;

						for (var prop in ovars) {
							if (!ovars.hasOwnProperty(prop)) { continue; }
							//var ovar = ovars[prop];
							code_result += "${" + prop + "=" + declared[prop] + ",null}";
							//declared[prop] = eval(ovars[prop]);
						}

						return code_result;
					},
					"parser": function (code, ref_obj, bind) {
						var ttc = $c.TEMPLATE_TAG_CONFIG,
							WHILE = ttc.WHILE,
							lookups = {},
							blocks = __processBlocks(WHILE.begin, WHILE.end, code, lookups),
							code_result = "", vars = "", declared = fillTemplate.declared, post = "";

						for (var i = 0, len = blocks.length; i < len; i++) {
							var obj = blocks[i],
								block = obj.block,
								id = obj.id;

							if (!i && (index = obj.code.lastIndexOf("##")) != -1) {
								post = obj.code.substring(index + 2);
								obj.code = obj.code.substring(0,index + 2);
							}

							code_result = code_result || obj.code;
							if (!code_result.contains(obj.id)) { continue; }
							code_result = code_result.replace_all(id,WHILE.helper(block,obj.body));
						}

						for (var prop in declared) {
							if (!code.contains("${"+prop+"}")) { continue; }
							vars += "var " + prop + "=" + declared[prop] + ";";
						}
						eval(vars);
						var matches = code_result.match(ttc.VARIABLE);
						matches.map(function (var_match) {
							var var_match_name = ttc.VARIABLE_NAME(var_match),
								var_match_index = code_result.indexOf(var_match),
								before, after;
							if (tryEval("var "+ var_match_name +";") !== null) {
								var_match_index += var_match.length;
							}


							before = code_result.substring(0,var_match_index).replace_all(var_match,eval(var_match_name));
							after = code_result.substring(code_result.indexOf(var_match) + var_match.length);
							code_result = before + after;
						});


						return __logic_parser(code_result + post);

					}
				},
				/* end loop config*/

				/* conditional config*/
				IF:{
					"begin":/\$\{if\s+\((.*?)(?!\{)\)\s*\}|\{\{if\s+\((.*?)(?!\{)\)\s*\}\}/i,
					"elseif":/\$\{elseif\s+\((.*?)(?!\{)\)\s*\}|\{\{elseif\s+\((.*?)(?!\{)\)\s*\}\}/i,
					"else":/\$\{else\}|\{\{else\}\}/i,
					"end":/\$\{end if\}|\{\{end if\}\}/i,
					"helper":function (code) {
						var IF = $c.TEMPLATE_TAG_CONFIG.IF,
							ifmatch = (code.match(IF.begin) || []).condense(),
							endlength = code.match(IF.end)[0].length,
							startindex = code.indexOfAlt(IF.begin),
							endindex = code.indexOfAlt(IF.end);

						if (ifmatch.length) {
							for (var j = 1, jlen = ifmatch.length; j < jlen; j++) {
								ifmatch[j] = ifmatch[j].replace_all(['\\[', '\\]'], ['[', ']']).toString();
							}
							var pre = code.substring(0, startindex), post = code.substring(endindex + endlength),
								ifsyntax = new RegExp(IF.begin.source+"|"+IF.elseif.source+"|"+IF["else"].source,'i');

							if (!code.match(new RegExp(IF.elseif.source+"|"+IF["else"].source,'ig'))) {
								if ("undefined" == ifmatch[1] || !tryEval(ifmatch[1])) {
									return pre + post;
								}
								return pre + code.substring(startindex + ifmatch[0].length, endindex) + post;
							}
							ifmatch = (code.match(ifsyntax.addFlags('g')) || []).condense();
							for (var i = 0, len = ifmatch.length; i < len; i++) {
								var ife = ifmatch[i].match(ifsyntax).condense(),
									condition = ife[1],
									value = "undefined" == condition ? false : tryEval(condition),
									sindex = code.indexOf(ifmatch[i]) + ifmatch[i].length;

								if (value !== undefined && value) {
									var eindex = code.indexOf(ifmatch[i + 1]);
									if (eindex == -1) {
										return pre + code.substring(sindex) + post;
									}
									return pre + code.substring(sindex, eindex) + post;
								} else if (ifmatch[i].match(IF["else"])) {
									return pre + code.substring(sindex,endindex) + post;
								}
							}
							return pre + post;
						}
						return code;
					},
					"parser":function (code, obj, bind){
						var IF = $c.TEMPLATE_TAG_CONFIG.IF,
							blocks = __processBlocks(IF.begin, IF.end, code),
							code_result = "";
						for (var i = 0, len = blocks.length; i < len; i++) {
							var obj = blocks[i],
								block = obj.block,
								id = obj.id;

							code_result = code_result || obj.code;
							if (!code_result.contains(obj.id)) { continue; }
							code_result = IF.helper(code_result.replace(id, block));
						}
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
							csyntax = SWITCH["case"],
							switchmatch = (code.match(SWITCH.begin) || []).condense(),
							endlength = code.match(SWITCH.end)[0].length,
							startindex = code.indexOfAlt(SWITCH.begin),
							endindex = code.indexOfAlt(SWITCH.end),
							brk = SWITCH["break"], dflt = SWITCH["default"];


						if (switchmatch.length) {

							for (var j = 1, jlen = switchmatch.length; j < jlen; j++) {
								switchmatch[j] = switchmatch[j].replace_all(['\\[', '\\]'], ['[', ']']).toString();
							}
							var pre = code.substring(0, startindex), post = code.substring(endindex + endlength),
								val = tryEval(switchmatch[2]) || switchmatch[2],
								cgsyntax = SWITCH["case"].addFlags("g"),
								cases = code.match(cgsyntax);
							code = code.substring(startindex + (switchmatch[0] || "").length, endindex);

							if (!cases) {
								return pre + code.cut(startindex, endindex + endlength) + post;
							}
							for (var i = 0, len = cases.length; i < len; i++) {
								var cs = cases[i].match(SWITCH["case"]),
									cvalue = cs[1] || cs[2];
								if (val == cvalue) {
									var cindex = code.indexOf(cases[i]),
										bindex = code.indexOfAlt(brk, cindex);
									bindex = bindex == -1 ? code.length : bindex;
									return pre + code.substring(cindex + cases[i].length, bindex).replace(cgsyntax, '') + post;
								}
							}
							var dindex = code.indexOfAlt(dflt);
							if (dindex != -1) {
								return pre + code.substring(dindex + code.match(dflt)[0].length).replace(cgsyntax, '').replace(brk, '') + post;
							}

						}
						return code;
					},
					"parser": function (code, obj, bind) {
						var SWITCH = $c.TEMPLATE_TAG_CONFIG.SWITCH,
							blocks = __processBlocks(SWITCH.begin, SWITCH.end, code),
							code_result = "";

						for (var i = 0, len = blocks.length; i < len; i++) {
							var obj = blocks[i],
								block = obj.block,
								id = obj.id;

							code_result = code_result || obj.code;
							if (!code_result.contains(obj.id)) { continue; }
							code_result = SWITCH.helper(code_result.replace(id, block));
						}
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
							sindex = code.indexOfAlt(SCRIPT.begin),
							slen = code.match(SCRIPT.begin)[0].length,
							eindex = code.indexOfAlt(SCRIPT.end),
							elen = code.match(SCRIPT.end)[0].length;

						if (eindex == -1) { eindex = undefined; }
						var block = code.substring(sindex + slen,eindex), str = "",
							echo = function (value) { echo.out += value; };
						echo.out = "";
						str = eval("(function(){"+block+";return echo.out;})()");

						return __logic_parser(code.cut(sindex,eindex+elen, str));
					}

				},
				TRY: {
					"begin": /(\$\{try\})|(\{\{try\}\})/i,
					"catch": /(?:\$\{catch\s+\((.*)?\)\s*\})|(?:\{\{catch\s+\((.*)?\)\s*\}\})/i,
					"finally": /(\$\{finally\})|(\{\{finally\}\})/i,
					"end": /(\$\{end try\})|(\{\{end try\}\})/i,
					"helper": function (code, lookups, exec) {
						var TRY = $c.TEMPLATE_TAG_CONFIG.TRY,
							cindex = code.indexOfAlt(TRY["catch"]),
							findex = code.indexOfAlt(TRY["finally"]),
							eindex = code.indexOfAlt(TRY["end"]),
							tend = cindex;

						if (tend == -1) {
							tend = findex != -1 ? findex : eindex;
						}

						var tindex = code.indexOfAlt(TRY.begin),
							body = code.substring(tindex + code.match(TRY.begin)[0].length, tend),
							pre = code.substring(0,tindex), post = code.substring(eindex + code.match(TRY.end)[0].length),
							regex = /##[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}##/i,
							match = body.match(regex), str = "", id,
							echo = function (value) {
								echo.out += value;
							};
						echo.out = "";
						while(match && match.length){
							id = match.splice(0)[0];
							body = body.replace(id, ";echo('" + TRY.helper(lookups[id], lookups) + "');");
						}
						match = pre.match(regex);
						while(match && match.length) {
							id = match.splice(0)[0];
							pre = pre.replace(id, TRY.helper(lookups[id], lookups));
						}
						match = post.match(regex);
						while(match && match.length) {
							id = match.splice(0)[0];
							post = post.replace(id, TRY.helper(lookups[id], lookups));
						}
						exec && eval(exec);
						try {
							str = eval("(function(){" + body + ";return echo.out; })()");
						} catch (e) {
							if (cindex != -1) {
								echo.out = "";
								tend = findex != -1 ? findex : eindex;
								var catchBlock = code.substring(cindex, tend),
									catchLine = catchBlock.match(TRY["catch"]);
								catchBlock = catchBlock.replace(catchLine[0], ''),
									errorString = JSON.stringify(e);

								match = catchBlock.match(regex);
								while(match && match.length) {
									id = match.splice(0)[0];
									catchBlock = catchBlock.replace(id, ";echo('" + TRY.helper(lookups[id], lookups,"var " + catchLine[1] + "=" + errorString + ";") + "');");
								}
								str += eval("(function(" + catchLine[1] + "){" + catchBlock + ";return echo.out;})('" + errorString + "')");
							}
						} finally {
							if (findex != -1) {
								echo.out = "";
								str += eval("(function(){" + code.substring(findex + code.match(TRY["finally"])[0].length, eindex) + ";return echo.out; })()");
							}
						}
						return pre + str + post;
					},
					"parser": function (code, obj, bind) {
						var TRY = $c.TEMPLATE_TAG_CONFIG.TRY,
							lookups = {}, code_result,
							blocks = __processBlocks(TRY.begin, TRY.end, code, lookups);

						var obj = blocks[0],
							block = obj.block,
							id = obj.id;

						return __logic_parser(TRY.helper(obj.code.replace(id, block), lookups));
						//return __logic_parser(code_result);
					}

				},
				/* end error handling config */

				/* tokens config */
				VARIABLE:/(?:\$\{((?!\$)\S)*?\})|(?:\{\{((?!\{\{)\S)*?\}\})/gi,
				VARIABLE_NAME:function(match){
					return  match.slice(2,match.contains('}}') ? -2 : -1);
				},
				DECLARE:{
					"syntax": /(?:\$\{DECLARE (.*?);?\})|(?:\{\{DECLARE (.*?);?\}\})/i,
					"parser": function (htmlTemplate, declare){
						var matches = declare.match($c.TEMPLATE_TAG_CONFIG.DECLARE.syntax),
							var_nameValue = (matches[1]||matches[2]).strip(';').split("=");

						//fillTemplate.declared[var_nameValue[0]] = var_nameValue[1];
						$c.merge(fillTemplate.declared, tryEval("({"+matches[1].replace_all('=',":")+"})"));
						return htmlTemplate.replace_all(declare,'');
					}
				}
				/* end tokens config */
			},
			TRIDENT:isTrident(),
			VERBOSE_LOGS:!!$GET("verbose"),
			VERSION: $w.__craydentVersion,
			VISIBLE: "visible",
			WAIT: "wait",
			WEBKIT:isWebkit(),
			WINDOWS:isWindows(),
			WINDOWS_MOBILE:isWindowsMobile(),
			noConflict:function (setTo) {
				var tmp = $;
				$ = setTo || _$overwrite;
				return tmp;
			},

			// methods

			$COOKIE:$COOKIE,
			$GET:$GET,
			$SET:$SET,
			$DEL:$DEL,
			$COMMIT:$COMMIT,
			$ROLLBACK:$ROLLBACK,
			ChromeVersion:ChromeVersion,
			Benchmarker:Benchmarker,
			FirefoxVersion:FirefoxVersion,
			IEVersion:IEVersion,
			OperaVersion:OperaVersion,
			SafariVersion:SafariVersion,
			Cursor:Cursor,
			OrderedList:OrderedList,
			Queue:Queue,
			Request:Request,
			Set:Set,
			addObjectPrototype:addObjectPrototype,
			addHTMLPrototype:addHTMLPrototype,
			ajax:ajax,
			cacheImages:cacheImages,
			cout:cout,
			cuid:cuid,
			error:error,
			fillTemplate:fillTemplate,
			foo:foo,
			getUniqueId:getUniqueId,
			isAmaya:isAmaya,
			isAndroid:isAndroid,
			isBlackBerry:isBlackBerry,
			isChrome:isChrome,
			isFirefox:isFirefox,
			isGecko:isGecko,
			isIE6:isIE6,
			isIE:isIE,
			isIPad:isIPad,
			isIPhone:isIPhone,
			isIPod:isIPod,
			isKHTML:isKHTML,
			isLinux:isLinux,
			isMac:isMac,
			isMobile:isMobile,
			isNull:isNull,
			isOpera:isOpera,
			isPalmOS:isPalmOS,
			isPresto:isPresto,
			isPrince:isPrince,
			isSafari:isSafari,
			isSymbian:isSymbian,
			isTrident:isTrident,
			isWebkit:isWebkit,
			isWindows:isWindows,
			isWindowsMobile:isWindowsMobile,
			killPropagation:killPropagation,
			logit:logit,
			now:now,
			observe:observe,
			parseBoolean:parseBoolean,
			parseRaw:parseRaw,
			rand:rand,
			tryEval:tryEval,
			wait:wait,
			xmlToJson:xmlToJson,
			zipit:zipit
		},
		$c = Craydent;


/*----------------------------------------------------------------------------------------------------------------
 /-	String class Extensions
 /---------------------------------------------------------------------------------------------------------------*/
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

		"description": "http://www.craydent.com/library/1.8.0/docs#string.capitalize",
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
_ext(String, 'convertUTCDate', function (delimiter) {
	/*|{
		"info": "String class extension to convert date string to UTC format",
		"category": "String",
		"parameters":[
			{"delimiter": "(String) Character that delimits the date string"}],

		"overloads":[],

		"description": "http://www.craydent.com/library/1.8.0/docs#string.convertUTCDate",
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
_ext(String, 'count', function (word) {
	/*|{
		"info": "String class extension to count the number of occurences of a word or phrase",
		"category": "String",
		"parameters":[
			{word": "(String) Word or phrase to count"}],

		"overloads":[],

		"description": "http://www.craydent.com/library/1.8.0/docs#string.count",
		"returnType": "(Int)"
	}|*/
	try {
		if (!$c.isRegExp(word)) {
			word = new RegExp(word, "g");
		} else if (!word.global) {
			var reg_str = word.toString(),
				index = reg_str.lastIndexOf('/'),
				options = reg_str(index + 1);

			reg_str = reg_str.substring(1,index);
			word = new RegExp(word, "g"+options);
		}
		return (this.match(word) || []).length;
	} catch (e) {
		error("String.count", e);
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

		"description": "http://www.craydent.com/library/1.8.0/docs#string.cut",
		"returnType": "(String)"
	}|*/
	try {
		if (isNull(si) || isNull(si)) {
			return this;
		}
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

		"description": "http://www.craydent.com/library/1.8.0/docs#string.ellipsis",
		"returnType": "(String)"
	}|*/
	try {
		after = after || 0;
		if (before + after > this.length) {
			return this;
		}
		return this.cut(before, -1*after, "...");
	} catch (e) {
		error('String.ellipsis', e);
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
				{"max": "(Int) The maximum number of records to process"}]}
			{"parameters":[
				{"objs": "(Objects[]) Objects to fill the template variables"},
				{"max": "(Int) The maximum number of records to process"}]}],

		"description": "http://www.craydent.com/library/1.8.0/docs#string.fillTemplate",
		"returnType": "(String)"
	}|*/
	try {
		return fillTemplate(this, arr_objs, offset, max, bound);
	} catch (e) {
		error('String.fillTemplate', e);
	}
});
_ext(String, 'highlight', function (search, clazz, tag) {
	/*|{
		"info": "String class extension to surround search words with the given tag(default span) and class (default chighlight)",
		"category": "String",
		"parameters":[
			{"search": "(String) String to search"}],

		"overloads":[
			{"parameters":[
				{"search": "(RegExp) Regular expression to search"},
				{"clazz": "(String) Class to add for highlighting"}]},
			{"parameters":[
				{"search": "(RegExp) Regular expression to search"},
				{"clazz": "(String) Class to add for highlighting"}]},
			{"parameters":[
				{"search": "(String) String to search"},
				{"clazz": "(String) Class to add for highlighting"},
				{"tag": "(String) Tag to use to surround the search"}]}
			{"parameters":[
				{"search": "(String) String to search"},
				{"clazz": "(String) Class to add for highlighting"},
				{"tag": "(String) Tag to use to surround the search"}]}],

		"description": "http://www.craydent.com/library/1.8.0/docs#string.cut",
		"returnType": "(String)"
	}|*/
	try {
		clazz = clazz || "chighlight";
		tag = tag || "span";
		var txt = "", flags = "g";
		if ($c.isRegExp(search) && !search.source.contains("(")) {
			txt = "(" + search.source + ")";
			if (search.ignoreCase) {
				flags += "i";
			}
			if (search.multiline) {
				flags += "m";
			}
		} else if (!search.contains("(")) {
			txt = "(" + search + ")";
		}
		return this.replace((new RegExp(txt)).addFlags(flags),"<" + tag + " class=\"" + clazz + "\">$1</" + tag + ">");
	} catch (e) {
		error("String.highlight", e);
	}
}, true);
_ext(String, 'indexOfAlt', function(regex, pos) {
	/*|{
		"info": "String class extension to find the index based on a regular expression",
		"category": "String",
		"parameters":[
			{"regex": "(RegExp) Regular expression to check value against"}],

		"overloads":[
			{"parameters":[
				{"regex": "(RegExp) Regular expression to check value against"},
				{"pos": "(Int) Index offset to start"}]}],

		"description": "http://www.craydent.com/library/1.8.0/docs#string.indexOfAlt",
		"returnType": "(Int)"
	}|*/
	try {
		if (isNull(regex)) { return -1; }
		pos = pos || 0;
		var index = this.substring(pos).search(regex);
		return (index >= 0) ? (index + pos) : index;
	} catch (e) {
		error("String.indexOfAlt", e);
	}
}, true);
_ext(String, 'ireplace_all', function(replace, subject) {
	/*|{
		"info": "String class extension to replace all substrings ignoring case",
		"category": "String",
		"parameters":[
			{"replace": "(String) String to replace"},
			{"subject": "(String) String to replace with"}],

		"overloads":[],

		"description": "http://www.craydent.com/library/1.8.0/docs#string.ireplace_all",
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

		"description": "http://www.craydent.com/library/1.8.0/docs#string.isCuid",
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

		"description": "http://www.craydent.com/library/1.8.0/docs#string.isBlank",
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

		"description": "http://www.craydent.com/library/1.8.0/docs#string.isValidEmail",
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

		"description": "http://www.craydent.com/library/1.8.0/docs#string.lastIndexOfAlt",
		"returnType": "(Int)"
	}|*/
	try {
		regex = (regex.global) ? regex : new RegExp(regex.source, "g" + (regex.ignoreCase ? "i" : "") + (regex.multiLine ? "m" : ""));
		pos = pos || this.length;
		if(pos < 0) {
			pos = 0;
		}
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

		"description": "http://www.craydent.com/library/1.8.0/docs#string.ltrim",
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

	"description": "http://www.craydent.com/library/1.8.0/docs#string.pluralize",
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

		"overloads":[],

		"description": "http://www.craydent.com/library/1.8.0/docs#string.replace_all",
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

		"description": "http://www.craydent.com/library/1.8.0/docs#string.reverse",
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

		"description": "http://www.craydent.com/library/1.8.0/docs#string.rtrim",
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

		"description": "http://www.craydent.com/library/1.8.0/docs#string.sanitize",
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

		"description": "http://www.craydent.com/library/1.8.0/docs#string.singularize",
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
_ext(String, 'startsWith', _startsWith);
_ext(String, 'startWithAny', _startsWith);
_ext(String, 'strip', function(character) {
	/*|{
		"info": "String class extension to remove characters from the beginning and end of the string",
		"category": "String",
		"parameters":[
			{"character": "(Char[]) Character to remove"}],

		"overloads":[],

		"description": "http://www.craydent.com/library/1.8.0/docs#string.strip",
		"returnType": "(String)"
	}|*/
	return _strip(this, character);
}, true);
_ext(String, 'toCurrencyNotation', function (separator) {
	/*|{
	"info": "String class extension to change string to currency",
	"category": "String",
	"parameters":[],

	"overloads":[],

	"overloads":[
		{"parameters":[
		{"separator": "(Char) Character to use as delimiter"}]}],

	"description": "http://www.craydent.com/library/1.8.0/docs#string.toCurrencyNotation",
	"returnType": "(String)"
	}|*/
	try {
		separator = separator || ",";
		return this.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
	} catch (e) {
		error("String.toCurrencyNotation", e);
	}
}, true);
_ext(String, 'toDateTime', function (options) {
	/*|{
		"info": "String class extension to convert string to datetime",
		"category": "String",
		"parameters":[],

		"overloads":[
			{"parameters":[
				{"options": "(Object) specs with optional properties:<br />(Bool) gmt<br />(Int) offset<br />(String) format"}]}],

		"description": "http://www.craydent.com/library/1.8.0/docs#string.toDateTime",
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
		if (/\d\d\d\d-\d\d-\d\d/.test(strDatetime)) {
			strDatetime = this.replace("-","/").replace("-","/");
		}
		if ($c.isString(strDatetime)) {
			strDatetime = strDatetime.replace(/(am|pm)/i,' $1');
		}
		var dt = new Date(strDatetime);
		if (!dt.getDate()) {
			var parts = [],
				dtstring = this[0] == "(" ? this.substring(1,this.length-1) : this,
				chars = ["\\.","\\/","-","\\s*?"];

			for (var i = 0, len = chars.length; i < len && !dt.getDate(); i++) {
				// using format m(m).d(d).yy(yy) or d(d).m(m).yy(yy) or yy(yy).m(m).d(d) or yy(yy).d(d).m(m)
				// using format m(m)/d(d)/yy(yy) or d(d)/m(m)/yy(yy) or yy(yy)/m(m)/d(d) or yy(yy)/d(d)/m(m)
				// using format m(m)-d(d)-yy(yy) or d(d)-m(m)-yy(yy) or yy(yy)-m(m)-d(d) or yy(yy)-d(d)-m(m)
				var c = chars[i],
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
			var offset = !isNull(options.offset) ? options.offset : _getGMTOffset.call(new Date());
			dt = new Date(dt.valueOf() + offset * 60*60000);
		}
		return options.format ? dt.format(options.format) : dt;
	} catch (e) {
		error("String.toDateTime", e);
	}
}, true);
_ext(String, 'trim', function(character) {
	/*|{
		"info": "String class extension to remove characters from the beginning and end of the string",
		"category": "String",
		"parameters":[
			{"character": "(Char[]) Character to remove"}],

		"overloads":[],

		"description": "http://www.craydent.com/library/1.8.0/docs#string.trim",
		"returnType": "(String)"
	}|*/
	try {
		return _trim(this, undefined, character);
	} catch (e) {
		error("String.trim", e);
	}
}, true);

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

		"description": "http://www.craydent.com/library/1.8.0/docs#array.aggregate",
		"returnType": "(Array)"
	}|*/
	try {
		var rtn = this;
		for (var i = 0, len = pipelines.length; i < len; i++) {
			rtn = __processStage(rtn, pipelines[i]);
		}
		return rtn;
	} catch (e) {
		error("Array.aggregate", e);
	}
}, true);
_ext(Array, 'buildTree', function (parentFinder,childFinder,options) {
	/*|{
		"info": "Array class extension to create a parent/child hierarchy",
		"category": "Array",
		"parameters":[
			{"rootFinder": "(Function) Function to determine the parent.   Should return a boolean value."},
			{"childFinder": "(String) Property name of the object to use as a grouping."}],

		"overloads":[
			{"parameters":[
				{"rootFinder": "(Function) Function to determine the parent.   Should return a boolean value."},
				{"childFinder": "(Function) Function to determine the grouping."}]},

			{"parameters":[
				{"rootFinder": "(Function) Function to determine the parent.   Should return a boolean value."},
				{"childFinder": "(String) Property name of the object to use as a grouping."},
				{"options":"(Object) Options to customize properties,  Valid property is:<br />childProperty"}]},

			{"parameters":[
				{"rootFinder": "(Function) Function to determine the parent.   Should return a boolean value."},
				{"childFinder": "(String) Property name of the object to use as a grouping."},
				{"options":"(Object) Options to customize properties,  Valid property is:<br />childProperty"}]}],

		"description": "http://www.craydent.com/library/1.8.0/docs#array.buildTree",
		"returnType": "(Array)"
	}|*/
	try {
		options = options || {};
		var rtnArr = [];
		var i = 0,objt,cats=[],catDict={},tmp={}, singles = {};
		var prop = options.childProperty || "children";
		while(objt=this[i++]){
			var cat = $c.isFunction(childFinder) ? childFinder(objt) : objt[childFinder],
				rootFound = cats.contains(cat);

			objt[prop] = objt[prop] || [];
			if (rootFinder(objt)) {
				delete singles[cat];

				if (!rootFound && tmp[cat]) {
					objt[prop] = tmp[cat];
				}
				tmp[cat] = objt[prop];

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
				catDict[cat][prop].push(objt);
			}
		}
		for (var prop in singles) {
			if (!singles.hasOwnProperty(prop)) { continue; }
			for (var j = 0, len = singles[prop].length; j < len; j++) {
				singles[prop][j].children = [];

			}
			rtnArr = rtnArr.concat(singles[prop]);
		}
		return rtnArr;
	} catch (e) {
		error('Array.buildTree', e);
	}
});
_ext(Array, 'complexSort', function(specs){
	/*|{
		"info": "Array class extension to sort using lookups",
		"category": "Array",
		"parameters":[],

		"overloads":[
			{"parameters":[
				{"specs": "(Object) specs with common properties:<br />(Mixed) props<br />(Boolean) reverse<br />(Function) lookupprimer<br />(Function) propprimer<br />(Object) lookup<br />(Function) lookupfunc"}]}],

		"description": "http://www.craydent.com/library/1.8.0/docs#array.complexSort",
		"returnType": "(Array)"
	}|*/
	try {
		specs = specs || {};
		var defunc = function(v){return v;},
			props = specs.props,
			rev = specs.reverse,
			lprimer = specs.lookupprimer || defunc,
			pprimer = specs.propprimer || defunc,
			lookup = specs.lookup,
			lookupfunc = specs.lookupfunc || function(id){
					if(lookup){return lookup[id];}
					return id;
				};

		if(props.isString()){props=[props];}
		var craftVal = function(v,prop){
				return pprimer(
					(lookup && lookup[lprimer(v)][prop]) ||
					(lookupfunc && lookupfunc(lprimer(v))[prop]) ||
					v[prop]
				);
			},
			prop_sort = function (a,b,p) {
				p = p||0;
				var prop = props[p];

				if(!prop){return -1;}

				var aVal = craftVal(a,prop),//pprimer((lookup && lookup[lprimer(a)][prop]) || a[prop]),
					bVal = craftVal(b,prop);//pprimer((lookup && lookup[lprimer(b)][prop]) || b[prop]);

				if (aVal == bVal) {
					return prop_sort(a,b,p+1);
				}

				if (aVal > bVal) {return 1;}
				return -1;
			};
		this.sort(prop_sort);
		return rev && this.reverse || this;
	} catch (e) {
		error('Array.complexSort', e);
	}
},true);
_ext(Array, 'condense', function (check_values) {
	/*|{
		"info": "Array class extension to reduce the size of the Array removing blank strings, undefined's, and nulls",
		"category": "Array",
		"parameters":[],

		"overloads":[
			{"parameters":[
				{"check_values": "(Bool) Flag to remove duplicates"}]}],

		"description": "http://www.craydent.com/library/1.8.0/docs#array.condense",
		"returnType": "(Array)"
	}|*/
	return _condense(this, check_values);
}, true);
_ext(Array, 'count', function(condition) {
	/*|{
		"info": "Array class extension to count the length and optionally filter items first",
		"category": "Array",
		"parameters":[],

		"overloads":[
			{"parameters":[
				{"condition": "(Mixed) Query used in Array.where"}]}],

		"description": "http://www.craydent.com/library/1.8.0/docs#array.count",
		"returnType": "(Int)"
	}|*/
	return this.where(condition).length;
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

		"description": "http://www.craydent.com/library/1.8.0/docs#array.delete",
		"returnType": "(Array)"
	}|*/
	try {
		justOne = parseBoolean(isNull(justOne) ? true : isNull(justOne.justOne, justOne));
		// if no condition was given, remove all
		if (!condition) {
			return this.splice(0,justOne ? 1 : this.length);
		}

		var arr = [], indexes = [];
		_whereHelper(this, condition,function (obj, i) {
			if (justOne) {
				arr = arr.concat(this.splice(i,1));
				return false
			}
			indexes.push(i);
			return true;
		});
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
			{"fields": "(Mixed) Fields to use as the projection and unique comparison"}],

		"overloads":[
			{"parameters":[
				{"fields": "(Mixed) Fields to use as the projection and unique comparison"},
				{"condition": "(Mixed) Query following find/where clause syntax"}]}],

		"description": "http://www.craydent.com/library/1.8.0/docs#array.distinct",
		"returnType": "(Array)"
	}|*/
	try {
		if ($c.isString(fields)) {
			fields = [fields];
		}

//            var projection = {},len = fields.length;
//            for (var i = 0; i < len; i++) {
//                projection[fields[i]] = 1;
//            }


		return this.group(fields,condition);
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
				{"thisObject": "(Mixed) Context for the callback function"}]}],

		"description": "http://www.craydent.com/library/1.8.0/docs#array.every",
		"returnType": "(Bool)"
	}|*/
	try {
		var thisObject = thisObject || this;
		for (var i= 0, n= this.length; i<n; i++)
			if (this[i] && !callback.call(thisObject, this[i], i, this))
				return false;
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

	"description": "http://www.craydent.com/library/1.8.0/docs#array.filter",
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
_ext(Array, 'group', function(params) {
	/*|{
		"info": "Array class extension to group records by fields",
		"category": "Array",
		"parameters":[
			{"params": "(Object) specs with common properties:<br />(Object) key<br />(Mixed) cond<br />(Function) reduce<br />(Object) initial"}],

		"overloads":[],

		"description": "http://www.craydent.com/library/1.8.0/docs#array.group",
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
			condition = params.cond,
			reduce = params.reduce || foo,
			initial = params.initial || {},
			keyf = params.keyf,
			finalize = params.finalize || foo;
		if ($c.isString(key)) {
			key = key.split(',');
		}
		if ($c.isArray(key)) {
			var tmp = {};
			for (var i = 0, len = key.length; i < len; i++) {
				tmp[key[i]] = 1;
			}
			key = tmp;
		}

		var props = $c.keys(initial),
			key = $c.keys(key),
			arr = [], result = {}, id = suid();
		_whereHelper(this, condition,function (obj, i) {
			// _groupFieldHelper creates a grouping string based on the field value pairs
			var fields = key;
			if (!key && keyf) {
				fields = $c.isFunction(keyf) ? keyf(doc) : keyf;
			}
			var prop = _groupFieldHelper(obj, fields), addit = false;
			if (!result[prop]) {
				addit = true;
				var tmp = $c.duplicate(initial);
				result[prop] = tmp;
			}
			var curr = $c.duplicate(obj), item;
			reduce(curr, result[prop]);
			item = _copyWithProjection(fields, obj);
			item[id] = prop;
			addit && arr.push(item);
			return true;
		});

		for (var i = 0, len = arr.length; i < len; i++) {
			arr[i] = finalize($c.merge(arr[i],result[arr[i][id]]));
		}
		return arr;
	} catch (e) {
		error("Array.group", e);
		return false;
	}
});
_ext(Array, 'groupBy', function(clause){ // TODO: reconsider this with .group
	/*|{
		"info": "Array class extension to ",
		"category": "Array",
		"parameters":[
			{"clause": "(Mixed) "}],

		"overloads":[],

		"description": "http://www.craydent.com/library/1.8.0/docs#array.groupBy",
		"returnType": "(Array)"
	}|*/
	try {
		var props = [];
		if ($c.isObject(clause)) {
			props = $c.keys(clause);
		}
		if ($c.isString(clause)) {
			props = clause.split(',');
		}

		clause = "${" + props.join("},${") + "}";

		var arr = [];
		var temp = {};
		// loop through each record
		for (var i = 0, len = this.length; i < len; i++) {
			var obj = this[i],
				nprop = fillTemplate(clause,obj);
			temp[nprop] = temp[nprop] || {};
			for (var prop in obj) {
				if (!obj.has(prop)) { continue; }
				var propOnly = prop.replace(/.*\.(.*$)/, '$1'),
					agg = prop.replace("."+propOnly, '');

				if (props.indexOf(propOnly)) {

					switch (agg) {
						case "avg":
							var avg = temp[nprop].avg = temp[nprop].avg || 0,
								n = temp[nprop].n = temp[nprop].n || 1;
							temp[nprop].avg = (obj[prop]+avg*n)/temp[nprop].n++;
							break;
						case "checksum_agg":
							break;
						case "sum":
							temp[nprop].sum = temp[nprop].sum || 0;
							temp[nprop].sum += obj[prop];
							break;
						case "count":
							temp[nprop].count = temp[nprop].count || 0;
							temp[nprop].count++;
							break;
						case "stddev":
							break;
						case "count_big":
							break;
						case "stdevp":
							break;
						case "grouping":
							break;
						case "var":
							break;
						case "grouping_id":
							break;
						case "varp":
							break;
						case "max":
							break;
					}
				}
			}
		}

		return this;
	} catch (e) {
		error('Array.groupBy', e);
	}
}, true);
_ext(Array, 'indexOf', function(value) {
	/*|{
		"info": "Array class extension to implement indexOf",
		"category": "Array",
		"parameters":[
			{"value": "(Mixed) value to find"}],

		"overloads":[],

		"description": "http://www.craydent.com/library/1.8.0/docs#array.indexOf",
		"returnType": "(Int)"
	}|*/
	return _indexOf(this, value);
}, true);
_ext(Array, 'indexOfAlt', function(value, func) {
	/*|{
		"info": "Array class extension to find index of a value based on a callback function",
		"category": "Array",
		"parameters":[
			{"value": "(Mixed) value to find"},
			{"func": "(Function) Callback function used to do the comparison"}],

		"overloads":[],

		"description": "http://www.craydent.com/library/1.8.0/docs#array.indexOfAlt",
		"returnType": "(Array)"
	}|*/
	try {
		var len = this.length,
			i = 0;
		while (i < len) {
			if ($c.isRegExp(value) && value.test(this[i])) { return i;
			} else if (value instanceof Object ? func(this[i], value) : func(this[i]) === value) return i;
			++i;
		}
		return -1;
	} catch (e) {
		error("Array.indexOfAlt", e);
	}
}, true);
_ext(Array, "innerJoin", function (arr, on) {
	/*|{
		"info": "Array class extension to do an inner join on arrays",
		"category": "Array",
		"parameters":[
			{"arr": "(Array) Array to be joined with"},
			{"on": "(String) Condition to join on"}],

		"overloads":[],

		"description": "http://www.craydent.com/library/1.8.0/docs#array.innerJoin",
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

		"description": "http://www.craydent.com/library/1.8.0/docs#array.insert",
		"returnType": "(Bool)"
	}|*/
	try {
		if ($c.isArray(value)) {
			this.concat(value);
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

		"description": "http://www.craydent.com/library/1.8.0/docs#array.insertAfter",
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
_ext(Array, 'insertBefore', function(index, value) {
	/*|{
		"info": "Array class extension to add to the array before a specific index",
		"category": "Array",
		"parameters":[
			{"index": "(Int) Index to add before"},
			{"value": "(Mixed) Value to add"}],

		"overloads":[],

		"description": "http://www.craydent.com/library/1.8.0/docs#array.insertBefore",
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
_ext(Array, 'isEmpty', function() {
	/*|{
		"info": "Array class extension to check if the array is empty",
		"category": "Array",
		"parameters":[],

		"overloads":[],

		"description": "http://www.craydent.com/library/1.8.0/docs#array.isEmpty",
		"returnType": "(Bool)"
	}|*/
	try {
		return (this.length == 0);
	} catch (e) {
		error("Array.isEmpty", e);
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

		"description": "http://www.craydent.com/library/1.8.0/docs#array.joinLeft",
		"returnType": "(Array)"
	}|*/
	try {
		return _joinHelper(this, arr, on);
	} catch (e) {
		error('Array.joinLeft', e);
	}
});
_ext(Array, "joinRight", function (arr, on) {
	// TODO: is this done right?
	/*|{
	"info": "Array class extension to do an outer right join on arrays",
	"category": "Array",
	"parameters":[
	{"arr": "(Array) Primary array to be joined with"},
	{"on": "(String) Condition to join on"}],

	"overloads":[
	{"parameters":[
	{"": ""},
	{"": ""},
	{"": ""}]}],

	"description": "http://www.craydent.com/library/1.8.0/docs#array.joinRight",
	"returnType": "(Array)"
	}|*/
	try {
		return _joinHelper(arr, this, on);
	} catch (e) {
		error('Array.joinRight', e);
	}
});
_ext(Array, 'limit', function(max) {
	/*|{
		"info": "Array class extension to return a limited amount of items",
		"category": "Array",
		"parameters":[
			{"max": "(Int) Maximum number of items to return"}],

		"overloads":[],

		"description": "http://www.craydent.com/library/1.8.0/docs#array.limit",
		"returnType": "(Array)"
	}|*/
	try {
		var arr = [];
		for (var i = 0; i < max && this[i]; i++){
			arr.push(this[i]);
		}
		return arr;
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

		"description": "http://www.craydent.com/library/1.8.0/docs#array.map",
		"returnType": "(Array)"
	}|*/
	try {
		var thisObject = arguments[1] || this,
			other= new Array(this.length);
		for (var i= 0, n= this.length; i<n; i++)
			if (i in this)
				other[i]= callback.call(thisObject, this[i], i, this);
		return other;
	} catch (e) {
		error("Array.map", e);
	}
}, true);
_ext(Array, 'mapReduce', function(map, reduce, options) {
	// TODO: implement mapReduce
	/*|{
	 "info": "Array class extension to run map-reduce aggregation over records",
	 "category": "Array",
	 "parameters":[
	 {"condition": "(Mixed) Query following find/where clause syntax"},
	 {"condition": "(Mixed) Query following find/where clause syntax"}],

	 "overloads":[
	 {"parameters":[
	 {"condition": "(Mixed) Query following find/where clause syntax"},
	 {"projection": "(Mixed) Indicate which properties to return"},
	 {"projection": "(Mixed) Indicate which properties to return"}]}],

	 "description": "http://www.craydent.com/library/1.8.0/docs#array.mapReduce",
	 "returnType": "(Array)"
	 }|*/
	try {

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

		"description": "http://www.craydent.com/library/1.8.0/docs#array.normalize",
		"returnType": "(Array)"
	}|*/
	try {
		var allProps = {}, arrObj = [], len = this.length, i;
		for(i = 0; i < len; i++) {
			var json = this[i];
			if (!$c.isObject(json)) {
				error("normalize", {description:'index: ' + i + ' (skipped) is not an object'});
				continue;
			}
			for(var prop in json) {
				if (json.hasOwnProperty(prop)) {
					allProps[prop] = '';
				}
			}
		}
		for(i = 0; i < len; i++) {
			arrObj.push($c.merge(allProps, this[i]));
		}
		return arrObj;
	} catch(e) {
		error("Array.normalize", e);
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

		"description": "http://www.craydent.com/library/1.8.0/docs#array.remove",
		"returnType": "(Mixed)"
	}|*/
	try {
		indexOf = indexOf || this.indexOf;
		var index = indexOf.call(this, value);
		if(index == -1) {
			return false;
		}
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
			{"indexOf": "(Function) Callback function to use to find the item based on thevalue"}]}],

	"description": "http://www.craydent.com/library/1.8.0/docs#array.removeAll",
	"returnType": "(Array)"
}|*/
	try {
		if (value) {
			indexOf = indexOf || this.indexOf;
			var  removed = [], index = indexOf.call(this, value);
			if (index == -1) {
				return false;
			}
			while (index != -1) {
				removed.push(this.remove(value, indexOf));
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

		"description": "http://www.craydent.com/library/1.8.0/docs#array.removeAt",
		"returnType": "(Mixed)"
	}|*/
	try {
		if(this[index] === undefined) {
			return false;
		}
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

	"description": "http://www.craydent.com/library/1.8.0/docs#array.replaceAt",
	"returnType": "(Array)"
	}|*/
	try {
		return this.splice(index, 1, value)[0];
	} catch (e) {
		error("Array.replaceAt", e);
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
				{"lookup": "(Object) Look up object to use as values instead of the array values."}]},,

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

		"description": "http://www.craydent.com/library/1.8.0/docs#array.sortBy",
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
			var aVal = primer((lookup && lookup[a][prop]) || a[prop]),
				bVal = primer((lookup && lookup[b][prop]) || b[prop]);

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
_ext(Array, 'toSet', function() {
	/*|{
		"info": "Array class extension to convert the array to a set",
		"category": "Array",
		"parameters":[],

		"overloads":[],

		"description": "http://www.craydent.com/library/1.8.0/docs#array.toSet",
		"returnType": "(Array)"
	}|*/
	try {
		for (var i = 0,index; i < this.length - 1; i++) {
			while ((index = this.indexOf(this[i],i+1)) != -1){
				this.removeAt(index);
			}
		}
	} catch (e) {
		error("Array.toSet", e);
		return false;
	}
}, true);
_ext(Array, 'trim', function(chars) {
	/*|{
		"info": "Array class extension to remove all white space from the beginning and end of all string values in the array",
		"category": "Array",
		"parameters":[],

		"overloads":[],

		"description": "http://www.craydent.com/library/1.8.0/docs#array.trim",
		"returnType": "(Bool)"
	}|*/
	try {
		var arr = [],
			alter = false;
		if ($c.isBoolean(chars)) {
			alter = true;
		}

		for (var i = 0, len = this.length; i < len; i++) {
			$c.isString(this[i]) && (arr[i] = this[i].toString().trim()) || (arr[i] = this[i]);
			alter && (this[i] = arr[i]);
		}
		return arr;
	} catch (e) {
		error("Array.trim", e);
		return false;
	}
}, true);
_ext(Array, 'update', function(condition, setClause, multi) {
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
				{"multi": "(Mixed) Flag to specify if multiple records should be updated"}]}],

		"description": "http://www.craydent.com/library/1.8.0/docs#array.update",
		"returnType": "(Array)"
	}|*/
	try {
		// if sql syntax convert to mongo object syntax
		if ($c.isString(condition)) {
			condition = _processClause(condition);
		}
		var setObject = {'$set':null};
		if ($c.isString(setClause)) {
			setClause = setClause.split(',');
			setObject['$set'] = {};
			for (var i = 0, len = setClause.length; i < len; i++) {
				var keyVal = setClause[i].split("=");
				setObject['$set'][_trim(keyVal[0])] = _trim(keyVal[0]);
			}
		}
		var found = false, plainObject = !setObject['$set'] && !setObject['$currentDate'];
		_whereHelper(this, condition, function (obj, i) {
			found  = true;
			if (plainObject) {
				this.splice(i,1,setObject);
			}
			for (var prop in (setObject['$set'] || {})) {
				setObject['$set'].has(prop) && obj.setProperty(prop, setObject['$set'][prop]);
			}
			if (setObject['$unset']) {
				for (var prop in setObject['$unset']) {
					setObject['$unset'].has(prop) && delete obj[prop];
				}
			}
			if (setObject['$currentDate']) {
				for (var prop in setObject['$currentDate']) {
					setObject['$currentDate'].has(prop) && (obj[prop] = new Date());
				}
			}
			if (setObject['$inc']) {
				for (var prop in setObject['$inc']) {
					setObject['$inc'].has(prop) && (obj[prop] += setObject['$inc'][prop]);
				}
			}
			if (setObject['$max']) {
				for (var prop in setObject['$max']) {
					var value = obj[prop];
					setObject['$max'].has(prop) && value < setObject['$max'][prop] && (obj[prop] = setObject['$max'][prop]);
				}
			}
			if (setObject['$min']) {
				var value = obj[prop];
				for (var prop in setObject['$min']) {
					var value = obj[prop];
					setObject['$min'].has(prop) && value > setObject['$min'][prop] && (obj[prop] = setObject['$min'][prop]);
				}
			}
			if (setObject['$mul']) {
				for (var prop in setObject['$mul']) {
					setObject['$mul'].has(prop) && (obj[prop] *= setObject['$mul'][prop]);
				}
			}
			if (setObject['$bit']) {
				for (var prop in setObject['$bit']) {
					if (!setObject['$bit'].has(prop) || !$c.isInt(obj[prop])) {continue;}
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
					var value = obj[prop];
					setObject['$rename'].has(prop) && delete obj[prop] && (obj[setObject['$rename'][prop]] = value);
				}
			}

			return  !(!multi || !multi.multi);
		});

		if (!found && multi && multi.upsert && plainObject) {
			this.push(setObject);
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

		"description": "http://www.craydent.com/library/1.8.0/docs#array.upsert",
		"returnType": "(Object)"
	}|*/
	try {
		prop = prop || "_id";
		callback = callback || foo;
		if ($c.isFunction(prop)) {
			callback = prop;
			prop = "_id";
		}

		var ids = [], refs = {}, insert = [];
		for (var i = 0, len = records.length; i < len; i++) {
			refs[records[i][prop]] = {record:records[i],index:i};
			ids.push(records[i][prop]);
		}


		var condition = {}, uIndex = [], iIndex = [], sIndex = [], uArr = [], iArr = [], sArr = [], j = 0;
		condition[prop] = {$in:ids};
		_whereHelper(this, condition, function (obj,i) {
			var ref = refs[obj[prop]],
				record = ref.record,
				isEqual = callback(obj,record),
				index = uIndex,
				arr = uArr;
			if (!isNull(isEqual) ? isEqual : $c.equals(record,obj)) {
				index = sIndex;
				arr = sArr;
			} else {
				$c.merge(obj, record);
			}
			index.push(i);
			arr.push(obj);
			ids.splice(ref.index-(j++), 1);
			return true;
		});
		for (var i = 0, len = ids.length; i < len; i++) {
			var objRef = refs[ids[i]];
			iIndex.push(this.length);
			iArr.push(objRef);
			this.push($c.duplicate(objRef));
			//this.push(refs[ids[i]]);
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
_ext(Array, 'where', function(condition, projection) {
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
				{"useReference": "(Bool) Flag to make a copy instead of using references"}]}],

		"description": "http://www.craydent.com/library/1.8.0/docs#array.where",
		"returnType": "(Array)"
	}|*/
	try {
		var useReference =  true;
		if (arguments.length == 2 && $c.isBoolean(projection)) {
			useReference = $c.isBoolean(projection);
		}

		// if no condition was given, return all
		if (!condition) {
			return this;
		}

		// check if there is query MongoDB syntax
		if (!projection && !/"\$or":|"\$and":|"\$in":|"\$nin":|"\$regex":|"\$gt":|"\$lt":|"\$gte":|"\$lte":|"\$exists":|"\$equals":|"\$ne":|"\$nor":|"\$type":|"\$text":|"\$mod":|"\$all":|"\$size":|"\$where":|"\$elemMatch":|"\$not":/.test(JSON.stringify(condition))) {
			var props=[],
				ncheck = function (o,c,p) {return $c.getProperty(o,p.prop) != c[p.prop]},
				rcheck = function (o,c,p) {return ncheck(o,c,p) && p.isReg && !c[p.prop].test($c.getProperty(o,p.prop))},
				check = ncheck;
			for (var p in condition) {
				var isReg = false;
				if (condition.hasOwnProperty(p)) {
					if ($c.isRegExp(condition[p])) {
						isReg = true;
						check = rcheck;
					}
					props.push({prop:p,isReg:isReg});
				}
			}

			return this.filter(function (obj) {
				var j = 0, prop;
				while (prop = props[j++]) {
					if (check(obj,condition,prop)) {
						return false;
					}
				}
				return true;
			});
		}

		var arr = [];
		_whereHelper(this, condition, function (obj,i) {
			return arr.push(useReference ? obj : _copyWithProjection(projection, obj));
		});

		return arr;
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
				{"options": "(Object) specs with optional properties:<br />(Bool) gmt<br />(Int) offset]}],

		"description": "http://www.craydent.com/library/1.8.0/docs#date.format",
		"returnType": "(String)"
	}|*/
	try {
		if(!$c.isValidDate(this)) {
			return;
		}
		options = options || {offset:0};
		/*
		 *  options properties:
		 *  gmt:true - convert to GMT
		 *  offset:offset from GMT
		 **/
		var localTimeZoneOffset = _getGMTOffset.call(this),
			datetime = options.offset ? new Date(this.valueOf() - (options.offset + (options.offset ? -1 : 1) * localTimeZoneOffset)*60*60000) : this,
			minute = datetime.getMinutes(),
			second = datetime.getSeconds(),
			GMTDiff = options.offset || datetime.getHours() - 24 - datetime.getUTCHours(),
			epoch = datetime.getTime(),
			timezones = {
				'Afghanistan Time':'AFT',
				'AIX specific equivalent of Central European Time':'DFT',
				'Alaska Daylight Time':'AKDT',
				'Alaska Standard Time':'AKST',
				'Arab Standard Time (Kuwait, Riyadh)':'AST',
				'Arabian Standard Time (Abu Dhabi, Muscat)':'AST',
				'Arabic Standard Time (Baghdad)':'AST',
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
				'Brunei Time':'BDT',
				'Cape Verde Time':'CVT',
				'Central Africa Time':'CAT',
				'Central Daylight Time (North America)':'CDT',
				'Central European Daylight Time':'CEDT',
				'Central European Summer Time (Cf. HAEC)':'CEST',
				'Central European Time':'CET',
				'Central Standard Time (Australia)':'CST',
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
				'Eastern Daylight Time (North America)':'EDT',
				'Eastern European Daylight Time':'EEDT',
				'Eastern European Summer Time':'EEST',
				'Eastern European Time':'EET',
				'Eastern Standard Time (North America)':'EST',
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
				'Mountain Standard Time (North America)':'MST',
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
				'Pacific Standard Time (North America)':'PST',
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
			currentTimezone = datetime.toTimeString().replace(/.*?\((.*?)\).*?/, '$1'),
			minuteWithZero = (minute < 10 ? "0" + minute : minute),
			secondsWithZero = (second < 10 ? "0" + second : second);

		if (options.gmt) {
			datetime = new Date(datetime.valueOf() - localTimeZoneOffset*60*60000);
			currentTimezone = "GMT";
			GMTDiff = 0;
		}

		var date = datetime.getDate(),
			day = datetime.getDay(),
			month = datetime.getMonth() + 1,
			year = datetime.getFullYear(),
			firstMonday = new Date((new Date('1/6/' + year)).getTime() + (1-(new Date('1/6/' + year)).getDay())*(24*60*60*1000)),
		//week = Math.ceil(Math.ceil((datetime - (firstMonday - (new Date('1/1/'+year)))) - (new Date('12/31/' + (year - 1))))/(7*24*60*60*1000)),
			week = datetime.getWeek() - 1,
			hour = datetime.getHours(),
			dayOfYear = datetime.getDayOfYear(),
			dayOfYearFrom1 = dayOfYear + 1,
			dayOfYearWithZero = (dayOfYearFrom1< 10 ? "00" + dayOfYearFrom1 : (dayOfYearFrom1 < 100 ? "0" + dayOfYearFrom1 : dayOfYearFrom1)),

			dateWithZero = (date < 10 ? "0" + date : date),
			threeLetterDay = ['\\S\\u\\n','\\M\\o\\n','\\T\\u\\e\\s','\\W\\e\\d','\\T\\h\\u','\\F\\r\\i', '\\S\\a\\t'][day],
			threeLetterMonth = ['\\J\\a\\n','\\F\\e\\b','\\M\\a\\r','\\A\\p\\r','\\M\\a\\y','\\J\\u\\n','\\J\\u\\l','\\A\\u\\g','\\S\\e\\p','\\O\\c\\t','\\N\\o\\v','\\D\\e\\c'][month - 1],
			hour24 = (hour < 10 ? "0" + hour : hour),
			GMTDiffFormatted = (GMTDiff > 0 ? "+" : "-") + (Math.abs(GMTDiff) < 10 ? "0" : "") + Math.abs(GMTDiff) + "00";



		return /*option d or %d*/format.replace(/%d|([^\\])d|^d/g, '$1' + dateWithZero).// replace all d's with the 2 digit day leading 0
		/*option D*/replace(/([^\\])D|^D/g, '$1' + threeLetterDay).// replace all D's with A textual representation of a day, three letters
		/*option j*/replace(/([^\\])j|^j/g, '$1' + date).// replace all j's with the day without leading 0
		/*option l*/replace(/([^\\])l|^l/g, '$1' + ['\\S\\u\\n\\d\\a\\y','\\M\\o\\n\\d\\a\\y','\\T\\u\\e\\s\\d\\a\\y','\\W\\e\\d\\n\\e\\s\\d\\a\\y','\\T\\h\\u\\r\\s\\d\\a\\y','\\F\\r\\i\\d\\a\\y', '\\S\\a\\t\\u\\r\\d\\a\\y'][day]).// replace all l's (lower case L) with A full textual representation of the day of the week
		/*option N*/replace(/([^\\])N|^N/g, '$1' + (day == 0 ? 7 : day)).// replace all N's with ISO-8601 numeric representation of the day of the week
		/*option S*/replace(/([^\\%]S)|^S/g, '$1' + (date > 3 ? '\\t\\h' : (date == 1 ? '\\s\\t' : (date == 2 ? '\\n\\d' : '\\r\\d')))).// replace all S's with English ordinal suffix for the day of the month, 2 characters
		/*option w*/replace(/([^\\])w|^w/g, '$1' + day).// replace all w's with Numeric representation of the day of the week (starting from 1)
		/*option w*/replace(/%w/g, day + 1).// replace all %w's with Numeric representation of the day of the week (starting from 0)
		/*option z*/replace(/([^\\])z|^z/g, '$1' + dayOfYear).// replace all z's with The day of the year (starting from 0)
		/*option %j*/replace(/%j/g, dayOfYearWithZero).// replace all %j's with The day of the year (starting from 1)

		/*option W*/replace(/([^\\])W|^W/g, '$1' + (week > 0 ? week : 52)).// replace all W's with ISO-8601 week number of the year, weeks staring on Monday
		/*option W*/replace(/%U/g, week < 10 ? "0" + week : week).// replace all %U's with ISO-8601 week number of the year, weeks staring on Monday

		/*option F*/replace(/([^\\])F|^F/g, '$1' + ['\\J\\a\\n\\u\\a\\r\\y','\\F\\e\\b\\r\\u\\a\\r\\y','\\M\\a\\r\\c\\h','\\A\\p\\r\\i\\l','\\M\\a\\y','\\J\\u\\n\\e','\\J\\u\\l\\y','\\A\\u\\g\\u\\s\\t','\\S\\e\\p\\t\\e\\m\\b\\e\\r','\\O\\c\\t\\o\\b\\e\\r','\\N\\o\\v\\e\\m\\b\\e\\r','\\D\\e\\c\\e\\m\\b\\e\\r'][month - 1]).// replace all F's with A full textual representation of a month, such as January or March
		/*option m* or %m*/replace(/%m|([^\\])m|^m/g, '$1' + (month < 10 ? "0" + month : month)).// replace all m's with Numeric representation of a month, with leading zeros
		/*option M or %M*/replace(/%M|([^\\])M|^M/g, '$1' + threeLetterMonth).// replace all M's with A short textual representation of a month, three letters
		/*option n*/replace(/([^\\])n|^n/g, '$1' + month).// replace all n's with Numeric representation of a month, without leading zeros
		/*option t*/replace(/([^\\])t|^t/g, '$1' + (month == 2 && $c.isInt(year/4) ? 29 :[31,28,31,30,31,30,31,31,30,31,30,31][month - 1])).// replace all t's with Number of days in the given month

		/*option L*/replace(/([^\\])L|^L/g, '$1' + $c.isInt(year/4) ? 0 : 1).//replace all t's with Whether it's a leap year
		/*option o*/replace(/([^\\])o|^o/g, '$1' + (week > 0 ? year : year - 1)).//replace all o's with A full numeric representation of a year, 4 digits.  If 'W' belongs to the previous or next year, that year is used instead.
		/*option Y or %Y*/replace(/%Y|([^\\])Y|^Y/g, '$1' + year).//replace all t's with A full numeric representation of a year, 4 digits
		/*option y*/replace(/([^\\])y|^y/g, '$1' + year.toString().substring(year.toString().length - 2)).//replace all t's with A two digit representation of a year

		/*option a*/replace(/([^\\])a|^a/g, '$1' + (hour > 11 ? "\\p\\m" : "\\a\\m")).//replace all a's with Lowercase Ante Meridiem and Post Meridiem
		/*option A*/replace(/([^\\])A|^A/g, '$1' + (hour > 11 ? "\\P\\M" : "\\A\\M")).//replace all A's with Uppercase Ante Meridiem and Post Meridiem
		/*option B*/replace(/([^\\])B|^B/g, '$1' + Math.floor((((datetime.getUTCHours() + 1)%24) + datetime.getUTCMinutes()/60 + datetime.getUTCSeconds()/3600)*1000/24)).//replace all B's with Swatch Internet time
		/*option g*/replace(/([^\\])g|^g/g, '$1' + (hour == 0 ? 12 : hour > 12 ? hour - 12 : hour)).//replace all g's with 12-hour format of an hour without leading zeros
		/*option G*/replace(/([^\\])G|^G/g, '$1' + hour).//replace all G's with 24-hour format of an hour without leading zeros
		/*option h*/replace(/([^\\])h|^h/g, '$1' + (hour < 10 ? "0" + hour : (hour > 12 && hour - 12 < 10) ? "0" + (hour - 12) : hour)).//replace all h's with 12-hour format of an hour with leading zeros
		/*option H or %H*/replace(/%H|([^\\])H|^H/g, '$1' + hour24).//replace all H's with 24-hour format of an hour with leading zeros
		/*option i*/replace(/([^\\])i|^i/g, '$1' + minuteWithZero).//replace all i's with Minutes with leading zeros
		/*option s or %S*/replace(/%S|([^\\])s|^s/g, '$1' + secondsWithZero).//replace all s's with Seconds, with leading zeros
		/*option u*/replace(/([^\\])u|^u/g, '$1' + epoch*1000).//replace all u's with Microseconds
		/*option %L*/replace(/%L/g, epoch).//replace all u's with Milliseconds

		/*option e*/replace(/([^\\])e|^e/g, '$1' + currentTimezone).//replace all e's with Timezone identifier
		/*option I*/replace(/([^\\])I|^I/g, '$1' + Math.max((new Date(datetime.getFullYear(), 0, 1)).getTimezoneOffset(), (new Date(datetime.getFullYear(), 6, 1)).getTimezoneOffset()) > datetime.getTimezoneOffset() ? 1 : 0).//replace all I's with Whether or not the date is in daylight saving time

		/*option O*/replace(/([^\\])O|^O/g, '$1' + GMTDiffFormatted).//replace all O's with Difference to Greenwich time (GMT) in hours
		/*option P*/replace(/([^\\])P|^P/g, '$1' + GMTDiffFormatted.substr(0, 3) + ":" + GMTDiffFormatted.substr(3,2)).//replace all P's with Difference to Greenwich time (GMT) with colon between hours and minutes
		/*option T*/replace(/([^\\])T|^T/g, '$1' + timezones[currentTimezone]).//replace all T's with Timezone abbreviation
		/*option Z*/replace(/([^\\])Z|^Z/g, '$1' + (-1 * GMTDiff * 60)).//replace all Z's with Timezone offset in seconds. The offset for timezones west of UTC is always negative, and for those east of UTC is always positive


		/*option c*/replace(/([^\\])c|^c/g, '$1' + (datetime.toISOString ? datetime.toISOString() : "")).//replace all c's with ISO 8601 date
		/*option r*/replace(/([^\\])r|^r/g, '$1' + threeLetterDay + ', ' + dateWithZero + ' ' + threeLetterMonth + ' ' + year  + ' ' + hour24 + ':' + minuteWithZero + ':' + secondsWithZero + ' ' + GMTDiffFormatted).//replace all r's with RFC 2822 formatted date
		/*option U*/replace(/([^\\])U|^U/g, '$1' + epoch / 1000).//replace all U's with Seconds since the Unix Epoch (January 1 1970 00:00:00 GMT)
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

		"description": "http://www.craydent.com/library/1.8.0/docs#array.getDayOfYear",
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

		"description": "http://www.craydent.com/library/1.8.0/docs#array.getWeek",
		"returnType": "(Int)"
	}|*/
	try {
		var d = new Date(+this);
		d.setHours(0, 0, 0);
		d.setDate(d.getDate() + 4 - (d.getDay() || 7));
		return Math.ceil((((d - new Date(d.getFullYear(), 0, 1)) / 8.64e7) + 1) / 7);
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

		"description": "http://www.craydent.com/library/1.8.0/docs#array.isValidDate",
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

		"description": "http://www.craydent.com/library/1.8.0/docs#number.aboutEqualTo",
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

		"description": "http://www.craydent.com/library/1.8.0/docs#number.",
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

		"description": "http://www.craydent.com/library/1.8.0/docs#number.",
		"returnType": "(Bool)"
	}|*/
	try {
		return !_even(this);
	} catch (e) {
		error("Number.isOdd", e);
	}
}, true);
_ext(Number, 'toCurrencyNotation', function (separator) {
	/*|{
		"info": "Number class extension to change number to currency",
		"category": "Number",
		"parameters":[],

		"overloads":[
			{"parameters":[
				{"separator": "(Char) Character to use as delimiter"}]}],

		"description": "http://www.craydent.com/library/1.8.0/docs#number.toCurrencyNotation",
		"returnType": "(String)"
	}|*/
	try {
		separator = separator || ",";
		return this.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
	} catch (e) {
		error("Number.toCurrencyNotation", e);
	}
}, true);

/*----------------------------------------------------------------------------------------------------------------
 /-	Function class Extensions
 /---------------------------------------------------------------------------------------------------------------*/
_ext(Function, 'getParameters', function () {
	/*|{
		"info": "Function class extension to get parameters in definition",
		"category": "Function",
		"parameters":[],

		"overloads":[],

		"description": "http://www.craydent.com/library/1.8.0/docs#function.getParameters",
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

		"description": "http://www.craydent.com/library/1.8.0/docs#function.getName",
		"returnType": "(String)"
	}|*/
	try {
		return this.name;
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

		"description": "http://www.craydent.com/library/1.8.0/docs#function.getName",
		"returnType": "(String)"
	}|*/
	try {
		var className = this.getName(),
			cls = new extendee();
		namespace[className] = $w[className];
		if (inheritAsOwn) {
			for (var prop in cls) {
				if (!cls.hasOwnProperty(prop)) { continue; }
				this.prototype[prop] = /*this[prop] ||*/ this.prototype[prop] || cls[prop];//function(){return $c.getValue(cls[prop],arguments);};
			}
			for (var prop in extendee) {
				if (!extendee.hasOwnProperty(prop)) { continue; }
				this[prop] = this[prop] || extendee[prop];
			}
		}

		this.prototype.construct = this.prototype.construct || cls.construct || foo;

		return this;
	} catch (e) {
		error("Function.extends", e);
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

		"description": "http://www.craydent.com/library/1.8.0/docs#regexp.addFlag",
		"returnType": "(RegExp)"
	}|*/
	try {
		if (this.global && !flags.contains('g')) { flags += "g"; }
		if (this.ignoreCase && !flags.contains('i')) { flags += "i"; }
		if (this.multiline && !flags.contains('m')) { flags += "m"; }

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

		"description": "http://www.craydent.com/library/1.8.0/docs#object.",
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
			{"val": "(Mixed) Value to check"}],

		"overloads":[
			{"parameters":[
				{"val" "(Mixed) Value to check"},
				{"func": "(Function) Callback function used to do the comparison"}]},

			{"parameters":[
				{"val" "(Mixed) Value to check"},
				{"arr": "(Array) Array of values to return first matching value"}]}],

		"description": "http://www.craydent.com/library/1.8.0/docs#object.contains",
		"returnType": "(Bool)"
	}|*/
	try {
		switch(true) {
			case $c.isArray(this):
				if ($c.isFunction(func)) {
					return $c.indexOfAlt(this, func) != -1;
				} else if ($c.isArray(func)) {
					for (var i = 0,len = func.length;i < len; i++) {
						if (this.contains(func[i])) {
							return func[i];
						}
					}
				}
				return this.indexOf(val) != -1;
			case $c.isString(this):
				return ($c.isRegExp(val) ? this.search(val) : this.indexOf(val)) != -1;
			case $c.isObject(this):
				for (var prop in this) {
					if (!this.hasOwnProperty(prop)) { continue; }
					if ((func && func(this[prop])) || this[prop] == val) {
						return true;
					}
				}
				break;
			case $c.isNumber(this):
				return this.toString().indexOf(val) != -1;
		}
		return false;
	} catch (e) {
		error("Object.contains", e);
	}
});
_ao("copyObject", function () {
	/*|{
		"info": "Object class extension to copy an object including constructor",
		"category": "Object",
		"parameters":[],

		"overloads":[],

		"description": "http://www.craydent.com/library/1.8.0/docs#object.copyObject",
		"returnType": "(Object)"
	}|*/
	try {
		if (!this) {
			return undefined;
		}
		return _duplicate(typeof(this.constructor) == "function" ? new this.constructor() : {}, this, true);
	} catch (e) {
		error("Object.copyObject", e);
	}
});
_ao("duplicate", function (recursive) {
	/*|{
		"info": "Object class extension to copy an object excluding constructor",
		"category": "Object",
		"parameters":[],

		"overloads":[
			{"parameters":[
			{"recursive": "(Boolean) Flag to copy all child objects recursively"}]}],

		"description": "http://www.craydent.com/library/1.8.0/docs#object.duplicate",
		"returnType": "(Object)"
	}|*/
	try {
		return _duplicate({}, this, recursive);
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

		"description": "http://www.craydent.com/library/1.8.0/docs#object.eachProperty",
		"returnType": "(Object)"
	}|*/
	try {
		for (var prop in this) {
			if (!this.has(prop)) { continue; }
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

		"overloads":[],

		"description": "http://www.craydent.com/library/1.8.0/docs#object.equals",
		"returnType": "(Bool)"
	}|*/
	try {
		if ($c.isArray(props)) {
			var j = 0;
			while (prop = props[j++]) {
				if (this.hasOwnProperty(prop) && compare.hasOwnProperty(prop) && this[prop] != compare[prop]
					|| (!this.hasOwnProperty(prop) && compare.hasOwnProperty(prop)) || (this.hasOwnProperty(prop) && !compare.hasOwnProperty(prop))) {
					return false;
				}
			}
		}
		if (($c.isObject(this) && $c.isObject(compare)) || ($c.isArray(this) && $c.isArray(compare))) {
			for (var prop in compare){
				if (!compare.hasOwnProperty(prop)) {
					continue;
				}
				if (this[prop] !== compare[prop]) {
					return false;
				}
			}
			for (var prop in this){
				if (!this.hasOwnProperty(prop)) {
					continue;
				}
				if (this[prop] !== compare[prop]) {
					return false;
				}
			}
			return true;
		} else {
			return (this.toString() == compare.toString() && this.constructor == compare.constructor);
		}
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

		"description": "http://www.craydent.com/library/1.8.0/docs#object.every",
		"returnType": "(Bool)"
	}|*/
	try {
		thisObject = thisObject || this;
		for (var prop in this)
			if (this[prop] && !callback.call(thisObject, this[prop], prop, this))
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

		"description": "http://www.craydent.com/library/1.8.0/docs#object.getClass",
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
			{"path": "(String) Path to nested property"},
			{"delimiter": "(Char) Separator used to parse path"},
			{"options": "(Object) Options for ignoring inheritance, validPath, etc"}]}],

		"description": "http://www.craydent.com/library/1.8.0/docs#object.getProperty",
		"returnType": "(Mixed)"
	}|*/
	try {
		options = options || {};
		delimiter = delimiter || ".";
		var props = path.split(delimiter);
		var value = this;
		for (var i = 0, len = props.length; i < len; i++) {
			if (isNull(value[props[i]])
				|| (options.noInheritance && !value.hasOwnProperty(props[i]))) {
				return undefined;
			}
			value = value[props[i]];
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
				{"delimiter": "(Char) Separator used to parse path"},
				{"options": "(Object) Options for ignoring inheritance, validPath, etc"}]}],

		"description": "http://www.craydent.com/library/1.8.0/docs#object.getProperty",
		"returnType": "(Mixed)"
	}|*/
	try {
		if (!$c.isFunction(this)) {
			if (args && !dflt) {
				dflt = args;
			}
			return isNull(this, dflt) || this;
		}
		var args = arguments;
		if (typeof obj != 'undefined') { // this is needed to check if this function was called using $c.getValue
			args = [];
			for (var i = 1, len = arguments.length; i < len; i++) {
				args[i] = arguments[i];
			}
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
			{"callback": "(String) Property name to check"}],

		"overloads":[],

		"description": "http://www.craydent.com/library/1.8.0/docs#object.has",
		"returnType": "(Boolean)"
	}|*/
	return Object.prototype.hasOwnProperty.apply(this,arguments);
});
_ao("isArray", function () {
	/*|{
		"info": "Object class extension to check if object is an array",
		"category": "Object",
		"parameters":[],

		"overloads":[],

		"description": "http://www.craydent.com/library/1.8.0/docs#object.isArray",
		"returnType": "(Bool)"
	}|*/
	return _isArray(this);
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

		"description": "http://www.craydent.com/library/1.8.0/docs#object.isBetween",
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

		"description": "http://www.craydent.com/library/1.8.0/docs#object.isBoolean",
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

		"description": "http://www.craydent.com/library/1.8.0/docs#object.isDate",
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

		"description": "http://www.craydent.com/library/1.8.0/docs#object.isDomElement",
		"returnType": "(Bool)"
	}|*/
	try {
		if (isNull(this)) {return false;}
		return (this.nodeType == 1);
	} catch (e) {
		error('Object.isDomElement', e);
	}
});
_ao("isFloat", function() {
	/*|{
		"info": "Object class extension to check if object is a float",
		"category": "Object",
		"parameters":[],

		"overloads":[],

		"description": "http://www.craydent.com/library/1.8.0/docs#object.isFloat",
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

		"description": "http://www.craydent.com/library/1.8.0/docs#object.isFunction",
		"returnType": "(Bool)"
	}|*/
	try {
		if (isNull(this)) {return false;}
		return (this.constructor == Function);
	} catch (e) {
		error('Object.isFunction', e);
	}
});
_ao("isGeolocation", function () {
	/*|{
		"info": "Object class extension to check if object is a geolocation",
		"category": "Object",
		"parameters":[],

		"overloads":[],

		"description": "http://www.craydent.com/library/1.8.0/docs#object.isGeoLocation",
		"returnType": "(Bool)"
	}|*/
	try {
		if (isNull(this)) {return false;}
		return (this.constructor.toString().indexOf('function Geolocation()') == 0);
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

		"description": "http://www.craydent.com/library/1.8.0/docs#object.isInt",
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

		"description": "http://www.craydent.com/library/1.8.0/docs#object.isNumber",
		"returnType": "(Bool)"
	}|*/
	try {
		if (isNull(this)) {return false;}
		return (this.constructor == Number);
	} catch (e) {
		error('Object.isNumber', e);
	}
});
_ao("isObject", function (check_instance) {
	/*|{
		"info": "Object class extension to check if object is an object",
		"category": "Object",
		"parameters":[],

		"overloads":[],

		"description": "http://www.craydent.com/library/1.8.0/docs#object.isObject",
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

		"description": "http://www.craydent.com/library/1.8.0/docs#object.isRegExp",
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

		"description": "http://www.craydent.com/library/1.8.0/docs#object.isString",
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

		"description": "http://www.craydent.com/library/1.8.0/docs#object.isSubset",
		"returnType": "(Bool)"
	}|*/
	try {
		var isArray = $c.isArray(this) && $c.isArray(compare);
		if (($c.isObject(this) && $c.isObject(compare)) || isArray) {

			for (var prop in this){
				if (!this.hasOwnProperty(prop)) {
					continue;
				}
				if (!isArray && !compare.hasOwnProperty(prop) || isArray && !compare.contains(this[prop])) {
					return false;
				}
				if (sharesAny) {
					return true;
				}
			}

			return true;
		} else {
			return $c.contains(this.toString(), compare.toString()) && this.constructor == compare.constructor;
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

		"description": "http://www.craydent.com/library/1.8.0/docs#object.itemCount",
		"returnType": "(Int)"
	}|*/
	try {
		if ($c.isObject(this)) {
			var count = 0;
			for (var prop in this){
				if (this.hasOwnProperty(prop)) {
					count++;
				}
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

		"description": "http://www.craydent.com/library/1.8.0/docs#object.keyOf",
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
_ao("keys", function () {
	/*|{
		"info": "Object class extension to get the keys of the object",
		"category": "Object",
		"parameters":[],

		"overloads":[],

		"description": "http://www.craydent.com/library/1.8.0/docs#object.keys",
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
		error('Object.keys', e);
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

		"description": "http://www.craydent.com/library/1.8.0/docs#object.map",
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
_ao("merge", function (secondary, condition) {//shareOnly) {
	/*|
		{"info": "Object class extension to merge objects",
		"category": "Object",
		"parameters":[
			{"secondary": "(Object) Object to merge with"}],

		"overloads":[
			{"parameters":[
				{"secondary": "(Object) Object to merge with"},
				{"condition": "(Mixed) Flags to recurse, merge only shared value, clone etc"}]}],

		"description": "http://www.craydent.com/library/1.8.0/docs#object.merge",
		"returnType": "(Object)"
	}|*/
	try {
		condition = condition || {};
		var recurse = condition == "recurse" || condition.recurse,
			shared = condition == "onlyShared" || condition.onlyShared,
			objtmp = (condition == "clone" || condition.clone) ? $c.copyObject(this) : this,
			compareFunction = $c.isFunction(condition) ? condition : condition.compareFunction;

		for (var prop in secondary){
			if (secondary.hasOwnProperty(prop)) {
				if (shared) {
					// passing share Only
					if (objtmp[prop]) {
						objtmp[prop] = secondary[prop];
					}
				} else if (compareFunction && $c.isFunction(compareFunction)) {
					if ($c.isArray(objtmp) && objtmp[prop] && compareFunction(objtmp[prop], secondary[prop])) {
						objtmp[prop] = secondary[prop];
						continue;
					}
					objtmp.push($c.duplicate(secondary[prop]));
				} else {
					if ($c.isArray(objtmp) && (isNull(condition) || recurse)) {
						if (objtmp.indexOf(secondary[prop]) == -1) {
							objtmp.push(secondary[prop]);
						}
					} else {
						objtmp[prop] = secondary[prop];
					}
				}
			}
		}
		if (recurse) {
			var args = [],
				removeCount = 1;
			for (var aprop in arguments) {
				if (!arguments.hasOwnProperty(aprop)) { continue; }
				if ($c.isInt(aprop)) {
					args.push(arguments[aprop]);
				}
			}
			var noThis = false;
			if (typeof obj != "undefined") {
				noThis = true;
				removeCount = 2;
			}
			args.splice(0,removeCount,objtmp);
			objtmp = $c.merge.apply(noThis?obj:this, args);
		}
		return objtmp;
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

		"description": "http://www.craydent.com/library/1.8.0/docs#object.setProperty",
		"returnType": "(Bool)"
	}|*/
	try {
		options = options || {};
		delimiter = delimiter || ".";
		var props = path.split(delimiter);
		var obj = this;
		for (var i = 0, len = props.length; i < len; i++) {
			if (i + 1 == len) {
				obj[props[i]] = value;
				return true;
			}
			obj[props[i]] = obj[props[i]] || {};
			obj = obj[props[i]];
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
				{"delimiter": "(Char) Character to separate the property from the value"}]}

			{"parameters":[
				{"delimiter": "(Char) Character to separate the property from the value"},
				{"prefix": ""(Char) Character to prefix the property name}]}

			{"parameters":[
				{"delimiter": "(Char) Character to separate the property from the value"},
				{"prefix": "(Char) Character to prefix the property name"},
				{"urlEncode": "(Bool) Flag to url encode the property and value"}]}],

		"description": "http://www.craydent.com/library/1.8.0/docs#",
		"returnType": "(String)"
	}|*/
	try {
		delimiter = delimiter || '=';
		prefix = prefix || '&';
		var str = '';
		for (var prop in this) {
			if (this.hasOwnProperty(prop)) {
				urlEncode &&
				(str += prefix + encodeURIComponent(prop) + delimiter + encodeURIComponent(this[prop])) || (str += prefix + prop + delimiter + this[prop]);
			}
		}
		return str;
	} catch (e) {
		error('Object.toStringAlt', e);
	}
}, true);

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

function JSZip(compression) {
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
JSZip.prototype.add = function(name, data, o){
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
JSZip.prototype.folder = function(name){
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
JSZip.prototype.find = function(needle) {
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
JSZip.prototype.remove = function(name) {
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
JSZip.prototype.generate = function(asBytes) {
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
				// internal file attributes TO DO
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

JSZip.prototype.decToHex = function(dec, bytes) {
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

JSZip.prototype.crc32 = function(str, crc) {

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
JSZip.prototype.clone = function() {
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


JSZip.prototype.utf8encode = function(input) {
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
/*
 json2.js
 2011-10-19

 Public Domain.

 NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.

 See http://www.JSON.org/js.html


 This code should be minified before deployment.
 See http://javascript.crockford.com/jsmin.html

 USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
 NOT CONTROL.


 This file creates a global JSON object containing two methods: stringify
 and parse.

 JSON.stringify(value, replacer, space)
 value       any JavaScript value, usually an object or array.

 replacer    an optional parameter that determines how object
 values are stringified for objects. It can be a
 function or an array of strings.

 space       an optional parameter that specifies the indentation
 of nested structures. If it is omitted, the text will
 be packed without extra whitespace. If it is a number,
 it will specify the number of spaces to indent at each
 level. If it is a string (such as '\t' or '&nbsp;'),
 it contains the characters used to indent at each level.

 This method produces a JSON text from a JavaScript value.

 When an object value is found, if the object contains a toJSON
 method, its toJSON method will be called and the result will be
 stringified. A toJSON method does not serialize: it returns the
 value represented by the name/value pair that should be serialized,
 or undefined if nothing should be serialized. The toJSON method
 will be passed the key associated with the value, and this will be
 bound to the value

 For example, this would serialize Dates as ISO strings.

 Date.prototype.toJSON = function (key) {
 function f(n) {
 // Format integers to have at least two digits.
 return n < 10 ? '0' + n : n;
 }

 return this.getUTCFullYear()   + '-' +
 f(this.getUTCMonth() + 1) + '-' +
 f(this.getUTCDate())      + 'T' +
 f(this.getUTCHours())     + ':' +
 f(this.getUTCMinutes())   + ':' +
 f(this.getUTCSeconds())   + 'Z';
 };

 You can provide an optional replacer method. It will be passed the
 key and value of each member, with this bound to the containing
 object. The value that is returned from your method will be
 serialized. If your method returns undefined, then the member will
 be excluded from the serialization.

 If the replacer parameter is an array of strings, then it will be
 used to select the members to be serialized. It filters the results
 such that only members with keys listed in the replacer array are
 stringified.

 Values that do not have JSON representations, such as undefined or
 functions, will not be serialized. Such values in objects will be
 dropped; in arrays they will be replaced with null. You can use
 a replacer function to replace those with JSON values.
 JSON.stringify(undefined) returns undefined.

 The optional space parameter produces a stringification of the
 value that is filled with line breaks and indentation to make it
 easier to read.

 If the space parameter is a non-empty string, then that string will
 be used for indentation. If the space parameter is a number, then
 the indentation will be that many spaces.

 Example:

 text = JSON.stringify(['e', {pluribus: 'unum'}]);
 // text is '["e",{"pluribus":"unum"}]'


 text = JSON.stringify(['e', {pluribus: 'unum'}], null, '\t');
 // text is '[\n\t"e",\n\t{\n\t\t"pluribus": "unum"\n\t}\n]'

 text = JSON.stringify([new Date()], function (key, value) {
 return this[key] instanceof Date ?
 'Date(' + this[key] + ')' : value;
 });
 // text is '["Date(---current time---)"]'


 JSON.parse(text, reviver)
 This method parses a JSON text to produce an object or array.
 It can throw a SyntaxError exception.

 The optional reviver parameter is a function that can filter and
 transform the results. It receives each of the keys and values,
 and its return value is used instead of the original value.
 If it returns what it received, then the structure is not modified.
 If it returns undefined then the member is deleted.

 Example:

 // Parse the text. Values that look like ISO date strings will
 // be converted to Date objects.

 myData = JSON.parse(text, function (key, value) {
 var a;
 if (typeof value === 'string') {
 a =
 /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
 if (a) {
 return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
 +a[5], +a[6]));
 }
 }
 return value;
 });

 myData = JSON.parse('["Date(09/09/2001)"]', function (key, value) {
 var d;
 if (typeof value === 'string' &&
 value.slice(0, 5) === 'Date(' &&
 value.slice(-1) === ')') {
 d = new Date(value.slice(5, -1));
 if (d) {
 return d;
 }
 }
 return value;
 });


 This is a reference implementation. You are free to copy, modify, or
 redistribute.
 */

/*jslint evil: true, regexp: true */

/*members "", "\b", "\t", "\n", "\f", "\r", "\"", JSON, "\\", apply,
 call, charCodeAt, getUTCDate, getUTCFullYear, getUTCHours,
 getUTCMinutes, getUTCMonth, getUTCSeconds, hasOwnProperty, join,
 lastIndex, length, parse, prototype, push, replace, slice, stringify,
 test, toJSON, toString, valueOf
 */


// Create a JSON object only if one does not already exist. We create the
// methods in a closure to avoid creating global variables.

var JSON;
if (!JSON) {
	JSON = {};
}

(function () {
	//    'use strict';

	function f(n) {
		// Format integers to have at least two digits.
		return n < 10 ? '0' + n : n;
	}

	if (typeof Date.prototype.toJSON !== 'function') {

		Date.prototype.toJSON = function (key) {

			return isFinite(this.valueOf())
				? this.getUTCFullYear()     + '-' +
			f(this.getUTCMonth() + 1) + '-' +
			f(this.getUTCDate())      + 'T' +
			f(this.getUTCHours())     + ':' +
			f(this.getUTCMinutes())   + ':' +
			f(this.getUTCSeconds())   + 'Z'
				: null;
		};

		String.prototype.toJSON      =
			Number.prototype.toJSON  =
				Boolean.prototype.toJSON = function (key) {
					return this.valueOf();
				};
	}

	var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
		escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
		gap,
		indent,
		meta = {    // table of character substitutions
			'\b': '\\b',
			'\t': '\\t',
			'\n': '\\n',
			'\f': '\\f',
			'\r': '\\r',
			'"' : '\\"',
			'\\': '\\\\'
		},
		rep;


	function quote(string) {

		// If the string contains no control characters, no quote characters, and no
		// backslash characters, then we can safely slap some quotes around it.
		// Otherwise we must also replace the offending characters with safe escape
		// sequences.

		escapable.lastIndex = 0;
		return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
			var c = meta[a];
			return typeof c === 'string'
				? c
				: '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
		}) + '"' : '"' + string + '"';
	}


	function str(key, holder) {

		// Produce a string from holder[key].

		var i,          // The loop counter.
			k,          // The member key.
			v,          // The member value.
			length,
			mind = gap,
			partial,
			value = holder[key];

		// If the value has a toJSON method, call it to obtain a replacement value.

		if (value && typeof value === 'object' &&
			typeof value.toJSON === 'function') {
			value = value.toJSON(key);
		}

		// If we were called with a replacer function, then call the replacer to
		// obtain a replacement value.

		if (typeof rep === 'function') {
			value = rep.call(holder, key, value);
		}

		// What happens next depends on the value's type.

		switch (typeof value) {
			case 'string':
				return quote(value);

			case 'number':

				// JSON numbers must be finite. Encode non-finite numbers as null.

				return isFinite(value) ? String(value) : 'null';

			case 'boolean':
			case 'null':

				// If the value is a boolean or null, convert it to a string. Note:
				// typeof null does not produce 'null'. The case is included here in
				// the remote chance that this gets fixed someday.

				return String(value);

			// If the type is 'object', we might be dealing with an object or an array or
			// null.

			case 'object':

				// Due to a specification blunder in ECMAScript, typeof null is 'object',
				// so watch out for that case.

				if (!value) {
					return 'null';
				}

				// Make an array to hold the partial results of stringifying this object value.

				gap += indent;
				partial = [];

				// Is the value an array?

				if (Object.prototype.toString.apply(value) === '[object Array]') {

					// The value is an array. Stringify every element. Use null as a placeholder
					// for non-JSON values.

					length = value.length;
					for (i = 0; i < length; i += 1) {
						partial[i] = str(i, value) || 'null';
					}

					// Join all of the elements together, separated with commas, and wrap them in
					// brackets.

					v = partial.length === 0
						? '[]'
						: gap
						? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']'
						: '[' + partial.join(',') + ']';
					gap = mind;
					return v;
				}

				// If the replacer is an array, use it to select the members to be stringified.

				if (rep && typeof rep === 'object') {
					length = rep.length;
					for (i = 0; i < length; i += 1) {
						if (typeof rep[i] === 'string') {
							k = rep[i];
							v = str(k, value);
							if (v) {
								partial.push(quote(k) + (gap ? ': ' : ':') + v);
							}
						}
					}
				} else {

					// Otherwise, iterate through all of the keys in the object.

					for (k in value) {
						if (Object.prototype.hasOwnProperty.call(value, k)) {
							v = str(k, value);
							if (v) {
								partial.push(quote(k) + (gap ? ': ' : ':') + v);
							}
						}
					}
				}

				// Join all of the member texts together, separated with commas,
				// and wrap them in braces.

				v = partial.length === 0
					? '{}'
					: gap
					? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}'
					: '{' + partial.join(',') + '}';
				gap = mind;
				return v;
		}
	}

	// If the JSON object does not yet have a stringify method, give it one.

	if (typeof JSON.stringify !== 'function') {
		JSON.stringify = function (value, replacer, space) {

			// The stringify method takes a value and an optional replacer, and an optional
			// space parameter, and returns a JSON text. The replacer can be a function
			// that can replace values, or an array of strings that will select the keys.
			// A default replacer method can be provided. Use of the space parameter can
			// produce text that is more easily readable.

			var i;
			gap = '';
			indent = '';

			// If the space parameter is a number, make an indent string containing that
			// many spaces.

			if (typeof space === 'number') {
				for (i = 0; i < space; i += 1) {
					indent += ' ';
				}

				// If the space parameter is a string, it will be used as the indent string.

			} else if (typeof space === 'string') {
				indent = space;
			}

			// If there is a replacer, it must be a function or an array.
			// Otherwise, throw an error.

			rep = replacer;
			if (replacer && typeof replacer !== 'function' && (typeof replacer === 'string' && replacer.trim()) &&
				(typeof replacer !== 'object' || typeof replacer.length !== 'number')) {
				throw new Error('JSON.stringify');
			}

			// Make a fake root object containing our value under the key of ''.
			// Return the result of stringifying the value.

			return str('', {
				'': value
			});
		};
	}


	// If the JSON object does not yet have a parse method, give it one.

	if (typeof JSON.parse !== 'function') {
		JSON.parse = function (text, reviver) {

			// The parse method takes a text and an optional reviver function, and returns
			// a JavaScript value if the text is a valid JSON text.

			var j;

			function walk(holder, key) {

				// The walk method is used to recursively walk the resulting structure so
				// that modifications can be made.

				var k, v, value = holder[key];
				if (value && typeof value === 'object') {
					for (k in value) {
						if (Object.prototype.hasOwnProperty.call(value, k)) {
							v = walk(value, k);
							if (v !== undefined) {
								value[k] = v;
							} else {
								delete value[k];
							}
						}
					}
				}
				return reviver.call(holder, key, value);
			}


			// Parsing happens in four stages. In the first stage, we replace certain
			// Unicode characters with escape sequences. JavaScript handles many characters
			// incorrectly, either silently deleting them, or treating them as line endings.

			text = String(text);
			cx.lastIndex = 0;
			if (cx.test(text)) {
				text = text.replace(cx, function (a) {
					return '\\u' +
						('0000' + a.charCodeAt(0).toString(16)).slice(-4);
				});
			}

			// In the second stage, we run the text against regular expressions that look
			// for non-JSON patterns. We are especially concerned with '()' and 'new'
			// because they can cause invocation, and '=' because it can cause mutation.
			// But just to be safe, we want to reject all unexpected forms.

			// We split the second stage into 4 regexp operations in order to work around
			// crippling inefficiencies in IE's and Safari's regexp engines. First we
			// replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
			// replace all simple value tokens with ']' characters. Third, we delete all
			// open brackets that follow a colon or comma or that begin the text. Finally,
			// we look to see that the remaining characters are only whitespace or ']' or
			// ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.

			if (/^[\],:{}\s]*$/
					.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
						.replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
						.replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

				// In the third stage we use the eval function to compile the text into a
				// JavaScript structure. The '{' operator is subject to a syntactic ambiguity
				// in JavaScript: it can begin a block or an object literal. We wrap the text
				// in parens to eliminate the ambiguity.

				j = eval('(' + text + ')');

				// In the optional fourth stage, we recursively walk the new structure, passing
				// each name/value pair to a reviver function for possible transformation.

				return typeof reviver === 'function'
					? walk({
					'': j
				}, '')
					: j;
			}

			// If the text is not JSON parseable, then a SyntaxError is thrown.

			throw new SyntaxError('JSON.parse');
		};
	}
}());

__cleanUp();
