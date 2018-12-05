/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.9.0                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var _isNumber, _error;

function stdev (obj){
    try {
        if (!obj.length) { return 0; }
        var avg = _average(obj),
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
    require('./average')(ctx);
    _isNumber = ctx.isNumber;
    _error = ctx.error;
    _average = ctx.average;

    ctx.stdev = stdev;
}
module.exports = init;
