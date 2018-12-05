/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.9.0                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var _error, _cout;

function logit(){
    /*|{
        "info": "Log to console when DEBUG_MODE is true and when the console is available",
        "category": "Utility",
        "parameters":[
            {"...infinite": "(any) any number of arguments can be passed."}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#logit",
        "returnType": "(void)"
    }|*/
    try {
        var location = "", err = new Error(), args = [], arg, i = 0;

        $c.VERBOSE_LOGS && err.stack && (location = "\t\t\t\t    " + err.stack.split('\n')[2]);
        for (var i = 0, len = arguments.length; i < len; i++) { args.push( arguments[i]); }
        if ($c.VERBOSE_LOGS) { args.push(location); }
        _cout.apply(this, arguments);
    } catch (e) {
        _error && _error('logit', e);
    }
}

function init (ctx) {
    _error = ctx.error;
    _cout = ctx.cout;

    ctx.logit = logit;
}
module.exports = init;
