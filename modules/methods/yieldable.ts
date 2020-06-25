import error from './error';
import insertAt from './insertAt';
import isAsync from './isAsync';
import isBoolean from './isBoolean';
import isGenerator from './isGenerator';
import isNull from './isNull';
import isNumber from './isNumber';
import isObject from './isObject';
import isPromise from './isPromise';
import syncroit from './syncroit';
import { AsyncFunction } from '../models/AsyncFunction';

export interface YieldableOption {
    context: any;
    callbackIndex: number;
    returnIndex: number;
    method: GeneratorFunction | AsyncFunction | Promise<any> | Function;
}
export default function yieldable(value: GeneratorFunction | AsyncFunction | Promise<any> | Function | YieldableOption): Promise<any>;
export default function yieldable(func: Function, context: any): Promise<any>;
export default function yieldable(func: Function, callbackIndex: number): Promise<any>;
export default function yieldable(func: Function, context: any, callbackIndex: number): Promise<any>;
export default function yieldable(func: Function, context: any, callbackIndex: number, returnIndex?: number): Promise<any>;
export default function yieldable(value, context?, callbackIndex?, returnIndex?): Promise<any> {
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
            context = value.context;
            callbackIndex = value.callbackIndex;
            returnIndex = value.returnIndex;
            value = value.method;
        }
        if (isPromise(value) || isAsync(value)) { return value; }
        if (isGenerator(value)) { return syncroit(value); }
        if (isFunction(value)) {
            context = context || this;
            return function () {
                let args = [];
                for (let i = 0, len = arguments.length; i < len; i++) {
                    args.push(arguments[i]);
                }
                return new Promise(function (res) {
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
                        return res(args);
                    };
                    if (isNull(callbackIndex)) {
                        args.push(fn);
                    } else {
                        insertAt(args, callbackIndex, fn);
                    }
                    value.apply(context, args);
                });
            };
        }
        return new Promise(function (res) { return res(value); });

    } catch (e) {
        error && error('yieldable', e);
    }
}