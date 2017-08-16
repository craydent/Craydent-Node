/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.8.2                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var $c = global.$c || {};

function isValidDate (obj) {
    try {
        return !isNaN(obj.getTime());
    } catch (e) {
        $c.error && $c.error && $c.error("Date.isValidDate", e);
    }
}

function init (ctx) {
    $c = ctx.isEmpty($c) ? ctx : $c;
    $c.isValidDate = ctx.isValidDate = $c.isValidDate || ctx.isValidDate || isValidDate;
}
init.isValidDate = isValidDate;

module.exports = init;
