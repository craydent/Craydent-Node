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

function init (ctx) {
    ctx._contains_matches = _contains_matches;
    ctx._contains_lessthan = _contains_lessthan;
    ctx._contains_greaterthan = _contains_greaterthan;
    ctx._contains_lessthanequal = _contains_lessthanequal;
    ctx._contains_greaterthanequal = _contains_greaterthanequal;
    ctx._contains_mod = _contains_mod;
    ctx._contains_type = _contains_type;
}
module.exports = init;