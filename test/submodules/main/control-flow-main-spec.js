var pre = "@craydent/";
delete global.$c;
delete global.__craydentNoConflict;
delete global.navigator;

try { require.cache[require.resolve('../../../common.js')] && delete require.cache[require.resolve('../../../common.js')]; }catch(e){}
try { require.cache[require.resolve(pre + 'craydent-array')] && delete require.cache[require.resolve(pre + 'craydent-array')]; }catch(e){}
try { require.cache[require.resolve(pre + 'craydent-class')] && delete require.cache[require.resolve(pre + 'craydent-class')]; }catch(e){}
try { require.cache[require.resolve(pre + 'craydent-cli')] && delete require.cache[require.resolve(pre + 'craydent-cli')]; }catch(e){}
try { require.cache[require.resolve(pre + 'craydent-control-flow')] && delete require.cache[require.resolve(pre + 'craydent-control-flow')]; }catch(e){}
try { require.cache[require.resolve(pre + 'craydent-date')] && delete require.cache[require.resolve(pre + 'craydent-date')]; }catch(e){}
try { require.cache[require.resolve(pre + 'craydent-fs')] && delete require.cache[require.resolve(pre + 'craydent-fs')]; }catch(e){}
try { require.cache[require.resolve(pre + 'craydent-function')] && delete require.cache[require.resolve(pre + 'craydent-function')]; }catch(e){}
try { require.cache[require.resolve(pre + 'craydent-http')] && delete require.cache[require.resolve(pre + 'craydent-http')]; }catch(e){}
try { require.cache[require.resolve(pre + 'craydent-json-parser')] && delete require.cache[require.resolve(pre + 'craydent-json-parser')]; }catch(e){}
try { require.cache[require.resolve(pre + 'craydent-number')] && delete require.cache[require.resolve(pre + 'craydent-number')]; }catch(e){}
try { require.cache[require.resolve(pre + 'craydent-object')] && delete require.cache[require.resolve(pre + 'craydent-object')]; }catch(e){}
try { require.cache[require.resolve(pre + 'craydent-regexp')] && delete require.cache[require.resolve(pre + 'craydent-regexp')]; }catch(e){}
try { require.cache[require.resolve(pre + 'craydent-string')] && delete require.cache[require.resolve(pre + 'craydent-string')]; }catch(e){}
try { require.cache[require.resolve(pre + 'craydent-template')] && delete require.cache[require.resolve(pre + 'craydent-template')]; }catch(e){}
try { require.cache[require.resolve(pre + 'craydent-typeof')] && delete require.cache[require.resolve(pre + 'craydent-typeof')]; }catch(e){}
try { require.cache[require.resolve(pre + 'craydent-utility')] && delete require.cache[require.resolve(pre + 'craydent-utility')]; }catch(e){}
try { require.cache[require.resolve(pre + 'craydent-xml-to-json')] && delete require.cache[require.resolve(pre + 'craydent-xml-to-json')]; }catch(e){}

try { require.cache[require.resolve(pre + 'craydent-array/noConflict')] && delete require.cache[require.resolve(pre + 'craydent-array/noConflict')]; }catch(e){}
try { require.cache[require.resolve(pre + 'craydent-class/noConflict')] && delete require.cache[require.resolve(pre + 'craydent-class/noConflict')]; }catch(e){}
try { require.cache[require.resolve(pre + 'craydent-cli/noConflict')] && delete require.cache[require.resolve(pre + 'craydent-cli/noConflict')]; }catch(e){}
try { require.cache[require.resolve(pre + 'craydent-control-flow/noConflict')] && delete require.cache[require.resolve(pre + 'craydent-control-flow/noConflict')]; }catch(e){}
try { require.cache[require.resolve(pre + 'craydent-date/noConflict')] && delete require.cache[require.resolve(pre + 'craydent-date/noConflict')]; }catch(e){}
try { require.cache[require.resolve(pre + 'craydent-fs/noConflict')] && delete require.cache[require.resolve(pre + 'craydent-fs/noConflict')]; }catch(e){}
try { require.cache[require.resolve(pre + 'craydent-function/noConflict')] && delete require.cache[require.resolve(pre + 'craydent-function/noConflict')]; }catch(e){}
try { require.cache[require.resolve(pre + 'craydent-http/noConflict')] && delete require.cache[require.resolve(pre + 'craydent-http/noConflict')]; }catch(e){}
try { require.cache[require.resolve(pre + 'craydent-json-parser/noConflict')] && delete require.cache[require.resolve(pre + 'craydent-json-parser/noConflict')]; }catch(e){}
try { require.cache[require.resolve(pre + 'craydent-number/noConflict')] && delete require.cache[require.resolve(pre + 'craydent-number/noConflict')]; }catch(e){}
try { require.cache[require.resolve(pre + 'craydent-object/noConflict')] && delete require.cache[require.resolve(pre + 'craydent-object/noConflict')]; }catch(e){}
try { require.cache[require.resolve(pre + 'craydent-regexp/noConflict')] && delete require.cache[require.resolve(pre + 'craydent-regexp/noConflict')]; }catch(e){}
try { require.cache[require.resolve(pre + 'craydent-string/noConflict')] && delete require.cache[require.resolve(pre + 'craydent-string/noConflict')]; }catch(e){}
try { require.cache[require.resolve(pre + 'craydent-template/noConflict')] && delete require.cache[require.resolve(pre + 'craydent-template/noConflict')]; }catch(e){}
try { require.cache[require.resolve(pre + 'craydent-typeof/noConflict')] && delete require.cache[require.resolve(pre + 'craydent-typeof/noConflict')]; }catch(e){}
try { require.cache[require.resolve(pre + 'craydent-utility/noConflict')] && delete require.cache[require.resolve(pre + 'craydent-utility/noConflict')]; }catch(e){}
try { require.cache[require.resolve(pre + 'craydent-xml-to-json/noConflict')] && delete require.cache[require.resolve(pre + 'craydent-xml-to-json/noConflict')]; }catch(e){}


