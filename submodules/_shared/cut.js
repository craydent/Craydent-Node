/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.8.2                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var $c = global.$c || {},
    _isNull = $c.isNull,
    _error = $c.error;

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
    if (!ctx.isEmpty) { return; }
    $c = ctx.isEmpty($c) ? ctx : $c;

    _isNull = ctx.isNull || $c.isNull;
    _error = ctx.error || $c.error;

    ctx.cut = ctx.hasOwnProperty('cut') && ctx.cut || cut;
    if ($c !== ctx) {
        $c.cut = $c.hasOwnProperty('cut') && $c.cut || ctx.cut
    }
}
init.cut = cut;
module.exports = init;
