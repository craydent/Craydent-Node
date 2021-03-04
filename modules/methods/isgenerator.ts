import _typeCheck from '../protected/_typeCheck';
import isNull from '../methods/isnull';
import isAsync from '../methods/isasync';
import isPromise from '../methods/ispromise';

export default function isGenerator(obj: any): boolean {
    /*|{
        "info": "Object class extension to check if object is a generator function",
        "category": "Object|TypeOf",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.isGenerator",
        "returnType": "(Bool)"
    }|*/
    // return _typeCheck(obj, "GeneratorFunction", true);
    if (isNull(obj) || isAsync(obj) || isPromise(obj)) { return false; }
    const __generator = 'return __generator(this, function';
    if (~obj.toString().indexOf(__generator)) {
        return true;
    }
    return _typeCheck(obj, "GeneratorFunction", true);
}