import error from '../methods/error';
import foo from '../methods/foo';
import isObject from '../methods/isobject';
import * as _http from 'http';
import isString from '../methods/isstring';
import isArray from '../methods/isarray';
import isFunction from '../methods/isfunction';
import isGenerator from '../methods/isgenerator';
import isAsync from '../methods/isasync';
import isBoolean from '../methods/isboolean';
import isRegExp from '../methods/isregexp';
import isInt from '../methods/isint';
import isValidEmail from '../methods/isvalidemail';
import ServerManager from '../methods/servermanager';
import __setPath from '../private/__setPath'
import { $c } from '../private/__common'
import { CraydentHttp, Route, Parameter } from '../models/CraydentHttp'
import logit from '../methods/logit';
import strip from '../methods/strip';
import equals from '../methods/equals';
import replaceAll from '../methods/replaceall';
import tryEval from '../methods/tryeval';
import condense from '../methods/condense';
import isNull from '../methods/isnull';
import isNumber from '../methods/isnumber';
import setHeader from '../methods/set-header';
import toObject from '../methods/toobject';
import where from '../methods/where';
import merge from '../methods/merge';
import itemCount from '../methods/itemcount';
import isValidDate from '../methods/isvaliddate';
import parseAdvanced from '../methods/parseadvanced';
import parseBoolean from '../methods/parseboolean';
import capitalize from '../methods/capitalize';
import include from '../methods/include';
import syncroit from '../methods/syncroit';
import { AnyObject } from '../models/Generics';

