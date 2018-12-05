/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.9.0                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var pre = require('./package.json').name;
require(pre + '-array');
require(pre + '-class');
require(pre + '-cli');
require(pre + '-control-flow');
require(pre + '-date');
require(pre + '-fs');
require(pre + '-function');
require(pre + '-http');
require(pre + '-json-parser');
require(pre + '-number');
require(pre + '-object');
require(pre + '-regexp');
require(pre + '-string');
require(pre + '-template');
require(pre + '-typeof');
require(pre + '-utility');
require(pre + '-xml-to-json');

JSON.parseAdvanced = $c.parseAdvanced;
JSON.stringifyAdvanced = $c.stringifyAdvanced;

module.exports = $c;