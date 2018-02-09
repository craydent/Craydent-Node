/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.8.2                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var $c = $c || {};

function itemCount(obj) {
    try {
        if ($c.isObject(obj)) {
            var count = 0;
            for (var prop in obj){
                if (obj.hasOwnProperty(prop)) { count++; }
            }
            return count;
        }
        return undefined;
    } catch (e) {
        $c.error && $c.error('Object.itemCount', e);
    }
}

function init (ctx) {
    $c = ctx.isEmpty($c) ? ctx : $c;
    ctx.itemCount = itemCount;
}
init.itemCount = itemCount;

module.exports = init;
