/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.9.0                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var _error;

function eachProperty (obj, callback) {
    try {
        for (var prop in obj) {
            if (!obj.hasOwnProperty(prop)) { continue; }
            if (callback.call(obj, obj[prop], prop)) { break; }
        }
    } catch (e) {
        _error && _error('Object.eachProperty', e);
    }
}

function init (ctx) {
    _error = ctx.error;

    ctx.eachProperty = eachProperty;
}
module.exports = init;
