/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.9.0                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var _isFunction, _isArray, _isObject, _isRegExp, _isString, _isNumber, _indexOfAlt,

    _contains_matches,
    _contains_lessthan,
    _contains_greaterthan,
    _contains_lessthanequal,
    _contains_greaterthanequal,
    _contains_mod,
    _contains_type;


function contains (obj, val, func) {
    if (_isFunction(val) && !func) {
        for (var prop in obj) {
            if (val(obj[prop], prop, obj)) {
                return true;
            }
        }
    }
    if (_isArray(obj)) {
        if (~obj.indexOf(val) && !func) {
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
    require('./_contains_comparisons')(ctx);

    _isFunction = ctx.isFunction;
    _isArray = ctx.isArray;
    _isObject = ctx.isObject;
    _isRegExp = ctx.isRegExp;
    _isString = ctx.isString;
    _isNumber = ctx.isNumber;
    _indexOfAlt = ctx.indexOfAlt;
    _foo = ctx.foo;

    _contains_lessthan = ctx._contains_lessthan;
    _contains_greaterthan = ctx._contains_greaterthan;
    _contains_lessthanequal = ctx._contains_lessthanequal;
    _contains_greaterthanequal = ctx._contains_greaterthanequal;
    _contains_matches = ctx._contains_matches;
    _contains_mod = ctx._contains_mod;
    _contains_type = ctx._contains_type;

    ctx.contains = contains;

}

module.exports = init;