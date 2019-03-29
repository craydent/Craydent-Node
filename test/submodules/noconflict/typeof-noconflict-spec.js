const pre = require('../_prep')();
let path = '../../../noConflict.js';
if (process.env.name == 'single') { path = `${pre}craydent-date/noConflict.js`; }
const $c = require(path);
$c.DEBUG_MODE = true;
describe ('No Conflict Object', function () {
	it('isArray',function(){
		expect($c.isArray([])).toBe(true);
		expect($c.isArray(true)).toBe(false);
		expect($c.isArray(new Date())).toBe(false);
		expect($c.isArray({nodeType:1})).toBe(false);
		expect($c.isArray(2.001)).toBe(false);
		expect($c.isArray(function(){})).toBe(false);
		expect($c.isArray(function*(){})).toBe(false);
		expect($c.isArray(2)).toBe(false);
		expect($c.isArray((new Promise(function(){})))).toBe(false);
		expect($c.isArray({})).toBe(false);
		expect($c.isArray(/k/)).toBe(false);
		expect($c.isArray("")).toBe(false);
	});
	it('isBetween',function(){
		expect($c.isBetween(10,11,9)).toBe(false);
		expect($c.isBetween(10,9,11)).toBe(true);
		expect($c.isBetween(10,10,11)).toBe(false);
		expect($c.isBetween(10,10,11,true)).toBe(true);
		expect($c.isBetween("b","a","c")).toBe(true);
		expect($c.isBetween("b","b","c")).toBe(false);
		expect($c.isBetween("b","b","c",true)).toBe(true);
	});
	it('isBoolean',function(){
		expect($c.isBoolean([])).toBe(false);
		expect($c.isBoolean(true)).toBe(true);
		expect($c.isBoolean(new Date())).toBe(false);
		expect($c.isBoolean({nodeType:1})).toBe(false);
		expect($c.isBoolean(2.001)).toBe(false);
		expect($c.isBoolean(function(){})).toBe(false);
		expect($c.isBoolean(function*(){})).toBe(false);
		expect($c.isBoolean(2)).toBe(false);
		expect($c.isBoolean(new Promise(function(){}))).toBe(false);
		expect($c.isBoolean({})).toBe(false);
		expect($c.isBoolean(/k/)).toBe(false);
		expect($c.isBoolean("")).toBe(false);
	});
	it('isDate',function(){
		expect($c.isDate([])).toBe(false);
		expect($c.isDate(true)).toBe(false);
		expect($c.isDate(new Date())).toBe(true);
		expect($c.isDate({nodeType:1})).toBe(false);
		expect($c.isDate(2.001)).toBe(false);
		expect($c.isDate(function(){})).toBe(false);
		expect($c.isDate(function*(){})).toBe(false);
		expect($c.isDate(2)).toBe(false);
		expect($c.isDate(new Promise(function(){}))).toBe(false);
		expect($c.isDate({})).toBe(false);
		expect($c.isDate(/k/)).toBe(false);
		expect($c.isDate("")).toBe(false);

	});
	it('isDomElement',function(){
		expect($c.isDomElement([])).toBe(false);
		expect($c.isDomElement(true)).toBe(false);
		expect($c.isDomElement(new Date())).toBe(false);
		expect($c.isDomElement({nodeType:1})).toBe(true);
		expect($c.isDomElement(2.001)).toBe(false);
		expect($c.isDomElement(function(){})).toBe(false);
		expect($c.isDomElement(function*(){})).toBe(false);
		expect($c.isDomElement(2)).toBe(false);
		expect($c.isDomElement(new Promise(function(){}))).toBe(false);
		expect($c.isDomElement({})).toBe(false);
		expect($c.isDomElement(/k/)).toBe(false);
		expect($c.isDomElement("")).toBe(false);

	});
	it('isEmpty',function(){
		expect($c.isEmpty(function(){})).toBe(true);
		expect($c.isEmpty({})).toBe(true);
		expect($c.isEmpty([])).toBe(true);


		expect($c.isEmpty(function(){ var b; })).toBe(false);
		expect($c.isEmpty({hi:""})).toBe(false);
		expect($c.isEmpty([''])).toBe(false);
	});
	it('isFloat',function(){
		expect($c.isFloat([])).toBe(false);
		expect($c.isFloat(true)).toBe(false);
		expect($c.isFloat(new Date())).toBe(false);
		expect($c.isFloat({nodeType:1})).toBe(false);
		expect($c.isFloat(2.001)).toBe(true);
		expect($c.isFloat(function(){})).toBe(false);
		expect($c.isFloat(function*(){})).toBe(false);
		expect($c.isFloat(2)).toBe(true);
		expect($c.isFloat(new Promise(function(){}))).toBe(false);
		expect($c.isFloat({})).toBe(false);
		expect($c.isFloat(/k/)).toBe(false);
		expect($c.isFloat("")).toBe(false);

	});
	it('isFunction',function(){
		expect($c.isFunction([])).toBe(false);
		expect($c.isFunction(true)).toBe(false);
		expect($c.isFunction(new Date())).toBe(false);
		expect($c.isFunction({nodeType:1})).toBe(false);
		expect($c.isFunction(2.001)).toBe(false);
		expect($c.isFunction(function(){})).toBe(true);
		expect($c.isFunction(function*(){})).toBe(false);
		expect($c.isFunction(2)).toBe(false);
		expect($c.isFunction(new Promise(function(){}))).toBe(false);
		expect($c.isFunction({})).toBe(false);
		expect($c.isFunction(/k/)).toBe(false);
		expect($c.isFunction("")).toBe(false);

	});
	it('isGenerator',function(){
		expect($c.isGenerator([])).toBe(false);
		expect($c.isGenerator(true)).toBe(false);
		expect($c.isGenerator(new Date())).toBe(false);
		expect($c.isGenerator({nodeType:1})).toBe(false);
		expect($c.isGenerator(2.001)).toBe(false);
		expect($c.isGenerator(function(){})).toBe(false);
		expect($c.isGenerator(function*(){})).toBe(true);
		expect($c.isGenerator(2)).toBe(false);
		expect($c.isGenerator(new Promise(function(){}))).toBe(false);
		expect($c.isGenerator({})).toBe(false);
		expect($c.isGenerator(/k/)).toBe(false);
		expect($c.isGenerator("")).toBe(false);

	});
	it('isGeolocation',function(){
		function Geolocation () {};
		var g = new Geolocation();
		expect($c.isGeolocation([])).toBe(false);
		expect($c.isGeolocation(g)).toBe(true);
	});
	it('isInt',function(){
		expect($c.isInt([])).toBe(false);
		expect($c.isInt(true)).toBe(false);
		expect($c.isInt(new Date())).toBe(false);
		expect($c.isInt({nodeType:1})).toBe(false);
		expect($c.isInt(2.001)).toBe(false);
		expect($c.isInt(function(){})).toBe(false);
		expect($c.isInt(function*(){})).toBe(false);
		expect($c.isInt(2)).toBe(true);
		expect($c.isInt(new Promise(function(){}))).toBe(false);
		expect($c.isInt({})).toBe(false);
		expect($c.isInt(/k/)).toBe(false);
		expect($c.isInt("")).toBe(false);

	});
	it('isNumber',function(){
		expect($c.isNumber([])).toBe(false);
		expect($c.isNumber(true)).toBe(false);
		expect($c.isNumber(new Date())).toBe(false);
		expect($c.isNumber({nodeType:1})).toBe(false);
		expect($c.isNumber(2.001)).toBe(true);
		expect($c.isNumber(function(){})).toBe(false);
		expect($c.isNumber(function*(){})).toBe(false);
		expect($c.isNumber(2)).toBe(true);
		expect($c.isNumber(new Promise(function(){}))).toBe(false);
		expect($c.isNumber({})).toBe(false);
		expect($c.isNumber(/k/)).toBe(false);
		expect($c.isNumber("")).toBe(false);

	});
	it('isPromise',function(){
		expect($c.isPromise([])).toBe(false);
		expect($c.isPromise(true)).toBe(false);
		expect($c.isPromise(new Date())).toBe(false);
		expect($c.isPromise({nodeType:1})).toBe(false);
		expect($c.isPromise(2.001)).toBe(false);
		expect($c.isPromise(function(){})).toBe(false);
		expect($c.isPromise(function*(){})).toBe(false);
		expect($c.isPromise(2)).toBe(false);
		expect($c.isPromise(new Promise(function(){}))).toBe(true);
		expect($c.isPromise({})).toBe(false);
		expect($c.isPromise(/k/)).toBe(false);
		expect($c.isPromise("")).toBe(false);

	});
	it('isObject',function(){
		expect($c.isObject([])).toBe(false);
		expect($c.isObject(true)).toBe(false);
		expect($c.isObject(new Date())).toBe(false);
		expect($c.isObject({nodeType:1})).toBe(true);
		expect($c.isObject(2.001)).toBe(false);
		expect($c.isObject(function(){})).toBe(false);
		expect($c.isObject(function*(){})).toBe(false);
		expect($c.isObject(2)).toBe(false);
		expect($c.isObject(new Promise(function(){}))).toBe(false);
		expect($c.isObject({})).toBe(true);
		expect($c.isObject(/k/)).toBe(false);
		expect($c.isObject("")).toBe(false);

	});
	it('isRegExp',function(){
		expect($c.isRegExp([])).toBe(false);
		expect($c.isRegExp(true)).toBe(false);
		expect($c.isRegExp(new Date())).toBe(false);
		expect($c.isRegExp({nodeType:1})).toBe(false);
		expect($c.isRegExp(2.001)).toBe(false);
		expect($c.isRegExp(function(){})).toBe(false);
		expect($c.isRegExp(function*(){})).toBe(false);
		expect($c.isRegExp(2)).toBe(false);
		expect($c.isRegExp(new Promise(function(){}))).toBe(false);
		expect($c.isRegExp({})).toBe(false);
		expect($c.isRegExp(/k/)).toBe(true);
		expect($c.isRegExp("")).toBe(false);

	});
	it('isString',function(){
		expect($c.isString([])).toBe(false);
		expect($c.isString(true)).toBe(false);
		expect($c.isString(new Date())).toBe(false);
		expect($c.isString({nodeType:1})).toBe(false);
		expect($c.isString(2.001)).toBe(false);
		expect($c.isString(function(){})).toBe(false);
		expect($c.isString(function*(){})).toBe(false);
		expect($c.isString(2)).toBe(false);
		expect($c.isString(new Promise(function(){}))).toBe(false);
		expect($c.isString({})).toBe(false);
		expect($c.isString(/k/)).toBe(false);
		expect($c.isString("")).toBe(true);

	});
});
