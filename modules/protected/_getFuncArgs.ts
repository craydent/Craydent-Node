/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.9.0                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
import error from '../methods/error';
import _generalTrim from './_generalTrim';
import strip from '../methods/strip';
import condense from '../methods/condense'

export default function _getFuncArgs(func: Function): any[] {
    try {
        return condense(_generalTrim(strip(func.toString(), '(')).replace(/\s*/gi, '').replace(/\/\*.*?\*\//g, '').replace(/.*?\((.*?)\).*/, '$1').split(',')) || [];
    } catch (e) {
        error && error('_getFuncArgs', e);
        return null
    }
}