/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.8.2                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var $c = global.$c || {};

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
        if ($c.isString(value)) {
            value = value.toLowerCase();
            return (value == "true" ? true : value == "false" ? false : value == "1" ? true : value == "0" ? false : undefined);
        } else if ($c.isNumber(value)) {
            return (value === 1 ? true : value === 0 ? false : undefined);
        } else if ($c.isBoolean(value)) {
            return value;
        }
        return undefined;
    } catch (e) {
        $c.error && $c,error('parseBoolean', e);
    }
}

function init (ctx) {
    $c = ctx.isEmpty($c) ? ctx : $c;
    $c.parseBoolean = ctx.parseBoolean = $c.parseBoolean || ctx.parseBoolean || parseBoolean;
}
init.parseBoolean = parseBoolean;
module.exports = init;
