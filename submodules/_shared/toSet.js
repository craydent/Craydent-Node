/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.8.2                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var $c = global.$c || {},
    _equals = $c.equals,
    _error = $c.error;

require('./removeAt')($c);

function toSet(obj) {
    try {
        for (var i = 0, len = obj.length; i < len; i++) {
            var item = obj[i];
            for (var j = i + 1; j < len; j++) {
                var citem = obj[j];
                if (_equals(item,citem)) {
                    $c.removeAt(obj,j--);
                    len--;
                }
            }
        }
    } catch (e) {
        _error && _error("Array.toSet", e);
        return false;
    }
}

function init (ctx) {
    if (!ctx.isEmpty) { return; }
    $c = ctx.isEmpty($c) ? ctx : $c;
    require('./removeAt')($c);
    _equals = ctx.equals || $c.equals;
    _error = ctx.error || $c.error;

    ctx.toSet = ctx.hasOwnProperty('toSet') && ctx.toSet || toSet;
    if ($c !== ctx) {
        $c.toSet = $c.hasOwnProperty('toSet') && $c.toSet || ctx.toSet
    }
}
init.toSet = toSet;
module.exports = init;