/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.8.2                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var $c = global.$c || {},
    _error = $c.error,
    _cout = $c.cout;

$c.VERBOSE_LOGS = false;

function logit(){
    /*|{
        "info": "Log to console when DEBUG_MODE is true and when the console is available",
        "category": "Utility",
        "parameters":[
            {"infinite": "any number of arguments can be passed."}],

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
    if (!ctx.isEmpty) { return; }
    $c = ctx.isEmpty($c) ? ctx : $c;
    _error = ctx.error || $c.error;
    _cout = ctx.cout || $c.cout;

    ctx.logit = ctx.hasOwnProperty('logit') && ctx.logit || logit;
    if ($c !== ctx) {
        $c.logit = $c.hasOwnProperty('logit') && $c.logit || ctx.logit
    }
}
init.logit = logit;
module.exports = init;
