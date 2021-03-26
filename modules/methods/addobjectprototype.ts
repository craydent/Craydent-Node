/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.9.0                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
import error from '../methods/error';
import isNull from '../methods/isnull';
import df from '../private/__defineFunction';

declare const $g: any;
const exceptions = { get: 1, set: 1 };

export default function addObjectPrototype(name: string, fn: Function, override?: boolean): void {
    /*|{
        "info": "Method to extend the Object Class",
        "category": "Object|Utility",
        "parameters":[
            {"name": "(String) name of the method to add"},
            {"fn": "(Function) method implementation"},
            {"override?": "(Bool) if true, override the previously defined prototype"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#addObjectPrototype",
        "returnType": "(void)"
    }|*/
    try {
        if (!(name in exceptions) && (isNull($g.__craydentNoConflict) || !$g.__craydentNoConflict)) {
            let shouldOverride = false;
            /* istanbul ignore else */
            if (eval(`typeof(${name})`) == "undefined") {
                shouldOverride = true;
            }
            (!override && (Object.prototype as any)[name]) || Object.defineProperty(Object.prototype, name, {
                writable: true,
                enumerable: false,
                configurable: true,
                value: fn
            } as PropertyDescriptor & ThisType<any>);
            override = shouldOverride;
        }
    } catch (e) {
        error && error("addPrototype", e);
        try {
            (Array.prototype as any)[name] = !override && (Array.prototype as any)[name] || fn;
            (Function.prototype as any)[name] = !override && (Function.prototype as any)[name] || fn;
            (String.prototype as any)[name] = !override && (String.prototype as any)[name] || fn;
            (Number.prototype as any)[name] = !override && (Number.prototype as any)[name] || fn;
            (Boolean.prototype as any)[name] = !override && (Boolean.prototype as any)[name] || fn;
            (Error.prototype as any)[name] = !override && (Error.prototype as any)[name] || fn;

            /* istanbul ignore else */
            // @ts-ignore
            if (typeof GeoLocation !== 'undefined') {
                // @ts-ignore
                (GeoLocation.prototype as any)[name] = !override && (GeoLocation.prototype as any)[name] || fn;
            }
        } catch (e) /* istanbul ignore next */ {
            error && error("addPrototype:Non-ECMAScript 5", e);
        }
    }
    return df(name, fn), void (0);
}