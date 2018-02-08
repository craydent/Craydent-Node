/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.8.2                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var $c = global.$c || {},
    _isArray = $c.isArray,
    _error = $c.error;

function startsWithAny (obj) {
    try {
        var i = 1;
        var args = arguments;
        if (arguments.length < 3 && _isArray(arguments[1])) {
            args = arguments[1];
            i = 0;
        }
        for (var len = args.length; i < len; i++) {
            var arg = args[i];
            if (arg == obj.slice(0, arg.length)) { return arg; }
        }
        return false;
    } catch (e) {
        _error && _error('String.startsWith', e);
    }
}

function init (ctx) {
    if (!ctx.isEmpty) { return; }
    $c = ctx.isEmpty($c) ? ctx : $c;

    _isArray = ctx.isArray || $c.isArray;
    _error = ctx.error || $c.error;

    ctx.startsWithAny = ctx.hasOwnProperty('startsWithAny') && ctx.startsWithAny || startsWithAny;
    if ($c !== ctx) {
        $c.startsWithAny = $c.hasOwnProperty('startsWithAny') && $c.startsWithAny || ctx.startsWithAny
    }
}
init.startsWithAny = startsWithAny;
module.exports = init;
