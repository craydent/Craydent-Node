/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.9.0                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var _general_trim = require('./general_trim');
var error = require('./error');
function strip (str, character) {
    /*|{
        "info": "String class extension to remove characters from the beginning and end of the string",
        "category": "String",
        "parameters":[
            {"character": "(Char[]) Character to remove"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#string.strip",
        "returnType": "(String)"
    }|*/
    try {
        return _general_trim(str, undefined, character);
    } catch (e) {
        error("_strip", e);
    }
}
module.exports = strip;