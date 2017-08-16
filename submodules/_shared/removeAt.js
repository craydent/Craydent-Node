/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.8.2                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var $c = global.$c || {};

function removeAt (obj, index) {
    try {
        if(obj[index] === undefined) { return false; }
        return obj.splice(index, 1)[0];
    } catch (e) {
        $c.error && $c.error("Array.removeAt", e);
    }
}

function init (ctx) {
    $c = ctx.isEmpty($c) ? ctx : $c;
    $c.removeAt = ctx.removeAt = $c.removeAt || ctx.removeAt || removeAt;
}
init.removeAt = removeAt;
module.exports = init;
