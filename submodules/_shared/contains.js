/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.8.2                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var $c = global.$c || {};

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

function contains (obj, val, func) {
    try {
        if ($c.isFunction(val)) {
            for (var prop in obj) {
                if (val(obj[prop], prop, obj)) {
                    return true;
                }
            }
        }
        switch (true) {
            case $c.isArray(obj):
                if (~obj.indexOf(val)) {
                    return true;
                }
                if ($c.isFunction(func) || $c.isRegExp(val)) {
                    return !!~$c.indexOfAlt(obj, val, func);
                } else if ($c.isString(func)) {
                    var f = $c.foo;
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
                } else if ($c.isArray(val)) {
                    for (var i = 0, len = val.length; i < len; i++) {
                        var item = val[i];
                        if ($c.contains(obj, item, func)) {
                            return item;
                        }
                    }
                }
                return false;
            case $c.isString(obj):
                return !!~($c.isRegExp(val) ? obj.search(val) : obj.indexOf(val));
            case $c.isObject(obj):
                for (var prop in obj) {
                    if (!obj.hasOwnProperty(prop)) {
                        continue;
                    }
                    if ((func && func(obj[prop])) || obj[prop] == val) {
                        return true;
                    }
                }
                break;
            case $c.isNumber(obj):
                return !!~obj.toString().indexOf(val);
        }
        return false;
    } catch (e) {
        $c.error && $c.error("Object.contains", e);
    }
}

function init (ctx) {
    $c = ctx.isEmpty($c) ? ctx : $c;
    $c._contains_lessthan = ctx._contains_lessthan = $c._contains_lessthan || ctx._contains_lessthan || _contains_lessthan;
    $c._contains_greaterthan = ctx._contains_greaterthan = $c._contains_greaterthan || ctx._contains_greaterthan || _contains_greaterthan;
    $c._contains_lessthanequal = ctx._contains_lessthanequal = $c._contains_lessthanequal || ctx._contains_lessthanequal || _contains_lessthanequal;
    $c._contains_greaterthanequal = ctx._contains_greaterthanequal = $c._contains_greaterthanequal || ctx._contains_greaterthanequal || _contains_greaterthanequal;
    $c._contains_mod = ctx._contains_mod = $c._contains_mod || ctx._contains_mod || _contains_mod;
    $c._contains_type = ctx._contains_type = $c._contains_type || ctx._contains_type || _contains_type;
    $c.contains = ctx.contains = $c.contains || ctx.contains || contains;
}
init._contains_lessthan =  _contains_lessthan;
init._contains_greaterthan =  _contains_greaterthan;
init._contains_lessthanequal =  _contains_lessthanequal;
init._contains_greaterthanequal =  _contains_greaterthanequal;
init._contains_mod =  _contains_mod;
init._contains_type =  _contains_type;
init.contains =  contains;

module.exports = init;