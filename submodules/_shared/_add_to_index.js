/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.9.0                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/

function binarySearch (arr, value){
    var min = arguments[2] || 0,
        max = arguments[3] || arr.length;

    if (min + 1 == max) { return max; }

    var mid = parseInt((max - min)/2) + min;

    if (arr[mid] == value) {
        mid--;
        while (min > mid) {
            if (arr[mid] != value) { break; }
            mid--;
        }
        return mid + 1;
    }

    if (arr[mid] > value) { max = mid; }
    if (arr[mid] < value) { min = mid; }

    return binarySearch(arr, value, min, max);
}
function _add_to_index (buckets, obj){
    for (var prop in buckets) {
        var sarr = buckets[prop][obj[prop]];
        if (!sarr || !sarr.length) {
            sarr = sarr || (buckets[prop][obj[prop]] = []);
            var keys = buckets[prop].__bucket__keys;
            var index = binarySearch(keys, obj[prop]);
            keys.splice(index, 0, obj[prop]);
        }
        sarr.push(obj);
    }
}

function init (ctx) {
    ctx._add_to_index = _add_to_index;
}
module.exports = init;
