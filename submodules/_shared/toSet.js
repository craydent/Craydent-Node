/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.8.2                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var $c = global.$c || {};

require('./removeAt');

function toSet(obj) {
    try {
        for (var i = 0, len = obj.length; i < len; i++) {
            var item = obj[i];
            for (var j = i + 1; j < len; j++) {
                var citem = obj[j];
                if ($c.equals(item,citem)) {
                    $c.removeAt(obj,j--);
                    len--;
                }
            }
        }
    } catch (e) {
        $c.error && $c.error("Array.toSet", e);
        return false;
    }
}

function init (ctx) {
    $c = ctx.isEmpty($c) ? ctx : $c;
    require('./removeAt')($c);
    $c.toSet = ctx.toSet = $c.toSet || ctx.toSet || toSet;
}
init.toSet = toSet;
module.exports = init;