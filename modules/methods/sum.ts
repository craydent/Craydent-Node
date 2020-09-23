import error from '../methods/error';
import isNumber from '../methods/isNumber';

export default function sum(arr: number[]): number {
    /*|{
        "info": "Array class extension to perform summation of all the values (any value which is not a number is 0).",
        "category": "Array",
        "featured": true,
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#array.sum",
        "typeParameter": "<T>",
        "returnType": "(number | NaN) returns the sum of the array of numbers"
    }|*/
    try {
        let value = 0;
        for (let i = 0, len = arr.length; i < len; i++) {
            value += isNumber(arr[i]) ? arr[i] : 0;
        }
        return value;
    } catch (e) /* istanbul ignore next */ {
        error && error("Array.sum", e);
        return NaN;
    }
}