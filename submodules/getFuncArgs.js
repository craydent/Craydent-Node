/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.9.0                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var _general_trim = require('./general_trim');
var error = require('./error');
var strip = require('./strip');
var condense = require('./condense');
function _getFuncArgs (func) {
    try {
        return condense(_general_trim(strip(func.toString(), '(')).replace(/\s*/gi, '').replace(/\/\*.*?\*\//g,'').replace(/.*?\((.*?)\).*/, '$1').split(',')) || [];
    } catch (e) {
        error('_getFuncArgs', e);
    }
}
module.exports = _getFuncArgs;