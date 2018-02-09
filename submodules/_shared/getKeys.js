/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.8.2                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var $c = global.$c || {},
    _error = $c.error;

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
    if (!ctx.isEmpty) { return; }
    $c = ctx.isEmpty($c) ? ctx : $c;
    _error = ctx.error || $c.error;

    ctx.getKeys = ctx.hasOwnProperty('getKeys') && ctx.getKeys || getKeys;
    if ($c !== ctx) {
        $c.getKeys = $c.hasOwnProperty('getKeys') && $c.getKeys || ctx.getKeys
    }
}
init.getKeys = getKeys;
module.exports = init;
