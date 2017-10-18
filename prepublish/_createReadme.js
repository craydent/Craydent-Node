#!/usr/bin/env node
/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.8.2                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/

var module = '../craydent';
var name = "craydent";
if (process.argv[2] == "publish" && process.argv[3]) {
	module = process.argv[3];
	name += "-" + module.substring(module.lastIndexOf('/') + 1);
}

var fs = require('fs'),
	Craydent = require(module),
	instC = new Craydent({headers:{host:"",cookie:""},url:"",connection:{encrypted:""}}),
	ln = '\n\n',tab = '>',tab2 = "",
	readme = "<img src=\"http://craydent.com/JsonObjectEditor/img/svgs/craydent-logo.svg\" width=75 height=75/>" + ln +
		"# Craydent " + Craydent.VERSION + "\n**by Clark Inada**" + ln,
	constants = {}, methods = {},featured = {},
	orderedFeatured = new $c.OrderedList(),
	orderedMethods = new $c.OrderedList(),
	orderedConstants = new $c.OrderedList();
var categories = ['Constants','Featured','Global','Array','Date','Function','Module','Number','Object','RegExp','String'];

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
// fill ordered arrays
for (var o = 0; o < 2; o++) {
	var c = [$c, instC][o];
	for (var prop in c) {
		//console.log(prop);
		if (!c.hasOwnProperty(prop) || prop[0] == "_") { continue; }
		// constants
		if (/^[A-Z_0-9]*$/.test(prop)) {
			if (orderedConstants.contains(prop)) { continue; }
			orderedConstants.add(prop);
			constants[prop] = constants[prop] || "";
			constants[prop] += prop + ' ('+ constants[prop].constructor.name +')';
		// methods
		} else if ($c.isFunction(c[prop])) {
			var fstr = c[prop].toString(),
				doc = Craydent.tryEval(fstr.replace_all('\n', '').replace(/.*\/\*\|(.*?)?\|\*\/.*/, '$1'));
			if (doc && c.isObject(doc)) {
				var obj = methods, ordered = orderedMethods;
				if (doc.featured) {
					obj = featured;
					ordered = orderedFeatured;
				}
				prop = 'p' + prop;
				if (ordered.contains(prop)) { continue; }
				ordered.add(prop);
				obj[doc.category] = obj[doc.category] || {};
				obj[doc.category][prop] = obj[doc.category][prop] || "";
				obj[doc.category][prop] += "*** \n#### _" + prop.substring(1) + "_ \n***" + ln +
					"**Info:** " + doc.info + ln +
					"**Return:** " + doc.returnType + ln +
					"**Parameters:**" + ln;

				var params = doc.parameters || [];
				var overloads = doc.overloads || [];
				obj[doc.category][prop] += outParams(params);

				obj[doc.category][prop] += "**Overloads:**" + ln;
				for (var i = 0, len = overloads.length; i < len; i++) {
					(obj[doc.category][prop] += (i+1) + ")" + ln);
					obj[doc.category][prop] += outParams(overloads[i].parameters);
				}
				if (!overloads.length) { obj[doc.category][prop] += outParams([]); }
			} else {
				console.error("Failed on " + prop.substring(1));
				try {
					eval("(" + fstr.replace_all('\n', '').replace(/.*\/\*\|(.*)?\|\*\/.*/, '$1') + ")");
				} catch (e) {
					console.error(e, fstr.replace_all('\n', '').replace(/.*\/\*\|(.*)?\|\*\/.*/, '$1').replace_all('\t', ''));
				}
			}
		} else {
			console.log(prop);
		}
	}
}
function outParams (params) {
	params = params || [];
	var out = "";
	for (var j = 0, jlen = params.length; j < jlen; j++) {
		for (var variable in params[j]) {
			if (!params[j].hasOwnProperty(variable)) { continue; }
			out += "* " + variable + ": " + params[j][variable] + '\n';
		}
	}
	out && (out += '\n');
	return out || ("* " + "None" + ln);
}

// Table of Contents
readme += "## Categories" + ln;
for (var i = 0, len = categories.length; i < len; i++) {
	readme += "* [" + categories[i] + "](#markdown-header-" + categories[i].toLowerCase() + ")\n";
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
readme += ln;
readme += "## Methods" + ln;
//for (var prop in methods) {
//	if (!methods.hasOwnProperty(prop)) { continue; }
for (var i = 0, len = categories.length; i < len; i++)
{
	var category = categories[i];
	if (category in {Featured:1,Constants:1}) { continue; }
	if (methods[category]) {
		readme += "<a name='markdown-header-" + category.toLowerCase() + "'></a>\n## " + category + ln;
	}
	for (var m = 0, mlen = orderedMethods.length; m < mlen; m++) {
		if (methods[category] && methods[category][orderedMethods[m]]) {
			readme += methods[category][orderedMethods[m]];
		}
	}
}
// Method end ---------------------------------------------------------------------------------------------

fs.writeFile("../readme.md", readme, function(err) {
	if(err) {
		return console.log(err);
	}

	console.log("The file was saved!");
	process.exit(1);
});