/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.8.2                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var $c = global.$c || {},
    _isFunction = $c.isFunction,
    _isArray = $c.isArray,
    _isNull = $c.isNull;

function getValue (obj, args, dflt) {
    try {
        if (!_isFunction(obj)) {
            if (args && !dflt) { dflt = args; }
            var args = [obj];
            if (dflt !== undefined) { args.push(dflt); }
            return _isNull.apply($c, args) || (_isArray(obj) ? obj : obj.constructor(obj));
        }
        var rtn = obj.apply(obj, args);
        return rtn === undefined ? dflt : rtn;
    } catch (e) {
        _error && _error('Object.getValue', e);
    }
}

function init (ctx) {
    if (!ctx.isEmpty) { return; }
    $c = ctx.isEmpty($c) ? ctx : $c;
    _isFunction = ctx.isFunction || $c.isFunction;
    _isArray = ctx.isArray || $c.isArray;
    _isNull = ctx.isNull || $c.isNull;

    ctx.getValue = ctx.hasOwnProperty('getValue') && ctx.getValue || getValue;
    if ($c !== ctx) {
        $c.getValue = $c.hasOwnProperty('getValue') && $c.getValue || ctx.getValue
    }
}
init.getValue = getValue;
module.exports = init;
