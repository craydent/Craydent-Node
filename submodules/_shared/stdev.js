/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.8.2                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var $c = global.$c || {};

require('./average');

function stdev (obj){
    try {
        if (!obj.length) { return 0; }
        var avg = $c.average(obj),
            sum = null, sdlen = 0;
        for (var i = 0, len = obj.length; i < len; i++) {
            if (!$c.isNumber(obj[i])) { continue; }
            sdlen++;
            sum = sum || 0;
            var diff = obj[i] - avg;
            sum += diff * diff;
        }
        return Math.sqrt(sum/sdlen);
    } catch (e) {
        console.log(e);
        $c.error && $c.error("Array.stdev", e);
    }
}

function init (ctx) {
    $c = ctx.isEmpty($c) ? ctx : $c;
    require('./average')($c);
    $c.stdev = ctx.stdev = $c.stdev || ctx.stdev || stdev;
}
init.stdev = stdev;
module.exports = init;
