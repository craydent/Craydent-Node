/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.8.2                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var $s = require('./dependencies/common')(),
    $c = $s.$c,
    error = $s.error,
    fs = require('fs');

if ($c.MODULES_LOADED[$s.info.name]) { return; }
$s.__log_module();
$s.scope.eval = function (str) { return eval(str); };

require($s.dir + 'include')($s);
require($s.dir + 'parallelEach')($s);
require($s.dir + 'relativePathFinder')($s);
require($s.dir + 'startsWithAny')($s);
require($s.dir + 'requireDirectory')($s);

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
    "writeFile"
];
for (var i = 0, len = fsmethods.length; i < len; i++) {
    $c[fsmethods[i]] = eval(
    'function ' + fsmethods[i] + '() {\
        /*|{\
            "info": "A promisified version of ' + fsmethods[i] + '.  The arguments are the same as the native fs methods minus the callback.",\
            "category": "Global",\
            "parameters":[],\
\
            "overloads":[],\
\
            "url": "http://www.craydent.com/library/1.9.3/docs#' + fsmethods[i] + '",\
            "returnType": "(Mixed)"\
        }|*/\
        var args = arguments,\
            name = arguments.callee.name;\
        return new Promise(function (res) {\
            try {\
                args.push(function (err, data, buffer) {\
                    if (err) {\
                        res(err);\
                    }\
                    if (buffer) {\
                        res({bytes: data, buffer: buffer});\
                    }\
                    res(data || true);\
                });\
                fs[name].apply(this, args);\
            } catch (e) {\
                error(\'fs\', e);\
            }\
        });\
    }');
    // Object.defineProperty($c[fsmethods[i]],"name",{writable:true, value:fsmethods[i]});
}


$c.clearCache = clearCache;
$c.include = $s.include;
$c.relativePathFinder = $s.relativePathFinder;
$c.requireDirectory = $s.requireDirectory;

module.exports = $c;