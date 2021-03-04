/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.9.0                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
import error from '../methods/error';
import isArray from '../methods/isarray';
import isFunction from '../methods/isfunction';
import isNull from '../methods/isnull';
const _isFunction = isFunction,
    _isArray = isArray;

export default function getValue(obj: any, dflt?: any): any;
export default function getValue(obj: Function, args?: any[], dflt?: any): any;
export default function getValue(obj, args?, dflt?): any {
    /*|{
        "info": "Object class extension to retrieve value of an object property",
        "category": "Array|Object",
        "parameters":[],

        "overloads":[
            {"parameters":[
                {"default": "(any) Default value to return if context is not a function"}]},

            {"parameters":[
                {"arguments": "(any[]) An array of arguments to pass to context when it is a function"},
                {"default": "(any) Default value to return if context is not a function"}]}],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.getValue",
        "typeParameter": "<T>",
        "returnType": "(any) the value of any type.  if the type is a method, it will execute the methed and use its return value."
    }|*/
    try {
        if (!_isFunction(obj)) {
            if (args && !dflt) { dflt = args; }
            args = [obj];
            if (dflt !== undefined) { args.push(dflt); }
            return isNull.apply({}, args) || (_isArray(obj) ? obj : obj.constructor(obj));
        }
        let rtn = obj.apply(obj, args);
        return rtn === undefined ? dflt : rtn;
    } catch (e) /* istanbul ignore next */ {
        error && error(`${obj.constructor.name}.getValue`, e);
        return null;
    }
}
