const pre = require('../_prep')();
let path = '../../../noConflict.js';
if (process.env.name == 'single') { path = `${pre}craydent-object/noConflict`; }
const $c = require(path);
const $m = require('../_methods')(pre);
var foo = $m.foo;

$c.DEBUG_MODE = true;
describe('No Conflict Object', function () {
    it('changes', function () {
        var obj1 = { id: 1, prop1: "prop1", prop3: "" };
        var obj2 = { id: 2, prop1: "propupdated", prop2: "prop2" };
        expect($c.changes(obj1, obj2)).toEqual({
            $length: 4,
            $add: ['prop2'],
            $update: ["id", "prop1"],
            $delete: ["prop3"],
            id: 2,
            prop1: "propupdated",
            prop2: "prop2",
            prop3: null
        });

    });
    it('contains - string/string', function () {
        expect($c.contains("asdf", "a")).toBe(true);
        expect($c.contains("asdf", "e")).toBe(false);
    });
    it('contains - string/regex', function () {
        expect($c.contains("asdf", /^as/)).toBe(true);
        expect($c.contains("asdf", /ad/)).toBe(false);
    });
    it('contains - array/string', function () {
        expect($c.contains(['q', 'b'], "b")).toBe(true);
        expect($c.contains(['q', 'b'], "c")).toBe(false);
    });
    it('contains - array/regex', function () {
        expect($c.contains(['q', 'b'], /b/)).toBe(true);
    });
    it('contains - array/array', function () {
        expect($c.contains(['q', 'b'], ['a', 'c'])).toBe(false);
        expect($c.contains(['q', 'b'], ['a', 'q'])).toBe("q");
    });
    it('contains - array/value/func', function () {
        expect($c.contains(['q', 'b'], 'a', function () { return 'a'; })).toBe(true);
    });
    it('contains - array/func', function () {
        expect($c.contains(['q', 'b'], function (val, prop, arr) { return val == 'b'; })).toBe(true);
    });
    it('contains - object/string', function () {
        expect($c.contains({ q: "asdf", b: "abbb" }, "abbb")).toBe(true);
        expect($c.contains({ q: "asdf", b: "abbb" }, "asdfb")).toBe(false);
    });
    it('copyObject', function () {
        function B() { this.hi = "hello"; }
        var b = new B();
        var tb = $c.copyObject(b);
        expect(tb).toEqual({ hi: "hello" });
        expect(tb.constructor).not.toEqual(B);
    });
    it('duplicate - object', function () {
        var obj = { hi: "hello", bye: "ciao", o: { blah: '' } };
        var tobj = $c.duplicate(obj);
        expect(tobj).not.toBe(obj);
        expect(tobj.o).toBe(tobj.o);
        tobj = $c.duplicate(obj, true);
        expect(tobj.o).not.toBe(obj.o);
    });
    it('duplicate - class', function () {
        function B() { this.hi = "hello"; }
        var b = new B();
        var tb = $c.duplicate(b);
        expect(tb).toEqual({ hi: "hello" });
        expect(tb.constructor).toEqual(B);
    });
    it('duplicate - recursive', function () {
        function A() { console.log(''); }
        var obj = { use: A };
        var obj2 = $c.duplicate(obj, true);
        var obj3 = $c.duplicate(obj);
        expect(obj.use).toEqual(A);
        expect(obj2).not.toBe(obj);
        expect(obj2.use).not.toBe(obj.use);
        expect(obj3.use).toBe(obj.use);
    });
    it('eachProperty', function () {
        var arrp = [], arrv = [], obj = { a: "a1", b: 'b1', c: 'c1' };
        $c.eachProperty(obj, function (val, prop) {
            arrp.push(prop);
            arrv.push(val);
        });
        expect(arrp).toEqual(['a', 'b', 'c']);
        expect(arrv).toEqual(['a1', 'b1', 'c1']);
    });
    it('equals - string', function () {
        expect($c.equals("s", "s")).toBe(true);
        expect($c.equals("s", "ss")).toBe(false);
    });
    it('equals - number', function () {
        expect($c.equals(0, 0)).toBe(true);
        expect($c.equals(1, 2)).toBe(false);
    });
    it('equals - object', function () {
        expect($c.equals({}, {})).toBe(true);
        expect($c.equals({}, { hi: '' })).toBe(false);
    });
    it('equals - object with specified property', function () {
        expect($c.equals({ hi: '', bye: '' }, { hi: '' }, ['hi'])).toBe(true);
    });
    it('equals - array', function () {
        expect($c.equals([], [])).toBe(true);
        expect($c.equals([], [''])).toBe(false);

    });
    it('every - array', function () {
        expect($c.every(['a', 'b', 'c'], function (val, prop, arr) { return val; })).toBe(true);
        expect($c.every(['a', '', 'c'], function (val, prop, arr) { return val; })).toBe(false);
    });
    it('every - object', function () {
        expect($c.every({ a: 'a', b: 'b', c: 'c' }, function (val, prop, arr) { return val; })).toBe(true);
        expect($c.every({ a: 'a', b: '', c: 'c' }, function (val, prop, arr) { return val; })).toBe(false);

    });
    it('getClass', function () {
        function C1() { }
        var c = new C1();
        expect($c.getClass(c)).toBe("C1");
    });
    it('get', function () {
        var o = { path: { path: "hello world", arr: [{ foo: "bar" }] } };
        expect($c.get(o, "path.path")).toBe("hello world");
        expect($c.get(o, "path.arr.foo")).toBe(undefined);
        expect($c.get(o, "path.arr.0.foo")).toBe("bar");
    });
    it('getProperty', function () {
        var o = { path: { path: "hello world", arr: [{ foo: "bar" }] } };
        expect($c.getProperty(o, "path.path")).toBe("hello world");
        expect($c.getProperty(o, "path.arr.foo")).toBe(undefined);
        expect($c.getProperty(o, "path.arr.0.foo")).toBe("bar");
    });
    var f = function (num) { return (num || 0) + 1; };
    var n = 10;
    var s = "s";
    var o = {};
    var a = [];
    it('getValue - no default', function () {
        expect($c.getValue(f)).toBe(1);
        expect($c.getValue(n)).toBe(10);
        expect($c.getValue(s)).toBe("s");
        expect($c.getValue(o)).toEqual({});
        expect($c.getValue(a)).toEqual([]);
    });
    it('getValue - with default', function () {
        expect($c.getValue(foo, [-1], 1)).toBe(1);
        expect($c.getValue(null, n)).toBe(10);
        expect($c.getValue(null, s)).toBe("s");
        expect($c.getValue(null, o)).toEqual({});
        expect($c.getValue(null, a)).toEqual([]);
    });
    it('has', function () {
        var obj = { hi: "" };
        expect($c.has(obj, "hi")).toBe(true);
        expect($c.has(obj, "hasOwnProperty")).toBe(false);

    });
    it('isArray', function () {
        expect($c.isArray([])).toBe(true);
        expect($c.isArray(true)).toBe(false);
        expect($c.isArray(new Date())).toBe(false);
        expect($c.isArray({ nodeType: 1 })).toBe(false);
        expect($c.isArray(2.001)).toBe(false);
        expect($c.isArray(function () { })).toBe(false);
        expect($c.isArray(function* () { })).toBe(false);
        expect($c.isArray(2)).toBe(false);
        expect($c.isArray((new Promise(function () { })))).toBe(false);
        expect($c.isArray({})).toBe(false);
        expect($c.isArray(/k/)).toBe(false);
        expect($c.isArray("")).toBe(false);
    });
    it('isBetween - number', function () {
        expect($c.isBetween(10, 11, 9)).toBe(false);
        expect($c.isBetween(10, 9, 11)).toBe(true);
        expect($c.isBetween(10, 10, 11)).toBe(false);
        expect($c.isBetween(10, 10, 11, true)).toBe(true);
    });
    it('isBetween - string', function () {
        expect($c.isBetween("b", "a", "c")).toBe(true);
        expect($c.isBetween("b", "b", "c")).toBe(false);
        expect($c.isBetween("b", "b", "c", true)).toBe(true);
    });
    it('isBoolean', function () {
        expect($c.isBoolean([])).toBe(false);
        expect($c.isBoolean(true)).toBe(true);
        expect($c.isBoolean(new Date())).toBe(false);
        expect($c.isBoolean({ nodeType: 1 })).toBe(false);
        expect($c.isBoolean(2.001)).toBe(false);
        expect($c.isBoolean(function () { })).toBe(false);
        expect($c.isBoolean(function* () { })).toBe(false);
        expect($c.isBoolean(2)).toBe(false);
        expect($c.isBoolean(new Promise(function () { }))).toBe(false);
        expect($c.isBoolean({})).toBe(false);
        expect($c.isBoolean(/k/)).toBe(false);
        expect($c.isBoolean("")).toBe(false);
    });
    it('isDate', function () {
        expect($c.isDate([])).toBe(false);
        expect($c.isDate(true)).toBe(false);
        expect($c.isDate(new Date())).toBe(true);
        expect($c.isDate({ nodeType: 1 })).toBe(false);
        expect($c.isDate(2.001)).toBe(false);
        expect($c.isDate(function () { })).toBe(false);
        expect($c.isDate(function* () { })).toBe(false);
        expect($c.isDate(2)).toBe(false);
        expect($c.isDate(new Promise(function () { }))).toBe(false);
        expect($c.isDate({})).toBe(false);
        expect($c.isDate(/k/)).toBe(false);
        expect($c.isDate("")).toBe(false);

    });
    it('isDomElement', function () {
        expect($c.isDomElement([])).toBe(false);
        expect($c.isDomElement(true)).toBe(false);
        expect($c.isDomElement(new Date())).toBe(false);
        expect($c.isDomElement({ nodeType: 1 })).toBe(true);
        expect($c.isDomElement(2.001)).toBe(false);
        expect($c.isDomElement(function () { })).toBe(false);
        expect($c.isDomElement(function* () { })).toBe(false);
        expect($c.isDomElement(2)).toBe(false);
        expect($c.isDomElement(new Promise(function () { }))).toBe(false);
        expect($c.isDomElement({})).toBe(false);
        expect($c.isDomElement(/k/)).toBe(false);
        expect($c.isDomElement("")).toBe(false);

    });
    it('isEmpty - function', function () {
        expect($c.isEmpty(function () { })).toBe(true);
        expect($c.isEmpty(function () { var b; })).toBe(false);
    });
    it('isEmpty - object', function () {
        expect($c.isEmpty({})).toBe(true);
        expect($c.isEmpty({ hi: "" })).toBe(false);
    });
    it('isEmpty - array', function () {
        expect($c.isEmpty([])).toBe(true);
        expect($c.isEmpty([''])).toBe(false);
    });
    it('isFloat', function () {
        expect($c.isFloat([])).toBe(false);
        expect($c.isFloat(true)).toBe(false);
        expect($c.isFloat(new Date())).toBe(false);
        expect($c.isFloat({ nodeType: 1 })).toBe(false);
        expect($c.isFloat(2.001)).toBe(true);
        expect($c.isFloat(function () { })).toBe(false);
        expect($c.isFloat(function* () { })).toBe(false);
        expect($c.isFloat(2)).toBe(true);
        expect($c.isFloat(new Promise(function () { }))).toBe(false);
        expect($c.isFloat({})).toBe(false);
        expect($c.isFloat(/k/)).toBe(false);
        expect($c.isFloat("")).toBe(false);

    });
    it('isFunction', function () {
        expect($c.isFunction([])).toBe(false);
        expect($c.isFunction(true)).toBe(false);
        expect($c.isFunction(new Date())).toBe(false);
        expect($c.isFunction({ nodeType: 1 })).toBe(false);
        expect($c.isFunction(2.001)).toBe(false);
        expect($c.isFunction(function () { })).toBe(true);
        expect($c.isFunction(function* () { })).toBe(false);
        expect($c.isFunction(2)).toBe(false);
        expect($c.isFunction(new Promise(function () { }))).toBe(false);
        expect($c.isFunction({})).toBe(false);
        expect($c.isFunction(/k/)).toBe(false);
        expect($c.isFunction("")).toBe(false);

    });
    it('isGenerator', function () {
        expect($c.isGenerator([])).toBe(false);
        expect($c.isGenerator(true)).toBe(false);
        expect($c.isGenerator(new Date())).toBe(false);
        expect($c.isGenerator({ nodeType: 1 })).toBe(false);
        expect($c.isGenerator(2.001)).toBe(false);
        expect($c.isGenerator(function () { })).toBe(false);
        expect($c.isGenerator(function* () { })).toBe(true);
        expect($c.isGenerator(2)).toBe(false);
        expect($c.isGenerator(new Promise(function () { }))).toBe(false);
        expect($c.isGenerator({})).toBe(false);
        expect($c.isGenerator(/k/)).toBe(false);
        expect($c.isGenerator("")).toBe(false);

    });
    it('isGeolocation', function () {
        function Geolocation() { };
        var g = new Geolocation();
        expect($c.isGeolocation([])).toBe(false);
        expect($c.isGeolocation(g)).toBe(true);
    });
    it('isInt', function () {
        expect($c.isInt([])).toBe(false);
        expect($c.isInt(true)).toBe(false);
        expect($c.isInt(new Date())).toBe(false);
        expect($c.isInt({ nodeType: 1 })).toBe(false);
        expect($c.isInt(2.001)).toBe(false);
        expect($c.isInt(function () { })).toBe(false);
        expect($c.isInt(function* () { })).toBe(false);
        expect($c.isInt(2)).toBe(true);
        expect($c.isInt(new Promise(function () { }))).toBe(false);
        expect($c.isInt({})).toBe(false);
        expect($c.isInt(/k/)).toBe(false);
        expect($c.isInt("")).toBe(false);

    });
    it('isNumber', function () {
        expect($c.isNumber([])).toBe(false);
        expect($c.isNumber(true)).toBe(false);
        expect($c.isNumber(new Date())).toBe(false);
        expect($c.isNumber({ nodeType: 1 })).toBe(false);
        expect($c.isNumber(2.001)).toBe(true);
        expect($c.isNumber(function () { })).toBe(false);
        expect($c.isNumber(function* () { })).toBe(false);
        expect($c.isNumber(2)).toBe(true);
        expect($c.isNumber(new Promise(function () { }))).toBe(false);
        expect($c.isNumber({})).toBe(false);
        expect($c.isNumber(/k/)).toBe(false);
        expect($c.isNumber("")).toBe(false);

    });
    it('isPromise', function () {
        expect($c.isPromise([])).toBe(false);
        expect($c.isPromise(true)).toBe(false);
        expect($c.isPromise(new Date())).toBe(false);
        expect($c.isPromise({ nodeType: 1 })).toBe(false);
        expect($c.isPromise(2.001)).toBe(false);
        expect($c.isPromise(function () { })).toBe(false);
        expect($c.isPromise(function* () { })).toBe(false);
        expect($c.isPromise(2)).toBe(false);
        expect($c.isPromise(new Promise(function () { }))).toBe(true);
        expect($c.isPromise({})).toBe(false);
        expect($c.isPromise(/k/)).toBe(false);
        expect($c.isPromise("")).toBe(false);

    });
    it('isObject', function () {
        expect($c.isObject([])).toBe(false);
        expect($c.isObject(true)).toBe(false);
        expect($c.isObject(new Date())).toBe(false);
        expect($c.isObject({ nodeType: 1 })).toBe(true);
        expect($c.isObject(2.001)).toBe(false);
        expect($c.isObject(function () { })).toBe(false);
        expect($c.isObject(function* () { })).toBe(false);
        expect($c.isObject(2)).toBe(false);
        expect($c.isObject(new Promise(function () { }))).toBe(false);
        expect($c.isObject({})).toBe(true);
        expect($c.isObject(/k/)).toBe(false);
        expect($c.isObject("")).toBe(false);

    });
    it('isRegExp', function () {
        expect($c.isRegExp([])).toBe(false);
        expect($c.isRegExp(true)).toBe(false);
        expect($c.isRegExp(new Date())).toBe(false);
        expect($c.isRegExp({ nodeType: 1 })).toBe(false);
        expect($c.isRegExp(2.001)).toBe(false);
        expect($c.isRegExp(function () { })).toBe(false);
        expect($c.isRegExp(function* () { })).toBe(false);
        expect($c.isRegExp(2)).toBe(false);
        expect($c.isRegExp(new Promise(function () { }))).toBe(false);
        expect($c.isRegExp({})).toBe(false);
        expect($c.isRegExp(/k/)).toBe(true);
        expect($c.isRegExp("")).toBe(false);

    });
    it('isString', function () {
        expect($c.isString([])).toBe(false);
        expect($c.isString(true)).toBe(false);
        expect($c.isString(new Date())).toBe(false);
        expect($c.isString({ nodeType: 1 })).toBe(false);
        expect($c.isString(2.001)).toBe(false);
        expect($c.isString(function () { })).toBe(false);
        expect($c.isString(function* () { })).toBe(false);
        expect($c.isString(2)).toBe(false);
        expect($c.isString(new Promise(function () { }))).toBe(false);
        expect($c.isString({})).toBe(false);
        expect($c.isString(/k/)).toBe(false);
        expect($c.isString("")).toBe(true);

    });
    it('itemCount', function () {
        var obj = { hi: "" };
        expect($c.itemCount(obj)).toBe(1);
        expect($c.itemCount({})).toBe(0);
        expect($c.itemCount(undefined)).toBe(undefined);
    });
    it('keyOf', function () {
        expect($c.keyOf({ hi: "hello", world: "worlds" }, "worlds")).toBe("world");
        expect($c.keyOf({ hi: "worlds", world: "worlds" }, "worlds")).toBe("hi");
    });
    it('map', function () {
        var obj = { hi: "hello", world: "world", index: 1 };
        var obj2 = $c.map(obj, function (val) { return val += 10; });
        expect(obj).toEqual({ hi: "hello", world: "world", index: 1 });
        expect(obj2).toEqual({ hi: "hello10", world: "world10", index: 11 });
    });
    it('merge - single', function () {
        var obj1 = { id: 1, prop1: "prop1" };
        var obj2 = { id: 2, prop2: "prop2" };
        var merged = $c.merge(obj1, obj2);
        expect(merged).toBe(obj1);
        merged = $c.merge(obj1, obj2, { clone: true });
        expect(merged).not.toBe(obj1);
        obj1 = { id: 1, prop1: "prop1" };
        obj2 = { id: 2, prop2: "prop2" };
        expect($c.merge(obj1, obj2, { onlyShared: true, clone: true })).toEqual({ id: 2, prop1: "prop1" });
        expect($c.merge(obj1, obj2, { intersect: true, clone: true })).toEqual({ id: 2 });
        obj1 = { id: 1, prop1: { p1: "adsf" }, arr: [] };
        obj2 = { id: 2, prop1: { p2: ";lkj" }, arr: ['1234'] };
        expect($c.merge(obj1, obj2, { recurse: true })).toEqual({ id: 2, prop1: { p1: "adsf", p2: ";lkj" }, arr: ['1234'] });
    });
    it('merge - multi', function () {
        var a = { a: "a" }, b = { b: "b" }, c = { c: "c" }, d = { d: "d" };
        expect($c.merge(a, b, c, d)).toEqual({ a: "a", b: "b", c: "c", d: "d" });
    });
    it('set', function () {
        var o = {};
        expect($c.set(o, "path.path", "hello world")).toBe(true);
        expect(o).toEqual({ path: { path: "hello world" } });
        expect($c.set(o, "path.arr.0.foo", "bar")).toBe(true);
        expect(o).toEqual({ path: { path: "hello world", arr: [{ foo: "bar" }] } });
    });
    it('setProperty', function () {
        var o = {};
        expect($c.setProperty(o, "path.path", "hello world")).toBe(true);
        expect(o).toEqual({ path: { path: "hello world" } });
        expect($c.setProperty(o, "path.arr.0.foo", "bar")).toBe(true);
        expect(o).toEqual({ path: { path: "hello world", arr: [{ foo: "bar" }] } });
    });
    var objToStringAlt = { hi: "hello ", place: "world" };
    it('toStringAlt - basic', function () {
        var objToStringAlt = { hi: "hello ", place: "world" };
        expect($c.toStringAlt(objToStringAlt)).toBe("&hi=hello &place=world");
        expect($c.toStringAlt(objToStringAlt, "-")).toBe("&hi-hello &place-world");
        expect($c.toStringAlt(objToStringAlt, "=", "@")).toBe("@hi=hello @place=world");
    });
    it('toStringAlt - encode uri', function () {
        expect($c.toStringAlt(objToStringAlt, "=", "@", true)).toBe("@hi=hello%20@place=world");
    });
});
