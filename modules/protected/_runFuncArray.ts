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

export default function _runFuncArray(funcs: Function | Function[], args?: any[]) {
    const sc = syncroit;
    args = args || [];
    let self = this;
    // @ts-ignore
    !_isArray(funcs) && (funcs = [funcs]);
    let i = 0, func, rtn = [];
    while (func = funcs[i++]) {
        try {
            if (_isGenerator(func)) {
                tryEval('rtn = rtn.concat(sc(function *(){return yield func.apply(self,args);}));', (val) => eval(val));
            } else if (_isAsync(func)) {
                tryEval('rtn = rtn.concat((async function (){return await func.apply(self,args);})());', (val) => eval(val));
            } else if (_isFunction(func)) {
                rtn = rtn.concat(func.apply(self, args));
            }
        } catch (e) /* istanbul ignore next */ {
            throw e;
        }
    }
    return rtn;
}
