/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.9.0                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var _error;

function getKeys (obj) {
    try {
        if(Object.keys) {
            return  Object.keys(obj);
        }
        var arr = [];
        for(var prop in obj) {
            if(obj.hasOwnProperty(prop)) {
                arr.push(prop);
            }
        }
        return arr;
    } catch (e) {
        _error && _error('Object.getKeys', e);
    }
}

function init (ctx) {
    _error = ctx.error;

    ctx.getKeys = getKeys;
}
module.exports = init;
