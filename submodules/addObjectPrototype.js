/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.9.0                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var error = require('./error');
var isNull = require('./isNull');
var df;
function addObjectPrototype(name, fn, override) {
    /*|{
        "info": "Method to extend the Object Class",
        "category": "Object|Utility",
        "parameters":[
            {"name": "(String) name of the method to add"},
            {"fn": "(Function) method implementation"}],

        "overloads":[{
            "parameters":[
                {"name": "(String) name of the method to add"},
                {"fn": "(Function) method implementation"},
                {"override": "(Bool) if true, override the previously defined prototype"}]}],

        "url": "http://www.craydent.com/library/1.9.3/docs#addObjectPrototype",
        "returnType": "(void)"
    }|*/
    try {
        var exceptions = { get: 1, set: 1 };
        if (!(name in exceptions) && (isNull($g.__craydentNoConflict) || !$g.__craydentNoConflict)) {
            var shouldOverride = false;
            if (eval("typeof(" + name + ")") == "undefined") {
                shouldOverride = true;
            }
            (!override && Object.prototype[name]) || Object.defineProperty(Object.prototype, name, {
                writable: true,
                enumerable: false,
                configurable: true,
                value: fn
            });
            override = shouldOverride;
        }
    } catch (e) {
        error("addPrototype", e);
        try {
            Array.prototype[name] = !override && Array.prototype[name] || fn;
            Function.prototype[name] = !override && Function.prototype[name] || fn;
            String.prototype[name] = !override && String.prototype[name] || fn;
            Number.prototype[name] = !override && Number.prototype[name] || fn;
            Boolean.prototype[name] = !override && Boolean.prototype[name] || fn;
            Error.prototype[name] = !override && Error.prototype[name] || fn;

            if (typeof GeoLocation) {
                GeoLocation.prototype[name] = !override && GeoLocation.prototype[name] || fn;
            }
        } catch (ex) {
            error("addPrototype:Non-ECMAScript 5", e);
        }
    }
    return df(name, fn, override);
}
module.exports = function(scope) {
    df = require('./defineFunction')(scope);
    return addObjectPrototype;
};