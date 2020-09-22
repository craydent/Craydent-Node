/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.9.0                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
require('${prefix}craydent-array');
require('${prefix}craydent-class');
require('${prefix}craydent-cli');
require('${prefix}craydent-control-flow');
require('${prefix}craydent-date');
require('${prefix}craydent-fs');
require('${prefix}craydent-function');
require('${prefix}craydent-http');
require('${prefix}craydent-json-parser');
require('${prefix}craydent-number');
require('${prefix}craydent-object');
require('${prefix}craydent-regexp');
require('${prefix}craydent-string');
require('${prefix}craydent-template');
require('${prefix}craydent-typeof');
require('${prefix}craydent-utility');
require('${prefix}craydent-xml-to-json');

JSON.parseAdvanced = $c.parseAdvanced;
JSON.stringifyAdvanced = $c.stringifyAdvanced;

module.exports = $c;