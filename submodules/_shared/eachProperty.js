/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.8.2                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var $c = $c || {};

function on (obj, ev, func){
    try {
        obj["_"+ev] = obj["_"+ev] || [];
        obj["_"+ev].push(func);
    } catch (e) {
        $c.error && $c.error("Function.on", e);
    }
}

function init (ctx) {
    $c = ctx.isEmpty($c) ? ctx : $c;
    ctx.on = on;
}
init.on = on;
module.exports = init;
