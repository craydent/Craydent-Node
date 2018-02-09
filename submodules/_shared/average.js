/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.8.2                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var $c = global.$c || {},
    _isNumber = $c.isNumber,
    _error = $c.error;

function average (obj){
    try {
        var length = 0, sum = 0;
        for (var i = 0, len = obj.length; i < len; i++) {
            if (_isNumber(obj[i])) {
                sum += obj[i];
                length++;
            }
        }
        return sum/length;
    } catch (e) {
        _error && _error("Array.average", e);
    }
}

function init (ctx) {
    if (!ctx.isEmpty) { return; }
    $c = ctx.isEmpty($c) ? ctx : $c;
    _isNumber = ctx.isNumber || $c.isNumber;
    _error = ctx.error || $c.error;

    ctx.average = ctx.hasOwnProperty('average') && ctx.average || average;
       if ($c !== ctx) {
           $c.average = $c.hasOwnProperty('average') && $c.average || ctx.average
       }
}
init.average = average;
module.exports = init;
