/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.8.2                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var $c = global.$c || {},
    _error = $c.error;

function eachProperty (obj, callback) {
    try {
        for (var prop in obj) {
            if (!obj.hasOwnProperty(prop)) { continue; }
            if (callback.call(obj, obj[prop], prop)) { break; }
        }
    } catch (e) {
        _error && _error('Object.eachProperty', e);
    }
}

function init (ctx) {
    if (!ctx.isEmpty) { return; }
    $c = ctx.isEmpty($c) ? ctx : $c;
    _error = ctx.error || $c.error;
    $c.eachProperty = ctx.eachProperty = $c.hasOwnProperty('eachProperty') && $c.eachProperty || ctx.hasOwnProperty('eachProperty') && ctx.eachProperty || eachProperty;
}
init.eachProperty = eachProperty;
module.exports = init;
