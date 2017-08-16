/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.8.2                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var $c = global.$c || {};

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
        $c.error && $c.error('Object.keyOf', e);
    }
}

function init (ctx) {
    $c = ctx.isEmpty($c) ? ctx : $c;
    $c.keyOf = ctx.keyOf = $c.keyOf || ctx.keyOf || keyOf;
}
init.keyOf = keyOf;
module.exports = init;
