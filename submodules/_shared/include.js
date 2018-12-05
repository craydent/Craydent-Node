/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.9.0                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var _clearCache, _startsWithAny, _relativePathFinder;

function include(path, refresh){
    /*|{
        "info": "Require without erroring when module does not exist.",
        "category": "Utility",
        "parameters":[
            {"path": "(String) Module or Path to module."},
            {"refresh?": "(Bool) Flag to clear cache for the specific include."}],

        "overloads":[
            {"parameters":[
                {"path": "(String) Module or Path to module."},
                {"refresh": "(Boolean) Flag to clear cache for the specific include."}]}],

        "url": "http://www.craydent.com/library/1.9.3/docs#include",
        "returnType": "(any|false)"
    }|*/
    try {
        if (refresh) { _clearCache(path); }
        if (_startsWithAny(path, ['/','.'])) {
            return require(_relativePathFinder(path));
        }
        return require(path);
    } catch (e) {
        try {
            return require(_relativePathFinder(path));
        } catch (err) {
            return false;
        }
    }
}

function init (ctx) {
    require('./clearCache')(ctx);
    require('./relativePathFinder')(ctx);
    require('./startsWithAny')(ctx);

    _clearCache = ctx.clearCache;
    _startsWithAny = ctx.startsWithAny;
    _relativePathFinder = ctx.relativePathFinder;

    ctx.include = include;
}
module.exports = init;
