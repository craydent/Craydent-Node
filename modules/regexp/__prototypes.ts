import * as IAddFlags from '../methods/addFlags';
import * as IEquals from '../methods/equals';
import * as IGetValue from '../methods/getValue';
import {
    AnyObject
} from '../models/Arrays';

import { scope } from '../private/__common';

if (typeof (global as any) == 'undefined'){
    (window as any).global = window;
}
scope.eval = str => eval(str);
//#region dependencies
const addFlags: typeof IAddFlags.default = require('../methods/addFlags').default;
const equals: typeof IEquals.default = require('../methods/equals').default;
const getValue: typeof IGetValue.default = require('../methods/getValue').default;
//#endregion

export function _addFlags(this: RegExp, flags: string): RegExp {
    /*|{
        "info": "RegExp class extension to add flags to regex",
        "category": "RegExp",
        "parameters":[
            {"flags": "(String) Flags to add"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#regexp.addFlag",
        "returnType": "(RegExp)"
    }|*/
    return addFlags(this, flags);
}
export function _equals(this: AnyObject, compare: AnyObject, props?: string[]): boolean;
export function _equals(this: any, compare: any): boolean;
export function _equals(compare, props?): boolean {
    /*|{
        "info": "Object class extension to check if object values are equal",
        "category": "Number|Object",
        "parameters":[
            {"compare": "(any) Object to compare against"},
            {"props?": "(String[]) Array of property values to compare against"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.equals",
        "returnType": "(Bool)"
    }|*/
    return equals(this, compare, props);
}

export function _getValue(this: RegExp, args?: any[], dflt?: any): any {
    return getValue(this as any, args, dflt);
}
