import error from '../methods/error';
import logit from '../methods/logit';

export default function catchAll(callback: NodeJS.UncaughtExceptionListener, append?: boolean): void {
    /*|{
        "info": "Creates an catch all for exceptions in the current node service.",
        "category": "Utility",
        "featured": true,
        "parameters":[
            {"callback": "(ErrorCallback) Callback function to call when there is an uncaught exception"},
            {"append?": "(Boolean) Options to defer, ignore case, etc"}],

        "overloads":[],

        "desciption": "This method will create, add, or replace catch all listeners.  If called multiple times with the same callback, the listener is preserved and not added unless the append argument is set to true.",

        "url": "http://www.craydent.com/library/1.9.3/docs#$PUT",
        "returnType": "(void)"
    }|*/
    try {
        (catchAll as any).listeners = (catchAll as any).listeners || [];

        // if this callback exists
        let index = (catchAll as any).listeners.indexOf(callback.toString());

        if (!~index || append) {
            (catchAll as any).listeners.push(callback.toString());
            process.on('uncaughtException', callback);
            logit("listening for uncaught errors");
        }
    } catch (e) /* istanbul ignore next */ {
        error && error('catchAll', e);
    }
}