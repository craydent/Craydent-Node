import error from '../methods/error';
import rand from '../methods/rand';

export default function scramble<T>(arr: T[]): T[] {
    /*|{
        "info": "Array class extension to scramble the order.",
        "category": "Array",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#array.scramble",
        "typeParameter": "<T>",
        "returnType": "(Array<T>)"
    }|*/
    try {
        return arr.sort(function () { return Math.round(rand(-1.5, 1.5)); });
    } catch (e) /* istanbul ignore next */ {
        error && error("Array.scramble", e);
        return arr;
    }
}