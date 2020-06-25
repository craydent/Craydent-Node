/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.9.0                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
import error from './error';
import { AnyObject } from 'modules/models/Arrays';

export default function eachProperty<T>(obj: AnyObject, callback: (this: T, value: any, prop: string) => boolean) {
    try {
        for (let prop in obj) {
            if (!obj.hasOwnProperty(prop)) { continue; }
            if (callback.call(obj, obj[prop], prop)) { break; }
        }
    } catch (e) {
        error && error('Object.eachProperty', e);
    }
}