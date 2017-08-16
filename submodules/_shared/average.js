/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.8.2                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var $c = global.$c || {};

function average (obj){
    try {
        var length = 0, sum = 0;
        for (var i = 0, len = obj.length; i < len; i++) {
            if ($c.isNumber(obj[i])) {
                sum += obj[i];
                length++;
            }
        }
        return sum/length;
    } catch (e) {
        $c.error && $c.error("Array.average", e);
    }
}

function init (ctx) {
    $c = ctx.isEmpty($c) ? ctx : $c;
    $c.average = ctx.average = $c.average || ctx.average || average;
}
init.average = average;
module.exports = init;
