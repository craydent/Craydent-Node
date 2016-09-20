var fs = require('fs'),
	Craydent = require('../craydent'),
	instC = new Craydent({headers:{host:"",cookie:""},url:"",connection:{encrypted:""}}),
	ln = '\n\n',tab = '>',tab2 = "",
	readme = "<img src=\"http://craydent.com/JsonObjectEditor/img/svgs/craydent-logo.svg\" width=75 height=75/>" + ln +
		"# Craydent " + Craydent.VERSION + "\n**by Clark Inada**" + ln,
	constants = {}, methods = {},featured = {},
	orderedFeatured = new $c.OrderedList(),
	orderedMethods = new $c.OrderedList(),
	orderedConstants = new $c.OrderedList();
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
// Constants ----------------------------------------------------------------------------------------------
readme += "## Constants" + ln;
var grid = [], headerdiv = [], headers = [], cols = 4;
for (var i = 0, len = orderedConstants.length, grid_row_count = Math.ceil(len/cols); i < len; i++) {
	var index = parseInt(i%grid_row_count), hindex = parseInt(i/grid_row_count);
	if (!headerdiv[hindex]) { headerdiv[hindex] = "| ----- "; headers[hindex] = "| "}
	grid[index] = grid[index] || "";
	grid[index] += constants[orderedConstants[i]] + " |";
	//readme += constants[orderedConstants[i]];
}
readme += headers.join('') + "|\n" + headerdiv.join('') + "|\n| " + grid.join('\n') + ln;
// Constants end ------------------------------------------------------------------------------------------

// Featured -----------------------------------------------------------------------------------------------
readme += "## Featured" + ln;
//for (var prop in featured) {
//	if (!featured.hasOwnProperty(prop)) { continue; }
var categories = ['Global','Array','Date','Function','Module','Number','Object','RegExp','String'];
for (var i = 0, len = categories.length; i < len; i++) {
	var category = categories[i];
	if (featured[category]) {
		readme += "### " + category + ln;
	}
	for (var f = 0, flen = orderedFeatured.length; f < flen; f++) {
		if (featured[category] && featured[category][orderedFeatured[f]]) {
			readme += featured[category][orderedFeatured[f]];
		}
	}
}
// Featured end -------------------------------------------------------------------------------------------

// Method -------------------------------------------------------------------------------------------------
readme += ln;
readme += "##** Methods **##" + ln + "---" + ln;
//for (var prop in methods) {
//	if (!methods.hasOwnProperty(prop)) { continue; }
for (var i = 0, len = categories.length; i < len; i++)
{
	var category = categories[i];
	if (methods[category]) {
		readme += "## " + category + " ##" + ln;
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