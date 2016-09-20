/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.6.17                               /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
global.__craydentNoConflict = true;
var remove_globals = true;
if (global.$c && global.$c.name == 'Craydent') { remove_globals = false; }
var craydent = require('./craydent.js');
if (remove_globals) {
	delete global.__craydentNoConflict;
	delete global.$c;
	delete global.navigator;
}
module.exports = craydent;