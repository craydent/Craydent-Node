/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.8.2                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var cm = require('./common'),
    $c = cm.$c,
    _duplicate = cm.duplicate,
    _equals = cm.equals,
    _duplicate = cm.duplicate,
    _equals = cm.equals,
    _removeAll = cm.removeAll,
    _toSet = cm.toSet;

/*----------------------------------------------------------------------------------------------------------------
 /-	Benchmark testing Class
 /---------------------------------------------------------------------------------------------------------------*/
function Benchmarker () {
    /*|{
        "info": "Class used to measure the run time of code",
        "category": "Global",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#Benchmarker",
        "returnType": "(void)"
    }|*/
    try {
        this.executionTime = 0;
        this.start = function () {
            this._start = new Date();
            this._end = 0;
        };
        this.stop = function () {
            this._end = new Date();
            return this.executionTime = (this._end - this._start) / 1000;
        };
        this.start();
    } catch (e) {
        error('BenchMarker', e);
    }
}

/*----------------------------------------------------------------------------------------------------------------
 /-	Collection class
 /---------------------------------------------------------------------------------------------------------------*/
function Cursor (records) {
    /*|{
     "info": "Cursor class to facilitate iteration",
     "category": "Global",
     "parameters":[
     {"records": "(Array) Array used to create the iterator to iterate each item"}],

     "overloads":[
     {"parameters":[
     {"records": "(Object) Object used to create the iterator to iterate each property"}]}],

     "url": "http://www.craydent.com/library/1.9.3/docs#Cursor",
     "returnType": "(Cursor)"
     }|*/
    try {
        var props = [],
            currentIndex = 0,
            arr = $c.duplicate(records || [],true);
        if ($c.isObject(arr)) {
            for (var prop in arr) {
                if (!arr.hasOwnProperty(prop)) { continue; }
                props.push(prop);
            }
            props.sort();
        } else if ($c.isArray(arr)) {
            var i = 0, len = arr.length;
            while (i++ < len) {
                props.push(i - 1);
            }
        }
        arr.hasNext = function () { return currentIndex <  props.length; };
        arr.next = function () {
            this.current = this[props[currentIndex]];
            return {value:this[props[currentIndex++]], done:currentIndex >= this.size()};
        };
        arr.reset = function () { currentIndex = 0; };
        arr.setNextIndex = function (value) {
            value = parseInt(value) || 0;
            if (value < 0) { value = 0; }
            else if (value >= props.length) { value = props.length - 1; }
            currentIndex = value;
            arr.current = arr[props[currentIndex]];
        };
        arr.current = arr[props[currentIndex]];

        arr.size = function () { return props.length; };
        return arr;
    } catch (e) {
        error('Cursor', e);
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
            return this.splice(index, 0, value);
        };
        arr.next = function () {
            return { value: this[nextIndex++], done: nextIndex >= this.size() };
        };
        arr.hasNext = function () { return nextIndex < this.size(); };
        arr.size = function(){ return this.length; };
        return arr;
    } catch (e) {
        error('OrderedList', e);
    }
}
function Queue (records) {
    /*|{
        "info": "Collection class that follows FIFO",
        "category": "Global",
        "parameters":[
            {"records": "(Array) Array used to create the iterator to iterate each item"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#Queue",
        "returnType": "(Queue)"
    }|*/
    try {
        var arr = _duplicate(records || [],true), nextIndex = 0;
        arr.enqueue = function (value) { this.push(value); };
        arr.dequeue = function () { return this.splice(0,1)[0]; };
        arr.next = function () { return { value: this[nextIndex++], done: nextIndex >= this.size() }; };
        arr.hasNext = function () { return nextIndex < this.size(); };
        arr.size = function () { return this.length; };
        return arr;
    } catch (e) {
        error('Queue', e);
    }
}
function Set (records) {
    /*|{
        "info": "Collection class that filters out duplicate values",
        "category": "Global",
        "parameters":[
            {"records": "(Array) Array used to create the iterator to iterate each item"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#Set",
        "returnType": "(Set)"
    }|*/
    try {
        var arr = _duplicate(records || []), nextIndex = 0;
        arr.add = function (value) {
            var push = true;
            for (var i = 0, len = this.length; i < len; i++) {
                if (_equals(value,this[i])) {
                    push = false;
                    break;
                }
            }
            if (push) { return !!arr.push(value); }
            return false;
        };
        arr.clear = function (val, indexOf) { _removeAll(this, val, indexOf); };
        arr.clean = function(){ _toSet(this) };
        arr.next = function () { return { value: this[nextIndex++], done: nextIndex >= this.size() }; };
        arr.hasNext = function () { return nextIndex < this.size(); };
        arr.size = function(){ return this.length; };
        arr.clean();
        return arr;
    } catch (e) {
        error('Set', e);
    }
}

module.exports.Cursor = Cursor;
module.exports.Benchmarker = Benchmarker;
module.exports.OrderedList = OrderedList;
module.exports.Queue = Queue;
module.exports.Set = Set;