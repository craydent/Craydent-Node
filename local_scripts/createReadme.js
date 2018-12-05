#!/usr/bin/env node
/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-vx.x.x                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/

var root = require.resolve('../package.json').replace('/package.json','');
var mod = root;
var name = "craydent";
var RED = '\x1b[31m%s\x1b[0m';
var GREEN = '\x1b[32m%s\x1b[0m';
var YELLOW = '\x1b[33m%s\x1b[0m';
var exclude = [];
var categories = [
    'Constants',
    'Featured',
    "Array",
    "Class",
    "CLI",
    "Control Flow",
    "Date",
    "FS",
    "Function",
    "HTTP",
    "JSON Parser",
    "Number",
    "Object",
    "RegExp",
    "String",
    "Template",
    "TypeOf",
    "Utility",
    "XML to JSON"
];
var categories_map = {
	"array": "Array",
	"class": "Class",
	"cli": "CLI",
	"control-flow": "Control Flow",
	"date": "Date",
	"fs": "FS",
	"function": "Function",
	"http": "HTTP",
	"json-parser": "JSON Parser",
	"number": "Number",
	"object": "Object",
	"regexp": "RegExp",
	"string": "String",
	"template": "Template",
	"typeof": "TypeOf",
	"utility": "Utility",
	"xml-to-json": "XML to JSON"
};
// if (process.argv[2] == "publish" && process.argv[3]) {
var modName = "";
if (process.argv[2]) {
	modName = process.argv[2].substring(process.argv[2].lastIndexOf('/') + 1);
	if (categories_map[modName]) {
		categories = ['Constants','Featured'];
		mod = root + process.argv[2];
		name += "-" + modName;
		categories.push(categories_map[modName]);
	}
}
// console.log(require(mod),mod);
var $c = require(mod + '/noConflict');
var $arr = require(root + '/submodules/array/noConflict');
var $cls = require(root + '/submodules/class/noConflict');
var $str = require(root + '/submodules/string/noConflict');
var $typ = require(root + '/submodules/typeof/noConflict');
var $utl = require(root + '/submodules/utility/noConflict');
var fs = require('fs'),
	// Craydent = require(mod),
	instC,
	ln = '\n\n',tab = '>',tab2 = "",
	readme = "<img src=\"http://craydent.com/JsonObjectEditor/img/svgs/craydent-logo.svg\" width=75 height=75/>" + ln +
		"# Craydent " + $c.VERSION + "\n**by Clark Inada**" + ln,
	constants = {}, properties = {}, methods = {},featured = {},
	orderedFeatured = new $cls.OrderedList(),
	orderedMethods = new $cls.OrderedList(),
	orderedConstants = new $cls.OrderedList(),
	orderedHttpProps = new $cls.OrderedList(),
	isHTTP = name == "craydent-http";
readme += "Craydent is all inclusive utility library.  There are several ways to use the library in NodeJS.\n" +
	"More detailed documentation on constants can be found at [Craydent Properties](http://www.craydent.com/JsonObjectEditor/docs.html#/property/CraydentNode).\n" +
	"More detailed documentation on methods can be found at [Craydent Methods](http://www.craydent.com/JsonObjectEditor/docs.html#/method/CraydentNode)" + ln +
	"```js\n" +
	"// require with prototypes - this require will add prototypes to extend classes and add two constants ($c, $g) to the global space.\n" +
	"// $g is an alias to global and $c is the constant containing all the utility methods and properties.\n" +
	"require('" + name + "');\n" +
	"$c.logit($c.VERSION);\n" +
	"arr.prototypedMethod(args);\n" +
	"```" + ln +
	"```js\n" +
	"// require no conflict - this require is the fully modular version with no global constants, prototypes, or methods.\n" +
	"var $c = require('" + name + "/noConflict');\n" +
	"$c.logit($c.VERSION);\n" +
	"$c.prototypedMethod(arr, args);\n" +
	"```" +ln +
	"```js\n" +
	"// require global - this require constants and methods in the global space and add prototypes to extend classes.\n" +
	"// $g is an alias to global and $c is the constant containing all the utility methods and properties.\n" +
	"require('" + name + "/global');\n" +
	"logit($c.VERSION);\n" +
	"arr.prototypedMethod(args);\n" +
	"```" +
	ln;
