/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.8.2                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var $c = global.$c || {},
    _error = $c.error;

require('./_remove_from_index')($c);

function removeAt (obj, index) {
    try {
        if(obj[index] === undefined) { return false; }
        if (obj.__indexed_buckets) {
            $c._remove_from_index(obj.__indexed_buckets, obj[index]);
        }
        return obj.splice(index, 1)[0];
    } catch (e) {
        _error && _error("Array.removeAt", e);
    }
}

function init (ctx) {
    if (!ctx.isEmpty) { return; }
    $c = ctx.isEmpty($c) ? ctx : $c;
    require('./_remove_from_index')($c);

    _error = ctx.error || $c.error;

    ctx.removeAt = ctx.hasOwnProperty('removeAt') && ctx.removeAt || removeAt;
    if ($c !== ctx) {
        $c.removeAt = $c.hasOwnProperty('removeAt') && $c.removeAt || ctx.removeAt
    }
}
init.removeAt = removeAt;
module.exports = init;
