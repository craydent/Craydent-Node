/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.9.0                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var _error, _add_to_index;

function insertAt (obj, index, value) {
    try {
        obj.splice(index, 0, value);
        if (obj.__indexed_buckets) {
            _add_to_index(obj.__indexed_buckets, value);
        }
        return true;
    } catch (e) {
        _error && _error("Array.insertAt", e);
        return false;
    }
}

function init (ctx) {
    require('./_add_to_index')(ctx);
    _error = ctx.error;
    _add_to_index = ctx._add_to_index;

    ctx.insertAt = insertAt;
}
module.exports = init;
