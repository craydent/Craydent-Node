/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.9.0                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var $s = require('./dependencies/common')(),
    $c = $s.$c,
    ext = $s._ext,
    error = $s.error;

if (!$c.MODULES_LOADED[$s.info.name]) {
    $s.__log_module();
    $s.scope.eval = function (str) { return eval(str); };

    require($s.dir + 'contains')($s);
    require($s.dir + 'getValue')($s);
    require($s.dir + 'toCurrencyNotation')($s);
    // require($s.dir + 'rand')($s);

    function _even (num) {
        try {
            if (isNaN(num)) { return false; }
            return !(num&1);
        } catch (e) {
            error('_even', e);
        }
    }

    ext(Number, 'aboutEqualTo', function (compare, giveOrTake) {
        /*|{
            "info": "Number class extension to check if values are approximately equal",
            "category": "Number",
            "parameters":[
                {"compare": "(Number) Number to compare"},
                {"giveOrTake": "(Number) Plus/minus value"}],

            "overloads":[],

            "url": "http://www.craydent.com/library/1.9.3/docs#number.aboutEqualTo",
            "returnType": "(Bool)"
        }|*/
        try {
            return $s.isBetween(this, compare - giveOrTake, compare + giveOrTake, true);
        } catch (e) {
            error("Number.aboutEqualTo", e);
        }
    }, true);
    ext(Number, "contains", function(val, func){
        /*|{
            "info": "Object class extension to check if value exists",
            "category": "Number|Object",
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
            error('Number.contains', e);
        }
    }, true);
    ext(Number, "equals", function (compare, props){
        /*|{
            "info": "Object class extension to check if object values are equal",
            "category": "Number|Object",
            "parameters":[
                {"compare": "(any) Object to compare against"},
                {"props?": "(String[]) Array of property values to compare against"}],

            "overloads":[],

            "url": "http://www.craydent.com/library/1.9.3/docs#object.equals",
            "returnType": "(Bool)"
        }|*/
        try {
            return $s.equals(this, compare, props);
        } catch (e) {
            error('Number.equals', e);
        }
    }, true);
    ext(Number, "getValue" ,function (args, dflt) {
        /*|{
            "info": "Object class extension to retrieve value of an object property",
            "category": "Number|Object",
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
            error('Number.getValue', e);
        }
    }, true);
    ext(Number, 'isBetween', function(lowerBound, upperBound, inclusive) {
        /*|{
            "info": "Object class extension to check if object is between lower and upper bounds",
            "category": "Number|Object",
            "parameters":[
                {"lowerBound": "(Number) Lower bound comparison"},
                {"upperBound": "(Number) Upper bound comparison"},
                {"inclusive?": "(Bool) Flag to include give bounds"}],

            "overloads":[],

            "url": "http://www.craydent.com/library/1.9.3/docs#object.isBetween",
            "returnType": "(Bool)"
        }|*/
        try {
            if ($s.isNull(this)) {return false;}
            if (inclusive) {
                return (this >= lowerBound && this <= upperBound);
            } else {
                return (this > lowerBound && this < upperBound);
            }
        } catch (e) {
            error('Object.isBetween', e);
        }
    });
    ext(Number, 'isEven', function () {
        /*|{
            "info": "Number class extension to check if number is even",
            "category": "Number",
            "parameters":[],

            "overloads":[],

            "url": "http://www.craydent.com/library/1.9.3/docs#number.",
            "returnType": "(Bool)"
        }|*/
        try {
            return _even(this);
        } catch (e) {
            error("Number.isEven", e);
        }
    }, true);
    ext(Number, 'isOdd', function () {
        /*|{
            "info": "Number class extension to check if number is odd",
            "category": "Number",
            "parameters":[],

            "overloads":[],

            "url": "http://www.craydent.com/library/1.9.3/docs#number.",
            "returnType": "(Bool)"
        }|*/
        try {
            return !_even(this);
        } catch (e) {
            error("Number.isOdd", e);
        }
    }, true);
    ext(Number, 'toCurrencyNotation', function (sep) {
        /*|{
            "info": "Number class extension to change number to use separater character",
            "category": "Number|String",
            "parameters":[
                {"separator?": "(Char) Character to use as delimiter"}],

            "overloads":[],

            "url": "http://www.craydent.com/library/1.9.3/docs#String.toCurrencyNotation",
            "returnType": "(String)"
        }|*/
        try {
            return $s.toCurrencyNotation(this, sep);
        } catch (e) {
            error('Number.toCurrencyNotation', e);
        }
    }, true);

    $c.rand = $s.rand;

    module.exports = $c;
}