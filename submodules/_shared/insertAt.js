/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.8.2                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var $c = global.$c || {},
    _error = $c.error;

require('./_add_to_index')($c);

function insertAt (obj, index, value) {
    try {
        obj.splice(index, 0, value);
        if (obj.__indexed_buckets) {
            $c._add_to_index(obj.__indexed_buckets, value);
        }
        return true;
    } catch (e) {
        _error && _error("Array.insertAt", e);
        return false;
    }
}

function init (ctx) {
    if (!ctx.isEmpty) { return; }
    $c = ctx.isEmpty($c) ? ctx : $c;
    _error = ctx.error || $c.error;
    $c.insertAt = ctx.insertAt = $c.insertAt || ctx.insertAt || insertAt;
}
init.insertAt = insertAt;
module.exports = init;
