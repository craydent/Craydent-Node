/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.8.2                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var $c = global.$c || {},
    _isArray = $c.isArray,
    _isFunction = $c.isFunction,
    _isGenerator = $c.isGenerator,
    _isAsync = $c.isAsync,
    _tryEval = $c.tryEval,
    _syncroit = $c.syncroit;

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
                _tryEval('(async function (){rtn = rtn.concat(yield func.apply(self,args));})();');
            }
        } catch (e) {
            throw e;
        }
    }
    return rtn;
}

function init (ctx) {
    if (!ctx.isEmpty) { return; }
    $c = ctx.isEmpty($c) ? ctx : $c;
    _isArray = ctx.isArray || $c.isArray;
    _isFunction = ctx.isFunction || $c.isFunction;
    _isGenerator = ctx.isGenerator || $c.isGenerator;
    _isAsync = ctx.isAsync || $c.isAsync;
    _tryEval = ctx.tryEval || $c.tryEval;
    _syncroit = ctx.syncroit || $c.syncroit;

    $c.run_func_array = ctx.run_func_array = $c.run_func_array || ctx.run_func_array || run_func_array;
}
init.run_func_array = run_func_array;
module.exports = init;
