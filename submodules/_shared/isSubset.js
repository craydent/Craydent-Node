/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.8.2                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var $c = global.$c || {};

require('./contains');

function isSubset (obj, compare, sharesAny) {
    try {
        var isArray = $c.isArray(obj) && $c.isArray(compare);
        if (($c.isObject(obj) && $c.isObject(compare)) || isArray) {

            for (var prop in obj){
                if (!obj.hasOwnProperty(prop)) { continue; }
                if (!$c.isArray && !compare.hasOwnProperty(prop) || $c.isArray && !$c.contains(compare, obj[prop])) { return false; }
                if (sharesAny) { return true; }
            }

            return true;
        } else {
            return ~obj.toString().indexOf(compare.toString()) && obj.constructor == compare.constructor;
        }
    } catch (e) {
        $c.error && $c.error('Object.isSubset', e);
    }
}

function init (ctx) {
    $c = ctx.isEmpty($c) ? ctx : $c;
    require('./contains')($c);
    $c.isSubset = ctx.isSubset = $c.isSubset || ctx.isSubset || isSubset;
}
init.isSubset = isSubset;
module.exports = init;
