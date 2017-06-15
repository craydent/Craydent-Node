/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.8.2                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var $c = $c || {};

function getValue (obj, args, dflt) {
    try {
        if (!$c.isFunction(obj)) {
            if (args && !dflt) { dflt = args; }
            return $c.isNull(obj, dflt) || obj;
        }
        var rtn = obj.apply(obj, args);
        return rtn === undefined ? dflt : rtn;
    } catch (e) {
        $c.error && $c.error('Object.getValue', e);
    }
}

function init (ctx) {
    $c = $c || ctx;
    ctx.getValue = getValue;
}
init.getValue = getValue;
module.exports = init;
