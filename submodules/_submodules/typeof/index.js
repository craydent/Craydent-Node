/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.9.0                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var info = require('./package.json');
global.$g = global;
var $c = $g.$c = $g.$c || { VERSION: info.version, MODULES_LOADED: {} };
$c.ERROR_TYPES = $c.ERROR_TYPES || [];

//require('./dependencies/itemCount');

function __isNewer(loadedVersion, thisVersion){
    if (loadedVersion[0] == thisVersion[0]) {
        loadedVersion.splice(0,1);
        thisVersion.splice(0,1);
        if (!thisVersion.length || !loadedVersion.length) {
            return false;
        }
        return __isNewer(loadedVersion, thisVersion);
    }
    return parseInt(loadedVersion[0]) < parseInt(thisVersion[0]);
}

if ($c.MODULES_LOADED[info.name] && __isNewer($c.VERSION.split('.'), info.version.split('.'))) { return; }
$c.MODULES_LOADED[info.name] = info.version;

function _type_check (obj, cls, backward_compatible){
    try {
        if (isNull(obj)) { return false; }
        if (backward_compatible) { return obj.constructor.name == cls; }
        return obj.constructor == cls;
    } catch (e) {
        $c.error && $c.error('is' + cls.constructor.name, e);
    }
}

function isArray (obj) {
    /*|{
        "info": "Object class extension to check if object is an array",
        "category": "Object|TypeOf",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.isArray",
        "returnType": "(Bool)"
    }|*/
    return _type_check(obj, Array);
}
function isAsync (obj) {
    /*|{
        "info": "Object class extension to check if object is a async function",
        "category": "Object|TypeOf",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.isAsnyc",
        "returnType": "(Bool)"
    }|*/
    return _type_check(obj, "AsyncFunction", true);
}
function isBetween (obj, lowerBound, upperBound, inclusive) {
    /*|{
        "info": "Object class extension to check if object is between lower and upper bounds",
        "category": "Object|TypeOf",
        "parameters":[
            {"lowerBound": "(any) Lower bound comparison"},
            {"upperBound": "(any) Upper bound comparison"}],

        "overloads":[
            {"parameters":[
                {"lowerBound": "(any) Lower bound comparison"},
                {"upperBound": "(any) Upper bound comparison"},
                {"inclusive": "(Bool) Flag to include give bounds"}]}],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.isBetween",
        "returnType": "(Bool)"
    }|*/
    if (isNull(obj)) {return false;}
    if (inclusive) {
        return (obj >= lowerBound && obj <= upperBound);
    } else {
        return (obj > lowerBound && obj < upperBound);
    }
}
function isBoolean (obj) {
    /*|{
        "info": "Object class extension to check if object is a boolean",
        "category": "Object|TypeOf",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.isBoolean",
        "returnType": "(Bool)"
    }|*/
    return _type_check(obj, Boolean);
}
function isDate (obj) {
    /*|{
        "info": "Object class extension to check if object is a date",
        "category": "Object|TypeOf",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.isDate",
        "returnType": "(Bool)"
    }|*/
    return _type_check(obj, Date);
}
function isDomElement (obj) {
    /*|{
        "info": "Object class extension to check if object is a DOM element",
        "category": "Object|TypeOf",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.isDomElement",
        "returnType": "(Bool)"
    }|*/
    try {
        if (isNull(obj)) { return false; }
        return (obj.nodeType == 1);
    } catch (e) {
        $c.error && $c.error('Object.isDomElement', e);
    }
}
function isEmpty (obj) {
    /*|{
        "info": "Object class extension to check if it is empty",
        "category": "Object|TypeOf",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.isEmpty",
        "returnType": "(Bool)"
    }|*/
    try {
        if (isArray(obj) || isString(obj)) { return !obj.length; }
        if (isObject(obj)) { return !$c.itemCount(obj); }
        if (isFunction(obj)) {
            return /function.*?\(.*?\)\{\}/.test(obj.toString().replace(/[\n ]/g,''));
        }
        return false;
    } catch (e) {
        $c.error && $c.error("Object.isEmpty", e);
    }
}
function isError (obj) {
    /*|{
        "info": "Object class extension to check if object is an error object",
        "category": "Object|TypeOf",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.isError",
        "returnType": "(Bool)"
    }|*/
    try{
        var is = _type_check(obj, Error);
        return is || !!~$c.ERROR_TYPES.indexOf(obj) || !!~$c.ERROR_TYPES.indexOf(obj.constructor.name);
    } catch (e) {
        $c.error && $c.error('Object.isError', e);
    }
}
function isFloat (obj) {
    /*|{
        "info": "Object class extension to check if object is a float",
        "category": "Object|TypeOf",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.isFloat",
        "returnType": "(Bool)"
    }|*/
    try {
        if (isNull(obj)) {return false;}
        return (isNumber(obj) && (parseFloat(obj) == obj || parseFloat(obj) === 0));
    } catch (e) {
        $c.error && $c.error('Object.isFloat', e);
    }
}
function isFunction(obj) {
    /*|{
        "info": "Object class extension to check if object is a function",
        "category": "Object|TypeOf",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.isFunction",
        "returnType": "(Bool)"
    }|*/
    return _type_check(obj, Function);
}
function isGenerator (obj) {
    /*|{
        "info": "Object class extension to check if object is a generator function",
        "category": "Object|TypeOf",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.isGenerator",
        "returnType": "(Bool)"
    }|*/
    return _type_check(obj, "GeneratorFunction", true);
}
function isGeolocation (obj) {
    /*|{
        "info": "Object class extension to check if object is a geolocation",
        "category": "Object|TypeOf",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.isGeoLocation",
        "returnType": "(Bool)"
    }|*/
    return _type_check(obj, "Geolocation", true);
}
function isInt (obj) {
    /*|{
        "info": "Object class extension to check if object is an integer",
        "category": "Object|TypeOf",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.isInt",
        "returnType": "(Bool)"
    }|*/
    try {
        if (isNull(obj) || isArray(obj)) { return false; }
        return (parseInt(obj) == obj || parseInt(obj) === 0);
    } catch (e) {
        $c.error && $c.error('Object.isInt', e);
    }
}
function isNull(value, defaultValue) {
    /*|{
        "info": "Check if a value is Null",
        "category": "TypeOf|TypeOf",
        "parameters":[
            {"value": "(any) Value to check"}],

        "overloads":[
            {"parameters":[
                {"value": "(any) Value to check"},
                {"defaultValue": "(any) Value to return if null"}]}],

        "url": "http://www.craydent.com/library/1.9.3/docs#isNull",
        "returnType": "(Bool|any)"
    }|*/
    try {
        var isnull = value == null || value == undefined;
        if (arguments.length === 1) {
            return isnull;
        }
        return isnull ? defaultValue : value;
    } catch (e) {
        $c.error && $c.error('isNull', e);
    }
}
function isNullOrEmpty(obj) {
    /*|{
        "info": "Object class extension to check if object is a null or empty (object with no props, empty string, etc)",
        "category": "Object|TypeOf",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.isNumber",
        "returnType": "(Bool)"
    }|*/
    return isNull(obj) || isEmpty(obj);
}
function isNumber (obj) {
    /*|{
        "info": "Object class extension to check if object is a number",
        "category": "Object|TypeOf",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.isNumber",
        "returnType": "(Bool)"
    }|*/
    return _type_check(obj, Number);
}
function isObject (obj, check_instance) {
    /*|{
        "info": "Object class extension to check if object is an object",
        "category": "Object|TypeOf",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.isObject",
        "returnType": "(Bool)"
    }|*/
    try {
        if (isNull(obj)) { return false; }
        return (obj.constructor == Object || (!!check_instance && obj instanceof Object));
    } catch (e) {
        $c.error && $c.error('Object.isObject', e);
    }
}
function isPromise (obj) {
    /*|{
        "info": "Object class extension to check if object is a promise object",
        "category": "Object|TypeOf",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.isPromise",
        "returnType": "(Bool)"
    }|*/
    return _type_check(obj, "Promise", true);
}
function isRegExp(obj) {
    /*|{
        "info": "Object class extension to check if object is a RegExp",
        "category": "Object|TypeOf",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.isRegExp",
        "returnType": "(Bool)"
    }|*/
    return _type_check(obj, RegExp);
}
function isString (obj) {
    /*|{
        "info": "Object class extension to check if object is a string",
        "category": "Object|TypeOf",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.isString",
        "returnType": "(Bool)"
    }|*/
    return _type_check(obj, String);
}

$c.isArray = isArray;
$c.isAsync = isAsync;
$c.isBetween = isBetween;
$c.isBoolean = isBoolean;
$c.isDate = isDate;
$c.isDomElement = isDomElement;
$c.isEmpty = isEmpty;
$c.isError = isError;
$c.isFloat = isFloat;
$c.isFunction = isFunction;
$c.isGenerator = isGenerator;
$c.isGeolocation = isGeolocation;
$c.isInt = isInt;
$c.isNull = isNull;
$c.isNullOrEmpty = isNullOrEmpty;
$c.isNumber = isNumber;
$c.isObject = isObject;
$c.isPromise = isPromise;
$c.isRegExp = isRegExp;
$c.isString = isString;

require('./dependencies/itemCount')($c);

module.exports = $c;