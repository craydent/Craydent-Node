import isArray from '../methods/isArray';
import runFuncArray from '../methods/runFuncArray';

export default function next(...arg: any): void {
    /*|{
        "info": "Call the next function(s) in queue",
        "category": "Function",
        "parameters":[
            {"...infinite": "(any) any number of arguments can be passed."}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#next",
        "returnType":"(void)"
    }|*/
    let args = arguments;
    try {
        if (!isArray(args)) {
            args = [] as any;
            for (let prop in arguments) {
                args[prop] = arguments[prop];
            }
            args.callee = arguments.callee;
        }
        return runFuncArray.call(this, (arguments.callee.caller as any)._then, arguments);
    } catch (e) {
        return e != 'catch' && runFuncArray.call(this, arguments.callee.caller['_catch'], args.length == arguments.length ? (args as any).splice(1) : args);
    }
}