try { require.cache[require.resolve('../../../noConflict.js')] && delete require.cache[require.resolve('../../../noConflict.js')]; }catch(e){}
try { require.cache[require.resolve('../../../global.js')] && delete require.cache[require.resolve('../../../global.js')]; }catch(e){}
try { require.cache[require.resolve('../../../craydent.js')] && delete require.cache[require.resolve('../../../craydent.js')]; }catch(e){}

var $c = require(pre + 'craydent-control-flow');
var $s = require('../../../common.js');
var $t = require(pre + 'craydent-typeof');
require('../../../submodules/_shared/run_func_array')($s);

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
        if ($s.isString(params)) {
            params = { url : params };
        }
        var need_to_shard = false, browser_url_limit = 1500, query, url, rtn, alwaysResolve = params.alwaysResolve === false ?  false : true;
        params.dataType = params.dataType || 'json';
        params.hitch = params.hitch || "";
        params.onbefore = params.onbefore || [$s.foo];
        params.oncomplete = params.oncomplete || [$s.foo];
        params.ondata = params.ondata || [$s.foo];
        params.onerror = params.onerror || params.onresponse || [$s.foo];
        params.onsuccess = params.onsuccess || params.onresponse || [$s.foo];
        params.query = params.data || params.query || "";
        params.timeout = params.timeout || 120000;
        params.json_parser = params.json_parser || JSON.parse;

        if (!$s.isArray(params.onbefore)) {
            params.onbefore = [params.onbefore];
        }
        if (!$s.isArray(params.oncomplete)) {
            params.oncomplete = [params.oncomplete];
        }
        if (!$s.isArray(params.ondata)) {
            params.ondata = [params.ondata];
        }
        if (!$s.isArray(params.onerror)) {
            params.onerror = [params.onerror];
        }
        if (!$s.isArray(params.onresponse)) {
            params.onresponse = [params.onresponse];
        }
        if (!$s.isArray(params.onsuccess)) {
            params.onsuccess = [params.onsuccess];
        }

        if (params.onsuccess.length > 1 || params.onsuccess[0] == $s.foo) {
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

        if (params.query && $s.isObject(params.query)) {
            params.query = $s.toStringAlt(params.query, '=', '&', true);
        }
        params.query = (params.run ? "run=" + params.run :"") + (params.query || "");
        params.contentType = params.contentType || "application/json";
        params.onstatechange = params.onstatechange || $s.foo;

        fileUpload.onload = params.onfileload || $s.foo;
        fileUpload.onprogress = params.onprogress || $s.foo;
        fileUpload.onabort = params.onabort || $s.foo;
        fileUpload.onerror = params.onerror || $s.foo;
        fileUpload.onloadstart = params.onloadstart || $s.foo;

        if (params.method.toLowerCase() == "get") {
            params.url += params.query ? "?" + params.query : "";
            params.query = undefined;
        }

        $s.run_func_array.call((params.context||this),params.onbefore, [httpRequest, params.hitch, this]);

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
                var req = httpRequest.request($s.merge(defaults, params,{clone:true,intersect:true}), function (res) {
                    var body = {data:""}, ctx = params.context || res;
                    res.on('data', function (chunk) {
                        body.data += chunk;
                        $s.run_func_array.call(ctx, params.ondata, [chunk, body, req, params.hitch, this]);
                    });
                    res.on('error', function () {
                        if (params.dataType.toLowerCase() == 'json') {
                            body.data = $s.tryEval(body.data, params.json_parser) || body.data;
                        }
                        var resrej = alwaysResolve ? resolve : reject;
                        $s.run_func_array.call(ctx, params.onerror, [body.data, params.hitch, this, res.statusCode]);
                        $s.run_func_array.call(ctx, params.oncomplete, [body.data, params.hitch, this, res.statusCode]);
                        resrej(body.data);
                    });
                    res.on('end', function () {
                        if (params.dataType.toLowerCase() == 'json') {
                            body.data = $s.tryEval(body.data, params.json_parser) || body.data;
                        }
                        var methods = params.onsuccess;
                        if (!$s.isBetween(res.statusCode,200,299,true)) {
                            methods = params.onerror;
                        }
                        $s.run_func_array.call(ctx, methods, [body.data, params.hitch, this, res.statusCode]);
                        $s.run_func_array.call(ctx, params.oncomplete, [body.data, params.hitch, this, res.statusCode]);

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
                        $s.run_func_array.call(req, params.onerror, [null, params.hitch, this, e.code]);
                        $s.run_func_array.call(req, params.oncomplete, [null, params.hitch, this, e.code]);
                        var resrej = alwaysResolve ? resolve : reject;
                        return resrej(e);
                    }
                    $s.logit(e);
                });

                req.setTimeout(params.timeout, function(socket){
                    $s.run_func_array.call(params.thiss, params.onerror, ['', params.hitch, this, 504]);
                    $s.run_func_array.call(params.thiss, params.oncomplete, ['', params.hitch, this, 504]);
                    var e = new Error('connect ETIMEDOUT ' + params.host);
                    e.address = params.host;
                    e.code = "ETIMEDOUT";
                    e.errno = "ETIMEDOUT";
                    e.message = 'connect ETIMEDOUT ' + params.host;
                    e.port = params.port;
                    var resrej = alwaysResolve ? resolve : reject;
                    resrej(e);
                });
                var req_body = $s.isObject(params.data) && ~params.contentType.indexOf("/json") ? JSON.stringify(params.data) : params.data;
                req.write(req_body || '');
                req.end();
            } catch (e) {
                error("ajax.Promise", e);
            }
        });


        if (params.onsuccess.length == 1 && params.onsuccess[0] !== $s.foo) {
            prms._then = prms.then || $s.foo;
            prms.then = function (res, rej) { //noinspection CommaExpressionJS
                alwaysResolve = params.alwaysResolve || false;
                params.onsuccess.push(res);
                params.onerror.push(rej);
                return this;
            };
        }
        prms.otherwise = function (callback) {
            alwaysResolve = params.alwaysResolve || false;
            return params.onerror.push(callback),this; };
        prms['finally'] = function (callback) {
            alwaysResolve = params.alwaysResolve || false;
            return params.oncomplete.push(callback),this; };
        return prms;
    } catch (e) {
        error("ajax", e);
    }
}
ajax.get = function (params, returnData) {
    params.method = "GET";
    return ajax.apply(this, arguments);
};
ajax.delete = function (params, returnData) {
    params.method = "DELETE";
    return ajax.apply(this, arguments);
};
ajax.post = function (params, returnData) {
    params.method = "POST";
    return ajax.apply(this, arguments);
};
ajax.put = function (params, returnData) {
    params.method = "PUT";
    return ajax.apply(this, arguments);
};
$c.ajax = ajax;

