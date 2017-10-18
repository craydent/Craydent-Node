/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.8.2                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var $c = global.$c || {},
    _isString = $c.isString,
    _isNumber = $c.isNumber,
    _isBoolean = $c.isBoolean,
    _error = $c.error;

function parseBoolean(value) {
    /*|{
        "info": "Try to parse value to a Boolean",
        "category": "Global",
        "parameters":[
            {"value": "(Mixed) value to parse as boolean"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#parseBoolean",
        "returnType": "(Mixed)"
    }|*/
    try {
        if (_isString(value)) {
            value = value.toLowerCase();
            return (value == "true" ? true : value == "false" ? false : value == "1" ? true : value == "0" ? false : undefined);
        } else if (_isNumber(value)) {
            return (value === 1 ? true : value === 0 ? false : undefined);
        } else if (_isBoolean(value)) {
            return value;
        }
        return undefined;
    } catch (e) {
        _error && _error('parseBoolean', e);
    }
}

function init (ctx) {
    if (!ctx.isEmpty) { return; }
    $c = ctx.isEmpty($c) ? ctx : $c;
    _isString = ctx.isString || $c.isString;
    _isNumber = ctx.isNumber || $c.isNumber;
    _isBoolean = ctx.isBoolean || $c.isBoolean;
    _error = ctx.error || $c.error;

    ctx.parseBoolean = ctx.hasOwnProperty('parseBoolean') && ctx.parseBoolean || parseBoolean;
    if ($c !== ctx) {
        $c.parseBoolean = $c.hasOwnProperty('parseBoolean') && $c.parseBoolean || ctx.parseBoolean
    }
}
init.parseBoolean = parseBoolean;
module.exports = init;
