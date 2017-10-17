/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.8.2                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var $c = global.$c || {},
    _error = $c.error,
    _duplicate = $c.duplicate;

function _orderListHelper(value, sorter, arr) {
    try {
        var ii = 0, i = 0, len = arr.length;
        if (!~sorter(value, arr[0])) { return 0; }
        if (sorter(value, arr[len - 1]) === 1) { return len; }
        while (len > 1) {
            len = Math.ceil(len/2);
            ii = i + len;
            var order = sorter(value, arr[ii]);
            if (order === 0) { return ii; }
            if (order === 1) { i = ii++; }
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
        "category": "Global",
        "parameters":[],

        "overloads":[
            {"parameters":[
                {"records": "(Array) Array used to create the initial items in the ordered list"}]},

            {"parameters":[
                {"records": "(Array) Array used to create the initial items in the ordered list"},
                {"sorter": "(Function) Function for sorting logic"}]}],

        "url": "http://www.craydent.com/library/1.9.3/docs#OrderedList",
        "returnType": "(OrderedList)"
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
    if (!ctx.isEmpty) { return; }
    $c = ctx.isEmpty($c) ? ctx : $c;
    _error = ctx.error || $c.error;
    _duplicate = ctx.duplicate || $c.duplicate;
    $c.OrderedList = ctx.OrderedList = $c.OrderedList || ctx.OrderedList || OrderedList;
}
init.OrderedList = OrderedList;
module.exports = init;
