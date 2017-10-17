/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.8.2                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var $c = global.$c || {},
    _error = $c.error,
    _isInt = $c.isInt;

require('./remove')($c);

function removeAll (obj, value, indexOf) {
    try {
        if (value) {
            indexOf = indexOf || obj.indexOf;
            var removed = [], index = indexOf.call(obj, value);
            if (!~index) { return false; }
            while (~index && _isInt(index)) {
                removed.push($c.remove(obj,value, indexOf));
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
    if (!ctx.isEmpty) { return; }
    $c = ctx.isEmpty($c) ? ctx : $c;
    require('./remove')($c);

    _error = ctx.error || $c.error;
    _isInt = ctx.isInt || $c.isInt;

    $c.removeAll = ctx.removeAll = $c.removeAll || ctx.removeAll || removeAll;
}
init.removeAll = removeAll;
module.exports = init;
