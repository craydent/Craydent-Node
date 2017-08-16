/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.8.2                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var $c = global.$c || {};

function cut(obj, si, ei, replacement) {
    try {
        if ($c.isNull(si) || $c.isNull(ei)) { return obj; }
        if (ei == 0 && si != 0) { ei = si; }
        return obj.slice(0, si) + (replacement || "")+ obj.slice(ei);
    } catch (e) {
        $c.error && $c.error("String.cut", e);
    }
}

function init (ctx) {
    $c = ctx.isEmpty($c) ? ctx : $c;
    $c.cut = ctx.cut = $c.cut || ctx.cut || cut;
}
init.cut = cut;
module.exports = init;
