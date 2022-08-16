import error from '../methods/error';
import on from '../methods/on';

export default function <T>(func: T, callback: Function): T {
    /*|{
        "info": "Function listener to register the catch event",
        "category": "Function",
        "parameters":[
            {"func":"(Function) Function to add listener"},
            {"callback":"(Function) Function to call on emit"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#function.catch",
        "returnType": "(Function)"
    }|*/
    try {
        return on<T>(func, 'catch', callback);
    } catch (e) /* istanbul ignore next*/ {
        error && error("Function.catch", e);
        return null as any;
    }
}