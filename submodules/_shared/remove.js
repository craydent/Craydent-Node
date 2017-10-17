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

function remove (obj, value, indexOf) {
    try {
        indexOf = indexOf || obj.indexOf;
        var index = indexOf.call(obj, value);
        if(!~index) { return false; }
        if (obj.__indexed_buckets) {
            $c._remove_from_index(obj.__indexed_buckets, obj[index]);
        }
        return obj.splice(index, 1)[0];
    } catch (e) {
        _error && _error("Array.remove", e);
    }
}

function init (ctx) {
    if (!ctx.isEmpty) { return; }
    $c = ctx.isEmpty($c) ? ctx : $c;
    require('./_remove_from_index')($c);
    _error = ctx.error || $c.error
    $c.remove = ctx.remove = $c.remove || ctx.remove || remove;
}
init.remove = remove;
module.exports = init;
