import error from '../methods/error';
import isNumber from '../methods/isnumber';

export default function average(arr: number[]): number {
    /*|{
        "info": "Array class extension to perform average of all the values (any value which is not a number is skipped).",
        "category": "Array",
        "featured": true,
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#array.aggregate",
        "typeParameter": "",
        "returnType": "(number)"
    }|*/
    try {
        let length = 0, sum = 0;
        for (let i = 0, len = arr.length; i < len; i++) {
            if (isNumber(arr[i])) {
                sum += arr[i];
                length++;
            }
        }
        return sum / length;
    } catch (e) /* istanbul ignore next */ {
        error && error("Array.average", e);
        return NaN;
    }
}