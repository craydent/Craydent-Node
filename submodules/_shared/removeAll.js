/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.8.2                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var $c = global.$c || {};

require('./remove');

function removeAll (obj, value, indexOf) {
    try {
        if (value) {
            indexOf = indexOf || obj.indexOf;
            var removed = [], index = indexOf.call(obj, value);
            if (!~index) { return false; }
            while (~index && $c.isInt(index)) {
                removed.push($c.remove(obj,value, indexOf));
                index = indexOf.call(obj, value);
            }
            return removed;
        }
        return obj.splice(0,obj.length);

    } catch (e) {
        $c.error && $c.error("Array.removeAll", e);
    }
}

function init (ctx) {
    $c = ctx.isEmpty($c) ? ctx : $c;
    require('./remove')($c);
    $c.removeAll = ctx.removeAll = $c.removeAll || ctx.removeAll || removeAll;
}
init.removeAll = removeAll;
module.exports = init;
