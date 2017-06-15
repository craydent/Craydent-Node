/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.8.2                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var $c = $c || {},
    where = require('../array/where').where;

function count (obj, option){
    try {
        if ($c.isObject(obj)) {
            var count = 0;
            for (var prop in obj){
                if (obj.hasOwnProperty(prop)) { count++; }
            }
            return count;
        }
        if ($c.isArray(obj)) {
            return where(obj,option).length;
        }
        if ($c.isString(obj)) {
            var word = option;
            if (!$c.isRegExp(word)) {
                word = new RegExp(word, "g");
            } else if (!option.global) {
                var reg_str = word.toString(),
                    index = reg_str.lastIndexOf('/'),
                    options = reg_str.substring(index + 1);
                word = new RegExp($c.strip(reg_str,'/'), "g"+options);
            }
            return (obj.match(word) || []).length;
        }
        return undefined;
    } catch (e) {
        console.log(e);
        $c.error && $c.error('Object.count', e);
    }
}

function init (ctx) {
    $c = ctx || $c;
    ctx.count = count;
}
init.count = count;
module.exports = init;
