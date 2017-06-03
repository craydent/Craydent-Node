/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.8.2                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
//TODO: document methods
function _type_check (obj, cls, backward_compatible){
    if (isNull(obj)) { return false; }
    if (backward_compatible) { return obj.constructor.name == cls; }
    return obj.constructor == cls;
}

function isArray (obj) {
    /*|{
        "info": "Object class extension to check if object is an array",
        "category": "Object",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.isArray",
        "returnType": "(Bool)"
    }|*/
    try {
        return _type_check(obj, Array);
    } catch (e) {
        error('_isArray', e);
    }
}
function isAsync (obj) {
    /*|{
        "info": "Object class extension to check if object is a async function",
        "category": "Object",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.isAsnyc",
        "returnType": "(Bool)"
    }|*/
    try {
        return _type_check(obj, "AsyncFunction", true);
    } catch (e) {
        error('Object.isAsync', e);
    }
}
function isBetween (obj, lowerBound, upperBound, inclusive) {
    /*|{
        "info": "Object class extension to check if object is between lower and upper bounds",
        "category": "Object",
        "parameters":[
            {"lowerBound": "(Mixed) Lower bound comparison"},
            {"upperBound": "(Mixed) Upper bound comparison"}],

        "overloads":[
            {"parameters":[
                {"lowerBound": "(Mixed) Lower bound comparison"},
                {"upperBound": "(Mixed) Upper bound comparison"},
                {"inclusive": "(Bool) Flag to include give bounds"}]}],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.isBetween",
        "returnType": "(Bool)"
    }|*/
    try {
        if (isNull(obj)) {return false;}
        if (inclusive) {
            return (obj >= lowerBound && obj <= upperBound);
        } else {
            return (obj > lowerBound && obj < upperBound);
        }
    } catch (e) {
        error('Object.isBetween', e);
    }
}
function isBoolean (obj) {
    /*|{
        "info": "Object class extension to check if object is a boolean",
        "category": "Object",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.isBoolean",
        "returnType": "(Bool)"
    }|*/
    try {
        return _type_check(obj, Boolean);
    } catch (e) {
        error('Object.isBoolean', e);
    }
}
function isDate (obj) {
    /*|{
        "info": "Object class extension to check if object is a date",
        "category": "Object",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.isDate",
        "returnType": "(Bool)"
    }|*/
    try {
        return _type_check(obj, Date);
    } catch (e) {
        error('Object.isDate', e);
    }
}
function isDomElement (obj) {
    /*|{
        "info": "Object class extension to check if object is a DOM element",
        "category": "Object",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.isDomElement",
        "returnType": "(Bool)"
    }|*/
    try {
        if (isNull(obj)) {return false;}
        return (obj.nodeType == 1);
    } catch (e) {
        error('Object.isDomElement', e);
    }
}
function isEmpty (obj) {
    /*|{
        "info": "Object class extension to check if it is empty",
        "category": "Object",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.isEmpty",
        "returnType": "(Bool)"
    }|*/
    try {
        if (isArray(obj) || isString(obj)) { return !obj.length; }
        if (isObject(obj)) { return !$c.itemCount(obj); }
        if (isFunction(obj)) {
            return /function.*?\(.*?\)\{\}/.test(this.toString().replace(/[\n ]/g,''));
        }
        return false;
    } catch (e) {
        error("Object.isEmpty", e);
        return false;
    }
}
function isError (obj) {
    /*|{
        "info": "Object class extension to check if object is an error object",
        "category": "Object",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.isError",
        "returnType": "(Bool)"
    }|*/
    try {
        return _type_check(obj, Error);
    } catch (e) {
        error('Object.isError', e);
    }
}
function isFloat (obj) {
    /*|{
        "info": "Object class extension to check if object is a float",
        "category": "Object",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.isFloat",
        "returnType": "(Bool)"
    }|*/
    try {
        if (isNull(obj)) {return false;}
        return (isNumber(obj) && (parseFloat(obj) == this || parseFloat(obj) === 0));
    } catch (e) {
        error('Object.isFloat', e);
    }
}
function isFunction(obj) {
    /*|{
        "info": "Object class extension to check if object is a function",
        "category": "Object",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.isFunction",
        "returnType": "(Bool)"
    }|*/
    try {
        return _type_check(obj, Function);
    } catch (e) {
        error('Object.isFunction', e);
    }
}
function isGenerator (obj) {
    /*|{
        "info": "Object class extension to check if object is a generator function",
        "category": "Object",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.isGenerator",
        "returnType": "(Bool)"
    }|*/
    try {
        return _type_check(obj, "GeneratorFunction", true);
    } catch (e) {
        error('Object.isGenerator', e);
    }
}
function isGeolocation (obj) {
    /*|{
        "info": "Object class extension to check if object is a geolocation",
        "category": "Object",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.isGeoLocation",
        "returnType": "(Bool)"
    }|*/
    try {
        return _type_check(obj, "Geolocation", true);
    } catch (e) {
        error('Object.isGeolocation', e);
    }
}
function isInt (obj) {
    /*|{
        "info": "Object class extension to check if object is an integer",
        "category": "Object",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.isInt",
        "returnType": "(Bool)"
    }|*/
    try {
        if (isNull(obj) || isArray(obj)) { return false; }
        return (parseInt(obj) == obj || parseInt(obj) === 0);
    } catch (e) {
        error('Object.isInt', e);
    }
}
function isNull(obj, value, defaultValue) {
    /*|{
        "info": "Check if a value is Null",
        "category": "Global",
        "parameters":[
            {"value": "(Mixed) Value to check"}],

        "overloads":[
            {"parameters":[
                {"value": "(Mixed) Value to check"},
                {"defaultValue": "(Mixed) Value to return if null"}]}],

        "url": "http://www.craydent.com/library/1.9.3/docs#isNull",
        "returnType": "(Mixed)"
    }|*/
    var isnull = value == null || value == undefined;
    if (arguments.length === 1) {
        return isnull;
    }
    return isnull ? defaultValue : value;
}
function isNumber (obj) {
    /*|{
        "info": "Object class extension to check if object is a number",
        "category": "Object",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.isNumber",
        "returnType": "(Bool)"
    }|*/
    try {
        return _type_check(obj, Number);
    } catch (e) {
        error('Object.isNumber', e);
    }
}
function isObject (obj, check_instance) {
    /*|{
        "info": "Object class extension to check if object is an object",
        "category": "Object",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.isObject",
        "returnType": "(Bool)"
    }|*/
    try {
        if (isNull(obj)) { return false; }
        return (obj.constructor == Object || (!!check_instance && obj instanceof Object));
    } catch (e) {
        error('Object.isObject', e);
    }
}
function isPromise (obj) {
    /*|{
        "info": "Object class extension to check if object is a promise object",
        "category": "Object",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.isPromise",
        "returnType": "(Bool)"
    }|*/
    try {
        return _type_check(obj, "Promise", true);
    } catch (e) {
        error('Object.isPromise', e);
    }
}
function isRegExp(obj) {
    /*|{
        "info": "Object class extension to check if object is a RegExp",
        "category": "Object",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.isRegExp",
        "returnType": "(Bool)"
    }|*/
    try {
        return _type_check(obj, RegExp);
    } catch (e) {
        error('Object.isRegExp', e);
    }
}
function isString (obj) {
    /*|{
        "info": "Object class extension to check if object is a string",
        "category": "Object",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.isString",
        "returnType": "(Bool)"
    }|*/
    try {
        return _type_check(obj, String);
    } catch (e) {
        error('_isString', e);
    }
}

module.exports.isArray = isArray;
module.exports.isAsync = isAsync;
module.exports.isBetween = isBetween;
module.exports.isBoolean = isBoolean;
module.exports.isDate = isDate;
module.exports.isDomElement = isDomElement;
module.exports.isEmpty = isEmpty;
module.exports.isError = isError;
module.exports.isFloat = isFloat;
module.exports.isFunction = isFunction;
module.exports.isGenerator = isGenerator;
module.exports.isGeolocation = isGeolocation;
module.exports.isInt = isInt;
module.exports.isNull = isNull;
module.exports.isNumber = isNumber;
module.exports.isObject = isObject;
module.exports.isPromise = isPromise;
module.exports.isRegExp = isRegExp;
module.exports.isString = isString;