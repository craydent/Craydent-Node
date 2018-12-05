/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.9.0                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var _isObject, _error;

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
        _error && _error('Object.toStringAlt', e);
    }
}

function init (ctx) {
    _error = ctx.error;
    _isObject = ctx.isObject;

    ctx.toStringAlt = toStringAlt;
}
module.exports = init;
