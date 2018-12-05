/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.9.0                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var _isNumber, _error;

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
    _isNumber = ctx.isNumber;
    _error = ctx.error;

    ctx.average = average;
}
module.exports = init;
