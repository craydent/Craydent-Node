/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.9.0                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var _getFuncName, _general_trim, _isString, _isArray, _isBoolean, _error;

function universal_trim (subject, chars) {
    /*|{
        "info": "Array class extension to remove all white space/chars from the beginning and end of all string values in the array & String class extension to remove characters from the beginning and end of the string.",
        "category": "Array",
        "parameters":[],

        "overloads":[
            {"parameters":[
                {"ref":"(Bool) Whether or not to mutate the original array."}]},

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
    _getFuncName = ctx._getFuncName;
    _general_trim = ctx._general_trim;
    _isString = ctx.isString;
    _isArray = ctx.isArray;
    _isBoolean = ctx.isBoolean;
    _error = ctx.error;

    ctx.universal_trim = universal_trim;
}
module.exports = init;
