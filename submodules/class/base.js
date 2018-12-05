/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.9.0                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var $s = require('./dependencies/common')(),
    $c = $s.$c,
    error = $s.error;

if (!$c.MODULES_LOADED[$s.info.name]) {
    $s.__log_module();
    $s.scope.eval = function (str) { return eval(str); };

    require($s.dir + 'removeAll')($s);
    require($s.dir + 'toSet')($s);
    require($s.dir + 'orderedlist')($s);

    /*----------------------------------------------------------------------------------------------------------------
    /-	Benchmark testing Class
    /---------------------------------------------------------------------------------------------------------------*/
    function Benchmarker () {
        /*|{
            "info": "Class used to measure the run time of code",
            "category": "Class",
            "parameters":[],

            "overloads":[],

            "instanceProperties":[
                {"name":"executionTime", "type":"number"},
                {"name":"start", "type":"void"},
                {"name":"stop", "type":"() => number"}
            ],

            "url": "http://www.craydent.com/library/1.9.3/docs#Benchmarker",
            "returnType": "(IBenchmarker)"
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
            "category": "Class",
            "parameters":[
                {"records": "(Array<T>) Array used to create the iterator to iterate each item"}],

            "overloads":[
                {"parameters":[
                    {"records": "(Object) Object used to create the iterator to iterate each property"}]}],

            "instanceProperties":[
                {"name":"current", "type":"T"},
                {"name":"hasNext", "type":"() => boolean"},
                {"name":"next", "type":"() => {value:T, done:boolean}"},
                {"name":"reset", "type":"() => void"},
                {"name":"setNextIndex", "type":"(value: number) => void"},
                {"name":"size", "type":"() => number"}
            ],

            "url": "http://www.craydent.com/library/1.9.3/docs#Cursor",
            "typeParameter": "<T>",
            "returnType": "(ICursor<T>)"
        }|*/
        try {
            var props = [],
                currentIndex = 0,
                arr = $s.duplicate(records || [],true);
            if ($s.isObject(arr)) {
                for (var prop in arr) {
                    if (!arr.hasOwnProperty(prop)) { continue; }
                    props.push(prop);
                }
                props.sort();
            } else if ($s.isArray(arr)) {
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
    function Queue (records) {
        /*|{
            "info": "Collection class that follows FIFO",
            "category": "Class",
            "parameters":[
                {"records": "(Array<T>) Array used to create the iterator to iterate each item"}],

            "overloads":[],

            "instanceProperties":[
                {"name":"dequeue", "type":"() => T"},
                {"name":"enqueue", "type":"(value:T) => void"},
                {"name":"hasNext", "type":"() => boolean"},
                {"name":"next", "type":"() => {value:T, done:boolean}"},
                {"name":"size", "type":"() => number"}
            ],

            "url": "http://www.craydent.com/library/1.9.3/docs#Queue",
            "typeParameter": "<T>",
            "returnType": "(IQueue<T>)"
        }|*/
        try {
            var arr = $s.duplicate(records || [],true), nextIndex = 0;
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
            "category": "Class",
            "parameters":[
                {"records": "(Array<T>) Array used to create the iterator to iterate each item"}],

            "overloads":[],

            "instanceProperties":[
                {"name":"add", "type":"(value:T) => boolean"},
                {"name":"clean", "type":"() => void"},
                {"name":"clear", "type":"(value?:T, indexOf?:ArrayIterator<T, TResult>) => void"},
                {"name":"hasNext", "type":"() => boolean"},
                {"name":"next", "type":"() => {value:T, done:boolean}"},
                {"name":"size", "type":"() => number"}
            ],

            "url": "http://www.craydent.com/library/1.9.3/docs#Set",
            "typeParameter": "<T, TResult>",
            "returnType": "(ISet<T, TResult>)"
        }|*/
        try {
            var arr = $s.duplicate(records || []), nextIndex = 0;
            arr.add = function (value) {
                var push = true;
                for (var i = 0, len = this.length; i < len; i++) {
                    if ($s.equals(value,this[i])) {
                        push = false;
                        break;
                    }
                }
                if (push) { return !!arr.push(value); }
                return false;
            };
            arr.clear = function (val, indexOf) { $s.removeAll(this, val, indexOf); };
            arr.clean = function(){ $s.toSet(this) };
            arr.next = function () { return { value: this[nextIndex++], done: nextIndex >= this.size() }; };
            arr.hasNext = function () { return nextIndex < this.size(); };
            arr.size = function(){ return this.length; };
            arr.clean();
            return arr;
        } catch (e) {
            error('Set', e);
        }
    }

    $c.Cursor = Cursor;
    $c.Benchmarker = Benchmarker;
    $c.OrderedList = $s.OrderedList;
    $c.Queue = Queue;
    $c.Set = Set;

    module.exports = $c;
}