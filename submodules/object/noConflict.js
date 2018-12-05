/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.9.0                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
global.__craydentNoConflict = true;
var remove_globals = true;
var remove_navigator = !global.navigator;
if (global.$c && global.$c.name == 'Craydent') { remove_globals = false; }
var craydent = require('./index.js');
delete global.__craydentNoConflict;
if (remove_globals) {
	delete global.$c;
	remove_navigator && delete global.navigator;
}
module.exports = craydent;