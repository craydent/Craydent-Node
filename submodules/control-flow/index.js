/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.8.2                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var cm = require('./common'),
    t = require('craydent-typeof');

function syncroit(gen) {
    /*|{
        "info": "Generator based control flow to allow for more \"syncronous\" programing structure",
        "category": "Global",
        "parameters":[
            {"gen": "(GeneratorFunction) Generator function to execute"}],

        "overloads":[{
            "parameters":[
                {"async": "(AsyncFunction) Async function to execute"}]}],

        "url": "http://www.craydent.com/library/1.9.3/docs#syncroit",
        "returnType": "(Promise)"
    }|*/
    try {
        if (t.isAsync(gen)) { return gen(); }
        return new Promise(function(res){
            var geno = gen();
            try {
                t.isGenerator(gen) && (function cb(value) {
                    var obj = geno.next(value);

                    if (!obj.done) {
                        if (t.isPromise(obj.value)) {
                            return obj.value.then(cb).catch(cb);
                        }
                        setTimeout(function () {
                            cb(obj.value);
                        }, 0);
                    } else {
                        res(t.isNull(obj.value, value));
                    }
                })();
            } catch(e) {
                if (process.listenerCount('uncaughtException')) {
                    return process.emit('uncaughtException', e);
                }
                throw e;
            }
        });

    } catch (e) {
        error('syncroit', e);
        throw e;
    }
}
function yieldable(value,context,callbackIndex,returnIndex) {
    /*|{
        "info": "Makes a value yieldable via a Promise.",
        "category": "Global",
        "parameters":[
            {"value": "(Mixed) Value to make yieldable"}],

        "overloads":[
            {"parameters":[
                {"func": "(Function) Function to make yieldable"},
                {"context": "(Mixed) Context to use to execute func."}]},

            {"parameters":[
                {"func": "(Function) Function to make yieldable"},
                {"callbackIndex": "(Integer) Index of callback argument."}]},

            {"parameters":[
                {"func": "(Function) Function to make yieldable"},
                {"context": "(Mixed) Context to use to execute func."},
                {"callbackIndex": "(Integer) Index of callback argument."}]}],

        "url": "http://www.craydent.com/library/1.9.3/docs#yieldable",
        "returnType": "(Promise)"
    }|*/
    try {
        if (arguments.length == 1 && t.isObject(value)) {
            context = value.context;
            callbackIndex = value.callbackIndex;
            returnIndex = value.returnIndex;
            value = value.method;
        }
        if (t.isPromise(value) || t.isAsync(value)) { return value; }
        if (t.isGenerator(value)) { return syncroit(value); }
        if (t.isFunction(value)) {
            context = context || this;
            return function () {
                var args = [];
                for (var i = 0, len = arguments.length; i < len; i++) {
                    args.push(arguments[i]);
                }
                return new Promise(function(res){
                    var fn = function () {
                        if (arguments.length == 1) {
                            return res(arguments[0]);
                        }
                        if (t.isBoolean(returnIndex) && returnIndex) {
                            for (var i = 0, len = arguments.length; i < len;) {
                                if (arguments[i]) { return arguments[i]; }
                            }
                        }
                        if (t.isNumber(returnIndex)) { return arguments[returnIndex]; }
                        return res(arguments);
                    };
                    if (t.isNull(callbackIndex)) {
                        args.push(fn);
                    } else {
                        cm.insertAt(args, callbackIndex, fn);
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

module.exports.awaitable = yieldable;
module.exports.syncroit = syncroit;
module.exports.yieldable = yieldable;