/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.9.0                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var error = require('./error');
function isNull(value, defaultValue) {
    /*|{
        "info": "Check if a value is Null",
        "category": "Utility|TypeOf",
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
        error && error('isNull', e);
    }
}
module.exports = isNull;