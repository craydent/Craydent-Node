/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.8.2                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/

var c = require('./common'),
    _ao = addObjectPrototype,
    t = require('craydent-typeof');

function addObjectPrototype(name, fn, override) {
    /*|{
        "info": "Method to extend the Object Class",
        "category": "Global",
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
        if (t.isNull($g.__craydentNoConflict) || !$g.__craydentNoConflict) {
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

            if (typeof GeoLocation) {
                GeoLocation.prototype[name] = !override && GeoLocation.prototype[name] || fn;
            }
        } catch (ex) {
            error("addPrototype:Non-ECMAScript 5", e);
        }
    }
    return c.defineFunction(name, fn, override);
}

//TODO: finish
_ao("changes", function(compare){
    /*|{
     "info": "Object class extension to compare properties that have changed",
     "category": "Object",
     "parameters":[
     {"compare": "(Object) Object to compare against"}],

     "overloads":[],

     "url": "http://www.craydent.com/library/1.9.3/docs#object.",
     "returnType": "(Object)"
     }|*/
    try {
        if (this.constructor != Object || compare.constructor != Object) {
            //noinspection ExceptionCaughtLocallyJS
            throw new TypeError();
        }
        var rtn = {$length:0,$add:[],$update:[],$delete:[]};
        // loop through each property of the original
        for (var prop in this) {
            if (this.hasOwnProperty(prop)) {
                if (!compare.hasOwnProperty(prop)) {
                    rtn[prop] = null;
                    rtn.$delete.push(prop);
                    rtn.$length++;
                } else if (!$c.equals(compare[prop], this[prop])) {
                    rtn[prop] = compare[prop];
                    rtn.$update.push(prop);
                    rtn.$length++;
                }
            }
        }
        // loop through each property of the compare to make sure
        // there are no properties from compare missing from the original
        for (var prop in compare) {
            if (compare.hasOwnProperty(prop) && !this.hasOwnProperty(prop)) {
                rtn[prop] = compare[prop];
                rtn.$add.push(prop);
                rtn.$length++;
            }
        }
        return rtn;

    } catch (e) {
        error("Object.changes", e);
    }
});
_ao("contains", function(val, func){
    /*|{
     "info": "Object class extension to check if value exists",
     "category": "Object",
     "parameters":[
     {"val": "(Mixed) Value to check or custom function to determine validity"}],

     "overloads":[
     {"parameters":[
     {"val": "(Mixed) Value to check"},
     {"func": "(Function) Callback function used to do the comparison"}]},

     {"parameters":[
     {"arr": "(Array) Array of values to return first matching value"}]}],

     "url": "http://www.craydent.com/library/1.9.3/docs#object.contains",
     "returnType": "(Bool)"
     }|*/
    try {
        if ($c.isFunction(val)) {
            for (var prop in this) {
                if (val(this[prop],prop,this)) { return true; }
            }
        }
        switch(true) {
            case $c.isArray(this):
                if (~this.indexOf(val)) { return true; }
                if ($c.isFunction(func) || $c.isRegExp(val)) {
                    return !!~$c.indexOfAlt(this,val,func);
                } else if ($c.isString(func)) {
                    var f = foo;
                    switch(func){
                        case "$lt":
                            f = _contains_lessthan;
                            break;
                        case "$lte":
                            f = _contains_lessthanequal;
                            break;
                        case "$gt":
                            f = _contains_greaterthan;
                            break;
                        case "$gte":
                            f = _contains_greaterthanequal;
                            break;
                        case "$mod":
                            f = _contains_mod;
                            break;
                        case "$type":
                            f = _contains_type;
                            break;
                    }
                    return !!f(this,val);
                } else if ($c.isArray(val)) {
                    for (var i = 0, len = val.length; i < len; i++) {
                        var item = val[i];
                        if ($c.contains(this,item,func)) {
                            return item;
                        }
                    }
                }
                return false;
            case $c.isString(this):
                return !!~($c.isRegExp(val) ? this.search(val) : this.indexOf(val));
            case $c.isObject(this):
                for (var prop in this) {
                    if (!this.hasOwnProperty(prop)) { continue; }
                    if ((func && func(this[prop])) || this[prop] == val) {
                        return true;
                    }
                }
                break;
            case $c.isNumber(this):
                return !!~this.toString().indexOf(val);
        }
        return false;
    } catch (e) {
        error("Object.contains", e);
    }
});
_ao("copyObject", function () {
    /*|{
     "info": "Object class extension to copy an object excluding constructor",
     "category": "Object",
     "parameters":[],

     "overloads":[],

     "url": "http://www.craydent.com/library/1.9.3/docs#object.copyObject",
     "returnType": "(Object)"
     }|*/
    try {
        if (!this) { return undefined; }
        return _duplicate({}, this, true);
    } catch (e) {
        error("Object.copyObject", e);
    }
});
_ao("count", function(option){
    /*|{
     "info": "Object class extension to count the properties in the object/elements in arrays/characters in strings.",
     "category": "Object",
     "parameters":[],

     "overloads":[
     {"parameters":[
     {"option": "(Mixed) Query used in Array.where when counting elements in an Array"}]},
     {"parameters":[
     {"option": "(String) Word or phrase to count in the String"}]},
     {"parameters":[
     {"option": "(RegExp) Word or phrase pattern to count in the String"}]}],

     "url": "http://www.craydent.com/library/1.9.3/docs#object.count",
     "returnType": "(Int)"
     }|*/
    try {
        if ($c.isObject(this)) {
            var count = 0;
            for (var prop in this){
                if (this.hasOwnProperty(prop)) { count++; }
            }
            return count;
        }
        if ($c.isArray(this)) {
            return $c.where(this,option).length;
        }
        if ($c.isString(this)) {
            var word = option;
            if (!$c.isRegExp(word)) {
                word = new RegExp(word, "g");
            } else if (!option.global) {
                var reg_str = word.toString(),
                    index = reg_str.lastIndexOf('/'),
                    options = reg_str.substring(index + 1);
                word = new RegExp($c.strip(reg_str,'/'), "g"+options);
            }
            return (this.match(word) || []).length;
        }
        return undefined;
    } catch (e) {
        error('Object.count', e);
    }
});
_ao("duplicate", function (recursive) {
    /*|{
     "info": "Object class extension to copy an object including constructor",
     "category": "Object",
     "parameters":[],

     "overloads":[
     {"parameters":[
     {"recursive": "(Boolean) Flag to copy all child objects recursively"}]}],

     "url": "http://www.craydent.com/library/1.9.3/docs#object.duplicate",
     "returnType": "(Object)"
     }|*/
    try {
        return _duplicate(new this.constructor(), this, recursive);
    } catch (e) {
        error('Object.duplicate', e);
    }
});
_ao("eachProperty", function (callback) {
    /*|{
     "info": "Object class extension to loop through all properties where hasOwnValue is true.",
     "category": "Object",
     "parameters":[
     {"callback": "(Function) Function to call for each property.  Callback will have two arguments (the value of the object and the property name) passed"}],

     "overloads":[],

     "url": "http://www.craydent.com/library/1.9.3/docs#object.eachProperty",
     "returnType": "(Object)"
     }|*/
    try {
        for (var prop in this) {
            if (!this.hasOwnProperty(prop)) { continue; }
            if (callback.call(this, this[prop], prop)) { break; }
        }
    } catch (e) {
        error('Object.eachProperty', e);
    }
});
_ao("equals", function (compare, props){
    /*|{
     "info": "Object class extension to check if object values are equal",
     "category": "Object",
     "parameters":[
     {"compare": "(Object) Object to compare against"}],

     "overloads":[{"parameters":[
     {"compare": "(Object) Object to compare against"},
     {"props": "(String[]) Array of property values to compare against"}]}],

     "url": "http://www.craydent.com/library/1.9.3/docs#object.equals",
     "returnType": "(Bool)"
     }|*/
    try {
        if ($c.isArray(props)) {
            var j = 0;
            while (prop = props[j++]) {
                if (this.hasOwnProperty(prop) && compare.hasOwnProperty(prop) && !$c.equals(this[prop],compare[prop])
                    || (!this.hasOwnProperty(prop) && compare.hasOwnProperty(prop)) || (this.hasOwnProperty(prop) && !compare.hasOwnProperty(prop))) {
                    return false;
                }
            }
            return true;
        }
        if (($c.isObject(this) && $c.isObject(compare)) || ($c.isArray(this) && $c.isArray(compare))) {
            for (var prop in compare){
                if (!compare.hasOwnProperty(prop)) { continue; }
                if (!$c.equals(this[prop], compare[prop])) { return false; }
            }
            for (var prop in this){
                if (!this.hasOwnProperty(prop)) { continue; }
                if (!$c.equals(this[prop], compare[prop])) { return false; }
            }
            return true;
        }
        if (this === undefined && compare !== undefined || this !== undefined && compare === undefined) { return false; }
        if (this === null && compare !== null || this !== null && compare === null) { return false; }
        if ($c.isRegExp(compare)) { return compare.test(this.toString()); }
        return (this.toString() == compare.toString() && this.constructor == compare.constructor);
    } catch (e) {
        error('Object.equals', e);
    }
});
_ao("every", function(callback, thisObject) {
    /*|{
     "info": "Object class extension to check property values against a function",
     "category": "Object",
     "parameters":[
     {"callback": "(Function) Callback to apply to each value"}],

     "overloads":[
     {"parameters":[
     {"callback": "(Function) Callback to apply to each value"},
     {"thisObject": "(Mixed) Context for the callback function"}]}],

     "url": "http://www.craydent.com/library/1.9.3/docs#object.every",
     "returnType": "(Bool)"
     }|*/
    try {
        thisObject = thisObject || this;
        for (var prop in this)
            if (/*this[prop] && */!callback.call(thisObject, this[prop], prop, this))
                return false;
        return true;
    } catch (e) {
        error("Object.every", e);
    }
});
_ao("getClass", function() {
    /*|{
     "info": "Object class extension to get the constructor name",
     "category": "Object",
     "parameters":[],

     "overloads":[],

     "url": "http://www.craydent.com/library/1.9.3/docs#object.getClass",
     "returnType": "(String)"
     }|*/
    try {
        return _getFuncName(this.constructor);
    } catch (e) {
        error('Object.getClass', e)
    }
});
_ao("getProperty", function (path, delimiter, options) {
    /*|{
     "info": "Object class extension to retrieve nested properties without error when property path does not exist",
     "category": "Object",
     "featured": true,
     "parameters":[
     {"path": "(String) Path to nested property"}],

     "overloads":[
     {"parameters":[
     {"path": "(String) Path to nested property"},
     {"delimiter": "(Char) Separator used to parse path"}]},

     {"parameters":[
     {"path": "(RegExp) Regex match for the property"}]},

     {"parameters":[
     {"path": "(String) Path to nested property"},
     {"options": "(Object) Options for ignoring inheritance, validPath, etc"}]},

     {"parameters":[
     {"path": "(String) Path to nested property"},
     {"delimiter": "(Char) Separator used to parse path"},
     {"options": "(Object) Options for ignoring inheritance, validPath, etc"}]}],

     "url": "http://www.craydent.com/library/1.9.3/docs#object.getProperty",
     "returnType": "(Mixed)"
     }|*/
    try {
        if ($c.isRegExp(path)) {
            for (var prop in this) {
                if(!this.hasOwnProperty(prop)){ continue; }
                if (path.test(prop)) { return this[prop]; }
            }
            return undefined;
        }

        if ($c.isObject(delimiter)) {
            options = delimiter;
            delimiter = undefined;
        }
        options = options || {};
        delimiter = delimiter || ".";
        path = $c.strip(path, delimiter);
        var props = path.split(delimiter);
        var value = this, i = 0, prop;
        while (prop = props[i++]) {
            if (isNull(value[prop])
                || (options.noInheritance && !value.hasOwnProperty(prop))) {
                if (!value.hasOwnProperty(prop)) { options.validPath = 0; }
                return undefined;
            }
            value = value[prop];
        }
        options.validPath = 1;
        return value;
    } catch (e) {
        error('Object.getProperty', e);
    }
});
_ao("getValue" ,function (args, dflt) {
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

     "url": "http://www.craydent.com/library/1.9.3/docs#object.getProperty",
     "returnType": "(Mixed)"
     }|*/
    try {
        if (!$c.isFunction(this)) {
            if (args && !dflt) { dflt = args; }
            return $c.isNull(this, dflt) || this;
        }
        var rtn = this.apply(this, args);
        return rtn === undefined ? dflt : rtn;
    } catch (e) {
        error('Object.getValue', e);
    }
});
_ao("has", function(){
    /*|{
     "info": "Alias to Object.prototype.hasOwnProperty",
     "category": "Object",
     "parameters":[
     {"property": "(String) Property name to check"}],

     "overloads":[],

     "url": "http://www.craydent.com/library/1.9.3/docs#object.has",
     "returnType": "(Boolean)"
     }|*/
    var args = arguments;
    if (arguments.length > 1 && this == args[0]) {
        args = [];
        for (var i = 1, len = arguments.length; i < len; i++) {
            args.push(arguments[i]);
        }

    }
    return Object.prototype.hasOwnProperty.apply(this,args);
});
_ao("isArray", function () {
    /*|{
     "info": "Object class extension to check if object is an array",
     "category": "Object",
     "parameters":[],

     "overloads":[],

     "url": "http://www.craydent.com/library/1.9.3/docs#object.isArray",
     "returnType": "(Bool)"
     }|*/
    return _isArray(this);
});
_ao("isAsync", function() {
    /*|{
     "info": "Object class extension to check if object is a async function",
     "category": "Object",
     "parameters":[],

     "overloads":[],

     "url": "http://www.craydent.com/library/1.9.3/docs#object.isAsnyc",
     "returnType": "(Bool)"
     }|*/
    try {
        if ($c.isNull(this)) {return false;}
        return (this.constructor.name == "AsyncFunction");
    } catch (e) {
        error('Object.isAsync', e);
    }
});
_ao("isBetween", function(lowerBound, upperBound, inclusive) {
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
        if (isNull(this)) {return false;}
        if (inclusive) {
            return (this >= lowerBound && this <= upperBound);
        } else {
            return (this > lowerBound && this < upperBound);
        }
    } catch (e) {
        error('Object.isBetween', e);
    }
});
_ao("isBoolean", function() {
    /*|{
     "info": "Object class extension to check if object is a boolean",
     "category": "Object",
     "parameters":[],

     "overloads":[],

     "url": "http://www.craydent.com/library/1.9.3/docs#object.isBoolean",
     "returnType": "(Bool)"
     }|*/
    try {
        if (isNull(this)) {return false;}
        return (this.constructor == Boolean);
    } catch (e) {
        error('Object.isBoolean', e);
    }
});
_ao("isDate", function() {
    /*|{
     "info": "Object class extension to check if object is a date",
     "category": "Object",
     "parameters":[],

     "overloads":[],

     "url": "http://www.craydent.com/library/1.9.3/docs#object.isDate",
     "returnType": "(Bool)"
     }|*/
    try {
        if (isNull(this)) {return false;}
        return (this.constructor == Date);
    } catch (e) {
        error('Object.isDate', e);
    }
});
_ao("isDomElement", function() {
    /*|{
     "info": "Object class extension to check if object is a DOM element",
     "category": "Object",
     "parameters":[],

     "overloads":[],

     "url": "http://www.craydent.com/library/1.9.3/docs#object.isDomElement",
     "returnType": "(Bool)"
     }|*/
    try {
        if (isNull(this)) {return false;}
        return (this.nodeType == 1);
    } catch (e) {
        error('Object.isDomElement', e);
    }
});
_ao('isEmpty', function() {
    /*|{
     "info": "Object class extension to check if it is empty",
     "category": "Object",
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
        error("Object.isEmpty", e);
        return false;
    }
}, true);
_ao('isError', function() {
    /*|{
     "info": "Object class extension to check if object is a boolean",
     "category": "Object",
     "parameters":[],

     "overloads":[],

     "url": "http://www.craydent.com/library/1.9.3/docs#object.isBoolean",
     "returnType": "(Bool)"
     }|*/
    try {
        if (isNull(this)) { return false; }
        return (this.constructor == Error);
    } catch (e) {
        error('Object.isError', e);
    }
});
_ao("isFloat", function() {
    /*|{
     "info": "Object class extension to check if object is a float",
     "category": "Object",
     "parameters":[],

     "overloads":[],

     "url": "http://www.craydent.com/library/1.9.3/docs#object.isFloat",
     "returnType": "(Bool)"
     }|*/
    try {
        if (isNull(this)) {return false;}
        return ($c.isNumber(this) && (parseFloat(this) == this || parseFloat(this) === 0));
    } catch (e) {
        error('Object.isFloat', e);
    }
});
_ao("isFunction", function() {
    /*|{
     "info": "Object class extension to check if object is a function",
     "category": "Object",
     "parameters":[],

     "overloads":[],

     "url": "http://www.craydent.com/library/1.9.3/docs#object.isFunction",
     "returnType": "(Bool)"
     }|*/
    try {
        if (isNull(this)) {return false;}
        return (this.constructor == Function);
    } catch (e) {
        error('Object.isFunction', e);
    }
});
_ao("isGenerator", function() {
    /*|{
     "info": "Object class extension to check if object is a generator function",
     "category": "Object",
     "parameters":[],

     "overloads":[],

     "url": "http://www.craydent.com/library/1.9.3/docs#object.isGenerator",
     "returnType": "(Bool)"
     }|*/
    try {
        if ($c.isNull(this)) {return false;}
        return (this.constructor.name == "GeneratorFunction");
    } catch (e) {
        error('Object.isGenerator', e);
    }
});
_ao("isGeolocation", function () {
    /*|{
     "info": "Object class extension to check if object is a geolocation",
     "category": "Object",
     "parameters":[],

     "overloads":[],

     "url": "http://www.craydent.com/library/1.9.3/docs#object.isGeoLocation",
     "returnType": "(Bool)"
     }|*/
    try {
        if (isNull(this)) {return false;}
        return (this.constructor.toString().indexOf('function Geolocation') == 0);
    } catch (e) {
        error('Object.isGeolocation', e);
    }
});
_ao("isInt", function () {
    /*|{
     "info": "Object class extension to check if object is an integer",
     "category": "Object",
     "parameters":[],

     "overloads":[],

     "url": "http://www.craydent.com/library/1.9.3/docs#object.isInt",
     "returnType": "(Bool)"
     }|*/
    try {
        if (isNull(this) || $c.isArray(this)) {return false;}
        return (parseInt(this) == this || parseInt(this) === 0);
    } catch (e) {
        error('Object.isInt', e);
    }
});
_ao("isNumber", function() {
    /*|{
     "info": "Object class extension to check if object is a number",
     "category": "Object",
     "parameters":[],

     "overloads":[],

     "url": "http://www.craydent.com/library/1.9.3/docs#object.isNumber",
     "returnType": "(Bool)"
     }|*/
    try {
        if (isNull(this)) {return false;}
        return (this.constructor == Number);
    } catch (e) {
        error('Object.isNumber', e);
    }
});
_ao("isPromise", function() {
    /*|{
     "info": "Object class extension to check if object is a promise object",
     "category": "Object",
     "parameters":[],

     "overloads":[],

     "url": "http://www.craydent.com/library/1.9.3/docs#object.isPromise",
     "returnType": "(Bool)"
     }|*/
    try {
        if (isNull(this) || typeof Promise == "undefined") {return false;}
        return (this.constructor == Promise);
    } catch (e) {
        error('Object.isPromise', e);
    }
});
_ao("isObject", function (check_instance) {
    /*|{
     "info": "Object class extension to check if object is an object",
     "category": "Object",
     "parameters":[],

     "overloads":[],

     "url": "http://www.craydent.com/library/1.9.3/docs#object.isObject",
     "returnType": "(Bool)"
     }|*/
    try {
        if (isNull(this)) {return false;}
        return (this.constructor == Object || (!!check_instance && this instanceof Object));
    } catch (e) {
        error('Object.isObject', e);
    }
});
_ao("isRegExp", function() {
    /*|{
     "info": "Object class extension to check if object is a RegExp",
     "category": "Object",
     "parameters":[],

     "overloads":[],

     "url": "http://www.craydent.com/library/1.9.3/docs#object.isRegExp",
     "returnType": "(Bool)"
     }|*/
    try {
        if (isNull(this)) {return false;}
        return (this.constructor == RegExp);
    } catch (e) {
        error('Object.isRegExp', e);
    }
});
_ao("isString", function () {
    /*|{
     "info": "Object class extension to check if object is a string",
     "category": "Object",
     "parameters":[],

     "overloads":[],

     "url": "http://www.craydent.com/library/1.9.3/docs#object.isString",
     "returnType": "(Bool)"
     }|*/
    return _isString(this);
});
_ao("isSubset", function (compare, sharesAny){
    /*|{
     "info": "Object class extension to check if item is a subset",
     "category": "Object",
     "parameters":[
     {"compare": "(Mixed) Superset to compare against"}],

     "url": "http://www.craydent.com/library/1.9.3/docs#object.isSubset",
     "returnType": "(Bool)"
     }|*/
    try {
        var isArray = $c.isArray(this) && $c.isArray(compare);
        if (($c.isObject(this) && $c.isObject(compare)) || isArray) {

            for (var prop in this){
                if (!this.hasOwnProperty(prop)) { continue; }
                if (!isArray && !compare.hasOwnProperty(prop) || isArray && !compare.contains(this[prop])) { return false; }
                if (sharesAny) { return true; }
            }

            return true;
        } else {
            return ~this.toString().indexOf(compare.toString()) && this.constructor == compare.constructor;
        }
    } catch (e) {
        error('Object.isSubset', e);
    }
});
_ao("itemCount", function () {
    /*|{
     "info": "Object class extension to count the properties in item",
     "category": "Object",
     "parameters":[],

     "overloads":[],

     "url": "http://www.craydent.com/library/1.9.3/docs#object.itemCount",
     "returnType": "(Int)"
     }|*/
    try {
        if ($c.isObject(this)) {
            var count = 0;
            for (var prop in this){
                if (this.hasOwnProperty(prop)) { count++; }
            }
            return count;
        }
        return undefined;
    } catch (e) {
        error('Object.itemCount', e);
    }
});
_ao("keyOf", function (value) {
    /*|{
     "info": "Object class extension to get the key of the give value",
     "category": "Object",
     "parameters":[
     {"value": "(Mixed) Value to compare against"}],

     "overloads":[],

     "url": "http://www.craydent.com/library/1.9.3/docs#object.keyOf",
     "returnType": "(String)"
     }|*/
    try {
        for(var prop in this) {
            if(this.hasOwnProperty(prop)) {
                if(this[prop] === value)
                    return prop;
            }
        }
        return null;
    } catch (e) {
        error('Object.keyOf', e);
    }
});
_ao("getKeys", function () {
    /*|{
     "info": "Object class extension to get the keys of the object",
     "category": "Object",
     "parameters":[],

     "overloads":[],

     "url": "http://www.craydent.com/library/1.9.3/docs#object.getKeys",
     "returnType": "(Array)"
     }|*/
    try {
        if(Object.keys(foo)) {
            return  Object.keys(this);
        }
        var arr = [];
        for(var prop in this) {
            if(this.hasOwnProperty(prop)) {
                arr.push(prop);
            }
        }
        return arr;
    } catch (e) {
        error('Object.getKeys', e);
    }
});
_ao("map", function(callback, thisObject) {
    /*|{
     "info": "Object class extension to apply method to every value",
     "category": "Object",
     "parameters":[
     {"callback": "(Function) Callback to apply to each value"}],

     "overloads":[
     {"parameters":[
     {"callback": "(Function) Callback to apply to each value"},
     {"thisObject": "(Mixed) Context for the callback function"}]}],

     "url": "http://www.craydent.com/library/1.9.3/docs#object.map",
     "returnType": "(void)"
     }|*/
    try {
        thisObject = thisObject || this;
        for (var prop in this) {
            if (this.hasOwnProperty(prop)) {
                this[prop] = callback.call(thisObject, this[prop]);
            }
        }
    } catch (e) {
        error('Object.map', e)
    }
});
_ao("merge", function (secondary, condition) {
    /*|
     {"info": "Object class extension to merge objects",
     "category": "Object",
     "parameters":[
     {"secondary": "(Object) Object to merge with"}],

     "overloads":[
     {"parameters":[
     {"secondary": "(Object) Object to merge with"},
     {"condition": "(Mixed) Flags to recurse, merge only shared value, clone, intersect etc"}]}],

     "url": "http://www.craydent.com/library/1.9.3/docs#object.merge",
     "returnType": "(Object)"
     }|*/
    try {
        condition = condition || {};
        var recurse = condition == "recurse" || condition.recurse,
            shared = condition == "onlyShared" || condition.onlyShared,
            intersect = condition == "intersect" || condition.intersect,
            objtmp = (condition == "clone" || condition.clone) ? $c.duplicate(this,true) : this,
            compareFunction = $c.isFunction(condition) ? condition : condition.compareFunction,
            intersectObj = {};

        for (var prop in secondary){
            if (secondary.hasOwnProperty(prop)) {
                if (intersect && objtmp.hasOwnProperty(prop)) {
                    intersectObj[prop] = secondary[prop];
                } else if (shared) {
                    // passing share Only
                    if (objtmp.hasOwnProperty(prop)) {
                        objtmp[prop] = secondary[prop];
                    }
                } else if (compareFunction && $c.isFunction(compareFunction)) {
                    if ($c.isArray(objtmp) && objtmp.hasOwnProperty(prop) && compareFunction(objtmp[prop], secondary[prop])) {
                        objtmp[prop] = secondary[prop];
                        continue;
                    }
                    objtmp.push($c.duplicate(secondary[prop]));
                } else {
                    if ($c.isArray(objtmp) && ($c.isNull(condition) || recurse)) {
                        if (!~objtmp.indexOf(secondary[prop])) {
                            objtmp.push(secondary[prop]);
                        }
                    } else if (recurse && ($c.isArray(objtmp[prop]) || $c.isObject(objtmp[prop])) && ($c.isArray(secondary[prop]) || $c.isObject(secondary[prop]))) {
                        objtmp[prop] = $c.merge(objtmp[prop],secondary[prop],condition);
                    } else {
                        objtmp[prop] = secondary[prop];
                    }
                }
            }
        }
        return intersect ? intersectObj : objtmp;
    } catch (e) {
        error('Object.merge', e);
    }
});
_ao("setProperty", function (path, value, delimiter, options) {
    /*|{
     "info": "Object class extension to set nested properties creating necessary property paths",
     "category": "Object",
     "parameters":[
     {"path": "(String) Path to nested property"},
     {"value": "(Mixed) Value to set"}],

     "overloads":[
     {"parameters":[
     {"path": "(String) Path to nested property"},
     {"value": "(Mixed) Value to set"},
     {"delimiter": "(Char) Separator used to parse path"}]},

     {"parameters":[
     {"path": "(String) Path to nested property"},
     {"delimiter": "(Char) Separator used to parse path"},
     {"value": "(Mixed) Value to set"},
     {"options": "(Object) Options for ignoring inheritance, validPath, etc"}]}],

     "url": "http://www.craydent.com/library/1.9.3/docs#object.setProperty",
     "returnType": "(Bool)"
     }|*/
    try {
        options = options || {};
        delimiter = delimiter || ".";
        path = $c.strip(path, delimiter);
        var props = path.split(delimiter);
        var obj = this, i = 0, prop, len = props.length, pobj, pprop;
        while (prop = props[i++]) {
            if (i == len) {
                return obj[prop] = value, true;
            }
            if (pobj && pprop && !$c.isArray(pobj[pprop]) && parseInt(prop) >= 0) {
                var tmp = pobj[pprop];
                pobj[pprop] = [];
                for (var p in tmp) {
                    if (tmp.hasOwnProperty(p)) { pobj[p] = tmp[p]; }
                }
                obj = pobj[pprop];
            }
            obj[prop] = obj[prop] || {};
            pobj = obj;
            pprop = prop;
            obj = obj[prop];
        }
        return false;
    } catch (e) {
        error('Object.setProperty', e)
    }
});
_ao("toStringAlt", function (delimiter, prefix, urlEncode) {
    /*|{
     "info": "Object class extension for an alternate way to stringify object to formatted string",
     "category": "Object",
     "parameters":[],

     "overloads":[
     {"parameters":[
     {"delimiter": "(Char) Character to separate the property from the value"}]},

     {"parameters":[
     {"delimiter": "(Char) Character to separate the property from the value"},
     {"prefix": "(Char) Character to prefix the property name"}]},

     {"parameters":[
     {"delimiter": "(Char) Character to separate the property from the value"},
     {"prefix": "(Char) Character to prefix the property name"},
     {"urlEncode": "(Bool) Flag to url encode the property and value"}]}],

     "url": "http://www.craydent.com/library/1.9.3/docs#",
     "returnType": "(String)"
     }|*/
    try {
        delimiter = delimiter || '=';
        prefix = prefix || '&';
        var str = '';
        for (var prop in this) {
            if (this.hasOwnProperty(prop)) {
                var value = $c.isObject(this[prop]) ? JSON.stringify(this[prop]) : this[prop];
                urlEncode &&
                (str += prefix + encodeURIComponent(prop) + delimiter + encodeURIComponent(value)) || (str += prefix + prop + delimiter + value);
            }
        }
        return str;
    } catch (e) {
        error('Object.toStringAlt', e);
    }
}, true);