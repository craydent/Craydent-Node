var fs = require('fs'),
	Craydent = require('../craydent'),
	instC = new Craydent({headers:{host:"",cookie:""},url:"",connection:{encrypted:""}}),
	ln = '\n\n',tab = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
	readme = "#Craydent\n**by Clark Inada**" + ln +ln,
	constants = "### Constants ###" + ln, methods = {},featured = {};
for (var o = 0; o < 2; o++) {
	var c = [$c, instC][o];
	for (var prop in c) {
		//console.log(prop);
		if (!c.hasOwnProperty(prop) || prop[0] == "_") {
			continue;
		}
		if (/^[A-Z_0-9]*$/.test(prop)) {
			constants += prop + ln;
			if ($c.isObject(c[prop])) {
				for (var subConstant in c[prop]) {
					if (!c[prop].hasOwnProperty(prop)) {
						continue;
					}
					constants += tab + subConstant + ln;
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
				obj[doc.category] += "### " + prop + " ###" + ln +
					tab+"**Info:** " + doc.info + ln +
					tab+"**Return:** " + doc.returnType + ln +
					tab+"**Parameters:**" + ln;

				var params = doc.parameters || [];
				var overloads = doc.overloads || [];
				obj[doc.category] += outParams(params);

				obj[doc.category] += tab+"**Overloads:**" + ln;
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
			out += tab+tab + variable + ": " + params[i][variable] + ln;
		}
	}
	return out || tab + tab + "None" + ln;
}

readme += constants + ln;
for (var prop in featured) {
	if (!featured.hasOwnProperty(prop)) { continue; }
	readme += featured[prop];
}
readme += ln;
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