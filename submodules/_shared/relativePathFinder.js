/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.8.2                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var $c = global.$c || {};

function relativePathFinder (path, depth) {
    var callingPath = "",
        delimiter = "/";
    depth = depth || 0;

    // first clause is for linux based files systems, second clause is for windows based file system
    if (!(path.startsWith('/') || /^[a-zA-Z]:\/|^\/\/.*/.test(path))) {
        callingPath = new Error().stack.split('\n')[3 + depth].replace(/.*?\((.*)/,'$1');
        if (~callingPath.indexOf('\\')) {
            callingPath = callingPath.replace(/\\/g,'/');
        }
        path = callingPath.substring(0,callingPath.lastIndexOf(delimiter) + 1) + path;
    }
    return path;
}

function init (ctx) {
    $c = ctx.isEmpty($c) ? ctx : $c;
    $c.relativePathFinder = ctx.relativePathFinder = $c.relativePathFinder || ctx.relativePathFinder || relativePathFinder;
}
init.relativePathFinder = relativePathFinder;
module.exports = init;