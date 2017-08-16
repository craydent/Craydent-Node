/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.8.2                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var $c = global.$c || {};

function run_func_array(funcs, args) {
    var self = this;
    !$c.isArray(funcs) && (funcs = [funcs]);
    var i = 0, func, rtn = [];
    while (func = funcs[i++]){
        try {
            if ($c.isFunction(func)){
                rtn = rtn.concat(func.apply(self, args));
            } else if ($c.isGenerator(func)) {
                $c.tryEval('$c.syncroit(function *(){rtn = rtn.concat(yield func.apply(self,args));});');
            } else if ($c.isAsync(func)) {
                $c.tryEval('(async function (){rtn = rtn.concat(yield func.apply(self,args));})();');
            }
        } catch (e) {
            throw e;
        }
    }
    return rtn;
}

function init (ctx) {
    $c = ctx.isEmpty($c) ? ctx : $c;
    $c.run_func_array = ctx.run_func_array = $c.run_func_array || ctx.run_func_array || run_func_array;
}
init.run_func_array = run_func_array;
module.exports = init;
