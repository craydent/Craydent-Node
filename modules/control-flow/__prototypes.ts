import * as IParallelEach from '../methods/paralleleach';
import * as IAwaitable from '../methods/awaitable';
import * as IYieldable from '../methods/yieldable';
import * as ISyncroit from '../methods/syncroit';
import { Yieldables } from '../models/Yieldables';

import { scope } from '../private/__common';

if (typeof (global as any) == 'undefined') {
    (window as any).global = window;
}
scope.eval = str => eval(str);
//#region dependencies
const parallelEach: typeof IParallelEach.default = require('../methods/paralleleach').default;
const awaitable: typeof IAwaitable.default = require('../methods/awaitable').default;
const yieldable: typeof IYieldable.default = require('../methods/yieldable').default;
const syncroit: typeof ISyncroit.default = require('../methods/syncroit').default;
//#endregion

export function _parallelEach<T>(this: any[], args: any[]): Promise<T[]>;
export function _parallelEach<T>(this: any[], gen: Yieldables, args?: any[]): Promise<T[]>;
export function _parallelEach<T>(this: Yieldables[]): Promise<T[]>;
export function _parallelEach<T>(this: any, gen?: any, args?: any): Promise<T[]> {
    /*|{
        "info": "Array class extension to perform push and update indexes if used",
        "category": "Array",
        "featured": true,
        "parameters":[
            {"value": "(Object) value to add"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#array.parallelEach",
        "typeParameter": "",
        "returnType": "(Bool) Value to indicate success or failure"
    }|*/
    return parallelEach<T>(this, gen, args);
}


export { awaitable, yieldable, syncroit };