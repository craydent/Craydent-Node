import * as fs from 'fs';
import error from './error';
import foo from './foo';
import isObject from './isObject';
import * as _http from 'http';
import isString from './isString';
import isArray from './isArray';
import isFunction from './isFunction';
import isGenerator from './isGenerator';
import isAsync from './isAsync';
import ServerManager from './ServerManager';
import __setPath from '../private/__setPath'
import { CraydentHttp } from '../models/CraydentHttp'
import logit from './logit';
import strip from './strip';
import equals from './equals';
import replaceAll from './replaceAll';
import tryEval from './tryEval';
import condense from './condense';
import isNull from './isNull';
import isNumber from './isNumber';
import header from './header';
import toObject from './toObject';
import where from './where';
import merge from './merge';
import itemCount from './itemCount';
import isValidDate from './isValidDate';
import parseAdvanced from './parseAdvanced';
import parseBoolean from './parseBoolean';
import capitalize from './capitalize';
import include from './include';
import { AnyObject } from '../models/Arrays';

export interface CreateServerOptions {
    createServer: typeof _http.createServer;
    favicon: string;
}
export default function createServer(options: CreateServerOptions): CraydentHttp;
export default function createServer(callback: Function, options?: CreateServerOptions): CraydentHttp;
export default function createServer(callback, options?): CraydentHttp {
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
    if (!callback || isObject(callback)) {
        options = callback;
        callback = foo;
    }
    options = options || {};

    const http: CraydentHttp = (options.createServer || _http.createServer)(function (request, response) {
        let cray = new ServerManager(request, response);
        cray.server = http;
        $c.GarbageCollector = [];

        if (request.url == '/favicon.ico') {
            let code = 404;
            let cb = function (err, data) {
                if (err) { logit(err); code = 500; }
                response.writeHead(code, { "Content-Type": "image/x-icon" });
                response.end(data);
            };
            if (options.favicon) {
                try {
                    code = 200;
                    fs.readFile(options.favicon, function (err, data) {
                        cb(err, data || cray.RESPONSES[code]);
                    });
                    return;
                } catch (e) {
                    cb(e, cray.RESPONSES[500]);
                }
            }
            return;
        }
        function onRequestReceived(methods: string[], body?: any) {
            try {
                body = body || {};
                let url = strip(request.url.split(/[?#]/)[0], '/'), params = merge<any, AnyObject, any>(body, cray.$GET() || {}), haveRoutes = false;

                if (!equals(params, {})) {
                    cray.callback = params.callback || "";
                    delete params.callback;
                }
                let routes = where(http.routes, { method: { $in: methods } });
                let i = 0, route, execute = [];
                while (route = routes[i++]) {
                    cray.rest = haveRoutes = true;

                    let cbs = route.callback, no_route = false, vars = {} as AnyObject;
                    if (route.path != "/*" && route.path != "*") {
                        let rout_parts = condense(strip(route.path, "*").split('/')),
                            requ_parts = url.split('/');

                        if (rout_parts.length > requ_parts.length + itemCount(params)) {
                            continue;
                        }
                        rout_parts = condense(route.path.split('/'));

                        let var_regex = /\$\{(.*?)\}/;
                        for (let k = 0, l = 0, klen = Math.max(rout_parts.length, requ_parts.length); k < klen; k++, l++) {
                            let ro = rout_parts[k], re = decodeURIComponent(replaceAll(requ_parts[l], '+', '%20')), prop = (ro || "").replace(var_regex, '$1'),
                                qVal = params[prop];
                            if (ro == "*") {
                                break;
                            }
                            if (var_regex.test(ro)) {
                                if (qVal) {
                                    qVal = decodeURIComponent(replaceAll(qVal, '+', '%20'));
                                    vars[prop] = tryEval(qVal) || qVal;
                                    l--;
                                    continue;
                                }
                                vars[prop] = tryEval(re) || re;
                            } else if (ro != re) {
                                no_route = true;
                                break;
                            }
                        }
                    }
                    if (!no_route) {
                        for (let prop in params) {
                            if (!params.hasOwnProperty(prop)) { continue; }
                            let val = vars[prop] || params[prop], obj;
                            vars[prop] = isNull(params[prop]) ? undefined : (isString(val) ? decodeURIComponent(replaceAll(val, '+', '%20')) : val);

                            obj = tryEval(vars[prop], parseAdvanced) || vars[prop];
                            // this is probably a date
                            if (isNumber(obj) && obj.toString() != vars[prop]) {
                                continue;
                            }
                            vars[prop] = obj;
                        }
                        let parameters = route.parameters || [],
                            p = 0, parameter, bad = [];
                        while (parameter = parameters[p++]) {
                            let name = parameter.name, type = (parameter.type || "").toLowerCase();
                            if (parameter.required && isNull(vars[name])) {
                                bad.push("Required parameter " + name + " was not provided.");
                                continue;
                            }
                            vars[name] = vars[name] || parameter.default;
                            if (type == "string") { continue; }
                            if (type == "date") {
                                let dt = new Date(vars[name]);
                                if (isValidDate(dt)) {
                                    vars[name] = dt;
                                } else {
                                    bad.push("Invalid parameter type, " + name + " must be a " + type + ".");
                                }
                                continue;
                            }

                            if (type && type != "string") {
                                if (type == "regexp") { type = "RegExp"; }
                                let checker = eval(`is${capitalize(type)}`), value = tryEval(vars[name], parseAdvanced);
                                if (type == "bool") {
                                    type = "boolean";
                                    checker = "isBoolean";
                                    value = parseBoolean(value, true);
                                    vars[name] = parseBoolean(vars[name], true);
                                }

                                if (!checker(value) && !checker(vars[name])) {
                                    let an = type[0] in { a: 1, e: 1, i: 1, o: 1, u: 1 } ? "an" : "a";
                                    bad.push("Invalid parameter type, " + name + " must be " + an + " " + type + ".");
                                    continue;
                                }
                                vars[name] = value || vars[name];
                            }
                        }
                        if (bad.length) { return cray.send({ errors: bad }); }
                        let c = 0, cb;
                        while (cb = cbs[c++]) {
                            execute.push(cb);
                            execute[`v${c}`] = vars;
                        }
                    }
                }
                if (execute.length) {

                    function setUpNext(exec, i) {
                        i++;
                        if (isFunction(exec[0])) {
                            return function () {
                                exec[0] && exec[0].call(cray, request, response, execute[`v${i}`], setUpNext(exec.slice(1), i));
                            }
                        }
                        if (isGenerator(exec[0])) {
                            return eval("function* () {exec[0] && exec[0].call(cray, request, response, execute['v' + i], setUpNext(exec.slice(1), i));}");
                        }
                        if (isAsync(exec[0])) {
                            return eval("(async function () {exec[0] && (await exec[0].call(cray, request, response, execute['v' + i], setUpNext(exec.slice(1), i)));})()");
                        }
                    }
                    if (isGenerator(execute[0])) {
                        eval("$s.syncroit(function*(){_complete(yield* execute[0].call(cray, request, response, execute['v1'], setUpNext(execute.slice(1), 1)));});");
                    } else if (isAsync(execute[0])) {
                        eval("(async function(){_complete(await execute[0].call(cray, request, response, execute['v1'], setUpNext(execute.slice(1), 1)));})();");
                    } else {
                        _complete(execute[0].call(cray, request, response, execute['v1'], setUpNext(execute.slice(1), 1)));
                    }


                } else { _complete(); }
                function _complete(value?) {
                    if (haveRoutes && callback == foo) {
                        return cray.send(404, cray.RESPONSES["404"]);
                    }


                    // look for other node apps
                    if (~url.indexOf(':')) {
                        let parts = url.split(':'),
                            appPath = parts[0],
                            sindex = ~parts[1].indexOf('/') ? parts[1].indexOf('/') : 0,
                            port = parts[1].substring(0, sindex),
                            path = strip(parts[1].substring(sindex), '/'),
                            callingPath = process.cwd();
                        if (~callingPath.indexOf('\\')) { callingPath = callingPath.replace(/\\/g, '/'); }
                        appPath = `${callingPath}/${appPath}`;
                        let app = include(appPath) || {};
                        if (!process.listeners('uncaughtException').length) {
                            logit("listening for uncaught errors");
                            process.on('uncaughtException', function (err) {
                                if ((err as any).errno === 'EADDRINUSE') { console.error('caught address in use'); }
                                else { console.error(err); }
                                console.error(err, err.stack);
                            });
                        }
                        if (app.port || port) {
                            app.port = app.port || parseInt(port);
                            let query = request.url.split('?')[1] || "";
                            query && (query = `?${query}`);
                            return require('http').get(`http://localhost:${app.port}/${path}${query}`).on('response', function (response) {
                                let body = '';
                                response.on('data', function (chunk) { body += chunk; });
                                response.on('end', function () { cray.end(body); });
                            });
                        }
                    }
                    cray.echo.out = "";

                    function _cleanup(val) {
                        value = isNull(val, value);

                        if (!value && !cray.DEFER_END) {
                            cray.send(404, cray.RESPONSES["404"]);
                        }
                        if (value && !cray.response_sent) {
                            cray.send(value);
                        }
                    }
                    if (isGenerator(callback)) {
                        eval("$s.syncroit(function* (){ return (yield* callback.call(cray, request, response, value)); }).then(_cleanup);");
                    } else if (isAsync(callback)) {
                        eval("(async function (){ return (await callback.call(cray, request, response, value)); })().then(_cleanup);");
                    } else {
                        _cleanup(callback.call(cray, request, response, value));
                    }

                }
            } catch (e) {
                error('createServer.onRequestReceived', e);
                response.writeHead(500, (header as any).headers);
                return cray.end(JSON.stringify(cray.RESPONSES["500"]));
                // throw e;
            } finally {

            }
        }

        if (/delete|post|put/i.test(request.method)) {
            let body = "";
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
                let ct = cray.$HEADER('content-type', 'i') || "";
                if (~ct.indexOf('/json')) {
                    body = tryEval(body);
                } else if (~ct.indexOf('/x-www-form-urlencoded') || ~ct.indexOf('text/plain')) {
                    body = toObject(body) as any;
                }
                onRequestReceived(["all", request.method.toLowerCase(), "middleware"], body);
            });
        } else {
            onRequestReceived(["all", "get", "middleware"]);
        }
    });
    http.loadBalance = function (ips): CraydentHttp {
        let list = isString(ips) ? (ips as string).split(',') : ips,
            len = list.length;
        $c.BALANCE_SERVER_LIST = list as string[];

        if (isArray(list)) {
            let ip, i = 0;
            while (ip = list[i++]) {
                if (!/^\d{1,3}\.\d{1,3}\.\d{1,3}.\d{1,3}$/.test(ip)) { break; }
                if (i == len) { return this; }
            }
        }
        throw "parameter must be a string or an array of ip addresses";
    };

    http.routes = [];
    http.use = function (path, callback) {
        if ((isFunction(path) || isGenerator(path) || isAsync(path)) && !callback) {
            callback = path;
            path = '/*';
        }
        callback = (callback || []) as any;
        if (isFunction(callback) || isGenerator(path) || isAsync(path)) { callback = [callback] as any; }
        http.routes.push({ path: path, callback: callback, method: 'middleware' });
    };

    http.delete = function (path, callback) { __setPath("delete", http, path, callback); };
    http.get = function (path, callback) { __setPath("get", http, path, callback); };
    http.post = function (path, callback) { __setPath("post", http, path, callback); };
    http.put = function (path, callback) { __setPath("put", http, path, callback); };
    http.all = function (path, callback) { __setPath("all", http, path, callback); };
    return http;
}