/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.9.0                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var _error, _isArray, _run_func_array;

function emit (ev){
    /*|{
        "info": "Call the next function(s) in queue",
        "category": "Function",
        "parameters":[
            {"event": "(String) Event to trigger."},
            {"...infinite": "(any) any number of arguments can be passed and will be applied to listening functions."}
        ],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#emit",
        "typeParameter": "<TResult>",
        "returnType":"(Array<TResult>)"
    }|*/
    var args = arguments, vals = [];
    try {
        if (!_isArray(args)) {
            args = [];
            for (var prop in arguments) {
                args[prop] = arguments[prop];
            }
            args.callee = arguments.callee;
        }
        if (args.callee.caller['_emit']) {
            vals = vals.concat(_run_func_array.call(this, args.callee.caller['_emit'], args));
        }
        if (ev && args.callee.caller['_'+ev]) {
            vals = vals.concat(_run_func_array.call(this, args.callee.caller['_' + ev], args.splice(1)));
        }
        return vals;
    } catch (e) {
        return e != 'catch' && _run_func_array.call(this, arguments.callee.caller['_catch'], args.length == arguments.length ? args.splice(1) : args);
    }
}

function init (ctx) {
    require('./run_func_array')(ctx);
    _error = ctx.error;
    _isArray = ctx.isArray;
    _run_func_array = ctx.run_func_array;

    ctx.emit = emit;
}
module.exports = init;
