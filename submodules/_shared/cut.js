/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.9.0                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var _isNull, _error;

function cut(obj, si, ei, replacement) {
    try {
        if (_isNull(si) || _isNull(ei)) { return obj; }
        if (ei == 0 && si != 0) { ei = si; }
        return obj.slice(0, si) + (replacement || "")+ obj.slice(ei);
    } catch (e) {
        _error && _error("String.cut", e);
    }
}

function init (ctx) {
    _isNull = ctx.isNull;
    _error = ctx.error;

    ctx.cut = cut;
}
module.exports = init;
