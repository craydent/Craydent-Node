/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.8.2                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var $c = global.$c || {},
    _error = $c.error,
    _isArray = $c.isArray,
    _run_func_array = $c.run_func_array;

require('./run_func_array')($c);

function emit (ev){
    /*|{
        "info": "Call the next function(s) in queue",
        "category": "Global",
        "parameters":[
            {"event": "Event to trigger."}],

        "overloads":[
            {"parameters":[
                {"event": "Event to trigger."},
                {"infinite": "any number of arguments can be passed and will be applied to listening functions."}]}],

        "url": "http://www.craydent.com/library/1.9.3/docs#emit",
        "returnType":"(void)"
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
            vals = vals.concat($c.run_func_array.call(this, args.callee.caller['_emit'], args));
        }
        if (ev && args.callee.caller['_'+ev]) {
            vals = vals.concat($c.run_func_array.call(this, args.callee.caller['_' + ev], args.splice(1)));
        }
        return vals;
    } catch (e) {
        return e != 'catch' && $c.run_func_array.call(this, arguments.callee.caller['_catch'], args.length == arguments.length ? args.splice(1) : args);
    }
}

function init (ctx) {
    if (!ctx.isEmpty) { return; }
    $c = ctx.isEmpty($c) ? ctx : $c;
    require('./run_func_array')($c);
    _error = ctx.error || $c.error;
    $c.emit = ctx.emit = $c.emit || ctx.emit || emit;
}
init.on = emit;
module.exports = init;
