/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.8.2                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var $s = require('./dependencies/common')(),
    $c = $s.$c,
    ext = $s.ext,
    error = $s.error;

if ($c.MODULES_LOADED[$s.info.name]) { return; }
$s.__log_module();
$s.scope.eval = function (str) { return eval(str); };

require($s.dir + 'on')($s);
require($s.dir + 'emit')($s);
require($s.dir + 'getValue')($s);
require($s.dir + 'namespace')($s);
require($s.dir + 'run_func_array')($s);

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
        if (!$s.isArray(args)) {
            args = [];
            for (var prop in arguments) {
                args[prop] = arguments[prop];
            }
            args.callee = arguments.callee;
        }
        return $s.run_func_array.call(this, arguments.callee.caller._then, arguments);
    } catch (e) {
        return e != 'catch' && $s.run_func_array.call(this, arguments.callee.caller['_catch'], args.length == arguments.length ? args.splice(1) : args);
    }
}


ext(Function, "equals", function (compare, props){
    /*|{
        "info": "Object class extension to check if object values are equal",
        "category": "Object",
        "parameters":[
            {"compare": "(Object) Object to compare against"}],

        "overloads":[
            {"parameters":[
                {"compare": "(Object) Object to compare against"},
                {"props": "(String[]) Array of property values to compare against"}]}],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.equals",
        "returnType": "(Bool)"
    }|*/
    try {
        return $s.equals(this, compare, props);
    } catch (e) {
        error('Function.equals', e);
    }
}, true);
ext(Function, 'extends',function(extendee, inheritAsOwn){
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
        var className = $s.getFuncName(this),
            cls = new extendee();
        $s.namespace[className] = $s.namespaces && $s.namespaces[className];
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
        this.prototype.construct = this.prototype.construct || cls.construct || $s.foo;

        return this;
    } catch (e) {
        error("Function.extends", e);
    }
}, true);
ext(Function, 'getParameters', function () {
    /*|{
        "info": "Function class extension to get parameters in definition",
        "category": "Function",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#function.getParameters",
        "returnType": "(Array)"
    }|*/
    try {
        return $s.getFuncArgs(this);
    } catch (e) {
        error("Function.getParameters", e);
    }
}, true);
ext(Function, 'getName', function () {
    /*|{
        "info": "Function class extension to get the name of the function",
        "category": "Function",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#function.getName",
        "returnType": "(String)"
    }|*/
    try {
        return this.name || $s.getFuncName(this);
    } catch (e) {
        error("Function.getName", e);
    }
}, true);
ext(Function, "getValue" ,function (args, dflt) {
    /*|{
        "info": "Object class extension to retrieve value of an object property",
        "category": "Object",
        "parameters":[],

        "overloads":[
            {"parameters":[
                {"dflt": "(Mixed) Default value to return if context is not a function"}]},

            {"parameters":[
                {"args": "(Mixed[]) An array of arguments to pass to context when it is a function"},
                {"dflt": "(Mixed) Default value to return if context is not a function"}]}],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.getValue",
        "returnType": "(Mixed)"
    }|*/
    try {
        return $s.getValue(this, args, dflt);
    } catch (e) {
        error('Function.getValue', e);
    }
}, true);
ext(Function, 'on',function(ev, func){
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
        return $s.on(this, ev, func);
    } catch (e) {
        error('Function.on', e);
    }
}, true);
var _genConstruct = $s.tryEval(('(function *(){}).constructor'));
_genConstruct && ext(_genConstruct, 'toPromise',function(){
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
            $s.syncroit(_genConstruct);
        });
    } catch (e) {
        error("GeneratorFunction.toPromise", e);
    }
}, true);
ext(Function, 'then',function(func){
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
        $s.on(this,'then',func);
    } catch (e) {
        error("Function.then", e);
    }
}, true);
ext(Function, 'catch',function(func){
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
        $s.on(this,'catch',func);
    } catch (e) {
        error("Function.catch", e);
    }
}, true);

$c.emit = $s.emit;
$c.namespace = $s.namespace;
$c.next = next;

module.exports = $c;