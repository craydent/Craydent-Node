var fs = require('fs'), Craydent = require('../craydent'), instC = new Craydent({headers:{host:"",cookie:""},url:"",connection:{encrypted:""}}),
	readme = "#Craydent\n**by Clark Inada**\n\n", constants = "### Constants ###\n", methods = {},featured = {};
for (var o = 0; o < 2; o++) {
	var c = [$c, instC][o];
	for (var prop in c) {
		//console.log(prop);
		if (!c.hasOwnProperty(prop) || prop[0] == "_") {
			continue;
		}
		if (/^[A-Z_0-9]*$/.test(prop)) {
			constants += prop + "\n";
			if ($c.isObject(c[prop])) {
				for (var subConstant in c[prop]) {
					if (!c[prop].hasOwnProperty(prop)) {
						continue;
					}
					constants += "\t" + subConstant + "\n";
				}
			}
		} else if ($c.isFunction(c[prop])) {
			var fstr = c[prop].toString(),
				doc = Craydent.tryEval(fstr.replace_all('\n', '').replace(/.*\/\*\|(.*?)?\|\*\/.*/, '$1'));
			if (doc && c.isObject(doc)) {
				var obj = methods;
				if (doc.featured) {
					obj = featured;
				}
				obj[doc.category] = obj[doc.category] || "";
				obj[doc.category] += "### " + prop + " ###\n" +
					"\t**Info:** " + doc.info + "\n" +
					"\t**Return:** " + doc.returnType + "\n" +
					"\t**Parameters:**\n";

				var params = doc.parameters || [];
				var overloads = doc.overloads || [];
				obj[doc.category] += outParams(params);

				obj[doc.category] += "\t**Overloads:**\n";
				for (var i = 0, len = overloads.length; i < len; i++) {
					obj[doc.category] += outParams(overloads[i]);
				}
			} else {
				console.error("Failed on " + prop);
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
	for (var i = 0, len = params.length; i < len; i++) {
		for (var variable in params[i]) {
			if (!params[i].hasOwnProperty(variable)) { continue; }
			out += "\t\t" + variable + ": " + params[i][variable] + "\n";
		}
	}
	return out || "\t\tNone\n";
}

readme += constants + "\n";
for (var prop in featured) {
	if (!featured.hasOwnProperty(prop)) { continue; }
	readme += featured[prop];
}
readme += "\n";
for (var prop in methods) {
	if (!methods.hasOwnProperty(prop)) { continue; }
	readme += methods[prop];
}
console.log(methods);

fs.writeFile("../readme.md", readme, function(err) {
	if(err) {
		return console.log(err);
	}

	console.log("The file was saved!");
});