/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.8.2                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var $c = global.$c || {};

function universal_trim (chars) {
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
        if ($c.isString(this)) {
            return $c.general_trim(this, undefined, chars);
        }
        if ($c.isArray(this)) {
            var ref = chars,
                arr = [],
                alter = false;
            if ($c.isBoolean(ref)) { alter = true; }

            for (var i = 0, len = this.length; i < len; i++) {
                var item = this[i];
                $c.isString(item) && (arr[i] = item.toString().trim()) || (arr[i] = item);
                alter && (this[i] = arr[i]);
            }
            return arr;
        }
    } catch (e) {
        $c.error && $c.error($c.getName(this.constructor) + ".trim", e);
        return false;
    }
}

function init (ctx) {
    $c = ctx.isEmpty($c) ? ctx : $c;
    $c.universal_trim = ctx.universal_trim = $c.universal_trim || ctx.universal_trim || universal_trim;
}
init.universal_trim = universal_trim;
module.exports = init;
