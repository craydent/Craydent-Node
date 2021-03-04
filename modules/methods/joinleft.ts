import { _joinHelper } from '../methods/where';
import error from '../methods/error';

export default function joinLeft<T, R, TResult>(orig: T[], arr: R[], on: string): TResult[] {
    /*|{
        "info": "Array class extension to do an outer left join on arrays",
        "category": "Array",
        "parameters":[
            {"arr": "(Array<T>) Secondary array to be joined with"},
            {"on": "(String) Condition to join on"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#array.joinLeft",
        "typeParameter": "<T, TResult>",
        "returnType": "(Array<TResult>) resulting array of the join."
    }|*/
    try {
        return _joinHelper(orig, arr, on);
    } catch (e) /* istanbul ignore next */ {
        error && error('Array.joinLeft', e);
        return [];
    }
}