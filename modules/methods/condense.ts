/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.9.0                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
import error from '../methods/error';
import isNull from '../methods/isnull';

export default function condense<T>(arr: T[], check_values?: any[] | boolean): T[] {
    /*|{
        "info": "Array class extension to reduce the size of the Array removing blank strings, undefined's, and nulls",
        "category": "Array",
        "parameters":[
            {"check_values?": "(Bool) Set this flag to remove duplicates"}
        ],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#array.condense",
        "typeParameter": "<T>",
        "returnType": "(Array<T>) returns a condensed version of the array."
    }|*/
    try {
        let skip = [], items = [], without = false;
        if (check_values && check_values.constructor == Array) {
            without = true;
        }
        for (let i = 0, len = arr.length; i < len; i++) {
            let obj = arr[i];
            if (check_values) {
                let index = i;
                if (without && ~(check_values as any[]).indexOf(obj)) {
                    skip.push(i);
                    continue;
                }
                if (~skip.indexOf(i)) { continue; }
                while (~(index = arr.indexOf(obj, index + 1))) {
                    skip.push(index);
                }

            }
            obj as any !== "" && !isNull(obj) && !~skip.indexOf(i) && items.push(obj);
        }
        return items;
    } catch (e) /* istanbul ignore next */ {
        error && error("condence", e);
        return [];
    }
}