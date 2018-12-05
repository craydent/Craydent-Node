/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.9.0                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var _error, _remove_from_index;

function removeAt (obj, index) {
    try {
        if(obj[index] === undefined) { return false; }
        if (obj.__indexed_buckets) {
            _remove_from_index(obj.__indexed_buckets, obj[index]);
        }
        return obj.splice(index, 1)[0];
    } catch (e) {
        _error && _error("Array.removeAt", e);
    }
}

function init (ctx) {
    require('./_remove_from_index')(ctx);

    _error = ctx.error;
    _remove_from_index = ctx._remove_from_index;

    ctx.removeAt = removeAt;
}
module.exports = init;
