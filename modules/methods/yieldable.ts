import error from '../methods/error';
import insertAt from '../methods/insertat';
import isAsync from '../methods/isasync';
import isBoolean from '../methods/isboolean';
import isFunction from '../methods/isfunction';
import isGenerator from '../methods/isgenerator';
import isNull from '../methods/isnull';
import isNumber from '../methods/isnumber';
import isObject from '../methods/isobject';
import isPromise from '../methods/ispromise';
import syncroit from '../methods/syncroit';
import { AsyncFunction } from '../models/AsyncFunction';

export interface YieldableOption {
    context?: any;
    callbackIndex?: number;
    returnIndex?: number | boolean;
    method: GeneratorFunction | AsyncFunction | Promise<any> | Function;
}
export default function yieldable<T>(this: any, value: GeneratorFunction | AsyncFunction | Promise<any> | YieldableOption): (...args: any[]) => Promise<T>;
export default function yieldable<T>(this: any, value: Function): (...args: any[]) => Promise<T>;
export default function yieldable<T>(this: any, func: Function, context: any): (...args: any[]) => Promise<T>;
export default function yieldable<T>(this: any, func: Function, callbackIndex: number): (...args: any[]) => Promise<T>;
export default function yieldable<T>(this: any, func: Function, context: any, callbackIndex: number): (...args: any[]) => Promise<T>;
export default function yieldable<T>(this: any, func: Function, context: any, callbackIndex: number, returnIndex?: number): (...args: any[]) => Promise<T>;
export default function yieldable<T>(this: any, value: T | YieldableOption, context?: any, callbackIndex?: any, returnIndex?: any): (...args: any[]) => Promise<T> {
    /*|{
        "info": "Makes a value yieldable via a Promise.",
        "category": "Control Flow|Utility",
        "parameters":[
            {"value": "(YieldableValue) Value to make yieldable"}],

        "overloads":[
            {"parameters":[
                {"func": "(Function) Function to make yieldable"},
                {"context": "(any) Context to use to execute func."}]},

            {"parameters":[
                {"func": "(Function) Function to make yieldable"},
                {"callbackIndex": "(Integer) Index of callback argument."}]},

            {"parameters":[
                {"func": "(Function) Function to make yieldable"},
                {"context": "(any) Context to use to execute func."},
                {"callbackIndex": "(Integer) Index of callback argument."}]},

            {"parameters":[
                {"func": "(Function) Function to make yieldable"},
                {"context": "(any) Context to use to execute func."},
                {"callbackIndex": "(Integer) Index of callback argument."},
                {"returnIndex": "(Integer) Index of callback argument."}]}],

        "url": "http://www.craydent.com/library/1.9.3/docs#yieldable",
        "returnType": "(Promise<any>)"
    }|*/
    try {
        if (arguments.length == 1 && isObject(value)) {
            context = (value as YieldableOption).context;
            callbackIndex = (value as YieldableOption).callbackIndex;
            returnIndex = (value as YieldableOption).returnIndex;
            value = (value as YieldableOption).method as any;
        }
        context = context || this;
        if (isAsync(value)) { return value as any; }
        if (isPromise(value)) { return ((...args: any[]) => value as any).bind(context) }
        if (isGenerator(value)) { return ((...args: any[]) => syncroit(value as any)).bind(context) }
        if (isFunction(value)) {
            return (function (...args: any[]) {
                /* istanbul ignore next */
                args = args || [];
                return new Promise<T>(function (res) {
                    let fn = function () {
                        let args = arguments;
                        if (args.length == 1) {
                            return res(args[0]);
                        }
                        if (isBoolean(returnIndex) && returnIndex) {
                            for (let i = 0, len = args.length; i < len; i++) {
                                if (args[i]) { return res(args[i]); }
                            }
                        }
                        if (isNumber(returnIndex)) { return res(args[returnIndex]); }
                        return res(args as any);
                    };
                    if (isNull(callbackIndex)) {
                        args.push(fn);
                    } else {
                        insertAt(args, callbackIndex, fn);
                    }
                    (value as any).apply(context, args);
                });
            }).bind(context);
        }
        return ((...args: any[]) => new Promise<T>(function (res) { return res(value as T); }) as Promise<T>).bind(context);

    } catch (e) /* istanbul ignore next */ {
        error && error('yieldable', e);
    }
    return (...args: any[]) => Promise.resolve() as Promise<any>;
}