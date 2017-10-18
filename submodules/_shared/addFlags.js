/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.8.2                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var $c = global.$c || {}, _error = $c.error;

function addFlags (obj, flags){
    try {
        if (obj.global && !~flags.indexOf('g')) { flags += "g"; }
        if (obj.ignoreCase && !~flags.indexOf('i')) { flags += "i"; }
        if (obj.multiline && !~flags.indexOf('m')) { flags += "m"; }

        return new RegExp(obj.source, flags);
    } catch (e) {
        $s.error && $s.error("RegExp.addFlags", e);
    }
}

function init (ctx) {
    if (!ctx.isEmpty) { return; }
    $c = ctx.isEmpty($c) ? ctx : $c;
    _error = ctx.error || $c.error;

    ctx.addFlags = ctx.hasOwnProperty('addFlags') && ctx.addFlags || addFlags;
    if ($c !== ctx) {
        $c.addFlags = $c.hasOwnProperty('addFlags') && $c.addFlags || ctx.addFlags
    }
}
init.addFlags = addFlags;
module.exports = init;