$c.DEBUG_MODE = true;
describe ('Global methods', function () {
    beforeEach(function() {
        this.addMatchers({
            toMatchPropAndConstructor: function (expected) {
                if (expected === undefined) {
                    expected = {};
                }
                for (var prop in this.actual) {
                    if (!this.actual.hasOwnProperty(prop)) { continue; }
                    if (expected[prop] == undefined || expected[prop].constructor != this.actual[prop].constructor) {
                        return false;
                    }
                }
                return true;
            }
        });
    });
    describe("syncroit async test",function(){
        var result = [];
        beforeEach(function (done) {
            $c.syncroit(function *() {
                var resolve = true;

                function testPromise(){
                    return new Promise(function(res,rej){
                        if (resolve) { return res({resolve:resolve}); }
                        return rej({resolve:resolve});
                    });
                }

                result.push(yield testPromise());
                resolve = false;
                result.push(yield testPromise());
                result.push(yield $c.ajax("http://www.craydent.com/test/users.js"));
                done();

            });
        });
        it('syncoit',function(){
            var shouldbe = [
                {resolve: true},
                {resolve: false},
                {
                    users: [{username: 'mtglass', name: 'Mark Glass', age: 10},
                        { username: 'urdum', name: 'Ursula Dumfry', age: 10 },
                        { username: 'hydere', name: 'Henry Dere', age: 10 },
                        { username: 'cumhere', name: 'Cass Umhere', age: 10 },
                        { username: 'bstill', name: 'Bob Stillman', age: 10 },
                        { username: 'cirfuksalot', name: 'Camron', age: 10 },
                        { username: 'chadden', name: 'Corey Hadden', age: 30 },
                        { username: 'squeeb', name: 'Joseph Esquibel', age: 32 },
                        { username: 'cinada', name: 'Clark Inada', age: 31 },
                        { username: 'shurliezalot', name: 'Josh N', age: 10 },
                        { username: 'noze_nutin', name: 'Mai Boss', age: 10 },
                        { username: 'czass', name: 'Cater Zass', age: 10 },
                        {username: 'awesome_game', name: 'clash of clans', age: 21}]
                }
            ];
            for (var i = 0, len = result.length; i < len; i++) {
                expect(result[i]).toEqual(shouldbe[i]);
            }
        });

    });

});