/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.9.0                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
/// <reference path="./globalTypes/global.base.d.ts" />
/// <reference types="node" />

/* type defs */

(global as any).__craydentNoConflict = true;
var remove_globals = true;
var remove_navigator = !global.navigator;
if ((global as any).$c && (global as any).$c.name == 'Craydent') { remove_globals = false; }
var craydentNoConflict = require('./index.js');
delete (global as any).__craydentNoConflict;
if (remove_globals) {
	delete (global as any).$c;
	remove_navigator && delete global.navigator;
}
module.exports = craydentNoConflict;