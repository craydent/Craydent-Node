/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.8.2                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var $c = global.$c || {};

function remove (obj, value, indexOf) {
    try {
        indexOf = indexOf || obj.indexOf;
        var index = indexOf.call(obj, value);
        if(!~index) { return false; }
        return obj.splice(index, 1)[0];
    } catch (e) {
        $c.error && $c.error("Array.remove", e);
    }
}

function init (ctx) {
    $c = ctx.isEmpty($c) ? ctx : $c;
    $c.remove = ctx.remove = $c.remove || ctx.remove || remove;
}
init.remove = remove;
module.exports = init;
