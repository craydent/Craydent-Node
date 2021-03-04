/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.9.0                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
/// <reference path="./globalTypes/global.vars.d.ts" />
/// <reference types="node" />

/* type defs */
var craydentGlobal = require('./index.js');
craydentGlobal.globalize();
module.exports = craydentGlobal;