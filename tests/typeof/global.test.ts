import $c from '../../compiled/transformedMajor/typeof/global';
$c;
describe('No Conflict Object', function () {
	it('isArray', function () {
		expect(isArray([])).toBe(true);
		expect(isArray(true)).toBe(false);
		expect(isArray(new Date())).toBe(false);
		expect(isArray({ nodeType: 1 })).toBe(false);
		expect(isArray(2.001)).toBe(false);
		expect(isArray(function () { })).toBe(false);
		expect(isArray(function* () { })).toBe(false);
		expect(isArray(2)).toBe(false);
		expect(isArray((new Promise(function () { })))).toBe(false);
		expect(isArray({})).toBe(false);
		expect(isArray(/k/)).toBe(false);
		expect(isArray("")).toBe(false);
	});
	it('isBetween', function () {
		expect(isBetween(10, 11, 9)).toBe(false);
		expect(isBetween(10, 9, 11)).toBe(true);
		expect(isBetween(10, 10, 11)).toBe(false);
		expect(isBetween(10, 10, 11, true)).toBe(true);
		expect(isBetween("b", "a", "c")).toBe(true);
		expect(isBetween("b", "b", "c")).toBe(false);
		expect(isBetween("b", "b", "c", true)).toBe(true);
	});
	it('isBoolean', function () {
		expect(isBoolean([])).toBe(false);
		expect(isBoolean(true)).toBe(true);
		expect(isBoolean(new Date())).toBe(false);
		expect(isBoolean({ nodeType: 1 })).toBe(false);
		expect(isBoolean(2.001)).toBe(false);
		expect(isBoolean(function () { })).toBe(false);
		expect(isBoolean(function* () { })).toBe(false);
		expect(isBoolean(2)).toBe(false);
		expect(isBoolean(new Promise(function () { }))).toBe(false);
		expect(isBoolean({})).toBe(false);
		expect(isBoolean(/k/)).toBe(false);
		expect(isBoolean("")).toBe(false);
	});
	it('isDate', function () {
		expect(isDate([])).toBe(false);
		expect(isDate(true)).toBe(false);
		expect(isDate(new Date())).toBe(true);
		expect(isDate({ nodeType: 1 })).toBe(false);
		expect(isDate(2.001)).toBe(false);
		expect(isDate(function () { })).toBe(false);
		expect(isDate(function* () { })).toBe(false);
		expect(isDate(2)).toBe(false);
		expect(isDate(new Promise(function () { }))).toBe(false);
		expect(isDate({})).toBe(false);
		expect(isDate(/k/)).toBe(false);
		expect(isDate("")).toBe(false);

	});
	it('isDomElement', function () {
		expect(isDomElement([])).toBe(false);
		expect(isDomElement(true)).toBe(false);
		expect(isDomElement(new Date())).toBe(false);
		expect(isDomElement({ nodeType: 1 })).toBe(true);
		expect(isDomElement(2.001)).toBe(false);
		expect(isDomElement(function () { })).toBe(false);
		expect(isDomElement(function* () { })).toBe(false);
		expect(isDomElement(2)).toBe(false);
		expect(isDomElement(new Promise(function () { }))).toBe(false);
		expect(isDomElement({})).toBe(false);
		expect(isDomElement(/k/)).toBe(false);
		expect(isDomElement("")).toBe(false);

	});
	it('isEmpty', function () {
		expect(isEmpty(function () { })).toBe(true);
		expect(isEmpty({})).toBe(true);
		expect(isEmpty([])).toBe(true);


		expect(isEmpty(function () { var b; })).toBe(false);
		expect(isEmpty({ hi: "" })).toBe(false);
		expect(isEmpty([''])).toBe(false);
	});
	it('isFloat', function () {
		expect(isFloat([])).toBe(false);
		expect(isFloat(true)).toBe(false);
		expect(isFloat(new Date())).toBe(false);
		expect(isFloat({ nodeType: 1 })).toBe(false);
		expect(isFloat(2.001)).toBe(true);
		expect(isFloat(function () { })).toBe(false);
		expect(isFloat(function* () { })).toBe(false);
		expect(isFloat(2)).toBe(true);
		expect(isFloat(new Promise(function () { }))).toBe(false);
		expect(isFloat({})).toBe(false);
		expect(isFloat(/k/)).toBe(false);
		expect(isFloat("")).toBe(false);

	});
	it('isFunction', function () {
		expect(isFunction([])).toBe(false);
		expect(isFunction(true)).toBe(false);
		expect(isFunction(new Date())).toBe(false);
		expect(isFunction({ nodeType: 1 })).toBe(false);
		expect(isFunction(2.001)).toBe(false);
		expect(isFunction(function () { })).toBe(true);
		expect(isFunction(function* () { })).toBe(false);
		expect(isFunction(2)).toBe(false);
		expect(isFunction(new Promise(function () { }))).toBe(false);
		expect(isFunction({})).toBe(false);
		expect(isFunction(/k/)).toBe(false);
		expect(isFunction("")).toBe(false);

	});
	it('isGenerator', function () {
		expect(isGenerator([])).toBe(false);
		expect(isGenerator(true)).toBe(false);
		expect(isGenerator(new Date())).toBe(false);
		expect(isGenerator({ nodeType: 1 })).toBe(false);
		expect(isGenerator(2.001)).toBe(false);
		expect(isGenerator(function () { })).toBe(false);
		expect(isGenerator(function* () { })).toBe(true);
		expect(isGenerator(2)).toBe(false);
		expect(isGenerator(new Promise(function () { }))).toBe(false);
		expect(isGenerator({})).toBe(false);
		expect(isGenerator(/k/)).toBe(false);
		expect(isGenerator("")).toBe(false);

	});
	it('isGeolocation', function () {
		function Geolocation() { };
		var g = new (Geolocation as any)();
		expect(isGeolocation([])).toBe(false);
		expect(isGeolocation(g)).toBe(true);
	});
	it('isInt', function () {
		expect(isInt([])).toBe(false);
		expect(isInt(true)).toBe(false);
		expect(isInt(new Date())).toBe(false);
		expect(isInt({ nodeType: 1 })).toBe(false);
		expect(isInt(2.001)).toBe(false);
		expect(isInt(function () { })).toBe(false);
		expect(isInt(function* () { })).toBe(false);
		expect(isInt(2)).toBe(true);
		expect(isInt(new Promise(function () { }))).toBe(false);
		expect(isInt({})).toBe(false);
		expect(isInt(/k/)).toBe(false);
		expect(isInt("")).toBe(false);

	});
	it('isNumber', function () {
		expect(isNumber([])).toBe(false);
		expect(isNumber(true)).toBe(false);
		expect(isNumber(new Date())).toBe(false);
		expect(isNumber({ nodeType: 1 })).toBe(false);
		expect(isNumber(2.001)).toBe(true);
		expect(isNumber(function () { })).toBe(false);
		expect(isNumber(function* () { })).toBe(false);
		expect(isNumber(2)).toBe(true);
		expect(isNumber(new Promise(function () { }))).toBe(false);
		expect(isNumber({})).toBe(false);
		expect(isNumber(/k/)).toBe(false);
		expect(isNumber("")).toBe(false);

	});
	it('isPromise', function () {
		expect(isPromise([])).toBe(false);
		expect(isPromise(true)).toBe(false);
		expect(isPromise(new Date())).toBe(false);
		expect(isPromise({ nodeType: 1 })).toBe(false);
		expect(isPromise(2.001)).toBe(false);
		expect(isPromise(function () { })).toBe(false);
		expect(isPromise(function* () { })).toBe(false);
		expect(isPromise(2)).toBe(false);
		expect(isPromise(new Promise(function () { }))).toBe(true);
		expect(isPromise({})).toBe(false);
		expect(isPromise(/k/)).toBe(false);
		expect(isPromise("")).toBe(false);

	});
	it('isObject', function () {
		expect(isObject([])).toBe(false);
		expect(isObject(true)).toBe(false);
		expect(isObject(new Date())).toBe(false);
		expect(isObject({ nodeType: 1 })).toBe(true);
		expect(isObject(2.001)).toBe(false);
		expect(isObject(function () { })).toBe(false);
		expect(isObject(function* () { })).toBe(false);
		expect(isObject(2)).toBe(false);
		expect(isObject(new Promise(function () { }))).toBe(false);
		expect(isObject({})).toBe(true);
		expect(isObject(/k/)).toBe(false);
		expect(isObject("")).toBe(false);

	});
	it('isRegExp', function () {
		expect(isRegExp([])).toBe(false);
		expect(isRegExp(true)).toBe(false);
		expect(isRegExp(new Date())).toBe(false);
		expect(isRegExp({ nodeType: 1 })).toBe(false);
		expect(isRegExp(2.001)).toBe(false);
		expect(isRegExp(function () { })).toBe(false);
		expect(isRegExp(function* () { })).toBe(false);
		expect(isRegExp(2)).toBe(false);
		expect(isRegExp(new Promise(function () { }))).toBe(false);
		expect(isRegExp({})).toBe(false);
		expect(isRegExp(/k/)).toBe(true);
		expect(isRegExp("")).toBe(false);

	});
	it('isString', function () {
		expect(isString([])).toBe(false);
		expect(isString(true)).toBe(false);
		expect(isString(new Date())).toBe(false);
		expect(isString({ nodeType: 1 })).toBe(false);
		expect(isString(2.001)).toBe(false);
		expect(isString(function () { })).toBe(false);
		expect(isString(function* () { })).toBe(false);
		expect(isString(2)).toBe(false);
		expect(isString(new Promise(function () { }))).toBe(false);
		expect(isString({})).toBe(false);
		expect(isString(/k/)).toBe(false);
		expect(isString("")).toBe(true);

	});
});