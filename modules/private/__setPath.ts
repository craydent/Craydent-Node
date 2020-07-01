
import error from '../methods/error';
import isArray from '../methods/isArray';
import isAsync from '../methods/isAsync';
import isFunction from '../methods/isFunction';
import isGenerator from '../methods/isGenerator';
import isString from '../methods/isString';
import { Route, CraydentHttp } from '../models/CraydentHttp';



export default function __setPath(verb: string, http: CraydentHttp, path: string | string[], callback: Function | Function[]) {
    try {
        callback = callback || [];
        if (isFunction(callback) || isGenerator(callback) || isAsync(callback)) { callback = [callback as Function]; }
        if (!isArray(path)) { path = [path as string]; }
        for (let i = 0, len = path.length; i < len; i++) {
            let route: string | Route = path[i];
            if (isString(route)) {
                route = { path: route, callback, method: verb };
            } else if (callback) {
                let _route: Route = route as any;
                _route.callback = _route.callback || [];
                if (isFunction(_route.callback) || isGenerator(_route.callback) || isAsync(_route.callback)) {
                    _route.callback = [_route.callback as Function];
                }
                _route.callback = (_route.callback as Function[]).concat(callback);
                _route.method = verb;
            }
            http.routes.push(route as any);
        }
    } catch (e) {
        error && error(`CraydentServer.${verb}`, e);
    }
}