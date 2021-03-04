import error from '../methods/error';
import isNull from '../methods/isnull';

export default function last<T>(arr: T[]): T {
    /*|{
        "info": "Array class extension to retrieve the last item in the array.",
        "category": "Array",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#array.last",
        "typeParameter": "<T>",
        "returnType": "(T) returns the last item in the array."
    }|*/
    try {
        if (isNull(arr) || !arr.length) {
            return null;
        }
        return arr[arr.length - 1];
    } catch (e) /* istanbul ignore next */ {
        error && error('Array.last', e);
        return null;
    }
}