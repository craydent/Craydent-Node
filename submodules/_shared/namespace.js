/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.8.2                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var $c = global.$c || {};

function namespace (name, clazz, fn) {
    /*|{
        "info": "Adds the class to a namespace instead of the global space",
        "category": "Global",
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
        var className = $c.getName(clazz);
        $c.namespaces = $c.namespaces || {};
        $c.namespaces[className] = namespace[className] || clazz;
        $c.setProperty($c.namespaces, name + "." + className, clazz);
        $g[name] = ($g[name] || "") + clazz.toString();
        fn && fn.call(clazz);
        return clazz;
    } catch (e) {
        $c.error && $c.error('namespace', e);
    }
}

function init (ctx) {
    $c = ctx.isEmpty($c) ? ctx : $c;
    $c.namespace = ctx.namespace = $c.namespace || ctx.namespace || namespace;
}
init.namespace = namespace;
module.exports = init;
