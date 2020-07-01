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
import tryEval from './tryEval';
import syncroit from './syncroit';

export default function runFuncArray(funcs, args) {
    let self = this;
    !isArray(funcs) && (funcs = [funcs]);
    let i = 0, func, rtn = [];
    while (func = funcs[i++]) {
        try {
            if (isFunction(func)) {
                rtn = rtn.concat(func.apply(self, args));
            } else if (isGenerator(func)) {
                tryEval('syncroit(function *(){rtn = rtn.concat(yield func.apply(self,args));});');
            } else if (isAsync(func)) {
                tryEval('(async function (){rtn = rtn.concat(await func.apply(self,args));})();');
            }
        } catch (e) {
            throw e;
        }
    }
    return rtn;
};
