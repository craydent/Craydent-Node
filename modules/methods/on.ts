import error from './error';

export default function on<T>(obj: T, ev: string, func: Function): T {
    /*|{
        "info": "Function listener to register events",
        "category": "Function",
        "parameters":[
            {"event":"(String) Event to listen on and invoked on emit"},
            {"func":"(Function) Function to call on emit"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#function.on",
        "returnType": "(Function)"
    }|*/
    try {
        const eventName = `_${ev}`;
        obj[eventName] = obj[eventName] || [];
        obj[eventName].push(func);
        return obj;
    } catch (e) {
        error && error("Function.on", e);
        return null;
    }
}