export interface CreateServerOptions {
    createServer: typeof _http.createServer;
    favicon?: string;
    callback?: Function;
}
export default function createServer(options: CreateServerOptions): CraydentHttp;
export default function createServer(callback: Function, options?: CreateServerOptions): CraydentHttp;
export default function createServer(callback: any, options?: any): CraydentHttp {
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
    const fs = include('fs');
    if (!callback || isObject(callback)) {
        options = callback;
        callback = options.callback || foo;
    }
    options = options || {};
    const _syncroit = syncroit;
    const http: CraydentHttp = (options.createServer || _http.createServer)(function (request: _http.IncomingMessage, response: _http.ServerResponse) {
        var cray = new (ServerManager as any)(request, response);
        cray.server = http;
        $c.GarbageCollector = [];

        if (request?.url == '/favicon.ico') {
            let code = 404;
            let cb = function (err: any, data: any) {
                if (err) { logit(err); code = 500; }
                response.writeHead(code, { "Content-Type": "image/x-icon" });
                response.end(data);
            };
            /* istanbul ignore else */
            if (options.favicon) {
                try {
                    code = 200;
                    fs.readFile(options.favicon, function (err: any, data: any) {
                        /* istanbul ignore next */
                        data = data || cray.RESPONSES[code];
                        cb(err, data);
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
                const isArrayLocal = isArray,
                    isBooleanLocal = isBoolean,
                    isIntLocal = isInt,
                    isNumberLocal = isNumber,
                    isObjectLocal = isObject,
                    isRegExpLocal = isRegExp,
                    isStringLocal = isString;

                body = body || {};
                request.url = request.url || '';
                let url = strip((request?.url || '').split(/[?#]/)[0], '/'),
                    /* istanbul ignore next */
                    params = merge<any, AnyObject, any>(body, cray.$GET() || {}),
                    haveRoutes = false;

                if (!equals(params, {})) {
                    cray.callback = params.callback || "";
                    delete params.callback;
                }
                let routes: Route[] = where(http.routes, { method: { $in: methods } });
                let i = 0, route: Route;
                var execute: any = [];
                while (route = routes[i++]) {
                    cray.rest = haveRoutes = true;

                    let cbs: any = route.callback, no_route = false, vars = {} as AnyObject;
                    if (route.path != "/*" && route.path != "*") {
                        let rout_parts = condense(strip(route.path, "*").split('/')),
                            requ_parts = url.split('/');

                        if (rout_parts.length > requ_parts.length + itemCount(params)) {
                            continue;
                        }
                        rout_parts = condense(route.path.split('/'));

                        let var_regex = /\$\{(.*?)\}/;
                        for (let k = 0, l = 0, klen = Math.max(rout_parts.length, requ_parts.length); k < klen; k++, l++) {
                            /* istanbul ignore next */
                            let ro = rout_parts[k], re = decodeURIComponent(replaceAll(requ_parts[l], '+', '%20')), prop = (ro || "").replace(var_regex, '$1'),
                                qVal = params[prop];
                            if (ro == "*") {
                                break;
                            }
                            if (var_regex.test(ro)) {
                                if (qVal) {
                                    qVal = decodeURIComponent(replaceAll(qVal, '+', '%20'));
                                    vars[prop] = tryEval(qVal, JSON.parse) || qVal;
                                    l--;
                                    continue;
                                }
                                /* istanbul ignore next */
                                vars[prop] = tryEval(re, JSON.parse) || re;
                            } else if (ro != re) {
                                no_route = true;
                                break;
                            }
                        }
                    }
                    if (!no_route) {
                        for (let prop in params) {
                            /* istanbul ignore if */
                            if (!params.hasOwnProperty(prop)) { continue; }
                            let val = vars[prop] || params[prop], obj;
                            /* istanbul ignore next */
                            vars[prop] = isNull(params[prop]) ? undefined : (isString(val) ? decodeURIComponent(replaceAll(val, '+', '%20')) : val);

                            obj = tryEval(vars[prop], parseAdvanced) || vars[prop];
                            // this is probably a date
                            /* istanbul ignore if */
                            if (isNumber(obj) && obj.toString() != vars[prop]) {
                                continue;
                            }
                            vars[prop] = obj;
                        }
                        let parameters = route.parameters || [],
                            p = 0, parameter: Parameter, bad = [];


                        while (parameter = parameters[p++]) {
                            let name = parameter.name, type = (parameter.type || "").toLowerCase();
                            if (parameter.required && isNull(vars[name])) {
                                bad.push(`Required parameter ${name} was not provided.`);
                                continue;
                            }
                            vars[name] = vars[name] || parameter.default;
                            if (type == "string") { continue; }
                            if (type == "date") {
                                let dt = new Date(vars[name]);
                                if (isValidDate(dt)) {
                                    vars[name] = dt;
                                } else if (parameter.required || !isNull(vars[name])) {
                                    bad.push(`Invalid parameter type, ${name} must be a ${type}.`);
                                }
                                continue;
                            }
                            if (type == "email") {
                                if (!isValidEmail(vars[name]) && (parameter.required || !isNull(vars[name]))) {
                                    bad.push(`Invalid parameter type, ${name} must be a ${type}.`);
                                }
                                continue;
                            }
                            if (type) {
                                if (type == "regexp") { type = "RegExp"; }
                                let checker, value;
                                if (type == "bool" || type == 'boolean') {
                                    type = "boolean";
                                    checker = isBoolean;
                                    value = parseBoolean(value, true);
                                    vars[name] = parseBoolean(vars[name], true);
                                } else {
                                    checker = eval(`is${capitalize(type)}Local`), value = tryEval(vars[name], parseAdvanced);
                                }

                                if (!checker(value) && !checker(vars[name]) && (parameter.required || !isNull(vars[name]))) {
                                    /* istanbul ignore next */
                                    let an = type[0] in { a: 1, e: 1, i: 1, o: 1, u: 1 } ? "an" : "a";
                                    bad.push(`Invalid parameter type, ${name} must be ${an} ${type}.`);
                                    continue;
                                }
                                vars[name] = value || vars[name];
                            }
                        }
                        if (bad.length) { return cray.send({ errors: bad }); }
                        let c = 0, cb: any;
                        while (cb = cbs[c++]) {
                            execute.push(cb);
                            execute[`v${c}`] = vars;
                        }
                    }
                }

                var _complete = (value?: any) => {
                    if (isNull(value) && haveRoutes && callback == foo) {
                        return Promise.resolve(cray.send(404, cray.RESPONSES["404"]));
                    }


                    // look for other node apps
                    /* istanbul ignore next */
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
                            let query = (request.url || '').split('?')[1] || "";
                            query && (query = `?${query}`);
                            return include('http').get(`http://localhost:${app.port}/${path}${query}`).on('response', function (response: any) {
                                let body = '';
                                response.on('data', function (chunk: any) { body += chunk; });
                                response.on('end', function () { cray.end(body); });
                            });
                        }
                    }
                    cray.echo.out = "";

                    function _cleanup(val: any) {
                        value = isNull(val, value);

                        if (!value && !cray.DEFER_END) {
                            cray.send(404, cray.RESPONSES["404"]);
                        }
                        if (value && !cray.response_sent) {
                            cray.send(value);
                        }
                    }
                    if (isGenerator(callback)) {
                        return eval(`_syncroit(function* () {
                            var cb = callback.bind(cray);
                            return yield* cb(request, response, value);
                        }).then(_cleanup);`);
                    } else if (isAsync(callback)) {
                        return eval(`(async function (){
                            var cb = callback.bind(cray);
                            return await cb(request, response, value); })()
                            .then(_cleanup);`);
                    } else {
                        return Promise.resolve(_cleanup(callback.call(cray, request, response, value)));
                    }
                };
                if (execute.length) {

                    var setUpNext = (exec: any, i: any) => {
                        i++;
                        if (isGenerator(exec[0])) {
                            return eval(`(function () {
                                return _syncroit(function* () {
                                    if (exec[0]) {
                                        var e = exec[0].bind(cray);
                                        var next = setUpNext(exec.slice(1), ${i});
                                        return yield* e(request, response, execute['v${i}'], next);
                                    }
                                })
                            })`);
                        }
                        if (isAsync(exec[0])) {
                            return eval(`(async function () {
                                if (exec[0]) {
                                    var e = exec[0].bind(cray);
                                    var next = setUpNext(exec.slice(1), ${i});
                                    return await e(request, response, execute['v${i}'], next);
                                }
                            })`);
                        }
                        if (isFunction(exec[0])) {
                            return function () {
                                /* istanbul ignore else */
                                if (exec[0]) {
                                    var e = exec[0].bind(cray);
                                    var next = setUpNext(exec.slice(1), i);
                                    return e(request, response, (execute as any)[`v${i}`], next);
                                }
                            }
                        }
                    }
                    if (isGenerator(execute[0])) {
                        return eval(`_syncroit(function* () {
                            var e = execute[0].bind(cray);
                            var next = setUpNext(execute.slice(1), 1);
                            var result = yield* e(request, response, execute['v1'], next);
                            yield _complete(result);
                        })`);
                    }
                    if (isAsync(execute[0])) {
                        return eval(`(async function () {
                            var e = execute[0].bind(cray);
                            var next = setUpNext(execute.slice(1), 1);
                            var result = await e(request, response, execute['v1'], next);
                            await _complete(result);
                        })()`);
                    }
                    return _complete(execute[0].call(cray, request, response, (execute as any)['v1'], setUpNext(execute.slice(1), 1)));
                }
                return _complete();
            } catch (e) /* istanbul ignore next */ {
                error('createServer.onRequestReceived', e);
                response.writeHead(500, (setHeader as any).headers);
                return cray.end(JSON.stringify(cray.RESPONSES["500"]));
                // throw e;
            } finally {

            }
        }

        if (/delete|post|put/i.test(request?.method || '')) {
            let body = "";
            request.on('data', function (data: any) {
                body += data;
                // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
                /* istanbul ignore if */
                if (body.length > 1e6) {
                    // FLOOD ATTACK OR FAULTY CLIENT, NUKE REQUEST
                    request.connection.destroy();
                }
            });
            request.on('end', function () {
                cray.raw = body;
                let method = (request?.method || '').toLowerCase();
                // if ( == "post") { body = cray.$PAYLOAD(); }
                /* istanbul ignore next */
                let ct = cray.$HEADER('content-type', 'i') || "";
                /* istanbul ignore else */
                if (~ct.indexOf('/json')) {
                    body = tryEval(body, JSON.parse);
                } else if (~ct.indexOf('/x-www-form-urlencoded') || ~ct.indexOf('text/plain')) {
                    body = toObject(body) as any;
                }
                /* istanbul ignore else */
                if (isObject(body)) {
                    cray.rawData = cray.rawData || { post: null, delete: null, put: null };
                    cray.rawData[method] = cray.rawData[method] || {};
                    cray.rawData[method] = body;
                }

                return onRequestReceived(["all", (request?.method || '').toLowerCase(), "middleware"], body);
            });
        } else {
            return onRequestReceived(["all", "get", "middleware"]);
        }
    });
    http.loadBalance = function (ips: string | string[]): CraydentHttp {
        let list = isString(ips) ? (ips as string).split(',') : ips,
            len = list.length;
        /* istanbul ignore next */
        $c.BALANCE_SERVER_LIST = $c.BALANCE_SERVER_LIST || [];

        /* istanbul ignore else */
        if (isArray(list)) {
            let ip: any, i = 0;
            while (ip = list[i++]) {
                /* istanbul ignore if */
                if (!/^\d{1,3}\.\d{1,3}\.\d{1,3}.\d{1,3}$/.test(ip)) { break; }
                $c.BALANCE_SERVER_LIST.push(ip);
                if (i == len) { return this; }
            }
        }
        /* istanbul ignore next */
        throw "parameter must be a string or an array of ip addresses";
    };

    http.routes = [];
    http.use = function (path: string, callback?: Function | Function[]) {
        if ((isFunction(path) || isGenerator(path) || isAsync(path)) && !callback) {
            callback = path as any;
            path = '/*';
        }
        callback = (callback || []) as any;
        if (isFunction(callback) || isGenerator(path) || isAsync(path)) { callback = [callback] as any; }
        http.routes.push({ path, callback: callback as any, method: 'middleware' });
    };

    http.delete = function (path, callback) { __setPath("delete", http, path, callback); };
    http.get = function (path, callback) { __setPath("get", http, path, callback); };
    http.post = function (path, callback) { __setPath("post", http, path, callback); };
    http.put = function (path, callback) { __setPath("put", http, path, callback); };
    http.all = function (path, callback) { __setPath("all", http, path, callback); };
    return http;
}