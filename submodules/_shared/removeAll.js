/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.9.0                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var _error, _isInt, _remove;

function removeAll (obj, value, indexOf) {
    try {
        if (value) {
            indexOf = indexOf || obj.indexOf;
            var removed = [], index = indexOf.call(obj, value);
            if (!~index) { return false; }
            while (~index && _isInt(index)) {
                removed.push(_remove(obj,value, indexOf));
                index = indexOf.call(obj, value);
            }
            return removed;
        }
        delete obj.__indexed_buckets;
        return obj.splice(0,obj.length);

    } catch (e) {
        _error && _error("Array.removeAll", e);
    }
}

function init (ctx) {
    require('./remove')(ctx);

    _error = ctx.error;
    _isInt = ctx.isInt;
    _remove = ctx.remove;

    ctx.removeAll = removeAll;
}
module.exports = init;
