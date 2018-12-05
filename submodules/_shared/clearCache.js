/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.9.0                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var _error;
function clearCache (module) {
    /*|{
        "info": "Clear a module from the require cache.",
        "category": "Utility",
        "parameters":[
            {"module?": "(String) Single module to remove."}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#clearCache",
        "returnType": "(Bool)"
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
    _error = ctx.error;

    ctx.clearCache = clearCache;
}
module.exports = init;
