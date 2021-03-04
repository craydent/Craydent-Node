/// <reference types="node" />
import * as http from 'http';
export interface CraydentHttp extends http.Server {
    routes: Route[];
    loadBalance: (ips: string | string[]) => void;
    use: (path: any, callback?: Function | Function[]) => void;
    delete: (path: string, callback: Function | Function[]) => void;
    get: (path: string, callback: Function | Function[]) => void;
    post: (path: string, callback: Function | Function[]) => void;
    put: (path: string, callback: Function | Function[]) => void;
    all: (path: string, callback: Function | Function[]) => void;
}
export interface Route {
    path: string;
    callback: Function | Function[];
    method: string;
    parameters?: Parameter[];
}
export interface Parameter {
    name: string;
    type?: 'array' | 'bool' | 'boolean' | 'date' | 'email' | 'int' | 'number' | 'object' | 'regexp' | 'string';
    required?: boolean;
    default?: any;
}
