/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.8.2                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var $c = global.$c || {},
    _error = $c.error,
    _isObject = $c.isObject;

function itemCount(obj) {
    try {
        if (_isObject(obj)) {
            var count = 0;
            for (var prop in obj){
                if (obj.hasOwnProperty(prop)) { count++; }
            }
            return count;
        }
        return undefined;
    } catch (e) {
        _error && _error('Object.itemCount', e);
    }
}

function init (ctx) {
    if (!ctx.isEmpty) { return; }
    $c = ctx.isEmpty($c) ? ctx : $c;
    _error = ctx.error || $c.error,
    _isObject = ctx.isObject || $c.isObject

    ctx.itemCount = ctx.hasOwnProperty('itemCount') && ctx.itemCount || itemCount;
    if ($c !== ctx) {
        $c.itemCount = $c.hasOwnProperty('itemCount') && $c.itemCount || ctx.itemCount
    }
}
init.itemCount = itemCount;

module.exports = init;
