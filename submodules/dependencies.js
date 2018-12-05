/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.9.0                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/

module.exports.primary = {
    "array": [
        "_add_to_index",
        "_remove_from_index",
        "contains",
        "count",
        "date",
        "emit",
        "getKeys",
        "getValue",
        "insertAt",
        "isSubset",
        "on",
        "parallelEach",
        "parseBoolean",
        // "rand",
        "remove",
        "removeAll",
        "removeAt",
        "toSet",
        "universal_trim",
        "where"
    ],
    "class": [
        "orderedlist",
        "removeAll",
        "toSet"
    ],
    "cli": [
        "logit",
        "parseBoolean"/*,
        "removeAll",
        "removeAt",
        "toSet"*/
    ],
    "control-flow": ["insertAt", "parallelEach"],
    "date": ["date", "getValue"],
    "fs": [
        "parallelEach",
        "mkdirRecursive",
        "relativePathFinder",
        "requireDirectory",
        "include"
    ],
    "function": ["emit", "getValue", "on", "namespace", "run_func_array"],
    "http":[
        "fillTemplate",
        "include",
        "isValidDate",
        "itemCount",
        "logit",
        "mkdirRecursive",
        "parseBoolean",
        "where"
    ],
    "json-parser": [
        "clearCache",
        "fillTemplate",
        "include",
        "relativePathFinder"
    ],
    "number": ["contains", "getValue", /*"rand",*/ "toCurrencyNotation"],
    "object": [
        "contains",
        "count",
        "eachProperty",
        "getKeys",
        "getValue",
        "isSubset",
        "itemCount",
        "keyOf",
        "toStringAlt",
        "where"
    ],
    "regexp": ["addFlags", "getValue"],
    "string": [
        "addFlags",
        "contains",
        "count",
        "cut",
        "date",
        "getValue",
        "fillTemplate",
        "keyOf",
        "toCurrencyNotation",
        "universal_trim"],
    "template": ["fillTemplate"],
    "typeof": ["itemCount"],
    "utility": [
        "clearCache",
        "date",
        "include",
        "logit",
        "namespace",
        "parseBoolean",
        "mkdirRecursive",
        "relativePathFinder",
        "requireDirectory",
        "run_func_array",
        "toStringAlt"],
    "xml-to-json": ["fillTemplate"]
};
module.exports.secondary = {
    // "addFlags": [],
    // "average": [],
    // "clearCache": [],
    "contains": ['_contains_comparisons'],
    "count": ["where"],
    "date": ["keyOf", "isValidDate"],
    "emit": ["run_func_array"],
    "fillTemplate": ["addFlags", "count", "cut", "eachProperty", "orderedlist", "removeAt", "startsWithAny"],
    // "getKeys": [],
    // "getValue": [],
    "include": ["clearCache","relativePathFinder", "startsWithAny"],
    "insertAt": ["_add_to_index"],
    "isSubset": ["contains"],
    // "keyOf": [],
    // "logit": [],
    "mkdirRecursive": ["startsWithAny"],
     "on": ["emit"],
    // "orderedlist": [],
    // "parallelEach": [],
    // "parseBoolean": [],
    // "rand": [],
    // "relativePathFinder": [],
    "requireDirectory": ["parallelEach", "relativePathFinder", "startsWithAny"],
    "remove": ["_remove_from_index"],
    "removeAll": ["remove"],
    "removeAt": ["_remove_from_index"],
    // "run_func_array": [],
    // "startsWithAny": [],
    "stdev": ["average"],
    // "toCurrencyNotiation": [],
    "toSet": ["removeAt"],
    "universal_trim": [],
    "where":[
        "_contains_comparisons",
        "average",
        "contains",
        "date",
        "getValue",
        // "getKeys",
        "isSubset",
        "parseBoolean",
        "removeAt",
        "stdev",
        "toSet"
    ]
};
var cpkg = require('../package.json');
var version = cpkg.version;
var spaces = 37 - version.length;
var meta = "/*/---------------------------------------------------------/*/\n\
    /*/ Craydent LLC node-v" + version + "";
for (var i = 0; i < spaces; i++) { meta += " "; }
meta += "/*/\n\
/*/ Copyright 2011 (http://craydent.com/about)              /*/\n\
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/\n\
/*/ (http://craydent.com/license)                           /*/\n\
/*/---------------------------------------------------------/*/\n\
/*/---------------------------------------------------------/*/\n";
module.exports.meta = meta;
// module.exports = function (ctx) {\n",
    // post_text = "};";
module.exports.details = {
    "array": {
        "description": "Node module to extend array functionality and simplify code for maintainability and readability",
        "keywords": [
            "mongo",
            "mongodb"
        ]
    },
    "class": {
        "description": "Node module implementing addition classes for functionality and to simplify code for maintainability and readability",
        "keywords": [
            "array",
            "cursor",
            "benchmark",
            "ordered list",
            "queue",
            "set"
        ]
    },
    "cli": {
        "description": "Node module to manage command line execution and arguments",
        "keywords": [
            "commander"
        ]
    },
    "control-flow": {
        "description": "Node module for control flow and async functionality to simplify code for maintainability and readability",
        "keywords": []
    },
    "date": {
        "description": "Node module to extend fs/file system functionality and simplify code for maintainability and readability",
        "keywords": [
            "moment",
            "parser"
        ]
    },
    "fs": {
        "description": "Node module to extend fs functionality and simplify code for maintainability and readability",
        "keywords": [
            "require",
            "require directory",
            "file"
        ]
    },
    "function": {
        "description": "Node module to extend function functionality and simplify code for maintainability and readability",
        "keywords": [
            "control flow"
        ]
    },
    "http":{
        "description": "Node module http servers and routing",
        "keywords": [
            "ajax",
            "express",
            "http",
            "json",
            "koa",
            "parser",
            "REST",
            "route",
            "swagger"
        ]
    },
    "json-parser": {
        "description": "Node module to parse complex json including circular references",
        "keywords": [
            "json",
            "object",
            "parser",
            "string"
        ]
    },
    "number": {
        "description": "Node module to extend number functionality and simplify code for maintainability and readability",
        "keywords": []
    },
    "object": {
        "description": "Node module to extend all native class functionality and simplify code for maintainability and readability",
        "keywords": [
            "array",
            "class",
            "co",
            "control flow",
            "date",
            "function",
            "json",
            "moment",
            "mongo",
            "mongodb",
            "number",
            "object",
            "regexp",
            "string",
            "template",
            "typeof"
        ]
    },
    "regexp": {
        "description": "Node module to extend regular expressions functionality and simplify code for maintainability and readability",
        "keywords": []
    },
    "string": {
        "description": "Node module to extend string functionality and simplify code for maintainability and readability",
        "keywords": [
            "template",
        ]
    },
    "template": {
        "description": "Node module for templating to simplify code for maintainability and readability",
        "keywords": []
    },
    "typeof": {
        "description": "Node module for type checking",
        "keywords": []
    },
    "utility": {
        "description": "Node module to for commonly needed utility functions",
        "keywords": [
            "ajax",
            "cluster",
            "guid",
            "uuid",
            "md5",
            "fs",
            "mkdir",
            "zip"
        ]
    },
    "xml-to-json": {
        "description": "Node module to parse xml into json",
        "keywords": [
            "xml",
            "xml to json"
        ]
    }
}