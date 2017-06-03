/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.8.2                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var cm = require('./common'),
    isNull = require('craydent-typeof').isNull,
    $c = cm.$c,
    ext = cm.ext;

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
        return $c.isBetween(this, compare - giveOrTake, compare + giveOrTake, true);
    } catch (e) {
        error("Number.aboutEqualTo", e);
    }
}, true);
ext(Number, 'isBetween', function(lowerBound, upperBound, inclusive) {
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
ext(Number, 'toCurrencyNotation', cm.toCurrencyNotation, true);

module.exports = $c;