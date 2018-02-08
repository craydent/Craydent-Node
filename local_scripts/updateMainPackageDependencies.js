#!/usr/bin/env node
/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.8.2                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/

var root = require.resolve('../package.json').replace('/package.json','');
var pkg = require(root + '/package.json');
var fs = require('fs');
var prefix = "@craydent/";
pkg.name = prefix + "craydent";

if (process.argv[3] == "public"){
    pkg.name = "craydent";
}

if (process.argv[2] == "publish") {
	pkg.dependencies = {};
    pkg.dependencies[prefix + "craydent-array"] = pkg.version,
    pkg.dependencies[prefix + "craydent-class"] = pkg.version,
    pkg.dependencies[prefix + "craydent-cli"] = pkg.version,
    pkg.dependencies[prefix + "craydent-control-flow"] = pkg.version,
    pkg.dependencies[prefix + "craydent-date"] = pkg.version,
    pkg.dependencies[prefix + "craydent-fs"] = pkg.version,
    pkg.dependencies[prefix + "craydent-function"] = pkg.version,
    pkg.dependencies[prefix + "craydent-http"] = pkg.version,
    pkg.dependencies[prefix + "craydent-json-parser"] = pkg.version,
    pkg.dependencies[prefix + "craydent-number"] = pkg.version,
    pkg.dependencies[prefix + "craydent-object"] = pkg.version,
    pkg.dependencies[prefix + "craydent-regexp"] = pkg.version,
    pkg.dependencies[prefix + "craydent-string"] = pkg.version,
    pkg.dependencies[prefix + "craydent-template"] = pkg.version,
    pkg.dependencies[prefix + "craydent-typeof"] = pkg.version,
    pkg.dependencies[prefix + "craydent-utility"] = pkg.version,
    pkg.dependencies[prefix + "craydent-xml-to-json"] = pkg.version

} else {
	pkg.dependencies = {
        "@craydent/craydent-array": "file:./submodules/array",
        "@craydent/craydent-class": "file:./submodules/class",
        "@craydent/craydent-cli": "file:./submodules/cli",
        "@craydent/craydent-control-flow": "file:./submodules/control-flow",
        "@craydent/craydent-date": "file:./submodules/date",
        "@craydent/craydent-fs": "file:./submodules/fs",
        "@craydent/craydent-function": "file:./submodules/function",
        "@craydent/craydent-http": "file:./submodules/http",
        "@craydent/craydent-json-parser": "file:./submodules/json-parser",
        "@craydent/craydent-number": "file:./submodules/number",
        "@craydent/craydent-object": "file:./submodules/object",
        "@craydent/craydent-regexp": "file:./submodules/regexp",
        "@craydent/craydent-string": "file:./submodules/string",
        "@craydent/craydent-template": "file:./submodules/template",
        "@craydent/craydent-typeof": "file:./submodules/typeof",
        "@craydent/craydent-utility": "file:./submodules/utility",
        "@craydent/craydent-xml-to-json": "file:./submodules/xml-to-json"
    }
}
try { fs.unlinkSync(base + folder + "/package.json"); } catch (e) { /*console.log(e);*/ }
fs.writeFileSync(root + '/package.json',JSON.stringify(pkg, null, 4));