#!/usr/bin/env node
/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-vx.x.x                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
function start(prefix, publish) {
    var root = require.resolve('../package.json').replace('/package.json', '');
    var pkg = require(root + '/package.json');
    var fs = require('fs');
    pkg.name = prefix + "craydent";

    if (publish) {
        pkg.dependencies = {};
        pkg.dependencies[prefix + "craydent-array"] = pkg.version;
        pkg.dependencies[prefix + "craydent-class"] = pkg.version;
        pkg.dependencies[prefix + "craydent-cli"] = pkg.version;
        pkg.dependencies[prefix + "craydent-control-flow"] = pkg.version;
        pkg.dependencies[prefix + "craydent-date"] = pkg.version;
        pkg.dependencies[prefix + "craydent-fs"] = pkg.version;
        pkg.dependencies[prefix + "craydent-function"] = pkg.version;
        pkg.dependencies[prefix + "craydent-http"] = pkg.version;
        pkg.dependencies[prefix + "craydent-json-parser"] = pkg.version;
        pkg.dependencies[prefix + "craydent-number"] = pkg.version;
        pkg.dependencies[prefix + "craydent-object"] = pkg.version;
        pkg.dependencies[prefix + "craydent-regexp"] = pkg.version;
        pkg.dependencies[prefix + "craydent-string"] = pkg.version;
        pkg.dependencies[prefix + "craydent-template"] = pkg.version;
        pkg.dependencies[prefix + "craydent-typeof"] = pkg.version;
        pkg.dependencies[prefix + "craydent-utility"] = pkg.version;
        pkg.dependencies[prefix + "craydent-xml-to-json"] = pkg.version;

    } else {
        pkg.dependencies = {};
        pkg.dependencies[prefix + "craydent-array"] = "file:./compiled/transformedMajor/array";
        pkg.dependencies[prefix + "craydent-class"] = "file:./compiled/transformedMajor/class";
        pkg.dependencies[prefix + "craydent-cli"] = "file:./compiled/transformedMajor/cli";
        pkg.dependencies[prefix + "craydent-control-flow"] = "file:./compiled/transformedMajor/control-flow";
        pkg.dependencies[prefix + "craydent-date"] = "file:./compiled/transformedMajor/date";
        pkg.dependencies[prefix + "craydent-fs"] = "file:./compiled/transformedMajor/fs";
        pkg.dependencies[prefix + "craydent-function"] = "file:./compiled/transformedMajor/function";
        pkg.dependencies[prefix + "craydent-http"] = "file:./compiled/transformedMajor/http";
        pkg.dependencies[prefix + "craydent-json-parser"] = "file:./compiled/transformedMajor/json-parser";
        pkg.dependencies[prefix + "craydent-number"] = "file:./compiled/transformedMajor/number";
        pkg.dependencies[prefix + "craydent-object"] = "file:./compiled/transformedMajor/object";
        pkg.dependencies[prefix + "craydent-regexp"] = "file:./compiled/transformedMajor/regexp";
        pkg.dependencies[prefix + "craydent-string"] = "file:./compiled/transformedMajor/string";
        pkg.dependencies[prefix + "craydent-template"] = "file:./compiled/transformedMajor/template";
        pkg.dependencies[prefix + "craydent-typeof"] = "file:./compiled/transformedMajor/typeof";
        pkg.dependencies[prefix + "craydent-utility"] = "file:./compiled/transformedMajor/utility";
        pkg.dependencies[prefix + "craydent-xml-to-json"] = "file:./compiled/transformedMajor/xml-to-json";
    }
    try { fs.unlinkSync(base + folder + "/package.json"); } catch (e) { /*console.log(e);*/ }
    fs.writeFileSync(root + '/package.json', JSON.stringify(pkg, null, 4));
}

module.exports.start = start;