/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.9.0                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var _error, _duplicate;

function _orderListHelper(value, sorter, arr) {
    try {
        var ii = 0, i = 0, len = arr.length, origlen = arr.length;
        if (!~sorter(value, arr[0])) { return 0; }
        if (sorter(value, arr[len - 1]) === 1) { return len; }
        while (len > 1) {
            len = Math.ceil(len/2);
            ii = i + len;
            if (ii >= origlen) { ii = origlen - 1; }
            var order = sorter(value, arr[ii]);
            if (order === 0) { return ii; }
            if (order === 1) { i = ii++; }
            if (ii + 1 == origlen && len > 1) { len = 2; }
        }
        return ii;

    } catch (e) {
        _error && _error("OrderedList._orderListHelper", e);
        return false;
    }
}


function OrderedList (records,sorter)  {
    /*|{
        "info": "Collection class that filters out duplicate values and maintains an ordered list",
        "category": "Class",
        "parameters":[],

        "overloads":[
            {"parameters":[
                {"records": "(Array<T>) Array used to create the initial items in the ordered list"},
                {"sorter?": "(SortIterator<T>) Function for sorting logic"}]}],

        "instanceProperties":[
            {"name":"add", "type":"(value:T) => boolean"},
            {"name":"hasNext", "type":"() => boolean"},
            {"name":"next", "type":"() => {value:T, done:boolean}"},
            {"name":"size", "type":"() => number"}
        ],

        "url": "http://www.craydent.com/library/1.9.3/docs#OrderedList",
        "typeParameter": "<T>",
        "returnType": "(IOrderedList<T>)"
    }|*/
    try {
        sorter = sorter || function(a,b){ if (a < b) { return -1; } if (a > b) { return 1; } return 0; };
        var arr = _duplicate(records || [],true).sort(sorter), nextIndex = 0;
        arr.add = function(value){
            if (!this.length) { return this.push(value); }
            var index = _orderListHelper(value, sorter, this);
            return !!this.splice(index, 0, value);
        };
        arr.next = function () {
            return { value: this[nextIndex++], done: nextIndex >= this.size() };
        };
        arr.hasNext = function () { return nextIndex < this.size(); };
        arr.size = function(){ return this.length; };
        return arr;
    } catch (e) {
        _error && _error('OrderedList', e);
    }
}

function init (ctx) {
    _error = ctx.error;
    _duplicate = ctx.duplicate;

    ctx.OrderedList = OrderedList;
}
module.exports = init;
