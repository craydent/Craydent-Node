/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.8.2                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var $c = global.$c || {};

function startsWithAny (obj) {
    try {
        var args = arguments;
        if (arguments.length < 3 && ($c.isArray(arguments[0]) || $c.isArray(arguments[1]))) {
            args = arguments[1] || arguments[0];
        }
        for (var i = typeof craydent_ctx != "undefined" ? 1 : 0, len = args.length; i < len; i++) {
            var arg = args[i];
            if (arg == obj.slice(0, arg.length)) { return arg; }
        }
        return false;
    } catch (e) {
        $c.error && $c.error('String.startsWith', e);
    }
}

function init (ctx) {
    $c = ctx.isEmpty($c) ? ctx : $c;
    $c.startsWithAny = ctx.startsWithAny = $c.startsWithAny || ctx.startsWithAny || startsWithAny;
}
init.startsWithAny = startsWithAny;
module.exports = init;
