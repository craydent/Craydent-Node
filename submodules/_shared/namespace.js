/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.8.2                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var $c = global.$c || {},
    _error = $c.error,
    _getFuncName = $c._getFuncName,
    _getProperty = $c.getProperty,
    _setProperty = $c.setProperty;

function namespace (name, clazz, fn) {
    /*|{
        "info": "Adds the class to a namespace instead of the global space",
        "category": "Utility",
        "parameters":[
            {"name":"(String) Name of the namespace to add to."},
            {"clazz":"(Class) Class to add to the given namespace"}],

        "overloads":[
            {"parameters":[
                {"name":"(String) Name of the namespace to add to."},
                {"clazz":"(Class) Class to add to the given namespace"},
                {"fn":"(Function) Method to call after the class has been added to the namespace"}]}],

        "url": "http://www.craydent.com/library/1.9.3/docs#namespace",
        "returnType":"(void)"
    }|*/
    try {
        var className = _getFuncName(clazz);
        $c.namespace = $c.namespace || {};
        var dclass = _getProperty($c.namespace, name + '.' + className);
        if (dclass){
            $g[name] = $g[name].replace(dclass.toString(),'');
        }
        _setProperty($c.namespace, name + "." + className, clazz);
        $g[name] = ($g[name] || "") + clazz.toString();
        fn && fn.call(clazz);
        return clazz;
    } catch (e) {
        _error && _error('namespace', e);
    }
}

function init (ctx) {
    if (!ctx.isEmpty) { return; }
    $c = ctx.isEmpty($c) ? ctx : $c;
    _error = ctx.error || $c.error;
    _getFuncName = ctx._getFuncName || $c._getFuncName;
    _setProperty = ctx.setProperty || $c.setProperty;

    $c.namespace = ctx.namespace = $c.namespace || ctx.namespace || namespace;
}
init.namespace = namespace;
module.exports = init;
