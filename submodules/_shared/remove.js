/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.9.0                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var _error, _remove_from_index;

function remove (obj, value, indexOf) {
    try {
        indexOf = indexOf || obj.indexOf;
        var index = indexOf.call(obj, value);
        if(!~index) { return false; }
        if (obj.__indexed_buckets) {
            _remove_from_index(obj.__indexed_buckets, obj[index]);
        }
        return obj.splice(index, 1)[0];
    } catch (e) {
        _error && _error("Array.remove", e);
    }
}

function init (ctx) {
    require('./_remove_from_index')(ctx);
    _error = ctx.error;
    _remove_from_index = ctx._remove_from_index;

    ctx.remove = remove;
}
module.exports = init;
