import * as IEquals from '../methods/equals';
import * as INext from '../methods/next';
import * as IEmit from '../methods/emit';
import * as IExtend from '../methods/extend';
import * as IGetParameters from '../methods/getParameters';
import * as IGetName from '../methods/getName';
import * as IGetValue from '../methods/getValue';
import * as IToPromise from '../methods/toPromise';
import * as INamespace from '../methods/namespace';
import * as IThen from '../methods/then';
import * as ICatch from '../methods/catch';
import * as IOn from '../methods/on';
import { AnyObject } from '../models/Arrays';

import { scope } from '../private/__common';

if (typeof (global as any) == 'undefined'){
    (window as any).global = window;
}
scope.eval = str => eval(str);
//#region dependencies
const equals: typeof IEquals.default = require('../methods/equals').default;
const next: typeof INext.default = require('../methods/next').default;
const emit: typeof IEmit.default = require('../methods/emit').default;
const extend: typeof IExtend.default = require('../methods/extend').default;
const getName: typeof IGetName.default = require('../methods/getName').default;
const getParameters: typeof IGetParameters.default = require('../methods/getParameters').default;
const getValue: typeof IGetValue.default = require('../methods/getValue').default;
const toPromise: typeof IToPromise.default = require('../methods/toPromise').default;
const then: typeof IThen.default = require('../methods/then').default;
const catchit: typeof ICatch.default = require('../methods/catch').default;
const on: typeof IOn.default = require('../methods/on').default;
const namespace: typeof INamespace.default = require('../methods/namespace').default;
//#endregion

export function _equals(this: AnyObject, compare: AnyObject, props?: string[]): boolean;
export function _equals(this: any, compare: any): boolean;
export function _equals(compare, props?): boolean {

    /*|{
        "info": "Object class extension to check if object values are equal",
        "category": "Object",
        "parameters":[
            {"compare": "(any) Object to compare against"},
            {"props?": "(String[]) Array of property values to compare against"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.equals",
        "returnType": "(Bool)"
    }|*/
    return equals(this, compare, props);
}
export function _extend(this: Function, extendee: FunctionConstructor, inheritAsOwn?: boolean): Function {
    return extend(this as any, extendee, inheritAsOwn);
}
export function _getParameters(this: Function,): string[] {
    return getParameters(this);
}
export function _getName(this: Function): string {
    return getName(this);
}
export function _getValue(this: Function, args?: any[], dftl?: any): any {
    return getValue(this, args, dftl);
}
export function _on<T>(this: T, ev: string, func: Function): T {
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
    return on(this as any, ev, func) as any;
}
export function _toPromise(this: GeneratorFunction): Promise<any> {
    return toPromise(this);
}
export function _then(this: Function, callback: Function): Function {
    return then(this, callback);
}
export function _catch(this: Function, callback: Function): Function {
    return catchit(this, callback);
}
export { next, emit, namespace };
