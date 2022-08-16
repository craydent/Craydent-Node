import error from '../methods/error';

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
        (obj as any)[eventName] = (obj as any)[eventName] || [];
        (obj as any)[eventName].push(func);
        return obj;
    } catch (e) /* istanbul ignore next */ {
        error && error("Function.on", e);
        return null as any;
    }
}
