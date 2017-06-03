/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.8.2                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var cm = require('./common'),
    _ext = cm.ext;
//TODO: finish

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
        params.json_parser = params.json_parser || JSON.parse;

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
                            body.data = $c.tryEval(body.data, params.json_parser) || body.data;
                        }
                        var resrej = alwaysResolve ? resolve : reject;
                        _run_func_array.call(ctx, params.onerror, [body.data, params.hitch, this, res.statusCode]);
                        _run_func_array.call(ctx, params.oncomplete, [body.data, params.hitch, this, res.statusCode]);
                        resrej(body.data);
                    });
                    res.on('end', function () {
                        if (params.dataType.toLowerCase() == 'json') {
                            body.data = $c.tryEval(body.data, params.json_parser) || body.data;
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
                var req_body = $c.isObject(params.data) && ~params.contentType.indexOf("/json") ? JSON.stringify(params.data) : params.data;
                req.write(req_body || '');
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