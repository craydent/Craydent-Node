/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.9.0                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
import error from './error';
import { AnyObject } from '../models/Arrays';
import { EachIterator } from '../models/EachIterator';

export default function eachProperty<T>(obj: AnyObject, callback: EachIterator<T>): void {
    try {
        for (let prop in obj) {
            /* istanbul ignore next */
            if (!obj.hasOwnProperty(prop)) { continue; }
            if (callback.call(obj, obj[prop], prop)) { break; }
        }
    } catch (e) /* istanbul ignore next */ {
        error && error('Object.eachProperty', e);
    }
}