/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.8.2                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var $c = global.$c || {};

function parallelEach(obj, gen, args) {
    try {
        var self = obj, arr = obj;
        if ($c.isArray(gen)) {
            args = gen;
            gen = undefined;
        }
        if (!$c.isArray(args)) {
            args = [];
        }
        var len = arr.length, results = Array(len), completed = 0;
        if (!len) { return new Promise(function (res) { res(results); }); }
        if (gen) {
            var isgen = $c.isGenerator(gen), isfunc = $c.isFunction(gen), isasync = $c.isAsync(gen);
            return new Promise(function (res, rej) {
                for (var i = 0; i < len; i++) {
                    if (isgen) {
                        eval('$c.syncroit(function*(){ results[' + i + '] = yield* gen.call(self, arr[' + i + '],' + i + '); if (++completed == len) { res(results); } });');
                    } else if (isasync) {
                        eval('(async function (){ results[' + i + '] = await gen.call(self, arr[' + i + '],' + i + '); if (++completed == len) { res(results); } })();');
                    } else if (isfunc) {
                        results[i] = gen.call(self,arr[i],i);
                        if (++completed == len) { res(results); }
                    }
                }
            });
        }
        return new Promise(function (res, rej) {
            for (var i = 0; i < len; i++) {
                if ($c.isGenerator(arr[i])) {
                    eval('$c.syncroit(function*(){ results[' + i + '] = yield* arr[' + i + '].apply(self,args); if (++completed == len) { res(results); } });');
                } else if ($c.isAsync(arr[i])) {
                    eval('(async function () { results[' + i + '] = await arr[' + i + ']; if (++completed == len) { res(results); } })();');
                } else if ($c.isPromise(arr[i])) {
                    eval('$c.syncroit(function*(){ results[' + i + '] = yield arr[' + i + ']; if (++completed == len) { res(results); } });');
                } else if ($c.isFunction(arr[i])) {
                    eval('setTimeout(function(){ results[' + i + '] = arr[' + i + '].apply(self,args);if (++completed == len) { res(results); } },0);');
                } else {
                    results[i] = arr[i];
                    if (++completed == len) { res(results); }
                }
            }
        });
    } catch(e) {
        $c.error && $c.error("Array.parallelEach", e);
    }
}

function init (ctx) {
    $c = ctx.isEmpty($c) ? ctx : $c;
    $c.parallelEach = ctx.parallelEach = $c.parallelEach || ctx.parallelEach || parallelEach;
}
init.parallelEach = parallelEach;
module.exports = init;
