/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.8.2                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var $c = global.$c || {};

function toCurrencyNotation(obj, sep) {
    sep = sep || ",";
    var whole = obj.toString(), fraction = "";
    if (sep != ".") {
        var part = whole.split('.');
        if (part.length > 1) {
            whole = part[0];
            fraction = '.'+part[1];
        }
    }
    return whole.replace(/\B(?=(\d{3})+(?!\d))/g, sep) + fraction;
}

function init (ctx) {
    $c = ctx.isEmpty($c) ? ctx : $c;
    $c.toCurrencyNotation = ctx.toCurrencyNotation = $c.toCurrencyNotation || ctx.toCurrencyNotation || toCurrencyNotation;
}
init.toCurrencyNotation = toCurrencyNotation;
module.exports = init;