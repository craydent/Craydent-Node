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
        var args = arguments;
        if (arguments.length < 3 && (_isArray(arguments[0]) || _isArray(arguments[1]))) {
            args = arguments[1] || arguments[0];
        }
        for (var i = typeof craydent_ctx != "undefined" ? 1 : 0, len = args.length; i < len; i++) {
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

    $c.startsWithAny = ctx.startsWithAny = $c.startsWithAny || ctx.startsWithAny || startsWithAny;
}
init.startsWithAny = startsWithAny;
module.exports = init;
