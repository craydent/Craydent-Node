/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.9.0                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var _general_trim = require('./general_trim');
var error = require('./error');
var _getFuncArgs = require('./getFuncArgs');
var scope = { eval: eval };
function defineFunction (name, func, override) {
    try {
        var args = _getFuncArgs(func),
            fstr = func.toString().replace(/this/g,'craydent_ctx'),

            // extra code to account for when this == global
            extra_code = "if(arguments.length == 0 && this == $c){return;}",
            fnew = args.length === 0 || (args.length === 1 && !_general_trim(args[0])) ?
                fstr.toString().replace(/(\(\s*?\)\s*?\{)/, ' (craydent_ctx){'+extra_code) :
                "(" + fstr.toString().replace(/\((.*?)\)\s*?\{/, '(craydent_ctx,$1){'+extra_code) + ")";

//        if (!override && scope.eval("typeof("+name+")") !== "undefined") {
//            return scope.eval("$c."+name+" = "+fnew);
//        }
        if ($g && $g.$c && !$g.$c.hasOwnProperty(name)) {
            return scope.eval("$g.$c."+name+" = $c."+name+" = "+fnew);
        }
        return scope.eval("$c."+name+" = "+fnew);
    } catch (ex) {
        error("__defineFunction", ex);
    }
}
module.exports = function (scp) {
    scope = scp;
    return defineFunction;
};