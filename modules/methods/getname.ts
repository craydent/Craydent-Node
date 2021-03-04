import error from '../methods/error';
import _getFuncName from '../protected/_getFuncName';

export default function getName(fn: Function) {
    /*|{
        "info": "Function class extension to get the name of the function",
        "category": "Function",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#function.getName",
        "returnType": "(String)"
    }|*/
    try {
        return fn.name || _getFuncName(fn);
    } catch (e) /* istanbul ignore next */ {
        error && error("Function.getName", e);
    }
}