/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.9.0                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var _isArray, _error;

function startsWithAny (obj) {
    try {
        obj = obj || "";
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
    _isArray = ctx.isArray;
    _error = ctx.error;

    ctx.startsWithAny = startsWithAny;
}
module.exports = init;
