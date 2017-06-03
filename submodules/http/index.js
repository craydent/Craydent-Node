/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.8.2                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var cm = require('./common'),
    $c = cm.$c,
    _ext = cm.ext,
    _toCurrencyNotation = cm.toCurrencyNotation,
    isNull = cm.isNull;

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
                        rout_parts = $c.condense(route.path.split('/'));

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

                            obj = $c.tryEval(vars[prop],JSON.parseAdvanced) || vars[prop];
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
                                var checker = "is"+type.capitalize(), value = $c.tryEval(vars[name],JSON.parseAdvanced);

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
                        eval("$c.syncroit(function* (){ return (yield* callback.call(cray, request, response, value)); }).then(_cleanup);");
                    } else if ($c.isAsync(callback)) {
                        eval("(async function (){ return (await callback.call(cray, request, response, value)); })().then(_cleanup);");
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