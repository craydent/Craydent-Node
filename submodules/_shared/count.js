/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.8.2                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var $c = global.$c || {},
    _error = $c.error,
    _isObject = $c.isObject,
    _isArray = $c.isArray,
    _isString = $c.isString,
    _isRegExp = $c.isRegExp,
    _strip = $c.strip;

require('./where')($c);

function count (obj, option){
    try {
        if (_isObject(obj)) {
            var count = 0;
            for (var prop in obj){
                if (obj.hasOwnProperty(prop)) { count++; }
            }
            return count;
        }
        if (_isArray(obj)) {
            return $c.where(obj,option).length;
        }
        if (_isString(obj)) {
            var word = option;
            if (!_isRegExp(word)) {
                word = new RegExp(word, "g");
            } else if (!option.global) {
                var reg_str = word.toString(),
                    index = reg_str.lastIndexOf('/'),
                    options = reg_str.substring(index + 1);
                word = new RegExp(_strip(reg_str,'/'), "g"+options);
            }
            return (obj.match(word) || []).length;
        }
        return undefined;
    } catch (e) {
        _error && _error('Object.count', e);
    }
}

function init (ctx) {
    if (!ctx.isEmpty) { return; }
    $c = ctx.isEmpty($c) ? ctx : $c;
    require('./where')($c);
    _error = ctx.error || $c.error;
    _isObject = ctx.isObject || $c.isObject;
    _isArray = ctx.isArray || $c.isArray;
    _isString = ctx.isString || $c.isString;
    _isRegExp = ctx.isRegExp || $c.isRegExp;
    _strip = ctx.strip || $c.strip;

    $c.count = ctx.count = $c.count || ctx.count || count;
}
init.count = count;
module.exports = init;
