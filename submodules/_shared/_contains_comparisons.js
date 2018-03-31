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
    if (!ctx.isEmpty) { return; }
    $c = ctx.isEmpty($c) ? ctx : $c;

    ctx._contains_matches = ctx.hasOwnProperty('_contains_matches') && ctx._contains_matches || _contains_matches;
    ctx._contains_lessthan = ctx.hasOwnProperty('_contains_lessthan') && ctx._contains_lessthan || _contains_lessthan;
    ctx._contains_greaterthan = ctx.hasOwnProperty('_contains_greaterthan') && ctx._contains_greaterthan || _contains_greaterthan;
    ctx._contains_lessthanequal = ctx.hasOwnProperty('_contains_lessthanequal') && ctx._contains_lessthanequal || _contains_lessthanequal;
    ctx._contains_greaterthanequal = ctx.hasOwnProperty('_contains_greaterthanequal') && ctx._contains_greaterthanequal || _contains_greaterthanequal;
    ctx._contains_mod = ctx.hasOwnProperty('_contains_mod') && ctx._contains_mod || _contains_mod;
    ctx._contains_type = ctx.hasOwnProperty('_contains_type') && ctx._contains_type || _contains_type;
    if ($c !== ctx) {
        $c._contains_matches = $c.hasOwnProperty('_contains_matches') && $c._contains_matches || ctx._contains_matches;
        $c._contains_lessthan = $c.hasOwnProperty('_contains_lessthan') && $c._contains_lessthan || ctx._contains_lessthan;
        $c._contains_greaterthan = $c.hasOwnProperty('_contains_greaterthan') && $c._contains_greaterthan || ctx._contains_greaterthan;
        $c._contains_lessthanequal = $c.hasOwnProperty('_contains_lessthanequal') && $c._contains_lessthanequal || ctx._contains_lessthanequal;
        $c._contains_greaterthanequal = $c.hasOwnProperty('_contains_greaterthanequal') && $c._contains_greaterthanequal || ctx._contains_greaterthanequal;
        $c._contains_mod = $c.hasOwnProperty('_contains_mod') && $c._contains_mod || ctx._contains_mod;
        $c._contains_type = $c.hasOwnProperty('_contains_type') && $c._contains_type || ctx._contains_type;
    }
}
init._contains_matches = _contains_matches;
init._contains_lessthan = _contains_lessthan;
init._contains_greaterthan = _contains_greaterthan;
init._contains_lessthanequal = _contains_lessthanequal;
init._contains_greaterthanequal = _contains_greaterthanequal;
init._contains_mod = _contains_mod;
init._contains_type = _contains_type;
module.exports = init;