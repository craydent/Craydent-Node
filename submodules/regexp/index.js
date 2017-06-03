/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.8.2                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var cm = require('./common');

cm.ext(RegExp, 'addFlags',function(flags){
    /*|{
        "info": "RegExp class extension to add flags to regex",
        "category": "RegExp",
        "parameters":[
            {"flags": "(String) Flags to add"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#regexp.addFlag",
        "returnType": "(RegExp)"
    }|*/
    try {
        if (this.global && !~flags.indexOf('g')) { flags += "g"; }
        if (this.ignoreCase && !~flags.indexOf('i')) { flags += "i"; }
        if (this.multiline && !~flags.indexOf('m')) { flags += "m"; }

        return new RegExp(this.source, flags);
    } catch (e) {
        error("RegExp.addFlags", e);
    }
}, true);
