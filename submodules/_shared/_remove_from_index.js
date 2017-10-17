/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.8.2                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var $c = global.$c || {};

function _remove_from_index (buckets, obj){
    for (var prop in buckets) {
        var sarr = buckets[prop][obj[prop]],
        index = sarr.indexOf(obj);
        if (~index) {
            sarr.splice(index, 1);
        }
        if (!sarr.length) {
            delete buckets[prop][obj[prop]];
            var keys = buckets[prop].__bucket__keys;
            keys.splice(keys.indexOf(obj[prop]), 1);
        }
    }
}

function init (ctx) {
    if (!ctx.isEmpty) { return; }
    $c = ctx.isEmpty($c) ? ctx : $c;
    $c._remove_from_index = ctx._remove_from_index = $c._remove_from_index || ctx._remove_from_index || _remove_from_index;
}
init._remove_from_index = _remove_from_index;
module.exports = init;