/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.9.0                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var _error;

function addFlags (obj, flags){
    try {
        if (obj.global && !~flags.indexOf('g')) { flags += "g"; }
        if (obj.ignoreCase && !~flags.indexOf('i')) { flags += "i"; }
        if (obj.multiline && !~flags.indexOf('m')) { flags += "m"; }

        return new RegExp(obj.source, flags);
    } catch (e) {
        _error && _error("RegExp.addFlags", e);
    }
}

function init (ctx) {
    _error = ctx.error;
    ctx.addFlags = addFlags;
}
module.exports = init;
