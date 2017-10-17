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

require('./average')($c);

function stdev (obj){
    try {
        if (!obj.length) { return 0; }
        var avg = $c.average(obj),
            sum = null, sdlen = 0;
        for (var i = 0, len = obj.length; i < len; i++) {
            if (!_isNumber(obj[i])) { continue; }
            sdlen++;
            sum = sum || 0;
            var diff = obj[i] - avg;
            sum += diff * diff;
        }
        return Math.sqrt(sum/sdlen);
    } catch (e) {
        _error && _error("Array.stdev", e);
    }
}

function init (ctx) {
    if (!ctx.isEmpty) { return; }
    $c = ctx.isEmpty($c) ? ctx : $c;
    require('./average')($c);
    _isNumber = ctx.isNumber || $c.isNumber;
    _error = ctx.error || $c.error;
    $c.stdev = ctx.stdev = $c.stdev || ctx.stdev || stdev;
}
init.stdev = stdev;
module.exports = init;
