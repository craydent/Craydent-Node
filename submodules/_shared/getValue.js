/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.8.2                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var $c = global.$c || {};

function getValue (obj, args, dflt) {
    try {
        if (!$c.isFunction(obj)) {
            if (args && !dflt) { dflt = args; }
            var args = [obj];
            if (dflt !== undefined) { args.push(dflt); }
            return $c.isNull.apply($c, args) || ($c.isArray(obj) ? obj : obj.constructor(obj));
        }
        var rtn = obj.apply(obj, args);
        return rtn === undefined ? dflt : rtn;
    } catch (e) {
        $c.error && $c.error('Object.getValue', e);
    }
}

function init (ctx) {
    $c = ctx.isEmpty($c) ? ctx : $c;
    $c.getValue = ctx.getValue = $c.getValue || ctx.getValue || getValue;
}
init.getValue = getValue;
module.exports = init;
