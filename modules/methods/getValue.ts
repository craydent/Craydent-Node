/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.9.0                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
import error from './error';
import isArray from './isArray';
import isFunction from './isFunction';
import isNull from './isNull';
const _isFunction = isFunction,
    _isArray = isArray;

export default function getValue(obj: Function | any, args?: any[], dflt?: any): any {
    try {
        if (!_isFunction(obj)) {
            if (args && !dflt) { dflt = args; }
            args = [obj];
            if (dflt !== undefined) { args.push(dflt); }
            return isNull.apply({}, args) || (_isArray(obj) ? obj : obj.constructor(obj));
        }
        let rtn = obj.apply(obj, args);
        return rtn === undefined ? dflt : rtn;
    } catch (e) {
        error && error(`${obj.constructor.name}.getValue`, e);
        return null;
    }
}
