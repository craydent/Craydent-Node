/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.8.2                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var $c = global.$c || {};

require('./clearCache');
require('./relativePathFinder');
require('./startsWithAny');

function include(path, refresh){
    /*|{
        "info": "Require without erroring when module does not exist.",
        "category": "Global",
        "parameters":[
            {"path": "(String) Module or Path to module."}],

        "overloads":[
            {"parameters":[
                {"path": "(String) Module or Path to module."},
                {"refresh": "(Boolean) Flag to clear cache for the specific include."}]}],

        "url": "http://www.craydent.com/library/1.9.3/docs#include",
        "returnType": "(Mixed)"
    }|*/
    try {
        if (refresh) { $c.clearCache(path); }
        if ( $c.startsWithAny(path, ['/','.'])) {
            return require($c.relativePathFinder(path));
        }
        return require(path);
    } catch (e) {
        try {
            return require($c.relativePathFinder(path));
        } catch (err) {
            return false;
        }
    }
}

function init (ctx) {
    $c = ctx.isEmpty($c) ? ctx : $c;
    require('./clearCache')($c);
    require('./relativePathFinder')($c);
    require('./startsWithAny')($c);
    $c.include = ctx.include = $c.include || ctx.include || include;
}
init.include = include;
module.exports = init;
