import { scope } from '../private/__common';
import tryEval from '../methods/tryEval';
import syncroit from '../methods/syncroit';
import isArray from '../methods/isArray';
import isFunction from '../methods/isFunction';
import isAsync from '../methods/isAsync';
import isGenerator from '../methods/isGenerator';

const _isArray = isArray,
    _isFunction = isFunction,
    _isGenerator = isGenerator,
    _isAsync = isAsync;

export default function _runFuncArray(funcs: Function | Function[], args: any[]) {
    var self = this;
    // @ts-ignore
    !_isArray(funcs) && (funcs = [funcs]);
    let i = 0, func, rtn = [];
    scope.eval = eval;
    while (func = funcs[i++]) {
        try {
            if (_isFunction(func)) {
                rtn = rtn.concat(func.apply(self, args));
            } else if (_isGenerator(func)) {
                tryEval('syncroit(function *(){rtn = rtn.concat(yield func.apply(self,args));});');
            } else if (_isAsync(func)) {
                tryEval('(async function (){rtn = rtn.concat(await func.apply(self,args));})();');
            }
        } catch (e) {
            throw e;
        }
    }
    return rtn;
}
