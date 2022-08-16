import yieldable, { YieldableOption } from '../methods/yieldable';
import { AsyncFunction } from '../models/AsyncFunction';
export interface AwaitableOption {
    context: any;
    callbackIndex: number;
    returnIndex: number;
    method: GeneratorFunction | AsyncFunction | Promise<any> | Function;
}
export default function awaitable<T>(value: GeneratorFunction | AsyncFunction | Promise<any> | Function | AwaitableOption): () => Promise<T>;
export default function awaitable<T>(func: Function, context: any): () => Promise<T>;
export default function awaitable<T>(func: Function, callbackIndex: number): () => Promise<T>;
export default function awaitable<T>(func: Function, context: any, callbackIndex: number): () => Promise<T>;
export default function awaitable<T>(func: Function, context: any, callbackIndex: number, returnIndex?: number): () => Promise<T>;
export default function awaitable<T>(value: T | YieldableOption, context?: any, callbackIndex?: any, returnIndex?: any): () => Promise<T> {
    /*|{
        "info": "Makes a value awaitable via a Promise.",
        "category": "Control Flow|Utility",
        "parameters":[
            {"value": "(AwaitableValue) Value to make awaitable"}],

        "overloads":[
            {"parameters":[
                {"func": "(Function) Function to make awaitable"},
                {"context": "(any) Context to use to execute func."}]},

            {"parameters":[
                {"func": "(Function) Function to make awaitable"},
                {"callbackIndex": "(Integer) Index of callback argument."}]},

            {"parameters":[
                {"func": "(Function) Function to make awaitable"},
                {"context": "(any) Context to use to execute func."},
                {"callbackIndex": "(Integer) Index of callback argument."}]},

            {"parameters":[
                {"func": "(Function) Function to make awaitable"},
                {"context": "(any) Context to use to execute func."},
                {"callbackIndex": "(Integer) Index of callback argument."},
                {"returnIndex": "(Integer) Index of callback argument."}]}],

        "url": "http://www.craydent.com/library/1.9.3/docs#awaitable",
        "returnType": "(Promise<any>)"
    }|*/
    return yieldable<T>(value as any, context, callbackIndex, returnIndex)
}