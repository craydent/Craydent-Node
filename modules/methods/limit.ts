import error from '../methods/error';

export default function limit<T>(arr: T[], max: number, skip?: number): T[] {
    /*|{
        "info": "Array class extension to return a limited amount of items",
        "category": "Array",
        "parameters":[
            {"max": "(Int) Maximum number of items to return"},
            {"skip?": "(Int) Number of items to skip"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#array.limit",
        "typeParameter": "<T>",
        "returnType": "(Array<T>) returns the first n items in the array."
    }|*/
    try {
        skip = skip || 0;
        return arr.slice(skip, max + skip);
    } catch (e) /* istanbul ignore next */ {
        error && error("Array.limit", e);
        return [];
    }
}