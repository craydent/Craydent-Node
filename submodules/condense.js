/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.9.0                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var error = require('./error');
var isNull = require('./isNull');
function condense (objs, check_values) {
    /*|{
        "info": "Array class extension to reduce the size of the Array removing blank strings, undefined's, and nulls",
        "category": "Array",
        "parameters":[],

        "overloads":[
            {"parameters":[
                {"check_values": "(Bool) Flag to remove duplicates"}]}],

        "url": "http://www.craydent.com/library/1.9.3/docs#array.condense",
        "typeParameter": "<T>",
        "returnType": "(Array<T>)"
    }|*/
    try {
        var skip = [], arr = [], without = false;
        if (check_values && check_values.constructor == Array) {
            without = true;
        }
        for (var i = 0, len = objs.length; i < len; i++) {
            var obj = objs[i];
            if (check_values) {
                var index = i;
                if (without && ~check_values.indexOf(obj)) {
                    skip.push(i);
                    continue;
                }
                if (~skip.indexOf(i)) { continue; }
                while (~(index = objs.indexOf(obj,index + 1))) {
                    skip.push(index);
                }

            }
            obj !== "" && !isNull(obj) && !~(skip.indexOf && skip.indexOf(i) || indexOf(skip, i)) && !isNull(obj) && arr.push(obj);
        }
        return arr;
    } catch (e) {
        error("condence", e);
        return false;
    }
}
module.exports = condense;