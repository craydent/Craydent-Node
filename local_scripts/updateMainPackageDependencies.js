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
        pkg.dependencies[prefix + "craydent-array"] = "file:./submodules/array";
        pkg.dependencies[prefix + "craydent-class"] = "file:./submodules/class";
        pkg.dependencies[prefix + "craydent-cli"] = "file:./submodules/cli";
        pkg.dependencies[prefix + "craydent-control-flow"] = "file:./submodules/control-flow";
        pkg.dependencies[prefix + "craydent-date"] = "file:./submodules/date";
        pkg.dependencies[prefix + "craydent-fs"] = "file:./submodules/fs";
        pkg.dependencies[prefix + "craydent-function"] = "file:./submodules/function";
        pkg.dependencies[prefix + "craydent-http"] = "file:./submodules/http";
        pkg.dependencies[prefix + "craydent-json-parser"] = "file:./submodules/json-parser";
        pkg.dependencies[prefix + "craydent-number"] = "file:./submodules/number";
        pkg.dependencies[prefix + "craydent-object"] = "file:./submodules/object";
        pkg.dependencies[prefix + "craydent-regexp"] = "file:./submodules/regexp";
        pkg.dependencies[prefix + "craydent-string"] = "file:./submodules/string";
        pkg.dependencies[prefix + "craydent-template"] = "file:./submodules/template";
        pkg.dependencies[prefix + "craydent-typeof"] = "file:./submodules/typeof";
        pkg.dependencies[prefix + "craydent-utility"] = "file:./submodules/utility";
        pkg.dependencies[prefix + "craydent-xml-to-json"] = "file:./submodules/xml-to-json";
    }
    try { fs.unlinkSync(base + folder + "/package.json"); } catch (e) { /*console.log(e);*/ }
    fs.writeFileSync(root + '/package.json', JSON.stringify(pkg, null, 4));
}

module.exports.start = start;