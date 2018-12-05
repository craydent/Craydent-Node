/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.9.0                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var _error, _isFunction, _isArray, _isNull;

function getValue (obj, args, dflt) {
    try {
        if (!_isFunction(obj)) {
            if (args && !dflt) { dflt = args; }
            var args = [obj];
            if (dflt !== undefined) { args.push(dflt); }
            return _isNull.apply({}, args) || (_isArray(obj) ? obj : obj.constructor(obj));
        }
        var rtn = obj.apply(obj, args);
        return rtn === undefined ? dflt : rtn;
    } catch (e) {
        _error && _error('Object.getValue', e);
    }
}

function init (ctx) {
    _error = ctx.error
    _isFunction = ctx.isFunction;
    _isArray = ctx.isArray;
    _isNull = ctx.isNull;

    ctx.getValue = getValue;
}
module.exports = init;
