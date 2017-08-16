/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.8.2                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var $c = global.$c || {};

function eachProperty (obj, callback) {
    try {
        for (var prop in obj) {
            if (!obj.hasOwnProperty(prop)) { continue; }
            if (callback.call(obj, obj[prop], prop)) { break; }
        }
    } catch (e) {
        $c.error && $c.error('Object.eachProperty', e);
    }
}

function init (ctx) {
    $c = ctx.isEmpty($c) ? ctx : $c;
    $c.eachProperty = ctx.eachProperty = $c.eachProperty || ctx.eachProperty || eachProperty;
}
init.eachProperty = eachProperty;
module.exports = init;
