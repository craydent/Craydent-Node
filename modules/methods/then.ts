import error from './error';
import on from './on';

export default function then(func: Function, callback: Function): Function {
    /*|{
        "info": "Function listener to register the then event",
        "category": "Function",
        "parameters":[
            {"func":"(Function) Function to add listener"},
            {"callback":"(Function) Function to call on emit"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#function.then",
        "returnType": "(Function)"
    }|*/
    try {
        return on(func, 'then', callback);
    } catch (e) /* istanbul ignore next */ {
        error && error("Function.then", e);
    }
}