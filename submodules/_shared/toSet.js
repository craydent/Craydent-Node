/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.9.0                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var _equals, _error, _removeAt

function toSet(obj) {
    try {
        for (var i = 0, len = obj.length; i < len; i++) {
            var item = obj[i];
            for (var j = i + 1; j < len; j++) {
                var citem = obj[j];
                if (_equals(item,citem)) {
                    _removeAt(obj,j--);
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
    require('./removeAt')(ctx);
    _equals = ctx.equals;
    _error = ctx.error;
    _removeAt = ctx.removeAt;

    ctx.toSet = toSet;
}
module.exports = init;