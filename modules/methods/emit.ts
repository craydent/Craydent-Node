import _runFuncArray from '../protected/_runFuncArray';
import isArray from '../methods/isarray';
const _isArray = isArray;

export default function emit(ev?: string, ...arg: any): any[] {
    /*|{
        "info": "Call the next function(s) in queue",
        "category": "Function|Array",
        "parameters":[
            {"event": "(String) Event to trigger."},
            {"...infinite": "(any) any number of arguments can be passed and will be applied to listening functions as arguments."}
        ],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#emit",
        "typeParameter": "<TResult>",
        "returnType":"(Array<TResult>)"
    }|*/
    let args: IArguments = arguments, vals = [];
    try {
        /* istanbul ignore else */
        if (!_isArray(args)) {
            args = [] as any;
            for (let prop in arguments) {
                args[prop] = arguments[prop];
            }
            args.callee = arguments.callee;
        }
        if (args.callee.caller['_emit']) {
            vals = vals.concat(_runFuncArray.call(this, args.callee.caller['_emit'], args));
        }
        if (ev && args.callee.caller[`_${ev}`]) {
            vals = vals.concat(_runFuncArray.call(this, args.callee.caller[`_${ev}`], (args as any).splice(1)));
        }
        return vals;
    } catch (e) {
        return e != 'catch' && _runFuncArray.call(this, arguments.callee.caller['_catch'], arguments);
    }
}