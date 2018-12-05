/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.9.0                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var info = require('./package.json');
var scope = { eval: function (str) { return eval(str); } };
var error = require('./dependencies/error');
var _ao = require('./dependencies/addObjectPrototype')(scope);
var isNull = require('./dependencies/isNull');
global.$g = global;
var $c = $g.$c = $g.$c || { VERSION: info.version, MODULES_LOADED: {} };
$c.ERROR_TYPES = $c.ERROR_TYPES || [];
$c.error = error;

if (!$c.MODULES_LOADED[info.name]) {
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

    function isArray () {
        /*|{
            "info": "Object class extension to check if object is an array",
            "category": "Object|TypeOf",
            "parameters":[],

            "overloads":[],

            "url": "http://www.craydent.com/library/1.9.3/docs#object.isArray",
            "returnType": "(Bool)"
        }|*/
        return _type_check(this, Array);
    }
    function isAsync () {
        /*|{
            "info": "Object class extension to check if object is a async function",
            "category": "Object|TypeOf",
            "parameters":[],

            "overloads":[],

            "url": "http://www.craydent.com/library/1.9.3/docs#object.isAsnyc",
            "returnType": "(Bool)"
        }|*/
        return _type_check(this, "AsyncFunction", true);
    }
    function isBetween (lowerBound, upperBound, inclusive) {
        /*|{
            "info": "Object class extension to check if object is between lower and upper bounds",
            "category": "Object|TypeOf",
            "parameters":[
                {"lowerBound": "(any) Lower bound comparison"},
                {"upperBound": "(any) Upper bound comparison"},
                {"inclusive?": "(Bool) Flag to include give bounds"}],

            "overloads":[],

            "url": "http://www.craydent.com/library/1.9.3/docs#object.isBetween",
            "returnType": "(Bool)"
        }|*/
        if (isNull(this)) {return false;}
        if (inclusive) {
            return (this >= lowerBound && this <= upperBound);
        } else {
            return (this > lowerBound && this < upperBound);
        }
    }
    function isBoolean () {
        /*|{
            "info": "Object class extension to check if object is a boolean",
            "category": "Object|TypeOf",
            "parameters":[],

            "overloads":[],

            "url": "http://www.craydent.com/library/1.9.3/docs#object.isBoolean",
            "returnType": "(Bool)"
        }|*/
        return _type_check(this, Boolean);
    }
    function isDate () {
        /*|{
            "info": "Object class extension to check if object is a date",
            "category": "Object|TypeOf",
            "parameters":[],

            "overloads":[],

            "url": "http://www.craydent.com/library/1.9.3/docs#object.isDate",
            "returnType": "(Bool)"
        }|*/
        return _type_check(this, Date);
    }
    function isDomElement () {
        /*|{
            "info": "Object class extension to check if object is a DOM element",
            "category": "Object|TypeOf",
            "parameters":[],

            "overloads":[],

            "url": "http://www.craydent.com/library/1.9.3/docs#object.isDomElement",
            "returnType": "(Bool)"
        }|*/
        try {
            if (isNull(this)) { return false; }
            return (this.nodeType == 1);
        } catch (e) {
            $c.error && $c.error('Object.isDomElement', e);
        }
    }
    function isEmpty () {
        /*|{
            "info": "Object class extension to check if it is empty",
            "category": "Object|TypeOf",
            "parameters":[],

            "overloads":[],

            "url": "http://www.craydent.com/library/1.9.3/docs#object.isEmpty",
            "returnType": "(Bool)"
        }|*/
        try {
            if ($c.isArray(this) || $c.isString(this)) { return !this.length; }
            if ($c.isObject(this)) { return !$c.itemCount(this); }
            if ($c.isFunction(this)) {
                return /function.*?\(.*?\)\{\}/.test(this.toString().replace(/[\n ]/g,''));
            }
            return false;
        } catch (e) {
            $c.error && $c.error("Object.isEmpty", e);
        }
    }
    function isError () {
        /*|{
            "info": "Object class extension to check if object is an error object",
            "category": "Object|TypeOf",
            "parameters":[],

            "overloads":[],

            "url": "http://www.craydent.com/library/1.9.3/docs#object.isError",
            "returnType": "(Bool)"
        }|*/
        try{
            var is = _type_check(this, Error);
            return is || !!~$c.ERROR_TYPES.indexOf(this) || !!~$c.ERROR_TYPES.indexOf(this.constructor.name);
        } catch (e) {
            $c.error && $c.error('Object.isError', e);
        }
    }
    function isFloat () {
        /*|{
            "info": "Object class extension to check if object is a float",
            "category": "Object|TypeOf",
            "parameters":[],

            "overloads":[],

            "url": "http://www.craydent.com/library/1.9.3/docs#object.isFloat",
            "returnType": "(Bool)"
        }|*/
        try {
            if (isNull(this)) {return false;}
            return ($c.isNumber(this) && (parseFloat(this) == this || parseFloat(this) === 0));
        } catch (e) {
            $c.error && $c.error('Object.isFloat', e);
        }
    }
    function isFunction() {
        /*|{
            "info": "Object class extension to check if object is a function",
            "category": "Object|TypeOf",
            "parameters":[],

            "overloads":[],

            "url": "http://www.craydent.com/library/1.9.3/docs#object.isFunction",
            "returnType": "(Bool)"
        }|*/
        return _type_check(this, Function);
    }
    function isGenerator () {
        /*|{
            "info": "Object class extension to check if object is a generator function",
            "category": "Object|TypeOf",
            "parameters":[],

            "overloads":[],

            "url": "http://www.craydent.com/library/1.9.3/docs#object.isGenerator",
            "returnType": "(Bool)"
        }|*/
        return _type_check(this, "GeneratorFunction", true);
    }
    function isGeolocation () {
        /*|{
            "info": "Object class extension to check if object is a geolocation",
            "category": "Object|TypeOf",
            "parameters":[],

            "overloads":[],

            "url": "http://www.craydent.com/library/1.9.3/docs#object.isGeoLocation",
            "returnType": "(Bool)"
        }|*/
        return _type_check(this, "Geolocation", true);
    }
    function isInt () {
        /*|{
            "info": "Object class extension to check if object is an integer",
            "category": "Object|TypeOf",
            "parameters":[],

            "overloads":[],

            "url": "http://www.craydent.com/library/1.9.3/docs#object.isInt",
            "returnType": "(Bool)"
        }|*/
        try {
            if (isNull(this) || $c.isArray(this)) { return false; }
            return (parseInt(this) == this || parseInt(this) === 0);
        } catch (e) {
            $c.error && $c.error('Object.isInt', e);
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
        return isNull(obj) || isEmpty.call(obj);
    }
    function isNumber () {
        /*|{
            "info": "Object class extension to check if object is a number",
            "category": "Object|TypeOf",
            "parameters":[],

            "overloads":[],

            "url": "http://www.craydent.com/library/1.9.3/docs#object.isNumber",
            "returnType": "(Bool)"
        }|*/
        return _type_check(this, Number);
    }
    function isObject (check_instance) {
        /*|{
            "info": "Object class extension to check if object is an object",
            "category": "Object|TypeOf",
            "parameters":[],

            "overloads":[],

            "url": "http://www.craydent.com/library/1.9.3/docs#object.isObject",
            "returnType": "(Bool)"
        }|*/
        try {
            if (isNull(this)) { return false; }
            return (this.constructor == Object || (!!check_instance && this instanceof Object));
        } catch (e) {
            $c.error && $c.error('Object.isObject', e);
        }
    }
    function isPromise () {
        /*|{
            "info": "Object class extension to check if object is a promise object",
            "category": "Object|TypeOf",
            "parameters":[],

            "overloads":[],

            "url": "http://www.craydent.com/library/1.9.3/docs#object.isPromise",
            "returnType": "(Bool)"
        }|*/
        return _type_check(this, "Promise", true);
    }
    function isRegExp() {
        /*|{
            "info": "Object class extension to check if object is a RegExp",
            "category": "Object|TypeOf",
            "parameters":[],

            "overloads":[],

            "url": "http://www.craydent.com/library/1.9.3/docs#object.isRegExp",
            "returnType": "(Bool)"
        }|*/
        return _type_check(this, RegExp);
    }
    function isString () {
        /*|{
            "info": "Object class extension to check if object is a string",
            "category": "Object|TypeOf",
            "parameters":[],

            "overloads":[],

            "url": "http://www.craydent.com/library/1.9.3/docs#object.isString",
            "returnType": "(Bool)"
        }|*/
        return _type_check(this, String);
    }
    _ao("isFloat", isFloat);
    _ao("isArray", isArray);
    _ao("isAsync", isAsync);
    _ao("isBetween", isBetween);
    _ao("isBoolean", isBoolean);
    _ao("isDate", isDate);
    _ao("isDomElement", isDomElement);
    _ao("isEmpty", isEmpty, true);
    _ao("isError", isError);
    _ao("isFloat", isFloat);
    _ao("isFunction", isFunction);
    _ao("isGenerator", isGenerator);
    _ao("isGeolocation", isGeolocation);
    _ao("isInt", isInt);
    $c.isNull = isNull;
    $c.isNullOrEmpty = isNullOrEmpty;
    _ao("isNumber", isNumber);
    _ao("isObject", isObject);
    _ao("isPromise", isPromise);
    _ao("isRegExp", isRegExp);
    _ao("isString", isString);

    require('./dependencies/itemCount')($c);

    module.exports = $c;
}