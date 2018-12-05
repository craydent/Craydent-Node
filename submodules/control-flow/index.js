/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.9.0                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var $s = require('./dependencies/common')(),
    $c = $s.$c,
    error = $s.error;

if (!$c.MODULES_LOADED[$s.info.name]) {
    $s.__log_module();
    $s.scope.eval = function (str) { return eval(str); };

    require($s.dir + 'insertAt')($s);
    require($s.dir + 'parallelEach')($s);

    function yieldable(value,context,callbackIndex,returnIndex) {
        /*|{
            "info": "Makes a value yieldable via a Promise.",
            "category": "Control Flow|Utility",
            "parameters":[
                {"value": "(YieldableValue) Value to make yieldable"}],

            "overloads":[
                {"parameters":[
                    {"func": "(Function) Function to make yieldable"},
                    {"context": "(any) Context to use to execute func."}]},

                {"parameters":[
                    {"func": "(Function) Function to make yieldable"},
                    {"callbackIndex": "(Integer) Index of callback argument."}]},

                {"parameters":[
                    {"func": "(Function) Function to make yieldable"},
                    {"context": "(any) Context to use to execute func."},
                    {"callbackIndex": "(Integer) Index of callback argument."}]},

                {"parameters":[
                    {"func": "(Function) Function to make yieldable"},
                    {"context": "(any) Context to use to execute func."},
                    {"callbackIndex": "(Integer) Index of callback argument."},
                    {"returnIndex": "(Integer) Index of callback argument."}]}],

            "url": "http://www.craydent.com/library/1.9.3/docs#yieldable",
            "returnType": "(Promise<YieldableResult>)"
        }|*/
        try {
            if (arguments.length == 1 && $s.isObject(value)) {
                context = value.context;
                callbackIndex = value.callbackIndex;
                returnIndex = value.returnIndex;
                value = value.method;
            }
            if ($s.isPromise(value) || $s.isAsync(value)) { return value; }
            if ($s.isGenerator(value)) { return $s.syncroit(value); }
            if ($s.isFunction(value)) {
                context = context || this;
                return function () {
                    var args = [];
                    for (var i = 0, len = arguments.length; i < len; i++) {
                        args.push(arguments[i]);
                    }
                    return new Promise(function(res){
                        var fn = function () {
                            var args = arguments;
                            if (args.length == 1) {
                                return res(args[0]);
                            }
                            if ($s.isBoolean(returnIndex) && returnIndex) {
                                for (var i = 0, len = args.length; i < len; i++) {
                                    if (args[i]) { return res(args[i]); }
                                }
                            }
                            if ($s.isNumber(returnIndex)) { return res(args[returnIndex]); }
                            return res(args);
                        };
                        if ($s.isNull(callbackIndex)) {
                            args.push(fn);
                        } else {
                            $s.insertAt(args, callbackIndex, fn);
                        }
                        value.apply(context,args);
                    });
                };
            }
            return new Promise(function(res){ return res(value); });

        } catch (e) {
            error('yieldable', e);
        }
    }

    $s._ext(Array, 'parallelEach', function (gen, args) {
        /*|{
            "info": "Array class extension to execute each array item in parallel or run each item against a generator/function in parallel",
            "category": "Control Flow|Array",
            "parameters":[],

            "overloads":[
                {"parameters":[
                    {"func": "(Yieldables) function to apply to each item"}]},

                {"parameters":[
                    {"args": "(Array<Yieldables>) Argument array to apply to pass to generator or function (only should be used when the array contains generators, promises, async functions, or functions)"}]}],

            "url": "http://www.craydent.com/library/1.9.3/docs#array.parallelEach",
            "returnType": "(Promise<any>)"
        }|*/
        try {
            return $s.parallelEach(this, gen, args);
        } catch (e) {
            error('Array.parallelEach', e);
        }
    }, true);

    $c.awaitable = yieldable;
    $c.syncroit = $s.syncroit;
    $c.yieldable = yieldable;

    module.exports = $c;
}