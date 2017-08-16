/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.8.2                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var $c = global.$c || {};

function addFlags (obj, flags){
    try {
        if (obj.global && !~flags.indexOf('g')) { flags += "g"; }
        if (obj.ignoreCase && !~flags.indexOf('i')) { flags += "i"; }
        if (obj.multiline && !~flags.indexOf('m')) { flags += "m"; }

        return new RegExp(obj.source, flags);
    } catch (e) {
        $c.error && $c. error("RegExp.addFlags", e);
    }
}

function init (ctx) {
    $c = ctx.isEmpty($c) ? ctx : $c;
    $c.addFlags = ctx.addFlags = $c.addFlags || ctx.addFlags || addFlags;
}
init.addFlags = addFlags;
module.exports = init;
