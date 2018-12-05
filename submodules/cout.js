/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.9.0                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var error = require('./error');
function cout () {
    /*|{
        "info": "Log to console when DEBUG_MODE is true and when the console is available",
        "category": "Utility",
        "parameters":[
            {"...infinite": "(any) any number of arguments can be passed."}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#cout",
        "returnType": "(void)"
    }|*/
    try {
        if(typeof $c != 'undefined' && $c.DEBUG_MODE && console && console.log){
            for (var i = 0, len = arguments.length; i < len; i++) {
                console.log(arguments[i]);
            }
        }
    } catch (e) {
        error('cout', e);
    }
}
module.exports = cout;