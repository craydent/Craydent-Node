import * as IHTTP from "http";
import error from './error';
import foo from './foo';
import IEVersion from './IEVersion';
import isArray from './isArray';
import isBetween from './isBetween';
import isObject from './isObject';
import isString from './isString';
import logit from './logit';
import merge from './merge';
import toStringAlt from './toStringAlt';
import runFuncArray from './runFuncArray';
import tryEval from './tryEval';
import isNull from './isNull';
import { AnyObject } from '../models/Arrays';
import { Reviver } from '../models/Reviver';

export type AjaxReturnType = "response" | "res" | "request" | "req";
export type AjaxOptions = {
    alwaysResolve?: boolean;
    dataType?: string;
    hitch?: any;
    query?: AnyObject | string;
    data?: any | string;
    timeout?: number;
    context?: any;
    header?: AnyObject;
    method?: string;
    contentType?: string;
    run?: string;
    protocol?: string;
    host?: string;
    hostname?: string;
    family?: string;
    port?: number;
    localAddress?: string;
    socketPath?: string;
    path?: string;
    auth?: string;
    agent?: string;
    createConnection?: string;

    onstatechange: () => void;
    onfileload: () => void;
    onprogress: () => void;
    onabort: () => void;
    onresponse: () => void;
    onloadstart: () => void;
    onbefore?: (request?: IHTTP.IncomingMessage, hitch?: any, context?: any) => void;
    oncomplete?: (data?: any, hitch?: any, context?: any, statusCode?: number) => void;
    ondata?: (chunk?: string, body?: string, request?: IHTTP.IncomingMessage, hitch?: any, context?: any) => void;
    onerror?: (data?: any, hitch?: any, context?: any, statusCode?: number) => void;
    onsuccess?: (data?: any, hitch?: any, context?: any, statusCode?: number) => void;
    json_parser?: (text?: string, reviver?: Reviver, spaces?: string) => void;
};
export default function ajax(url: string, returnData?: AjaxReturnType): Promise<any>;
export default function ajax(params: AjaxOptions, returnData?: AjaxReturnType): Promise<any>;
export default function ajax(params, returnData?): Promise<any> {
    /*|{
        "info": "Method to make ajax calls",
        "category": "Utility",
        "parameters":[
            {"url": "(String) End point url"},
            {"returnData?": "(AjaxReturnType) Specifies which data to return when using Promise pattern"}],

        "overloads":[
            {"parameters":[
                {"params": "(AjaxOptions) specs with common properties:<br />(String) url<br />(String) dataType<br />(Mixed) hitch<br />(Function[]) onerror<br />(Function[])onsuccess"},
                {"returnData?": "(AjaxReturnType) Specifies which data to return when using Promise pattern"}]}],

        "url": "http://www.craydent.com/library/1.9.3/docs#ajax",
        "returnType": "(Promise<any>)"
    }|*/
    if (typeof window != 'undefined') {
        return _ajaxNode.call(this, params, returnData);
    }
    return _ajaxNode.call(this, params, returnData);
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
function _ajaxNode(url: string, returnData?: AjaxReturnType): Promise<any>;
function _ajaxNode(params: AjaxOptions, returnData?: AjaxReturnType): Promise<any>;
function _ajaxNode(params, returnData): Promise<any> {
    try {
        if (isString(params)) {
            params = { url: params };
        }
        let alwaysResolve = params.alwaysResolve === false ? false : true;
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

        if (!isArray(params.onbefore)) {
            params.onbefore = [params.onbefore];
        }
        if (!isArray(params.oncomplete)) {
            params.oncomplete = [params.oncomplete];
        }
        if (!isArray(params.ondata)) {
            params.ondata = [params.ondata];
        }
        if (!isArray(params.onerror)) {
            params.onerror = [params.onerror];
        }
        if (!isArray(params.onresponse)) {
            params.onresponse = [params.onresponse];
        }
        if (!isArray(params.onsuccess)) {
            params.onsuccess = [params.onsuccess];
        }

        if (params.onsuccess.length > 1 || params.onsuccess[0] == foo) {
            alwaysResolve = params.alwaysResolve || false;
        }
        params.thiss = this;
        params.url = params.url || "";

        let httpRequest: typeof IHTTP = require('http');
        params.method = params.method || "GET";
        params.headers = params.headers || {};

        if (params.query && isObject(params.query)) {
            params.query = toStringAlt(params.query, '=', '&', true);
        }
        params.query = (params.run ? "run=" + params.run : "") + (params.query || "");
        params.contentType = params.contentType || "application/json";
        params.onstatechange = params.onstatechange || foo;

        if (params.method.toLowerCase() == "get") {
            params.url += params.query ? "?" + params.query : "";
            params.query = undefined;
        }

        runFuncArray.call((params.context || this), params.onbefore, [httpRequest, params.hitch, this]);

        let prms: Promise<any>, defaults = {
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
        prms = new Promise(function (resolve, reject) {
            if (params.url) {
                let parts = params.url.match(/^(https?):\/\/(.*?)(?::([0-9]*)?)?(\/.*)$/);
                if (parts) {
                    params.protocol = (params.protocol || parts[1]) + ":";
                    params.host = params.host || parts[2];
                    let port = params.port || parts[3];
                    port && (params.port = port);
                    params.path = params.path || parts[4];
                }
            }
            try {
                if (params.protocol && ~params.protocol.indexOf('https')) { httpRequest = require('https'); }
                let req = httpRequest.request(merge(defaults, params, { clone: true, intersect: true }), function (res) {
                    let body = { data: "" }, ctx = params.context || res;
                    res.on('data', function (chunk) {
                        body.data += chunk;
                        runFuncArray.call(ctx, params.ondata, [chunk, body, req, params.hitch, this]);
                    });
                    res.on('error', function (err) {
                        if (params.dataType.toLowerCase() == 'json') {
                            body.data = tryEval(body.data, params.json_parser) || body.data;
                        }
                        body.data = body.data || err as any;
                        let resrej = alwaysResolve ? resolve : reject;
                        runFuncArray.call(ctx, params.onerror, [body.data, params.hitch, this, res.statusCode]);
                        runFuncArray.call(ctx, params.oncomplete, [body.data, params.hitch, this, res.statusCode]);
                        resrej(body.data);
                    });
                    res.on('end', function () {
                        if (params.dataType.toLowerCase() == 'json') {
                            body.data = tryEval(body.data, params.json_parser) || body.data;
                        }
                        let methods = params.onsuccess;
                        if (!isBetween(res.statusCode, 200, 299, true)) {
                            methods = params.onerror;
                        }
                        runFuncArray.call(ctx, methods, [body.data, params.hitch, this, res.statusCode]);
                        runFuncArray.call(ctx, params.oncomplete, [body.data, params.hitch, this, res.statusCode]);

                        let rtn = body.data;
                        if (returnData == "response" || returnData == "res") {
                            rtn = res as any;
                        } else if (returnData == "request" || returnData == "req") {
                            rtn = req as any;
                        }

                        resolve(rtn);
                    });
                });
                req.on('error', function (e) {
                    if ((e as any).errno != "ETIMEDOUT") {
                        runFuncArray.call(req, params.onerror, [null, params.hitch, this, (e as any).code]);
                        runFuncArray.call(req, params.oncomplete, [null, params.hitch, this, (e as any).code]);
                        let resrej = alwaysResolve ? resolve : reject;
                        return resrej(e);
                    }
                    logit(e);
                });

                req.setTimeout(params.timeout, function () {
                    runFuncArray.call(params.thiss, params.onerror, ['', params.hitch, this, 504]);
                    runFuncArray.call(params.thiss, params.oncomplete, ['', params.hitch, this, 504]);
                    let e: any = new Error('connect ETIMEDOUT ' + params.host);
                    e.address = params.host;
                    e.code = "ETIMEDOUT";
                    e.errno = "ETIMEDOUT";
                    e.message = 'connect ETIMEDOUT ' + params.host;
                    e.port = params.port;
                    let resrej = alwaysResolve ? resolve : reject;
                    resrej(e);
                });
                let req_body = (isObject(params.data) || isArray(params.data)) && ~params.contentType.indexOf("/json") ? JSON.stringify(params.data) : params.data;
                req.write(req_body || '');
                req.end();
            } catch (e) {
                error && error("ajax.Promise", e);
            }
        });


        if (params.onsuccess.length == 1 && params.onsuccess[0] !== foo) {
            (prms as any)._then = prms.then || foo;
            prms.then = function (res, rej) { //noinspection CommaExpressionJS
                alwaysResolve = params.alwaysResolve || false;
                params.onsuccess.push(res);
                params.onerror.push(rej);
                return this;
            };
        }
        (prms as any).otherwise = function (callback) {
            alwaysResolve = params.alwaysResolve || false;
            return params.onerror.push(callback), this;
        };
        prms['finally'] = function (callback) {
            alwaysResolve = params.alwaysResolve || false;
            return params.oncomplete.push(callback), this;
        };
        return prms;
    } catch (e) {
        error && error("ajax", e);
    }
}

function _ajaxJS(url: string, returnData?: AjaxReturnType): Promise<any>;
function _ajaxJS(params: AjaxOptions, returnData?: AjaxReturnType): Promise<any>;
function _ajaxJS(params, returnData): Promise<any> {
    try {
        if (isString(params)) {
            params = { url: params };
        }
        let need_to_shard = false, browser_url_limit = 1500, query, url, alwaysResolve = params.alwaysResolve === false ? false : true;
        params.dataType = params.dataType || 'json';
        params.hitch = params.hitch || "";
        params.onbefore = params.onbefore || [foo];
        params.oncomplete = params.oncomplete || [foo];
        params.onerror = params.onerror || params.onresponse || [foo];
        params.onsuccess = params.onsuccess || params.onresponse || [foo];
        params.query = params.data || params.query || "";
        params.timeout = params.timeout || 120000;
        params.jsonp = (params.jsonp || "callback") + "=";

        if (!isArray(params.oncomplete)) {
            params.oncomplete = [params.oncomplete];
        }
        if (!isArray(params.onbefore)) {
            params.onbefore = [params.onbefore];
        }
        if (!isArray(params.onerror)) {
            params.onerror = [params.onerror];
        }
        if (!isArray(params.onresponse)) {
            params.onresponse = [params.onresponse];
        }
        if (!isArray(params.onsuccess)) {
            params.onsuccess = [params.onsuccess];
        }
        if (params.onsuccess.length > 1 || params.onsuccess[0] == foo) {
            alwaysResolve = params.alwaysResolve || false;
        }

        params.thiss = this;
        params.url = params.url || "";
        let cbk = (function (res, rej) {
            if (params.dataType.toLowerCase() == 'jsonp') {
                let head = document.getElementsByTagName('head')[0],
                    func: string = params.jsonpCallback || '_cjson' + Math.floor(Math.random() * 1000000),
                    insert = 'insertBefore',
                    tag = document.createElement('script');
                while (!params.jsonpCallback && $w[func]) {
                    func = '_cjson' + Math.floor(Math.random() * 1000000);
                }
                params.jsonpCallback && (params.onsuccess = $w[func]);
                $w[func] = function (data) {
                    if (params.query) {
                        let thiss = params.thiss;
                        delete params.thiss;
                        ajax.call(thiss, params);
                    } else {
                        let code = data.code || 500;
                        let resrej = res;
                        if (!isNull(data.hasErrors) && data.hasErrors || !isNull(data.hasErrors) && !data.success) {
                            runFuncArray.call((params.context || params.thiss), params.onerror, [data, params.hitch, params.thiss, params.context, data.code || 500]);
                            resrej = alwaysResolve ? res : rej;
                        } else {
                            runFuncArray.call((params.context || params.thiss), params.onsuccess, [data, params.hitch, params.thiss, params.context, code = 200]);
                        }

                        runFuncArray.call((params.context || this), params.oncomplete, [data, params.hitch, params.thiss, params.context, params.context, code]);
                        if (params.jsonpCallback) {
                            $w[func] = params.onsuccess;
                        } else {
                            try {
                                delete $w[func]
                            } catch (e) {
                                $w[func] = undefined;
                            }
                        }

                        let rtn = data;
                        if (returnData == "response" || returnData == "res" || returnData == "request" || returnData == "req") {
                            rtn = tag;
                        }
                        resrej(rtn);
                    }
                };
                if (params.shard_data && params.query && !isObject(params.query) && params.query.length > browser_url_limit) {
                    need_to_shard = true;
                    var query_parts = params.query;
                    params.query = {};
                    query_parts = query_parts.indexOf('?') == 0 ? query_parts.substr(1) : query_parts;
                    query_parts = query_parts.split("&");
                    // params.query now has the object representation of the query
                    query_parts.map(function (str) {
                        var name_value = str.split('=');
                        this[encodeURIComponent(name_value[0])] = encodeURIComponent(name_value[1]);
                    }, params.query);
                } else if (params.query && isObject(params.query)) {
                    query = toStringAlt(params.query, '=', '&', true);
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
                    for (let prop in params.query) {
                        if ((`${query}${prop}xxx`).length > browser_url_limit) {
                            break;
                        }
                        query += `&${encodeURIComponent(prop)}=${encodeURIComponent(params.query[prop])}`;
                        if (query.length > browser_url_limit) {
                            let left_over = query.substr(browser_url_limit);
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
                query = (params.run ? `&run=${params.run}` : "") +
                    (query || "") +
                    ((params.__EOF && params.__EOF === "true" && ("&EOQ=true")) || "") +
                    ((params.__FIRST && ("&FIRST=true")) || "");
                url += (~params.url.indexOf('?') ? "&" : "?") + (params.jsonp || "callback=") + func + (query || "");

                tag['type'] = "text/javascript";
                (tag as any).async = "async";
                tag['src'] = url;

                // Attach handlers for all browsers
                tag.onload = (tag as any).onreadystatechange = function (ev) {
                    try {
                        if (!this.readyState || /complete|loaded/.test(this.readyState.toString())) {
                            // Handle memory leak in IE
                            this.onload = this.onreadystatechange = null;

                            // Remove the script
                            if (head && this.parentNode && !~IEVersion.call($w)) {
                                head.removeChild(this);
                            }
                        }
                    } catch (e) {
                        error && error('ajax.tag.statechange', e);
                    }
                };
                runFuncArray.call((params.context || this), params.onbefore, [tag, params.hitch, this]);
                head[insert](tag, head.firstChild);
                return tag;
            } else {
                let httpRequest = Request(),
                    fileUpload = httpRequest.upload || {};
                params.method = params.method || "POST";
                params.headers = params.headers || [];

                if (params.query && isObject(params.query)) {
                    params.query = toStringAlt(params.query, '=', '&', true);
                }
                params.query = (params.run ? `run=${params.run}` : "") + (params.query || "");
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
                runFuncArray.call((params.context || this), params.onbefore, [httpRequest, params.hitch, this]);
                httpRequest.onreadystatechange = function (xp) {
                    params.onstatechange(xp);
                    let resrej = res;
                    let data = __ajaxServerResponse(this), done = this.readyState == 4;
                    if (data && params.dataType.toLowerCase() == 'json' || done && this.responseText) {
                        runFuncArray.call((params.context || this), params.onsuccess, [data || this.responseText, params.hitch, params.thiss, params.context, this.status]);
                    } else if (done) {
                        try {
                            let resrej = alwaysResolve ? res : rej;
                            runFuncArray.call((params.context || this), params.onerror, [eval(this.responseText), params.hitch, params.thiss, params.context, this.status]);
                        } catch (e) {
                            runFuncArray.call((params.context || this), params.onerror, [this.responseText, params.hitch, params.thiss, params.context, this.status]);
                        }
                    }
                    done && runFuncArray.call((params.context || this), params.oncomplete, [data, params.hitch, params.thiss, params.context, this.status]);
                    let rtn = data;
                    if (returnData == "response" || returnData == "res") {
                        rtn = this;
                    } else if (returnData == "request" || returnData == "req") {
                        rtn = httpRequest;
                    }
                    resrej(rtn);
                };
                httpRequest.open(params.method, params.url, true);
                httpRequest.setRequestHeader("Content-type", params.contentType);

                for (let i = 0; i < params.headers.length; i++) {
                    let header = params.headers[i];
                    httpRequest.setRequestHeader(header.type, header.value);
                }
                httpRequest.send(params.query);
                return httpRequest;
            }
        }).bind(this);
        let prm: Promise<any> = {} as any;
        if (typeof Promise !== "undefined" && Promise.toString().indexOf("[native code]") !== -1 && (params.onsuccess.length == 1 && params.onsuccess[0] === foo)) {
            prm = new Promise(cbk);
            (prm as any)._then = prm.then || foo;
            prm.then = function (res, rej) { //noinspection CommaExpressionJS
                alwaysResolve = params.alwaysResolve || false;
                params.onsuccess.push(res);
                params.onerror.push(rej);
                return this;
            };
        } else {
            prm = cbk(foo, foo);
            prm.then = function (callback) { //noinspection CommaExpressionJS
                return params.onsuccess.push(callback), this;
            };
        }

        (prm as any).otherwise = function (callback) { //noinspection CommaExpressionJS
            alwaysResolve = params.alwaysResolve || false;
            return params.onerror.push(callback), this;
        };
        prm['finally'] = function (callback) { //noinspection CommaExpressionJS
            alwaysResolve = params.alwaysResolve || false;
            return params.oncomplete.push(callback), this;
        };
        return prm
    } catch (e) {
        error && error("ajax", e);
    }
}
function __ajaxServerResponse(response) {
    try {
        if (response.readyState == 4 && response.status == 200) {

            let objResponse = tryEval(response.responseText.trim());

            if (!objResponse || objResponse.hasErrors) {
                return false;
            }
            return objResponse;
        }
        return false;
    } catch (e) {
        error && error("ajax._ajaxServerResponse", e);
        return false;
    }
}
function Request() {
    /*|{
        "info": "Create cross browser XMLHttpRequest object",
        "category": "Utility",
        "parameters":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#Request",
        "returnType": "(XMLHttpRequest)"
    }|*/
    let ajaxHttpCaller;
    try {
        //request object for mozilla
        //@ts-ignore
        ajaxHttpCaller = new XMLHttpRequest();
    } catch (ex) {
        //request object for IE
        try {
            //@ts-ignore
            ajaxHttpCaller = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (ex) {
            try {
                //@ts-ignore
                ajaxHttpCaller = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (ex) //noinspection JSConstructorReturnsPrimitive
            {
                error && error("Request", ex);
                return null;
            }
        }
    }
    return ajaxHttpCaller;
}