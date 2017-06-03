/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.8.2                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var cm = require('./common'),
    fs = require('fs');
    t = require('craydent-typeof'),
    fillTemplate = require('craydent-template').fillTemplate,
    strip = cm.strip,startsWithAny,parallelEach;
//TODO: finish

function relativePath (path, depth) {
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
        if (refresh) { clearCache(path); }
        if ( $c.startsWithAny(path, ['/','.'])) {
            return require(relativePath(path));
        }
        return require(path);
    } catch (e) {
        try {
            return require(relativePath(path));
        } catch (err) {
            return false;
        }
    }
}
function requireDirectory (path, options, __basepath, __objs, __fs){
    /*|{
        "info": "Recursively require the entire directory and returns an object containing the required modules.",
        "category": "Global",
        "parameters":[
            {"path": "(String) Path to directory."}],

        "overloads":[
            {"parameters":[
                {"path": "(String) Path to directory."},
                {"options": "(Char) 'r' Flag to use to indicate recursively require, (Char) 's' Flag to indicate use syncronous instead of Promise Pattern"}]}],

        "url": "http://www.craydent.com/library/1.9.3/docs#requireDirectory",
        "returnType": "(Promise/Object)"
    }|*/
    var delimiter = "/";

    path = relativePath(path);

    options = options || {};
    __basepath = __basepath || path;
    __objs = __objs || {};
    __fs = __fs || require('fs');
    if (!path.endsWith(delimiter)) {
        path += delimiter;
    }

    if (t.isString(options) && ~options.indexOf('s') || options.syncronous) {
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
                if (!$c.startsWithAny(filename, ['_', '.'])) {
                    __objs[rpath.replace(__basepath, '')] = require(rpath);
                }

            }
        }
        return __objs;
    }
    return new Promise(function(res){
        __fs.readdir(path,function(err, files) {
            if (err) { res(err); }
            var recFunc = function(rpath){
                return new Promise(function(res2) {
                    __fs.statSync(rpath,function(err, stat) {
                        if (err) { res2(err); }
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
                                    if (!$c.startsWithAny(filename, ['_', '.'])) {
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
            $c.parallelEach(arr).then(function(){ res(__objs); });
        });
    });
}
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
        error('clearCache', e);
        return false;
    }
}

var fsmethods = [
    "appendFile",
    "chmod",
    "chown",
    "close",
    "fchmod",
    "fchown",
    "fdatasync",
    "fstat",
    "fsync",
    "ftruncate",
    "futimes",
    "lchmod",
    "lchown",
    "link",
    "lstat",
    "mkdir",
    "mkdtemp",
    "open",
    "read",
    "readdir",
    "readFile",
    "readlink",
    "realpath",
    "rename",
    "rmdir",
    "stat",
    "symlink",
    "truncate",
    "unlink",
    "utimes",
    "write",
    "write",
    "writeFile"
];
for (var i = 0, len = fsmethods.length; i < len; i++) {
    module.exports[fsmethods[i]] = function () {
        var args = arguments,
            name = arguments.callee.name;
        return new Promise(function (res) {
            args.push(function (err, data, buffer) {
                if (err) { res(err); }
                if (buffer) { res({bytes: data, buffer: buffer}); }
                res(data || true);
            });
            fs[name].apply(this, args);
        });
    };
    Object.defineProperty(module.exports[fsmethods[i]],"name",{writabel:true, value:fsmethods[i]});
}

module.exports.clearCache = clearCache;
module.exports.include = include;
module.exports.relativePath = relativePath;
module.exports.requireDirectory = requireDirectory;



