/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.9.0                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var _error, _getFuncName, _getProperty, _setProperty, raw = {};

function namespace (name, clazz, fn) {
    /*|{
        "info": "Adds the class to a namespace instead of the global space",
        "category": "Utility",
        "parameters":[
            {"name":"(String) Name of the namespace to add to."},
            {"clazz":"(Class) Class to add to the given namespace"},
            {"fn":"(Function) Method to call after the class has been added to the namespace"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#namespace",
        "returnType":"(void)"
    }|*/
    try {
        var className = _getFuncName(clazz);
        var prop = name + '.' + className;
        var cpath = prop + ".class";
        var dclass = _getProperty(namespace, cpath);
        raw[name] = raw[name] || { string: "" };
        if (dclass){
            raw[name].string = raw[name].string.replace(dclass,'');
        }
        raw[name].string = raw[name].string + clazz.toString()
        _setProperty(raw, cpath, clazz);
        _setProperty(namespace, prop, clazz);
        namespace[name].toString = function(){
            return raw[name].string;
        };
        fn && fn.call(clazz);
        return clazz;
    } catch (e) {
        _error && _error('namespace', e);
    }
}
function init (ctx) {
    _error = ctx.error;
    _getFuncName = ctx._getFuncName;
    _setProperty = ctx.setProperty;
    _getProperty = ctx.getProperty;

    ctx.namespace = namespace;
}
module.exports = init;
