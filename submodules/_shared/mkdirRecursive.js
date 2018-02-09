/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.8.2                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var $c = global.$c || {},
    _isString = $c.isString,
    _error = $c.error;

require('./startsWithAny')($c);

function mkdirRecursive(path, callback, _processedPath) {
    /*|{
        "info": "Recursively create folders.",
        "category": "Utility",
        "parameters":[
            {"path": "(String) Path to create."},
            {"callback": "(Function) Method to call when directories are created (Gets passed error object as an argument and is null if there were no errors)."}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#mkdirRecursive",
        "returnType": "(void)"
    }|*/
    try {
        var absolute = false;
        if ($c.startsWithAny(path, '/')) {
            absolute = true;
            path = path.substring(1);
        }
        _processedPath = _processedPath || process.cwd();
        var fs = require('fs'),
            dirparts = path.split("/"),
            dir = dirparts[0],
            dirPath = _processedPath + "/" + dir;

        if (!dir && dirparts <= 1) { return callback(null, _processedPath.replace(process.cwd(),'')); }

        fs.exists(dirPath, function (exists) {
            if (!exists) {
                fs.mkdir(dirPath, function (err) {
                    if (err) {return callback(err);}
                    return mkdirRecursive(dirparts.splice(1, dirparts.length - 1).join('/'), callback, _processedPath + "/" + dir);
                });
            } else {
                return mkdirRecursive(dirparts.splice(1, dirparts.length - 1).join('/'), callback, _processedPath + "/" + dir);
            }
        });
    } catch(e) {
        _error('fs.mkdirRecursive', e);
    }
}

function init (ctx) {
    if (!ctx.isEmpty) { return; }
    $c = ctx.isEmpty($c) ? ctx : $c;
    _error = ctx.error || $c.error;

    ctx.mkdirRecursive = ctx.hasOwnProperty('mkdirRecursive') && ctx.mkdirRecursive || mkdirRecursive;
    if ($c !== ctx) {
        $c.mkdirRecursive = $c.hasOwnProperty('mkdirRecursive') && $c.mkdirRecursive || ctx.mkdirRecursive
    }
}
init.mkdirRecursive = mkdirRecursive;
module.exports = init;