/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.8.2                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var $c = global.$c || {},
    _getFuncName = $c._getFuncName,
    _general_trim = $c._general_trim,
    _isString = $c.isString,
    _isArray = $c.isArray,
    _isBoolean = $c.isBoolean,
    _error = $c.error;

function universal_trim (subject, chars) {
    /*|{
        "info": "Array class extension to remove all white space/chars from the beginning and end of all string values in the array & String class extension to remove characters from the beginning and end of the string.",
        "category": "Array",
        "parameters":[],

        "overloads":[
            {"parameters":[
                {"ref":"(Boolean) Whether or not to mutate the original array."}]},

            {"parameters":[
                {"character": "(Char[]) Character to remove in the String"}]}],

        "url": "http://www.craydent.com/library/1.9.3/docs#String.trim",
        "returnType": "(Bool)"
    }|*/
    try {
        if (_isString(subject)) {
            return _general_trim(subject, undefined, chars);
        }
        if (_isArray(subject)) {
            var ref = chars,
                arr = [],
                alter = false;
            if (_isBoolean(ref)) { alter = true; }

            for (var i = 0, len = subject.length; i < len; i++) {
                var item = subject[i];
                _isString(item) && (arr[i] = item.toString().trim()) || (arr[i] = item);
                alter && (subject[i] = arr[i]);
            }
            return arr;
        }
    } catch (e) {
        _error && _error(_getFuncName(subject.constructor) + ".trim", e);
        return false;
    }
}

function init (ctx) {
    if (!ctx.isEmpty) { return; }
    $c = ctx.isEmpty($c) ? ctx : $c;

    _getFuncName = ctx._getFuncName || $c._getFuncName;
    _general_trim = ctx._general_trim || $c._general_trim;
    _isString = ctx.isString || $c.isString;
    _isArray = ctx.isArray || $c.isArray;
    _isBoolean = ctx.isBoolean || $c.isBoolean;
    _error = ctx.error || $c.error;

    ctx.universal_trim = ctx.hasOwnProperty('universal_trim') && ctx.universal_trim || universal_trim;
    if ($c !== ctx) {
        $c.universal_trim = $c.hasOwnProperty('universal_trim') && $c.universal_trim || ctx.universal_trim
    }
}
init.universal_trim = universal_trim;
module.exports = init;
