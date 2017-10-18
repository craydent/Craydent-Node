/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.8.2                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var $c = global.$c || {},
    _error = $c.error;

function isValidDate (obj) {
    try {
        return !isNaN(obj.getTime());
    } catch (e) {
        _error && _error("Date.isValidDate", e);
    }
}

function init (ctx) {
    if (!ctx.isEmpty) { return; }
    $c = ctx.isEmpty($c) ? ctx : $c;

    _error = ctx.error || $c.error;

    ctx.isValidDate = ctx.hasOwnProperty('isValidDate') && ctx.isValidDate || isValidDate;
    if ($c !== ctx) {
        $c.isValidDate = $c.hasOwnProperty('isValidDate') && $c.isValidDate || ctx.isValidDate
    }
}
init.isValidDate = isValidDate;

module.exports = init;
