/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.8.2                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var $c = global.$c || {},
    _isObject = $c.isObject;

function toStringAlt (obj, delimiter, prefix, urlEncode) {
    try {
        delimiter = delimiter || '=';
        prefix = prefix || '&';
        var str = '';
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                var value = _isObject(obj[prop]) ? JSON.stringify(obj[prop]) : obj[prop];
                urlEncode &&
                (str += prefix + encodeURIComponent(prop) + delimiter + encodeURIComponent(value)) || (str += prefix + prop + delimiter + value);
            }
        }
        return str;
    } catch (e) {
        error('Object.toStringAlt', e);
    }
}

function init (ctx) {
    if (!ctx.isEmpty) { return; }
    $c = ctx.isEmpty($c) ? ctx : $c;
    _isObject = ctx.isObject || $c.isObject;

    ctx.toStringAlt = ctx.hasOwnProperty('toStringAlt') && ctx.toStringAlt || toStringAlt;
    if ($c !== ctx) {
        $c.toStringAlt = $c.hasOwnProperty('toStringAlt') && $c.toStringAlt || ctx.toStringAlt
    }
}
init.toStringAlt = toStringAlt;
module.exports = init;
