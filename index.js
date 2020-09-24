/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.9.0                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
require('craydent-array');
require('craydent-class');
require('craydent-cli');
require('craydent-control-flow');
require('craydent-date');
require('craydent-fs');
require('craydent-function');
require('craydent-http');
require('craydent-json-parser');
require('craydent-number');
require('craydent-object');
require('craydent-regexp');
require('craydent-string');
require('craydent-template');
require('craydent-typeof');
require('craydent-utility');
require('craydent-xml-to-json');

JSON.parseAdvanced = $c.parseAdvanced;
JSON.stringifyAdvanced = $c.stringifyAdvanced;

module.exports = $c;