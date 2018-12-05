/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.9.0                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var _error, _isArray, _isObject, _contains;

function isSubset (obj, compare, sharesAny) {
    try {
        var isArray = _isArray(obj) && _isArray(compare);
        if ((_isObject(obj) && _isObject(compare)) || isArray) {

            for (var prop in obj){
                if (!obj.hasOwnProperty(prop)) { continue; }
                if (!isArray && !compare.hasOwnProperty(prop) || isArray && !_contains(compare, obj[prop])) { return false; }
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
    require('./contains')(ctx);

    _error = ctx.error;
    _isArray = ctx.isArray;
    _isObject = ctx.isObject;
    _contains = ctx.contains;

    ctx.isSubset = isSubset;
}
module.exports = init;
