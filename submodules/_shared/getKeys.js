/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.8.2                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var $c = global.$c || {};

function getKeys (obj) {
    try {
        if(Object.keys) {
            return  Object.keys(obj);
        }
        var arr = [];
        for(var prop in obj) {
            if(obj.hasOwnProperty(prop)) {
                arr.push(prop);
            }
        }
        return arr;
    } catch (e) {
        $c.error && $c.error('Object.getKeys', e);
    }
}

function init (ctx) {
    $c = ctx.isEmpty($c) ? ctx : $c;
    $c.getKeys = ctx.getKeys = $c.getKeys || ctx.getKeys || getKeys;
}
init.getKeys = getKeys;
module.exports = init;
