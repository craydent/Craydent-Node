/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.8.2                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var $s = require('./dependencies/common')(),
    $c = $s.$c,
    ext = $s.ext;

if ($c.MODULES_LOADED[$s.info.name]) { return; }
$s.__log_module();
$s.scope.eval = function (str) { return eval(str); };

require($s.dir + 'addFlags')($s);
require($s.dir + 'getValue')($s);


ext(RegExp, 'addFlags',function (flags) {
    /*|{
        "info": "RegExp class extension to add flags to regex",
        "category": "RegExp",
        "parameters":[
            {"flags": "(String) Flags to add"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#regexp.addFlag",
        "returnType": "(RegExp)"
    }|*/
    try {
        return $s.addFlags(this, flags);
    } catch (e) {
        error('Object.addFlags', e);
    }
}, true);
ext(RegExp, "equals", function (compare, props){
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
        error('Object.equals', e);
    }
}, true);
ext(RegExp, "getValue" ,function (args, dflt) {
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
        error('Object.getValue', e);
    }
}, true);


module.exports = $c;
