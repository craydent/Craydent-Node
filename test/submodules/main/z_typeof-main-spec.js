var pre = "@craydent/";
try { require.cache[require.resolve('../common.js')] && delete require.cache[require.resolve('../common.js')]; }catch(e){}
try { require.cache[require.resolve(pre + 'craydent-array')] && delete require.cache[require.resolve(pre + 'craydent-array')]; }catch(e){}
try { require.cache[require.resolve(pre + 'craydent-class')] && delete require.cache[require.resolve(pre + 'craydent-class')]; }catch(e){}
try { require.cache[require.resolve(pre + 'craydent-cli')] && delete require.cache[require.resolve(pre + 'craydent-cli')]; }catch(e){}
try { require.cache[require.resolve(pre + 'craydent-control-flow')] && delete require.cache[require.resolve(pre + 'craydent-control-flow')]; }catch(e){}
try { require.cache[require.resolve(pre + 'craydent-date')] && delete require.cache[require.resolve(pre + 'craydent-date')]; }catch(e){}
try { require.cache[require.resolve(pre + 'craydent-fs')] && delete require.cache[require.resolve(pre + 'craydent-fs')]; }catch(e){}
try { require.cache[require.resolve(pre + 'craydent-function')] && delete require.cache[require.resolve(pre + 'craydent-function')]; }catch(e){}
try { require.cache[require.resolve(pre + 'craydent-http')] && delete require.cache[require.resolve(pre + 'craydent-http')]; }catch(e){}
try { require.cache[require.resolve(pre + 'craydent-json-parser')] && delete require.cache[require.resolve(pre + 'craydent-json-parser')]; }catch(e){}
try { require.cache[require.resolve(pre + 'craydent-number')] && delete require.cache[require.resolve(pre + 'craydent-number')]; }catch(e){}
try { require.cache[require.resolve(pre + 'craydent-object')] && delete require.cache[require.resolve(pre + 'craydent-object')]; }catch(e){}
try { require.cache[require.resolve(pre + 'craydent-regexp')] && delete require.cache[require.resolve(pre + 'craydent-regexp')]; }catch(e){}
try { require.cache[require.resolve(pre + 'craydent-string')] && delete require.cache[require.resolve(pre + 'craydent-string')]; }catch(e){}
try { require.cache[require.resolve(pre + 'craydent-template')] && delete require.cache[require.resolve(pre + 'craydent-template')]; }catch(e){}
try { require.cache[require.resolve(pre + 'craydent-typeof')] && delete require.cache[require.resolve(pre + 'craydent-typeof')]; }catch(e){}
try { require.cache[require.resolve(pre + 'craydent-utility')] && delete require.cache[require.resolve(pre + 'craydent-utility')]; }catch(e){}
try { require.cache[require.resolve(pre + 'craydent-xml-to-json')] && delete require.cache[require.resolve(pre + 'craydent-xml-to-json')]; }catch(e){}


