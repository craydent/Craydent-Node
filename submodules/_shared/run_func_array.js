/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.9.0                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var _isArray, _isFunction, _isGenerator, _isAsync, _tryEval, _syncroit;

function run_func_array(funcs, args) {
    var self = this;
    !_isArray(funcs) && (funcs = [funcs]);
    var i = 0, func, rtn = [];
    while (func = funcs[i++]){
        try {
            if (_isFunction(func)){
                rtn = rtn.concat(func.apply(self, args));
            } else if (_isGenerator(func)) {
                _tryEval('_syncroit(function *(){rtn = rtn.concat(yield func.apply(self,args));});');
            } else if (_isAsync(func)) {
                _tryEval('(async function (){rtn = rtn.concat(await func.apply(self,args));})();');
            }
        } catch (e) {
            throw e;
        }
    }
    return rtn;
}

function init (ctx) {
    _isArray = ctx.isArray;
    _isFunction = ctx.isFunction;
    _isGenerator = ctx.isGenerator;
    _isAsync = ctx.isAsync;
    _tryEval = ctx.tryEval;
    _syncroit = ctx.syncroit;

    ctx.run_func_array = run_func_array;
}
module.exports = init;
