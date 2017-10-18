/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.8.2                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var $c = global.$c || {}, _error = $c.error;

function keyOf (obj, value) {
    try {
        for(var prop in obj) {
            if(obj.hasOwnProperty(prop)) {
                if(obj[prop] === value)
                    return prop;
            }
        }
        return null;
    } catch (e) {
        _error && _error('Object.keyOf', e);
    }
}

function init (ctx) {
    if (!ctx.isEmpty) { return; }
    $c = ctx.isEmpty($c) ? ctx : $c;
    _error = ctx.error || $c.error

    ctx.keyOf = ctx.hasOwnProperty('keyOf') && ctx.keyOf || keyOf;
    if ($c !== ctx) {
        $c.keyOf = $c.hasOwnProperty('keyOf') && $c.keyOf || ctx.keyOf
    }
}
init.keyOf = keyOf;
module.exports = init;
