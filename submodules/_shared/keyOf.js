/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.9.0                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var _error;

function keyOf (obj, value) {
    try {
        for(var prop in obj) {
            if(obj.hasOwnProperty(prop)) {
                if(obj[prop] === value) { return prop; }
            }
        }
        return null;
    } catch (e) {
        _error && _error('Object.keyOf', e);
    }
}

function init (ctx) {
    _error = ctx.error;

    ctx.keyOf = keyOf;
}
module.exports = init;
