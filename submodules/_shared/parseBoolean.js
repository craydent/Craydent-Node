/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.9.0                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var _isString, _isNumber, _isBoolean, _error;

function parseBoolean(value, strict) {
    /*|{
        "info": "Try to parse value to a Boolean (0, 1, '0', and '1' are valid unless strict is set to true).",
        "category": "Utility",
        "parameters":[
            {"value": "(any) value to parse as boolean."},
            {"strict?": "(Boolean) Disable parsing of 0, 1, '0', and '1'."}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#parseBoolean",
        "returnType": "(Bool|undefined)"
    }|*/
    try {
        if (_isString(value)) {
            value = value.toLowerCase();
            var valids = strict ? { "true": 1, "false": 1} : { "true": 1, "false": 1, "0": 1, "1": 1};
            if (value in valids) {
                return (value == "true" ? true : value == "false" ? false : value == "1" ? true : value == "0" ? false : undefined);
            }
        } else if (_isNumber(value) && !strict) {
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
    _isString = ctx.isString;
    _isNumber = ctx.isNumber;
    _isBoolean = ctx.isBoolean;
    _error = ctx.error;

    ctx.parseBoolean = parseBoolean;
}
module.exports = init;
