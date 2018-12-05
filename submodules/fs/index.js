/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.9.0                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var $s = require('./dependencies/common')(),
    $c = $s.$c,
    error = $s.error,
    fs = require('fs');

if (!$c.MODULES_LOADED[$s.info.name]) {
    $s.__log_module();
    $s.scope.eval = function (str) { return eval(str); };

    require($s.dir + 'clearCache')($s);
    require($s.dir + 'include')($s);
    require($s.dir + 'mkdirRecursive')($s);
    require($s.dir + 'parallelEach')($s);
    require($s.dir + 'relativePathFinder')($s);
    require($s.dir + 'requireDirectory')($s);

    var fsmethods = $s.fsmethods;
    for (var i = 0, len = fsmethods.length; i < len; i++) {
        $c[fsmethods[i]] = eval(
        '(function ' + fsmethods[i] + '() {\
            /*|{\
                "info": "A promisified version of ' + fsmethods[i] + '.  The arguments are the same as the native fs methods minus the callback.",\
                "category": "FS",\
                "parameters":[],\
    \
                "overloads":[],\
    \
                "url": "http://www.craydent.com/library/1.9.3/docs#' + fsmethods[i] + '",\
                "returnType": "(any)"\
            }|*/\
            var args = [],\
                name = arguments.callee.name;\
            for (var i = 0, len = arguments.length; i < len; i++) {\
                args.push(arguments[i]);\
            }\
            return new Promise(function (res) {\
                try {\
                    args.push(function (err, data, buffer) {\
                        if (err) {\
                            res(err);\
                        }\
                        if (buffer) {\
                            res({bytes: data, buffer: buffer});\
                        }\
                        res($s.isNull(data, true) || data);\
                    });\
                    fs[name].apply(this, args);\
                } catch (e) {\
                    error(\'fs\', e);\
                }\
            });\
        })');
        // Object.defineProperty($c[fsmethods[i]],"name",{writable:true, value:fsmethods[i]});
    }


    $c.clearCache = $s.clearCache;
    $c.include = $s.include;
    $c.relativePathFinder = $s.relativePathFinder;
    $c.requireDirectory = $s.requireDirectory;
    $c.mkdirRecursive = $s.mkdirRecursive;

    module.exports = $c;
}