try { require.cache[require.resolve('../noConflict.js')] && delete require.cache[require.resolve('../noConflict.js')]; }catch(e){}
try { require.cache[require.resolve('../global.js')] && delete require.cache[require.resolve('../global.js')]; }catch(e){}
try { require.cache[require.resolve('../craydent.js')] && delete require.cache[require.resolve('../craydent.js')]; }catch(e){}
var $c = require(pre + 'craydent-typeof');
$c.DEBUG_MODE = true;
describe ('Object', function () {
    it('isArray',function(){
        expect([].isArray()).toBe(true);
        expect((true).isArray()).toBe(false);
        expect((new Date()).isArray()).toBe(false);
        expect(({nodeType:1}).isArray()).toBe(false);
        expect((2.001).isArray()).toBe(false);
        expect((function(){}).isArray()).toBe(false);
        expect((function*(){}).isArray()).toBe(false);
        expect((2).isArray()).toBe(false);
        expect(((new Promise(function(){}))).isArray()).toBe(false);
        expect(({}).isArray()).toBe(false);
        expect((/k/).isArray()).toBe(false);
        expect(("").isArray()).toBe(false);
    });
    it('isBetween',function(){
        expect((10).isBetween(11,9)).toBe(false);
        expect((10).isBetween(9,11)).toBe(true);
        expect((10).isBetween(10,11)).toBe(false);
        expect((10).isBetween(10,11,true)).toBe(true);
        expect(("b").isBetween("a","c")).toBe(true);
        expect(("b").isBetween("b","c")).toBe(false);
        expect(("b").isBetween("b","c",true)).toBe(true);
    });
    it('isBoolean',function(){
        expect([].isBoolean()).toBe(false);
        expect((true).isBoolean()).toBe(true);
        expect((new Date()).isBoolean()).toBe(false);
        expect(({nodeType:1}).isBoolean()).toBe(false);
        expect((2.001).isBoolean()).toBe(false);
        expect((function(){}).isBoolean()).toBe(false);
        expect((function*(){}).isBoolean()).toBe(false);
        expect((2).isBoolean()).toBe(false);
        expect((new Promise(function(){})).isBoolean()).toBe(false);
        expect(({}).isBoolean()).toBe(false);
        expect((/k/).isBoolean()).toBe(false);
        expect(("").isBoolean()).toBe(false);
    });
    it('isDate',function(){
        expect(([]).isDate()).toBe(false);
        expect((true).isDate()).toBe(false);
        expect((new Date()).isDate()).toBe(true);
        expect(({nodeType:1}).isDate()).toBe(false);
        expect((2.001).isDate()).toBe(false);
        expect((function(){}).isDate()).toBe(false);
        expect((function*(){}).isDate()).toBe(false);
        expect((2).isDate()).toBe(false);
        expect((new Promise(function(){})).isDate()).toBe(false);
        expect(({}).isDate()).toBe(false);
        expect((/k/).isDate()).toBe(false);
        expect(("").isDate()).toBe(false);

    });
    it('isDomElement',function(){
        expect(([]).isDomElement()).toBe(false);
        expect((true).isDomElement()).toBe(false);
        expect((new Date()).isDomElement()).toBe(false);
        expect(({nodeType:1}).isDomElement()).toBe(true);
        expect((2.001).isDomElement()).toBe(false);
        expect((function(){}).isDomElement()).toBe(false);
        expect((function*(){}).isDomElement()).toBe(false);
        expect((2).isDomElement()).toBe(false);
        expect((new Promise(function(){})).isDomElement()).toBe(false);
        expect(({}).isDomElement()).toBe(false);
        expect((/k/).isDomElement()).toBe(false);
        expect(("").isDomElement()).toBe(false);

    });
    it('isEmpty',function(){
        expect((function(){}).isEmpty()).toBe(true);
        expect(({}).isEmpty()).toBe(true);
        expect(([]).isEmpty()).toBe(true);


        expect((function(){ var b; }).isEmpty()).toBe(false);
        expect(({hi:""}).isEmpty()).toBe(false);
        expect((['']).isEmpty()).toBe(false);
    });
    it('isFloat',function(){
        expect(([]).isFloat()).toBe(false);
        expect((true).isFloat()).toBe(false);
        expect((new Date()).isFloat()).toBe(false);
        expect(({nodeType:1}).isFloat()).toBe(false);
        expect((2.001).isFloat()).toBe(true);
        expect((function(){}).isFloat()).toBe(false);
        expect((function*(){}).isFloat()).toBe(false);
        expect((2).isFloat()).toBe(true);
        expect((new Promise(function(){})).isFloat()).toBe(false);
        expect(({}).isFloat()).toBe(false);
        expect((/k/).isFloat()).toBe(false);
        expect(("").isFloat()).toBe(false);

    });
    it('isFunction',function(){
        expect(([]).isFunction()).toBe(false);
        expect((true).isFunction()).toBe(false);
        expect((new Date()).isFunction()).toBe(false);
        expect(({nodeType:1}).isFunction()).toBe(false);
        expect((2.001).isFunction()).toBe(false);
        expect((function(){}).isFunction()).toBe(true);
        expect((function*(){}).isFunction()).toBe(false);
        expect((2).isFunction()).toBe(false);
        expect((new Promise(function(){})).isFunction()).toBe(false);
        expect(({}).isFunction()).toBe(false);
        expect((/k/).isFunction()).toBe(false);
        expect(("").isFunction()).toBe(false);

    });
    it('isGenerator',function(){
        expect(([]).isGenerator()).toBe(false);
        expect((true).isGenerator()).toBe(false);
        expect((new Date()).isGenerator()).toBe(false);
        expect(({nodeType:1}).isGenerator()).toBe(false);
        expect((2.001).isGenerator()).toBe(false);
        expect((function(){}).isGenerator()).toBe(false);
        expect((function*(){}).isGenerator()).toBe(true);
        expect((2).isGenerator()).toBe(false);
        expect((new Promise(function(){})).isGenerator()).toBe(false);
        expect(({}).isGenerator()).toBe(false);
        expect((/k/).isGenerator()).toBe(false);
        expect(("").isGenerator()).toBe(false);

    });
    it('isGeolocation',function(){
        function Geolocation () {};
        var g = new Geolocation();
        expect(([]).isGeolocation()).toBe(false);
        expect((g).isGeolocation()).toBe(true);
    });
    it('isInt',function(){
        expect(([]).isInt()).toBe(false);
        expect((true).isInt()).toBe(false);
        expect((new Date()).isInt()).toBe(false);
        expect(({nodeType:1}).isInt()).toBe(false);
        expect((2.001).isInt()).toBe(false);
        expect((function(){}).isInt()).toBe(false);
        expect((function*(){}).isInt()).toBe(false);
        expect((2).isInt()).toBe(true);
        expect((new Promise(function(){})).isInt()).toBe(false);
        expect(({}).isInt()).toBe(false);
        expect((/k/).isInt()).toBe(false);
        expect(("").isInt()).toBe(false);

    });
    it('isNumber',function(){
        expect(([]).isNumber()).toBe(false);
        expect((true).isNumber()).toBe(false);
        expect((new Date()).isNumber()).toBe(false);
        expect(({nodeType:1}).isNumber()).toBe(false);
        expect((2.001).isNumber()).toBe(true);
        expect((function(){}).isNumber()).toBe(false);
        expect((function*(){}).isNumber()).toBe(false);
        expect((2).isNumber()).toBe(true);
        expect((new Promise(function(){})).isNumber()).toBe(false);
        expect(({}).isNumber()).toBe(false);
        expect((/k/).isNumber()).toBe(false);
        expect(("").isNumber()).toBe(false);

    });
    it('isPromise',function(){
        expect(([]).isPromise()).toBe(false);
        expect((true).isPromise()).toBe(false);
        expect((new Date()).isPromise()).toBe(false);
        expect(({nodeType:1}).isPromise()).toBe(false);
        expect((2.001).isPromise()).toBe(false);
        expect((function(){}).isPromise()).toBe(false);
        expect((function*(){}).isPromise()).toBe(false);
        expect((2).isPromise()).toBe(false);
        expect((new Promise(function(){})).isPromise()).toBe(true);
        expect(({}).isPromise()).toBe(false);
        expect((/k/).isPromise()).toBe(false);
        expect(("").isPromise()).toBe(false);

    });
    it('isObject',function(){
        expect(([]).isObject()).toBe(false);
        expect((true).isObject()).toBe(false);
        expect((new Date()).isObject()).toBe(false);
        expect(({nodeType:1}).isObject()).toBe(true);
        expect((2.001).isObject()).toBe(false);
        expect((function(){}).isObject()).toBe(false);
        expect((function*(){}).isObject()).toBe(false);
        expect((2).isObject()).toBe(false);
        expect((new Promise(function(){})).isObject()).toBe(false);
        expect(({}).isObject()).toBe(true);
        expect((/k/).isObject()).toBe(false);
        expect(("").isObject()).toBe(false);

    });
    it('isRegExp',function(){
        expect(([]).isRegExp()).toBe(false);
        expect((true).isRegExp()).toBe(false);
        expect((new Date()).isRegExp()).toBe(false);
        expect(({nodeType:1}).isRegExp()).toBe(false);
        expect((2.001).isRegExp()).toBe(false);
        expect((function(){}).isRegExp()).toBe(false);
        expect((function*(){}).isRegExp()).toBe(false);
        expect((2).isRegExp()).toBe(false);
        expect((new Promise(function(){})).isRegExp()).toBe(false);
        expect(({}).isRegExp()).toBe(false);
        expect((/k/).isRegExp()).toBe(true);
        expect(("").isRegExp()).toBe(false);

    });
    it('isString',function(){
        expect(([]).isString()).toBe(false);
        expect((true).isString()).toBe(false);
        expect((new Date()).isString()).toBe(false);
        expect(({nodeType:1}).isString()).toBe(false);
        expect((2.001).isString()).toBe(false);
        expect((function(){}).isString()).toBe(false);
        expect((function*(){}).isString()).toBe(false);
        expect((2).isString()).toBe(false);
        expect((new Promise(function(){})).isString()).toBe(false);
        expect(({}).isString()).toBe(false);
        expect((/k/).isString()).toBe(false);
        expect(("").isString()).toBe(true);

    });
});