/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.8.2                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var $c = global.$c || {};

function insertAt (obj, index, value) {
    try {
        obj.splice(index, 0, value);
        return true;
    } catch (e) {
        $c.error && $c.error("Array.insertAt", e);
        return false;
    }
}

function init (ctx) {
    $c = ctx.isEmpty($c) ? ctx : $c;
    $c.insertAt = ctx.insertAt = $c.insertAt || ctx.insertAt || insertAt;
}
init.insertAt = insertAt;
module.exports = init;
