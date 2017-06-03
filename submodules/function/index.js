/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.8.2                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var cm = require('./common'),
    $c = cm.$c,
    _ext = c.ext,
    _getFuncArgs = cm.getFuncArgs,
    syncroit = cm.syncroit,
    tryEval = cm.tryEval,

    t = require('craydent-typeof');


function emit(ev) {
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
        if (!t.isArray(args)) {
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
function next () {
    /*|{
        "info": "Call the next function(s) in queue",
        "category": "Global",
        "parameters":[
            {"infinite": "any number of arguments can be passed."}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#next",
        "returnType":"(void)"
    }|*/
    var args = arguments;
    try {
        if (!t.isArray(args)) {
            args = [];
            for (var prop in arguments) {
                args[prop] = arguments[prop];
            }
            args.callee = arguments.callee;
        }
        return _run_func_array.call(this, arguments.callee.caller._then, arguments);
    } catch (e) {
        return e != 'catch' && _run_func_array.call(this, arguments.callee.caller['_catch'], args.length == arguments.length ? args.splice(1) : args);
    }
}

_ext(Function, 'getParameters', function () {
    /*|{
        "info": "Function class extension to get parameters in definition",
        "category": "Function",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#function.getParameters",
        "returnType": "(Array)"
    }|*/
    try {
        return _getFuncArgs(this);
    } catch (e) {
        error("Function.getParameters", e);
    }
}, true);
_ext(Function, 'getName', function () {
    /*|{
        "info": "Function class extension to get the name of the function",
        "category": "Function",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#function.getName",
        "returnType": "(String)"
    }|*/
    try {
        return this.name || getFuncName(this);
    } catch (e) {
        error("Function.getName", e);
    }
}, true);
_ext(Function, 'extends',function(extendee, inheritAsOwn){
    /*|{
        "info": "Function class extension to extend another class",
        "category": "Function",
        "parameters":[
            {"extendee":"(Object) Class to extend"}],

        "overloads":[
            {"parameters":[
                {"extendee":"(Object) Class to extend"},
                {"inheritAsOwn":"(Boolean) Flag to inherit and for values hasOwnProperty to be true."}]}],

        "url": "http://www.craydent.com/library/1.9.3/docs#function.extends",
        "returnType": "(Function)"
    }|*/
    try {
        var className = $c.getName(this),
            cls = new extendee();
        $c.namespace[className] = $c.namespaces && $c.namespaces[className];
        for (var prop in cls) {
            if (inheritAsOwn && !cls.hasOwnProperty(prop)) { continue; }
            this.prototype[prop] = /* this[prop] || */ this.prototype[prop] || cls[prop];
        }
        if (!inheritAsOwn) {
            for (var prop in extendee) {
                if (!extendee.hasOwnProperty(prop)) {
                    continue;
                }
                this[prop] = this[prop] || extendee[prop];
            }
        }
        this.prototype.construct = this.prototype.construct || cls.construct || foo;

        return this;
    } catch (e) {
        error("Function.extends", e);
    }
}, true);
_ext(Function, 'on',function(ev, func){
    /*|{
        "info": "Function listener to register events",
        "category": "Function",
        "parameters":[
            {"event":"(String) Event to listen on and invoked on emit"},
            {"func":"(Function) Function to call on emit"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#function.on",
        "returnType": "(String)"
    }|*/
    try {
        this["_"+ev] = this["_"+ev] || [];
        this["_"+ev].push(func);
    } catch (e) {
        error("Function.on", e);
    }
}, true);
var _genConstruct = tryEval(('(function *(){}).constructor'));
_genConstruct && _ext(_genConstruct, 'toPromise',function(){
    /*|{
        "info": "Function listener to register events",
        "category": "Function",
        "parameters":[
            {"event":"(String) Event to listen on and invoked on emit"},
            {"func":"(Function) Function to call on emit"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#function.on",
        "returnType": "(String)"
    }|*/
    try {
        return new Promise(function(resolve,reject){
            syncroit(_genConstruct);
        });
    } catch (e) {
        error("GeneratorFunction.toPromise", e);
    }
}, true);
_ext(Function, 'then',function(func){
    /*|{
        "info": "Function listener to register the then event",
        "category": "Function",
        "parameters":[
            {"func":"(Function) Function to call on emit"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#function.then",
        "returnType": "(String)"
    }|*/
    try {
        $c.on(this,'then',func);
    } catch (e) {
        error("Function.then", e);
    }
}, true);
_ext(Function, 'catch',function(func){
    /*|{
        "info": "Function listener to register the catch event",
        "category": "Function",
        "parameters":[
            {"func":"(Function) Function to call on emit"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#function.catch",
        "returnType": "(String)"
    }|*/
    try {
        $c.on(this,'catch',func);
    } catch (e) {
        error("Function.catch", e);
    }
}, true);
