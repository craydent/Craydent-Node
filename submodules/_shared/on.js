/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.9.0                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var _error;

function on (obj, ev, func){
    try {
        obj["_"+ev] = obj["_"+ev] || [];
        obj["_"+ev].push(func);
    } catch (e) {
        _error && _error("Function.on", e);
    }
}

function init (ctx) {
    _error = ctx.error;

    ctx.on = on;
}
module.exports = init;
