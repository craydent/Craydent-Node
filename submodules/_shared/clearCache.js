/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.8.2                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var $c = global.$c || {};

function clearCache (module) {
    /*|{
        "info": "Clear a module from the require cache.",
        "category": "Global",
        "parameters":[
            {"module": "(String) Single module to remove."}],

        "overloads":[
            {"parameters":[]}],

        "url": "http://www.craydent.com/library/1.9.3/docs#clearCache",
        "returnType": "(Boolean)"
    }|*/
    try {
        if (module) {
            delete require.cache[require.resolve(module)];
            return true;
        }
        for (var prop in require.cache) {
            if (!require.cache.hasOwnProperty(prop)) {
                continue;
            }
            delete require.cache[prop];
        }
        return true;
    } catch (e) {
        _error && _error('clearCache', e);
        return false;
    }
}

function init (ctx) {
    if (!ctx.isEmpty) { return; }
    $c = ctx.isEmpty($c) ? ctx : $c;
    _error = ctx.error || $c.error;
    $c.clearCache = ctx.clearCache = $c.clearCache || ctx.clearCache || clearCache;
}
init.clearCache = clearCache;
module.exports = init;
