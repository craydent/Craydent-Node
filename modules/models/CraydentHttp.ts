import * as http from 'http';

export interface CraydentHttp extends http.Server {
    routes: Route[];
    loadBalance: (ips: string | string[]) => void;
    use: (path, callback?: Function) => void;
    delete: (path: string, callback: Function) => void;
    get: (path: string, callback: Function) => void;
    post: (path: string, callback: Function) => void;
    put: (path: string, callback: Function) => void;
    all: (path: string, callback: Function) => void;
}
export interface Route {
    path: string;
    callback: Function | Function[];
    method: string;
}