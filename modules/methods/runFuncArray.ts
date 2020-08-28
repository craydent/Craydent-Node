/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.9.0                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
import isArray from './isArray';
import isFunction from './isFunction';
import isGenerator from './isGenerator';
import isAsync from './isAsync';
import { AsyncFunction } from '../models/AsyncFunction';
import parallelEach from './parallelEach';

export type Executables = Array<Executable> | Executable;
export type Executable = Function | AsyncFunction | GeneratorFunction;
export default function runFuncArray(funcs: Executables, args: any[] = []): any[] | Promise<any[]> {
    let self = this;
    !isArray(funcs) && (funcs = [funcs as Executable]);
    let i = 0, func,
        rtn = [],
        usePromise = false;
    while (func = funcs[i++]) {
        try {
            /* istanbul ignore else */
            if (isGenerator(func) || isAsync(func)) {
                usePromise = true;
                rtn.push(func);
            } else if (isFunction(func)) {
                rtn.push(func.apply(self, args));
            }
        } catch (e) /* istanbul ignore next */ {
            throw e;
        }
    }
    if (usePromise) {
        return parallelEach(rtn, args);
    }
    return rtn;
};
