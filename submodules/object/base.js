/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.9.0                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/

var $s = require('./dependencies/common')(),
    $c = $s.$c,
    error = $s.error;

if (!$c.MODULES_LOADED[$s.info.name]) {
    $s.__log_module();
    $s.scope.eval = function (str) { return eval(str); };

    require($s.dir + 'contains')($s);
    require($s.dir + 'count')($s);
    require($s.dir + 'eachProperty')($s);
    require($s.dir + 'getValue')($s);
    require($s.dir + 'getKeys')($s);
    require($s.dir + 'isSubset')($s);
    require($s.dir + 'itemCount')($s);
    require($s.dir + 'keyOf')($s);
    require($s.dir + 'toStringAlt')($s);
    require($s.dir + 'where')($s);

    var _ao = require('./dependencies/addObjectPrototype')($s.scope);
    $c.addObjectPrototype = _ao;

    _ao("changes", function(compare){
        /*|{
            "info": "Object class extension to compare properties that have changed",
            "category": "Object",
            "parameters":[
                {"compare": "(any) Object to compare against"}],

            "overloads":[],

            "url": "http://www.craydent.com/library/1.9.3/docs#object.",
            "returnType": "(Object)"
        }|*/
        try {
            if (this.constructor != Object || compare.constructor != Object) {
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
                    } else if (!$s.equals(compare[prop], this[prop])) {
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
                {"val": "(ContainsValue|ContainsObjectIterator<T, TValue>) Value to check or custom function to determine validity"}],

            "overloads":[
                {"parameters":[
                    {"val": "(ContainsValue) Value to check"},
                    {"func": "(ContainsIterator<T>) Callback function used to do the comparison"}]},
                {"parameters":[
                    {"val": "(ContainsValue) Value to check"},
                    {"func": "(ComparisonOperator) String indicating logical operator ("$lt"|"$lte"|"$gt"|"$gte"|"$mod"|"$type") }]},
                {"parameters":[
                    {"arr": "(Array<TValue>) Array of values to return first matching value"}]}],

            "url": "http://www.craydent.com/library/1.9.3/docs#object.contains",
            "typeParameter": "<T, TValue>",
            "returnType": "(Bool)"
        }|*/
        try {
            return $s.contains(this, val, func);
        } catch (e) {
            error('Object.contains', e);
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
            return $s._duplicate({}, this, true);
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
                    {"option": "(WhereCondition) Query used in Array.where when counting elements in an Array"}]},

                {"parameters":[
                    {"option": "(String) Word or phrase to count in the String"}]},

                {"parameters":[
                    {"option": "(RegExp) Word or phrase pattern to count in the String"}]}],

            "url": "http://www.craydent.com/library/1.9.3/docs#object.count",
            "returnType": "(Int)"
        }|*/
        try {
            return $s.count(this, option);
        } catch (e) {
            error('Object.count', e);
        }
    });
    _ao("duplicate", function (recursive) {
        /*|{
            "info": "Object class extension to copy an object including constructor",
            "category": "Object",
            "parameters":[
                {"recursive?": "(Boolean) Flag to copy all child objects recursively"}],

            "overloads":[],

            "url": "http://www.craydent.com/library/1.9.3/docs#object.duplicate",
            "returnType": "(Object)"
        }|*/
        try {
            return $s.duplicate(this, recursive);
        } catch (e) {
            error('Object.duplicate', e);
        }
    });
    _ao("eachProperty", function (callback) {
        /*|{
            "info": "Object class extension to loop through all properties where hasOwnValue is true.",
            "category": "Object",
            "parameters":[
                {"callback": "(EachIterator<T>) Function to call for each property.  Callback will have two arguments (the value of the object and the property name) passed"}],

            "overloads":[],

            "url": "http://www.craydent.com/library/1.9.3/docs#object.eachProperty",
            "typeParameter": "<T>",
            "returnType": "(Object)"
        }|*/
        try {
            return $s.eachProperty(this, callback);
        } catch (e) {
            error('Object.eachProperty', e);
        }
    });
    _ao("equals", function (compare, props){
        /*|{
            "info": "Object class extension to check if object values are equal",
            "category": "Object",
            "parameters":[
                {"compare": "(any) Object to compare against"},
                {"props?": "(String[]) Array of property values to compare against"}],

            "overloads":[
                {"parameters":[],

            "url": "http://www.craydent.com/library/1.9.3/docs#object.equals",
            "returnType": "(Bool)"
        }|*/
        try {
            return $s.equals(this, compare, props);
        } catch (e) {
            error('Object.equals', e);
        }
    });
    _ao("every", function(callback, thisObject) {
        /*|{
            "info": "Object class extension to check property values against a function",
            "category": "Object",
            "parameters":[
                {"callback": "(ObjectIterator<T, TValue, TResult>) Callback to apply to each value"}],

            "overloads":[
                {"parameters":[
                    {"callback": "(ObjectIterator<T, TValue, TResult>) Callback to apply to each value"},
                    {"thisObject": "(any) Context for the callback function"}]}],

            "url": "http://www.craydent.com/library/1.9.3/docs#object.every",
            "typeParameter": "<T, TValue, TResult>",
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
    _ao("get", function (path, delimiter, options) {
        /*|{
            "info": "Alias to getProperty; however, it can not be used as a protoype property.",
            "category": "Object",
            "featured": true,
            "parameters":[
                {"object": "(Object) object to get the property of"},
                {"path": "(String) Path to nested property"},
                {"delimiter?": "(Char) Separator used to parse path"}],

            "overloads":[
                {"parameters":[
                    {"object": "(Object) object to get the property of"},
                    {"path": "(RegExp) Regex match for the property"}]},

                {"parameters":[
                    {"object": "(Object) object to get the property of"},
                    {"path": "(String) Path to nested property"},
                    {"options": "(GetPropertyOptions) Options for ignoring inheritance, validPath, etc"}]},

                {"parameters":[
                    {"object": "(Object) object to get the property of"},
                    {"path": "(String) Path to nested property"},
                    {"delimiter": "(Char) Separator used to parse path"},
                    {"options": "(GetPropertyOptions) Options for ignoring inheritance, validPath, etc"}]}],

            "url": "http://www.craydent.com/library/1.9.3/docs#object.getProperty",
            "returnType": "(any)"
        }|*/
        try {
            return $s.getProperty(this, path, delimiter, options);
        } catch (e) {
            error('Object.get', e);
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
            return $s._getFuncName(this.constructor);
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
                    {"options": "(GetPropertyOptions) Options for ignoring inheritance, validPath, etc"}]},

                {"parameters":[
                    {"path": "(String) Path to nested property"},
                    {"delimiter": "(Char) Separator used to parse path"},
                    {"options": "(GetPropertyOptions) Options for ignoring inheritance, validPath, etc"}]}],

            "url": "http://www.craydent.com/library/1.9.3/docs#object.getProperty",
            "returnType": "(any)"
        }|*/
        try {
            return $s.getProperty(this, path, delimiter, options);
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
                    {"dflt": "(any) Default value to return if context is not a function"}]},

                {"parameters":[
                    {"args": "(any[]) An array of arguments to pass to context when it is a function"},
                    {"dflt": "(any) Default value to return if context is not a function"}]}],

            "url": "http://www.craydent.com/library/1.9.3/docs#object.getValue",
            "returnType": "(any)"
        }|*/
        try {
            return $s.getValue(this, args, dflt);
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
        try {
            var args = arguments;
            if (arguments.length > 1 && this == args[0]) {
                args = [];
                for (var i = 1, len = arguments.length; i < len; i++) {
                    args.push(arguments[i]);
                }

            }
            return Object.prototype.hasOwnProperty.apply(this,args);
        } catch (e) {
            error('Object.has', e);
        }
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
        try {
            return $s.isArray(this);
        } catch (e) {
            error('Object.isArray', e);
        }
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
            return $s.isAsync(this)
        } catch (e) {
            error('Object.isAsync', e);
        }
    });
    _ao("isBetween", function(lowerBound, upperBound, inclusive) {
        /*|{
            "info": "Object class extension to check if object is between lower and upper bounds",
            "category": "Object",
            "parameters":[
                {"lowerBound": "(any) Lower bound comparison"},
                {"upperBound": "(any) Upper bound comparison"},
                {"inclusive?": "(Bool) Flag to include give bounds"}],

            "overloads":[],

            "url": "http://www.craydent.com/library/1.9.3/docs#object.isBetween",
            "returnType": "(Bool)"
        }|*/
        try {
            return $s.isBetween(this, lowerBound, upperBound, inclusive)
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
            return $s.isBoolean(this);
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
            return $s.isDate(this);
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
            return $s.isDomElement(this);
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
            return $s.isEmpty(this);
        } catch (e) {
            error('Object.isEmpty', e);
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
            return $s.isError(this);
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
            return $s.isFloat(this);
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
            return $s.isFunction(this);
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
            return $s.isGenerator(this);
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
            return $s.isGeolocation(this);
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
            return $s.isInt(this);
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
            return $s.isNumber(this);
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
            return $s.isPromise(this);
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
            return $s.isObject(this);
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
            return $s.isRegExp(this);
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
        try {
            return $s.isString(this);
        } catch (e) {
            error('Object.isString', e);
        }
    });
    _ao("isSubset", function (compare, sharesAny){
        /*|{
            "info": "Object class extension to check if item is a subset",
            "category": "Object",
            "parameters":[
                {"compare": "(any) Superset to compare against"}],

            "overloads":[],

            "url": "http://www.craydent.com/library/1.9.3/docs#object.isSubset",
            "returnType": "(Bool)"
        }|*/
        try {
            return $s.isSubset(this, compare, sharesAny);
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
            return $s.itemCount(this);
        } catch (e) {
            error('Object.itemCount', e);
        }
    });
    _ao("keyOf", function (value) {
        /*|{
            "info": "Object class extension to get the key of the give value",
            "category": "Object",
            "parameters":[
                {"value": "(any) Value to compare against"}],

            "overloads":[],

            "url": "http://www.craydent.com/library/1.9.3/docs#object.keyOf",
            "returnType": "(String)"
        }|*/
        try {
            return $s.keyOf(this, value);
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
            "returnType": "(Array<string>)"
        }|*/
        try {
            return $s.getKeys(this);
        } catch (e) {
            error('Object.getKeys', e);
        }
    });
    _ao("map", function(callback, thisObject) {
        /*|{
            "info": "Object class extension to apply method to every value",
            "category": "Object",
            "parameters":[
                {"callback": "(ObjectIterator<T, TValue, TResult>) Callback to apply to each value"},
                {"thisObject?": "(any) Context for the callback function"}],

            "overloads":[],

            "url": "http://www.craydent.com/library/1.9.3/docs#object.map",
            "typeParameter": "<T, TValue, TResult>",
            "returnType": "(void)"
        }|*/
        try {
            thisObject = thisObject || this;
            var obj = $s.duplicate(this);
            for (var prop in obj) {
                if (obj.hasOwnProperty(prop)) {
                    obj[prop] = callback.call(thisObject, obj[prop], prop, obj);
                }
            }
            return obj;
        } catch (e) {
            error('Object.map', e)
        }
    });
    _ao("merge", function (secondary, condition) {
        /*|{
            "info": "Object class extension to merge objects",
            "category": "Object",
            "parameters":[
                {"secondary": "(Object) Object to merge with"},
                {"condition?": "(MergeEnums|MergeOptions|MergeIterator<T>) Flags to recurse, merge only shared value, clone, intersect etc"}],

            "overloads":[],

            "url": "http://www.craydent.com/library/1.9.3/docs#object.merge",
            "typeParameter": "<T>",
            "returnType": "(Object)"
        }|*/
        try {
            var len = arguments.length - 1,
                original = this,
                arg = arguments[len],
                cond = arguments[len];
            if ($s.isObject(arg)) {
                for (var prop in arg) {
                    if (!(prop in {recurse:1,onlyShared:1,intersect:1,clone:1,compare:1})) {
                        len++;
                        cond = undefined;
                        break;
                    }
                }
            }

            for (var i = typeof craydent_ctx == "undefined" ? 0 : 1; i < len; i++) {
                original = $s.merge(original, arguments[i], cond);
            }
            return original;
        } catch (e) {
            error('Object.merge', e);
        }
    });
    _ao("set", function (path, value, delimiter) {
        /*|{
            "info": "Alias to setProperty; however, it can not be used as a protoype property.",
            "category": "Object",
            "parameters":[
                {"object": "(Object) object to add the property to"},
                {"path": "(String) Path to nested property"},
                {"value": "(any) Value to set"},
                {"delimiter?": "(Char) Separator used to parse path"}],

            "overloads":[],

            "url": "http://www.craydent.com/library/1.9.3/docs#object.setProperty",
            "returnType": "(Bool)"
        }|*/
        try {
            return $s.setProperty(this, path, value, delimiter);
        } catch (e) {
            error('Object.set', e);
        }
    });
    _ao("setProperty", function (path, value, delimiter) {
        /*|{
            "info": "Object class extension to set nested properties creating necessary property paths",
            "category": "Object",
            "parameters":[
                {"path": "(String) Path to nested property"},
                {"value": "(any) Value to set"},
                {"delimiter?": "(Char) Separator used to parse path"}],

            "overloads":[],

            "url": "http://www.craydent.com/library/1.9.3/docs#object.setProperty",
            "returnType": "(Bool)"
        }|*/
        try {
            return $s.setProperty(this, path, value, delimiter);
        } catch (e) {
            error('Object.setProperty', e);
        }
    });
    _ao("toStringAlt", function (delimiter, prefix, urlEncode) {
        /*|{
            "info": "Object class extension for an alternate way to stringify object to formatted string",
            "category": "Object",
            "parameters":[
                {"delimiter?": "(Char) Character to separate the property from the value"},
                {"prefix?": "(Char) Character to prefix the property name"},
                {"urlEncode?": "(Bool) Flag to url encode the property and value"}],

            "overloads":[],

            "url": "http://www.craydent.com/library/1.9.3/docs#",
            "returnType": "(String)"
        }|*/
        return $s.toStringAlt(this, delimiter, prefix, urlEncode);
    }, true);

    module.exports = $c;
}