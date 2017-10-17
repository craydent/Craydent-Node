/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.8.2                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var $c = global.$c || {}, $s = {};

function _contains_matches (vals, val) {
    for (var i = 0, len = vals.length; i < len; i++) {
        if (val.test(vals[i])) { return true; }
    }
    return false;
}
function _contains_lessthan (vals, val) {
    for (var i = 0, len = vals.length; i < len; i++) {
        if (vals[i] < val) { return true; }
    }
    return false;
}
function _contains_greaterthan (vals, val) {
    for (var i = 0, len = vals.length; i < len; i++) {
        if (vals[i] > val) { return true; }
    }
    return false;
}
function _contains_lessthanequal (vals, val) {
    for (var i = 0, len = vals.length; i < len; i++) {
        if (vals[i] <= val) { return true; }
    }
    return false;
}
function _contains_greaterthanequal (vals, val) {
    for (var i = 0, len = vals.length; i < len; i++) {
        if (vals[i] >= val) { return true; }
    }
    return false;
}
function _contains_mod (vals, val) {
    for (var i = 0, len = vals.length; i < len; i++) {
        if (vals[i] % val[0] == val[1]) { return true; }
    }
    return false;
}
function _contains_type (vals, val) {
    for (var i = 0, len = vals.length; i < len; i++) {
        if (vals[i].constructor == val) { return true; }
    }
    return false;
}

var _isFunction = $c.isFunction,
    _isArray = $c.isArray,
    _isObject = $c.isObject,
    _isRegExp = $c.isRegExp,
    _isString = $c.isString,
    _isNumber = $c.isNumber,
    _indexOfAlt = $c.indexOfAlt;

function contains (obj, val, func) {
    if (_isFunction(val)) {
        for (var prop in obj) {
            if (val(obj[prop], prop, obj)) {
                return true;
            }
        }
    }
    if (_isArray(obj)) {
        if (~obj.indexOf(val)) {
            return true;
        }
        if (_isFunction(func) || _isRegExp(val)) {
            if (!func) {
                return _contains_matches(obj, val);
            }
            return !!~_indexOfAlt(obj, val, func);
        }
        if (_isString(func)) {
            var f = _foo;
            switch (func) {
                case "$lt":
                    f = _contains_lessthan;
                    break;
                case "$lte":
                    f = _contains_lessthanequal;
                    break;
                case "$gt":
                    f = _contains_greaterthan;
                    break;
                case "$gte":
                    f = _contains_greaterthanequal;
                    break;
                case "$mod":
                    f = _contains_mod;
                    break;
                case "$type":
                    f = _contains_type;
                    break;
            }
            return !!f(obj, val);
        }
        if (_isArray(val)) {
            for (var i = 0, len = val.length; i < len; i++) {
                var item = val[i];
                if (contains(obj, item, func)) {
                    return item;
                }
            }
        }
    }
    if (_isString(obj)) {
        return !!~(_isRegExp(val) ? obj.search(val) : obj.indexOf(val));
    }
    if (_isObject(obj)) {
        for (var prop in obj) {
            if (!obj.hasOwnProperty(prop)) {
                continue;
            }
            if ((func && func(obj[prop])) || obj[prop] == val) {
                return true;
            }
        }
        return false;
    }
    if (_isNumber(obj)) {
        return !!~obj.toString().indexOf(val);
    }
    return false;
}

function init (ctx) {
    if (!ctx.isEmpty) { return; }
    $c = ctx.isEmpty($c) ? ctx : $c;
    $s = ctx;
    _isFunction = $s.isFunction || $c.isFunction;
    _isArray = $s.isArray || $c.isArray;
    _isObject = $s.isObject || $c.isObject;
    _isRegExp = $s.isRegExp || $c.isRegExp;
    _isString = $s.isString || $c.isString;
    _isNumber = $s.isNumber || $c.isNumber;
    _indexOfAlt = $s.isFunction || $c.indexOfAlt;
    _foo = $s.foo || $c.foo;

    $c._contains_lessthan = ctx._contains_lessthan = $c._contains_lessthan || ctx._contains_lessthan || _contains_lessthan;
    $c._contains_greaterthan = ctx._contains_greaterthan = $c._contains_greaterthan || ctx._contains_greaterthan || _contains_greaterthan;
    $c._contains_lessthanequal = ctx._contains_lessthanequal = $c._contains_lessthanequal || ctx._contains_lessthanequal || _contains_lessthanequal;
    $c._contains_greaterthanequal = ctx._contains_greaterthanequal = $c._contains_greaterthanequal || ctx._contains_greaterthanequal || _contains_greaterthanequal;
    $c._contains_mod = ctx._contains_mod = $c._contains_mod || ctx._contains_mod || _contains_mod;
    $c._contains_type = ctx._contains_type = $c._contains_type || ctx._contains_type || _contains_type;
    $c.contains = ctx.contains = $c.hasOwnProperty('contains') && $c.contains || ctx.hasOwnProperty('contains') && ctx.contains || contains;
}
init._contains_lessthan =  _contains_lessthan;
init._contains_greaterthan =  _contains_greaterthan;
init._contains_lessthanequal =  _contains_lessthanequal;
init._contains_greaterthanequal =  _contains_greaterthanequal;
init._contains_mod =  _contains_mod;
init._contains_type =  _contains_type;
init.contains =  contains;

module.exports = init;