import error from '../methods/error';
import syncroit from '../methods/syncroit';

import isArray from '../methods/isarray';
import isAsync from '../methods/isasync';
import isFunction from '../methods/isfunction';
import isGenerator from '../methods/isgenerator';
import isPromise from '../methods/ispromise';

import { Yieldables } from '../models/Yieldables';
const _isArray = isArray,
    _isFunction = isFunction,
    _isAsync = isAsync,
    _isGenerator = isGenerator,
    _isPromise = isPromise;

export default function parallelEach(obj: any[], args: any[]): Promise<any[]>;
export default function parallelEach(obj: any[], gen: Yieldables, args?: any[]): Promise<any>;
export default function parallelEach(obj: Yieldables[]): Promise<any[]>;
export default function parallelEach(obj: any, gen?: any, args?: any): Promise<any[]> {
    /*|{
        "info": "Array class extension to execute each array item in parallel or run each item against a generator/function in parallel",
        "category": "Array|Control Flow",
        "parameters":[],

        "overloads":[
            {"parameters":[
                {"gen": "(GeneratorFunction) Generator function to apply to each item"}]},

            {"parameters":[
                {"func": "(ArrayIterator<T, TResult>) Function to apply to each item"}]},

            {"parameters":[
                {"args": "(Array<T>) Argument array to apply to pass to generator or function (only should be used when the array contains generators, promises, or functions)"}]}],

        "url": "http://www.craydent.com/library/1.9.3/docs#array.parallelEach",
        "typeParameter": "<T, TResult>",
        "returnType": "(Promise<Array<T>>) returns a promise of the resulting items in the array."
    }|*/
    try {
        var _syncroit = syncroit;
        var self = obj, arr = obj;
        if (_isArray(gen)) {
            args = gen;
            gen = undefined;
        }
        if (!_isArray(args)) {
            args = [];
        }
        var len = arr.length, results = Array(len), completed = 0;
        if (!len) { return new Promise(function (res) { res(results); }); }
        if (gen) {
            let isgen = _isGenerator(gen), isfunc = _isFunction(gen), isasync = _isAsync(gen);
            return new Promise(function (res) {
                for (let i = 0; i < len; i++) {
                    /* istanbul ignore else */
                    if (isgen) {
                        eval(`_syncroit(function*(){ return yield* gen.call(self, arr[${i}],${i}); }).then(function(result){ results[${i}] = result; if (++completed == len) { res(results); }});`);
                    } else if (isasync) {
                        eval(`(async function (){ results[${i}] = await gen.call(self, arr[${i}],${i}); if (++completed == len) { res(results); } })();`);
                    } else if (isfunc) {
                        results[i] = gen.call(self, arr[i], i);
                        if (++completed == len) { res(results); }
                    }
                }
            });
        }
        return new Promise(function (res, rej) {
            for (let i = 0; i < len; i++) {
                if (_isGenerator(arr[i])) {
                    eval(`_syncroit(function*(){ return yield* arr[${i}].apply(self,args);}).then(function(result){ results[${i}] = result; if (++completed == len) { res(results); }});`);
                } else if (_isAsync(arr[i])) {
                    eval(`(async function () { results[${i}] = await arr[${i}].apply(self,args); if (++completed == len) { res(results); } })();`);
                } else if (_isPromise(arr[i])) {
                    arr[i].then((result: any) => {
                        results[i] = result;
                        if (++completed == len) { res(results); }
                    })
                } else if (_isFunction(arr[i])) {
                    setTimeout(function () { results[i] = arr[i].apply(self, args); if (++completed == len) { res(results); } }, 0);;
                } else {
                    results[i] = arr[i];
                    if (++completed == len) { res(results); }
                }
            }
        });
    } catch (e) /* istanbul ignore next */ {
        error && error("Array.parallelEach", e);
        return null as any;
    }
}