try {
	if (isHTTP) {
		categories.splice(1,0,"Properties");
		instC = new $c.context({headers:{host:"",cookie:""},url:"",connection:{encrypted:""}});
		readme += "Note: All methods and properties defined in the http module must be used as a property of the context (this) within the createServer callback method.\n\n"+
			"Craydent is all inclusive utility library.  There are several ways to use the library in NodeJS.\n" +
			"More detailed documentation on constants can be found at [Craydent Properties](http://www.craydent.com/JsonObjectEditor/docs.html#/property/CraydentNode).\n" +
			"More detailed documentation on methods can be found at [Craydent Methods](http://www.craydent.com/JsonObjectEditor/docs.html#/method/CraydentNode)" + ln +
			"```js\n" +
			"// require with prototypes - this require will add prototypes to extend classes and add two constants ($c, $g) to the global space.\n" +
			"// $g is an alias to global and $c is the constant containing all the utility methods and properties.\n" +
			"require('" + name + "');\n" +
			"$c.createServer(function(req, res){ this.$GET(); });\n" +
			"```" + ln +
			"```js\n" +
			"// require no conflict - this require is the fully modular version with no global constants, prototypes, or methods.\n" +
			"var $c = require('" + name + "/noConflict');\n" +
			"$c.createServer(function(req, res){ this.$GET(); });\n" +
			"```" +ln +
			"```js\n" +
			"// require global - this require constants and methods in the global space and add prototypes to extend classes.\n" +
			"// $g is an alias to global and $c is the constant containing all the utility methods and properties.\n" +
			"require('" + name + "/global');\n" +
			"createServer(function(req, res){ this.$GET(); });\n" +
			"```" +
			ln;
	}
}
catch (e) { console.log(RED, e); }
/*
readme += "Craydent is all inclusive utility library.  There are several ways to use the library in NodeJS.\n" +
	"More detailed documentation on constants can be found at [Craydent Properties](http://www.craydent.com/JsonObjectEditor/docs.html#/property/CraydentNode).\n" +
	"More detailed documentation on methods can be found at [Craydent Methods](http://www.craydent.com/JsonObjectEditor/docs.html#/method/CraydentNode)" + ln +
	"```js\n" +
	"// require with prototypes - this require will add prototypes to extend classes and add two constants ($c, $g) to the global space.\n" +
	"// $g is an alias to global and $c is the constant containing all the utility methods and properties.\n" +
	"require('craydent');\n" +
	"$c.logit($c.VERSION);\n" +
	"var arr = [{name:'craydent'},{name:'is awesome!'}];\n" +
	"arr.where({name:'craydent'});\n" +
	"```" + ln +
	"```js\n" +
	"// require no conflict - this require is the fully modular version with no global constants, prototypes, or methods.\n" +
	"var $c = require('craydent/noConflict');\n" +
	"$c.logit($c.VERSION);\n" +
	"var arr = [{name:'craydent'},{name:'is awesome!'}];\n" +
	"$c.where(arr, {name:'craydent'});\n" +
	"```" +ln +
	"```js\n" +
	"// require global - this require constants and methods in the global space and add prototypes to extend classes.\n" +
	"// $g is an alias to global and $c is the constant containing all the utility methods and properties.\n" +
	"require('craydent/global');\n" +
	"logit($c.VERSION);\n" +
	"var arr = [{name:'craydent',descr:'is fantastic'},{name:'nodejs'}];\n" +
	"arr.where({name:'craydent'});\n" +
	"```" +
	ln;
*/

