var craydent = require('../craydent.js');
if(craydent.cuid().length != 36) {
	throw "cuid";
}
craydent.cout('hi');
bbc = [{arr:[{hi:"b"},{hi:"c"}],name:"operation"},{arr:[{hi:"b"},{hi:"c"}],name:"operation"}];
if (craydent.fillTemplate("<div>${name}<div>${foreach ${item} in ${arr}}${item.hi}8888${name}9999${end foreach}</div></div>",bbc) ==
		"<div>operation<div>b8888operation9999c8888operation9999</div></div><div>operation<div>b8888operation9999c8888operation9999</div></div>") {
	throw "fillTemplate";
}
console.log(craydent.foo);
if (!craydent.isNull(undefined) || !craydent.isNull(null) || craydent.isNull(true) || craydent.isNull("") || craydent.isNull(4) || craydent.isNull("adfadf")) {
	throw "isNull";
}
craydent.logit('should not show');
$c.DEBUG_MODE = true;
craydent.logit('should show');
if (craydent.md5('A') != '7fc56270e7a70fa81a5935b72eacbe29') {
	throw 'md5';
}
console.log('current date is:',craydent.now());

if (craydent.parseBoolean("true") !== true
		|| craydent.parseBoolean(true) !== true
		|| craydent.parseBoolean("1") !== true
		|| craydent.parseBoolean("0") !== false
		|| craydent.parseBoolean(1) !== true
		|| craydent.parseBoolean(0) !== false
		|| craydent.parseBoolean("false") !== false
		|| craydent.parseBoolean(false) !== false
		|| craydent.parseBoolean(undefined) !== undefined
		|| craydent.parseBoolean(null) !== undefined
		|| craydent.parseBoolean("adfad") !== undefined
		|| craydent.parseBoolean("") !== undefined) {
	throw 'parseBoolean';
}

if (craydent.parseRaw("str") != "\"str\"" || craydent.parseRaw({}) != "{}" || craydent.parseRaw([]) != "[]") {
	throw 'parseRaw';
}
if (!craydent.rand(1,2,true).isBetween(1,2,true)) {
	throw 'rand';
}
if(craydent.suid().length != 10 || craydent.suid(5).length != 5) {
	throw "suid";
}
if(!craydent.tryEval("{}").equals({}) || craydent.tryEval("{{}") !== null) {
	throw "tryEval";
}

// testing global
craydent.globalize();
if(cuid().length != 36) {
	throw "gcuid";
}
cout('hi');
bbc = [{arr:[{hi:"b"},{hi:"c"}],name:"operation"},{arr:[{hi:"b"},{hi:"c"}],name:"operation"}];
if (fillTemplate("<div>${name}<div>${foreach ${item} in ${arr}}${item.hi}8888${name}9999${end foreach}</div></div>",bbc) ==
		"<div>operation<div>b8888operation9999c8888operation9999</div></div><div>operation<div>b8888operation9999c8888operation9999</div></div>") {
	throw "gfillTemplate";
}
console.log(foo);
if (!isNull(undefined) || !isNull(null) || isNull(true) || isNull("") || isNull(4) || isNull("adfadf")) {
	throw "gisNull";
}
logit('gshould not show');
$c.DEBUG_MODE = true;
logit('gshould show');
if (md5('A') != '7fc56270e7a70fa81a5935b72eacbe29') {
	throw 'gmd5';
}
console.log('gcurrent date is:',now());

if (parseBoolean("true") !== true
		|| parseBoolean(true) !== true
		|| parseBoolean("1") !== true
		|| parseBoolean("0") !== false
		|| parseBoolean(1) !== true
		|| parseBoolean(0) !== false
		|| parseBoolean("false") !== false
		|| parseBoolean(false) !== false
		|| parseBoolean(undefined) !== undefined
		|| parseBoolean(null) !== undefined
		|| parseBoolean("adfad") !== undefined
		|| parseBoolean("") !== undefined) {
	throw 'gparseBoolean';
}

if (parseRaw("str") != "\"str\"" || parseRaw({}) != "{}" || parseRaw([]) != "[]") {
	throw 'gparseRaw';
}
var ran = rand(1,2,true);
if (!ran.isBetween(1,2,true)) {
	console.log(ran);
	throw 'grand';
}
if(suid().length != 10 || suid(5).length != 5) {
	throw "gsuid";
}
if(!tryEval("{}").equals({}) || tryEval("{{}") !== null) {
	throw "gtryEval";
}


//prototypes

//String
if ("cal".capitalize() != "Cal") {
	throw "capitalize";
}
//if ("cal".convertUTCDate() != "Cal") {
//	throw "convertUTCDate";
//}
if ("calaie8a".count('a') != 3) {
	throw "count";
}
if ("cala".cut(1,2) != "cla" || "cala".cut(1,2,"p") != "cpla") {
	throw "cut";
}
if ("calasdfadfasdfasdfadf".ellipsis(1) != "c...alasdfadfasdfasdfadf") {
	throw "ellipsis";
}
if ("cal".endsWithAny('a','p','l') !== "l") {
	throw "endsWithAny";
}
if ("cal".highlight('a') != "c<span class=\"chighlight\">a</span>l") {
	throw "highlight";
}
if ("cal".indexOfAlt(/a/) != 1) {
	throw "indexOfAlt";
}
if ("calA".ireplace_all('a','') != "cl") {
	throw "ireplace_all";
}
if (!cuid().isCuid()) {
	throw "isCuid";
}
if ("cal".isBlank() || !"".isBlank()) {
	throw "isBlank";
}
if ("cal".isValidEmail() || !"cal@craydent.com".isValidEmail()) {
	throw "isValidEmail";
}
if ("cal".lastIndexOfAlt(/a/) != 1) {
	throw "lastIndexOfAlt";
}
if ("     cal".ltrim() != "cal") {
	throw "ltrim";
}
if ("cal".pluralize() != "cals") {
	throw "pluralize";
}
if ("calA".replace_all('a','') != "clA") {
	throw "replace_all";
}
if ("cal".reverse() != "lac") {
	throw "reverse";
}
if ("cal          ".rtrim() != "cal") {
	throw "rtrim";
}
if ("cal".sanitize() != "cal") {
	throw "sanitize";
}
if ("cals".singularize() != "cal") {
	throw "singularize";
}
if ("cal".startsWithAny('a','b','c') != "c") {
	throw "startsWithAny";
}
if ("aaaaaaaaaaaacalaaaaaaaaaa".strip('a') != "cal") {
	throw "strip";
}
if ("1000".toCurrencyNotation() != "1,000") {
	throw "toCurrencyNotation";
}
if ("08/20/2015".toDateTime().getTime() != new Date("08/20/2015").getTime()) {
	throw "toDateTime";
}
if ("    cal    ".trim() != "cal") {
	throw "trim";
}

b = [{hi:"a"},{hi:"a"},{hi:"b"}];