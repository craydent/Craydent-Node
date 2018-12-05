/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.9.0                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var _error;

function isValidDate (obj) {
    try {
        return !isNaN(obj.getTime());
    } catch (e) {
        _error && _error("Date.isValidDate", e);
    }
}

function init (ctx) {
    _error = ctx.error;

    ctx.isValidDate = isValidDate;
}
module.exports = init;
