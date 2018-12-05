/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.9.0                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var _error, _isObject;

function itemCount(obj) {
    try {
        if (_isObject(obj)) {
            var count = 0;
            for (var prop in obj){
                if (obj.hasOwnProperty(prop)) { count++; }
            }
            return count;
        }
        return undefined;
    } catch (e) {
        _error && _error('Object.itemCount', e);
    }
}

function init (ctx) {
    _error = ctx.error;
    _isObject = ctx.isObject;

    ctx.itemCount = itemCount;
}
module.exports = init;
