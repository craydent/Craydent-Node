module.exports = function (pre) {
    var noAsync = process.env.noasync && process.env.noasync.toLowerCase() == 'true';
    var $s = require('../../common.js');
    var $t = require(pre + 'craydent-typeof/noConflict');
    var error = $s.error;
    require('../../submodules/_shared/run_func_array.js')($s);

    function duplicate (rec){
        return $s.duplicate(this,rec);
    }
    function syncroit (gen) {
        try {
            if ($t.isAsync(gen)) { return gen(); }
            return new Promise(function(res){
                var geno = gen();
                try {
                    $t.isGenerator(gen) && (function cb(value) {
                        var obj = geno.next(value);

                        if (!obj.done) {
                            if ($t.isPromise(obj.value)) {
                                return obj.value.then(cb).catch(cb);
                            }
                            setTimeout(function () {
                                cb(obj.value);
                            }, 0);
                        } else {
                            res($t.isNull(obj.value, value));
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
            throw e;
        }
    }
    function toStringAlt (obj, delimiter, prefix, urlEncode) {
        try {
            delimiter = delimiter || '=';
            prefix = prefix || '&';
            var str = '';
            for (var prop in obj) {
                if (obj.hasOwnProperty(prop)) {
                    var value = $s.isObject(obj[prop]) ? JSON.stringify(obj[prop]) : obj[prop];
                    urlEncode &&
                    (str += prefix + encodeURIComponent(prop) + delimiter + encodeURIComponent(value)) || (str += prefix + prop + delimiter + value);
                }
            }
            return str;
        } catch (e) {
            error && error('Object.toStringAlt', e);
        }
    }
    $s.toStringAlt = toStringAlt;
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
            $s.error("ajax", e);
        }
    }
    function foo () {
        /*|{
            "info": "Place holder function for a blank function",
            "category": "Utility",
            "parameters":[],

            "overloads":[],

            "url": "http://www.craydent.com/library/1.9.3/docs#foo",
            "returnType": "(void)"
        }|*/
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
            msFormat && (pr="{",pt="}");
            return pr + 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
                    return v.toString(16);
                }) + pt;
        } catch (e) {
            error('cuid', e);
        }
    }
    function matchPropAndConstructor (expected) {
        if (expected === undefined) {
            expected = {};
        }
        for (var prop in this.actual) {
            if (!this.actual.hasOwnProperty(prop)) { continue; }
            var val = expected[prop];
            if (val == undefined || val.constructor != this.actual[prop].constructor) {
                return false;
            }
        }
        return true;
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
    return {
        noAsync: noAsync,
        ajax: ajax,
        duplicate: duplicate,
        syncroit: syncroit,
        foo: foo,
        cuid: cuid,
        isNull: $t.isNull,
        matchPropAndConstructor: matchPropAndConstructor
    }
}