
import error from '../methods/error';
import isArray from '../methods/isArray';
import isAsync from '../methods/isAsync';
import isFunction from '../methods/isFunction';
import isGenerator from '../methods/isGenerator';
import isString from '../methods/isString';
import { Route, CraydentHttp } from '../models/CraydentHttp';


export type Verbs = 'delete' | 'get' | 'post' | 'put' | 'all' | 'middleware';
export default function __setPath(verb: Verbs, http: CraydentHttp, path: string | Route | Array<string | Route>, callback?: Function | Function[]) {
    try {
        let routes = path as any[];
        if (!isArray(path)) { routes = [path as string]; }
        for (let i = 0, len = routes.length; i < len; i++) {
            let route: string | Route = routes[i];
            if (isString(route)) {
                callback = callback || [];
                route = { path: route as string, callback, method: verb };
            } else if (callback) {
                let _route: Route = route as any;
                if (isFunction(_route.callback) || isGenerator(_route.callback) || isAsync(_route.callback)) {
                    _route.callback = [_route.callback as Function];
                }
                _route.callback = _route.callback || [];
                _route.callback = (_route.callback as Function[]).concat(callback);
                _route.method = verb || _route.method;
            }
            if (isFunction((route as Route).callback)
                || isGenerator((route as Route).callback)
                || isAsync((route as Route).callback)) {
                (route as Route).callback = [(route as Route).callback as Function];
            }
            (route as Route).callback = (route as Route).callback || [];
            http.routes.push(route as any);
        }
    } catch (e) {
        /* istanbul ignore next*/
        error && error(`CraydentServer.${verb}`, e);
    }
}