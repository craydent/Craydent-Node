/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.9.0                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
/// <reference path="./globalTypes/global.vars.d.ts" />
/// <reference types="node" />
import '${prefix}craydent-array';
import '${prefix}craydent-class';
import '${prefix}craydent-cli';
import '${prefix}craydent-control-flow';
import '${prefix}craydent-date';
import '${prefix}craydent-fs';
import '${prefix}craydent-function';
import '${prefix}craydent-http';
import '${prefix}craydent-json-parser';
import '${prefix}craydent-logger';
import '${prefix}craydent-number';
import '${prefix}craydent-object';
import '${prefix}craydent-regexp';
import '${prefix}craydent-string';
import '${prefix}craydent-template';
import '${prefix}craydent-typeof';
import '${prefix}craydent-utility';
import '${prefix}craydent-xml-to-json';

/* type defs */

(JSON as any).parseAdvanced = ($c as any).parseAdvanced;
(JSON as any).stringifyAdvanced = ($c as any).stringifyAdvanced;
module.exports = $c;