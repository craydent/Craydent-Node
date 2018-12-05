/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.9.0                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var _isString, _error, _relativePathFinder, _startsWithAny, _parallelEach;

function requireDirectory (path, options, __basepath, __objs, __fs){
    /*|{
        "info": "Recursively require the entire directory and returns an object containing the required modules.",
        "category": "Utility",
        "parameters":[
            {"path": "(String) Path to directory."},
            {"options?": "(Char) 'r' Flag to use to indicate recursively require, (Char) 's' Flag to indicate use syncronous instead of Promise Pattern"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#requireDirectory",
        "returnType": "(Promise<any>|any)"
    }|*/
    try {
        var delimiter = "/";

        path = _relativePathFinder(path);

        options = options || {};
        __basepath = __basepath || path;
        __objs = __objs || {};
        __fs = __fs || require('fs');
        if (!path.endsWith(delimiter)) {
            path += delimiter;
        }

        if (_isString(options) && ~options.indexOf('s') || options.syncronous) {
            var files = __fs.readdirSync(path);
            for (var i = 0, len = files.length; i < len; i++) {
                var rpath = path + files[i];
                if (__fs.statSync(rpath).isDirectory()) {
                    if (options != "r" && !options.recursive) {
                        continue;
                    }
                    if (!rpath.endsWith(delimiter)) {
                        rpath += delimiter;
                    }
                    requireDirectory(rpath, options, __basepath, __objs, __fs);
                }
                if (!rpath.endsWith('/')) {
                    var filename = rpath.substring(path.lastIndexOf('/') + 1);
                    if (!_startsWithAny(filename, ['_', '.'])) {
                        __objs[rpath.replace(__basepath, '')] = require(rpath);
                    }

                }
            }
            return __objs;
        }
        return new Promise(function (res) {
            __fs.readdir(path, function (err, files) {
                if (err) {
                    return res(err);
                }
                var recFunc = function (rpath) {
                    return new Promise(function (res2) {
                        __fs.statSync(rpath, function (err, stat) {
                            if (err) {
                                res2(err);
                            }
                            if (stat.isDirectory()) {
                                if (options != "r" && !options.recursive) {
                                    return res2();
                                }
                                if (!rpath.endsWith(delimiter)) {
                                    rpath += delimiter;
                                }
                                requireDirectory(rpath, options, __basepath, __objs, __fs)
                                .then(function () {
                                    if (!rpath.endsWith('/')) {
                                        var filename = rpath.substring(path.lastIndexOf('/') + 1);
                                        if (!_startsWithAny(filename, ['_', '.'])) {
                                            __objs[rpath.replace(__basepath, '')] = require(rpath);
                                        }

                                    }
                                });
                            }
                        })
                    });
                };
                var arr = [];
                for (var i = 0, len = files.length; i < len; i++) {
                    arr.push(recFunc(path + files[i]));
                }
                _parallelEach(arr).then(function () {
                    res(__objs);
                });
            });
        });
    } catch (e) {
        _error('fs.requireDirectory', e);
    }
}

function init (ctx) {
    require('./relativePathFinder')(ctx);
    require('./startsWithAny')(ctx);
    require('./parallelEach')(ctx);

    _isString = ctx.isString;
    _error = ctx.error;
    _relativePathFinder = ctx.relativePathFinder;
    _startsWithAny = ctx.startsWithAny;
    _parallelEach = ctx.parallelEach;

    ctx.requireDirectory = requireDirectory;
}
module.exports = init;