// fill ordered arrays
for (var o = 0; o < 2; o++) {
	var c = [$c, instC][o];
	if (!c) { continue; }
	for (var prop in c) {
		//console.log(prop);
		if (!c.hasOwnProperty(prop) || prop[0] == "_") { continue; }
		// constants
		if (/^[A-Z_0-9]*$/.test(prop) && !(prop in {"CLI":1,"JSONPA":1,"JSONSA":1})) {
			if ($arr.contains(orderedConstants,prop)) { continue; }
			orderedConstants.add(prop);
			constants[prop] = $typ.isNull(constants[prop], "");
			constants[prop] += prop + ' ('+ ($utl.getProperty(c, prop+'.constructor.name') || 'String') +')';
		// methods
		} else if ($typ.isFunction(c[prop])) {
			var fstr = c[prop].toString(),
				code = $str.replace_all(fstr,['\n','\\n','\t','\\t'], '').replace(/.*\/\*\|(.*)?\|\*\/.*/, '$1'),
				doc = $utl.tryEval(code);
			if (doc && $typ.isObject(doc)) {
				var obj = methods, ordered = orderedMethods;
				if (doc.featured) {
					obj = featured;
					ordered = orderedFeatured;
				}
				prop = 'p' + prop;
				if ($arr.contains(ordered,prop)) { continue; }
				ordered.add(prop);

				var params = doc.parameters || [];
				var overloads = doc.overloads || [];

				var categs = doc.category.split('|');
				for (var k = 0, klen = categs.length; k < klen; k++) {
					obj[categs[k]] = obj[categs[k]] || {};
					obj[categs[k]][prop] = obj[categs[k]][prop] || "";
					obj[categs[k]][prop] += "*** \n#### _" + prop.substring(1) + "_ \n***" + ln +
						"**Info:** " + doc.info + ln +
						"**Return:** " + doc.returnType + ln +
						"**Parameters:**" + ln;

					obj[categs[k]][prop] += outParams(params);

					obj[categs[k]][prop] += "**Overloads:**" + ln;

					for (var i = 0, len = overloads.length; i < len; i++) {
						// obj[categs[k]][prop] += (i+1) + ")" + ln;
						obj[categs[k]][prop] += ">Parameters\n";
						obj[categs[k]][prop] += outParams(overloads[i].parameters);
					}
					if (!overloads.length) { obj[categs[k]][prop] += outParams([]); }
				}
			} else if (!doc && prop != "format") {
				try {
					code = $str.replace_all(fstr.replace(/\/\*[\s\S]*?\*\//g,'').replace(/\/\/[\s\S]*?\n/g,''),['\n','\\n','\t','\\t'], '').replace(/.*\/\*\|(.*)?\|\*\/.*/, '$1');

					eval("(" + code + ")");
				} catch (e) {
					console.error("Failed on " + modName + ":" + prop);
					console.error(e, code);
				}
			}
		} else if (!(prop in {info:1,scope:1,context:1})) {
			if (isHTTP) {
				if ($arr.contains(orderedHttpProps,prop)) { continue; }
				orderedHttpProps.add(prop);
				var type = "Object";
				if (prop == "sessionid") {
					type = 'String';
				}
				properties[prop] = $typ.isNull(properties[prop], "");
				properties[prop] += prop + ' ('+ ($utl.getProperty(c, prop+'.constructor.name') || type) +')';
			} else {
				// console.log("<"+c[prop]+">", prop,"is not a method");
				console.log(RED, $typ.isFunction(c[prop]));
			}
		}
	}
}
function outParams (params) {
	params = params || [];
	var out = "";
	for (var j = 0, jlen = params.length; j < jlen; j++) {
		for (var variable in params[j]) {
			if (!params[j].hasOwnProperty(variable)) { continue; }
			out += ">* " + variable + ": " + params[j][variable] + '\n';
		}
	}
	out && (out += '\n');
	return out || (">None" + ln);
}

if (!orderedConstants.length) { exclude.push('Constants'); }
if (!orderedFeatured.length || modName && !featured[categories_map[modName]]) { exclude.push('Featured'), orderedFeatured.length = 0; }
if (!orderedHttpProps.length) { exclude.push('HTTP'); }

// Table of Contents
readme += "## Categories" + ln;
for (var i = 0, len = categories.length; i < len; i++) {
	if (~exclude.indexOf(categories[i])) { continue; }
	readme += "* [" + categories[i] + "](#markdown-header-" + categories[i].toLowerCase().replace(/\s/g, '-') + ")\n";
};
readme += '\n';

// Constants ----------------------------------------------------------------------------------------------
if (orderedConstants.length) {
	readme += "<a name='markdown-header-constants'></a>\n## Constants" + ln;
	var grid = [], headerdiv = [], headers = [], cols = 3;
	for (var i = 0, len = orderedConstants.length, grid_row_count = Math.ceil(len/cols); i < len; i++) {
		var index = parseInt(i%grid_row_count), hindex = parseInt(i/grid_row_count);
		if (!headerdiv[hindex]) { headerdiv[hindex] = "| ----- "; headers[hindex] = "| "}
		grid[index] = grid[index] || "";
		grid[index] += constants[orderedConstants[i]] + " |";
		//readme += constants[orderedConstants[i]];
	}
	readme += headers.join('') + "|\n" + headerdiv.join('') + "|\n| " + grid.join('\n') + ln;
}
// Constants end ------------------------------------------------------------------------------------------

// Properties ----------------------------------------------------------------------------------------------
if (orderedHttpProps.length) {
	readme += "<a name='markdown-header-properties'></a>\n## Properties" + ln;
	var grid = [], headerdiv = [], headers = [], cols = 3;
	for (var i = 0, len = orderedHttpProps.length, grid_row_count = Math.ceil(len/cols); i < len; i++) {
		var index = parseInt(i%grid_row_count), hindex = parseInt(i/grid_row_count);
		if (!headerdiv[hindex]) { headerdiv[hindex] = "| ----- "; headers[hindex] = "| "}
		grid[index] = grid[index] || "";
		grid[index] += properties[orderedHttpProps[i]] + " |";
	}
	readme += headers.join('') + "|\n" + headerdiv.join('') + "|\n| " + grid.join('\n') + ln;
}
// Properties end ------------------------------------------------------------------------------------------

// Featured -----------------------------------------------------------------------------------------------
if (orderedFeatured.length) {
	readme += "<a name='markdown-header-featured'></a>\n## Featured" + ln;
	//for (var prop in featured) {
	//	if (!featured.hasOwnProperty(prop)) { continue; }
	for (var i = 0, len = categories.length; i < len; i++) {
		var category = categories[i];
		if (category in {Featured:1,Constants:1}) { continue; }
		if (featured[category]) {
			readme += "### " + category + ln;
		}
		for (var f = 0, flen = orderedFeatured.length; f < flen; f++) {
			if (featured[category] && featured[category][orderedFeatured[f]]) {
				readme += featured[category][orderedFeatured[f]];
			}
		}
	}
}
// Featured end -------------------------------------------------------------------------------------------

// Method -------------------------------------------------------------------------------------------------
readme += !orderedFeatured.length ? '\n' :ln;
readme += "## Methods" + ln;
//for (var prop in methods) {
//	if (!methods.hasOwnProperty(prop)) { continue; }
for (var i = 0, len = categories.length; i < len; i++)
{
	var category = categories[i];
	if (category in {Featured:1,Constants:1}) { continue; }
	if (methods[category]) {
		readme += "<a name='markdown-header-" + category.toLowerCase().replace(/\s/g, '-') + "'></a>\n## " + category + ln;
	}
	for (var m = 0, mlen = orderedMethods.length; m < mlen; m++) {
		if (methods[category] && methods[category][orderedMethods[m]]) {
			readme += methods[category][orderedMethods[m]];
		}
	}
}
// Method end ---------------------------------------------------------------------------------------------

readme += '\n\n\n## Download\n\n' +
' * [GitHub](https://github.com/craydent/node-library)\n' +
' * [BitBucket](https://bitbucket.org/craydent/node-library)\n' +
' * [GitLab](https://gitlab.com/craydent/node-library)\n\n' +
'Craydent is released under the [Dual licensed under the MIT or GPL Version 2 licenses](http://craydent.com/license).<br>';

fs.writeFile(mod + "/readme.md", readme, function(err) {
	if(err) {
		return console.log(RED, err),process.exit(1);;
	}

	console.log(GREEN, `saved: ${mod.replace(root,'')}/readme.md`);
	process.exit(0);
});