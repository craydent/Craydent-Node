/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.9.0                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var _error, _isObject, _isArray, _isString, _isRegExp, _strip, _where;

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
            if (_isObject(option)) {
                return _where(obj,option).length;
            }
            var isReg = _isRegExp(option);
            if (_isString(option) || isReg) {
                var ct = 0;
                for (var i = 0, len = obj.length; i < len; i++) {
                    if (~obj[i].indexOf(option) || (isReg && option.test(obj[i]))) { ct++; }
                }
                return ct;
            }
            return obj.length;
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
    require('./where')(ctx);
    _error = ctx.error;
    _isObject = ctx.isObject;
    _isArray = ctx.isArray;
    _isString = ctx.isString;
    _isRegExp = ctx.isRegExp;
    _strip = ctx.strip;
    _where = ctx.where;

    ctx.count = count;
}
module.exports = init;
