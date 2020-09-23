/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.9.0                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
import isArray from '../methods/isArray';
import isFunction from '../methods/isFunction';
import isGenerator from '../methods/isGenerator';
import isAsync from '../methods/isAsync';
import { AsyncFunction } from '../models/AsyncFunction';
import parallelEach from '../methods/parallelEach';

export type Executables = Array<Executable> | Executable;
export type Executable = Function | AsyncFunction | GeneratorFunction;
export default function runFuncArray(funcs: Executables, args: any[] = []): any[] | Promise<any[]> {
    /*|{
        "info": "Executes array of methods",
        "category": "Utility",
        "parameters":[
            {"funcs": "(Function[]) Array of methods to execute"},
            {"args": "(any[]) Array of arguments to be passed to each method"}],

        "overloads":[]],

        "url": "http://www.craydent.com/library/1.9.3/docs#runFuncArray",
        "returnType": "(Bool)"
    }|*/
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
