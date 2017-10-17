/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.8.2                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var $c = global.$c || {},
    _error = $c.error;

require('./emit')($c);

function on (obj, ev, func){
    try {
        obj["_"+ev] = obj["_"+ev] || [];
        obj["_"+ev].push(func);
    } catch (e) {
        _error && _error("Function.on", e);
    }
}

function init (ctx) {
    if (!ctx.isEmpty) { return; }
    $c = ctx.isEmpty($c) ? ctx : $c;
    require('./emit')($c);
    _error = ctx.error || $c.error;
    $c.on = ctx.on = $c.on || ctx.on || on;
}
init.on = on;
module.exports = init;
