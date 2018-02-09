/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.8.2                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var $c = global.$c || {},
    _error = $c.error,
    _isArray = $c.isArray,
    _isObject = $c.isObject;

require('./contains')($c);

function isSubset (obj, compare, sharesAny) {
    try {
        var isArray = _isArray(obj) && _isArray(compare);
        if ((_isObject(obj) && _isObject(compare)) || isArray) {

            for (var prop in obj){
                if (!obj.hasOwnProperty(prop)) { continue; }
                if (!_isArray && !compare.hasOwnProperty(prop) || _isArray && !$c.contains(compare, obj[prop])) { return false; }
                if (sharesAny) { return true; }
            }

            return true;
        } else {
            return ~obj.toString().indexOf(compare.toString()) && obj.constructor == compare.constructor;
        }
    } catch (e) {
        _error && _error('Object.isSubset', e);
    }
}

function init (ctx) {
    if (!ctx.isEmpty) { return; }
    $c = ctx.isEmpty($c) ? ctx : $c;
    require('./contains')($c);

    _error = ctx.error || $c.error;
    _isArray = ctx.isArray || $c.isArray;
    _isObject = ctx.isObject || $c.isObject;

    ctx.isSubset = ctx.hasOwnProperty('isSubset') && ctx.isSubset || isSubset;
    if ($c !== ctx) {
        $c.isSubset = $c.hasOwnProperty('isSubset') && $c.isSubset || ctx.isSubset
    }
}
init.isSubset = isSubset;
module.exports = init;
