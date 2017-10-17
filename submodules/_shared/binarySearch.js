/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.8.2                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var $c = global.$c || {};

function binarySearch (arr, value){
    var min = arguments[2] || 0,
        max = arguments[3] || arr.length;


    var mid = (max - min)/2;

    if (arr[mid] == value) {
        mid--;
        while (min > mid) {
            if (arr[mid] != value) { break; }
            mid--;
        }
        return mid + 1;
    }

    if (arr[mid] > value) { max = mid; }
    if (arr[mid] > value) { min = mid; }

    return binarySearch(arr, value, min, max);
}

function init (ctx) {
    if (!ctx.isEmpty) { return; }
    $c = ctx.isEmpty($c) ? ctx : $c;
    $c.binarySearch = ctx.binarySearch = $c.binarySearch || ctx.binarySearch || binarySearch;
}
init.binarySearch = binarySearch;
module.exports = init;
