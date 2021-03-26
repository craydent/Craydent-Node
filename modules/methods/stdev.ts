import error from '../methods/error';
import _average from '../methods/average';
import isNumber from '../methods/isnumber';

const _isNumber = isNumber;

export default function stdev(arr: number[]): number {
    /*|{
        "info": "Array class extension to perform standard deviation (any value which is not a number is 0).",
        "category": "Array",
        "featured": true,
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#array.stdev",
        "typeParameter": "<T>",
        "returnType": "(number | NaN) returns the standard deviation of the array of numbers"
    }|*/
    try {
        if (!arr || !arr.length) { return 0; }
        let avg = _average(arr),
            sum = null as any, sdlen = 0;
        for (let i = 0, len = arr.length; i < len; i++) {
            if (!_isNumber(arr[i])) { continue; }
            sdlen++;
            sum = sum || 0;
            let diff = arr[i] - avg;
            sum += diff * diff;
        }
        return Math.sqrt(sum / sdlen) as any;
    } catch (e) /* istanbul ignore next */ {
        error && error("Array.stdev", e);
        return NaN;
    }
}
