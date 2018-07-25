var pre = require('../_prep');
var $c = require(pre + 'craydent-object');
var $m = require('../_methods')(pre);
$c.DEBUG_MODE = true;
describe ('Object', function () {
    it('changes',function(){
        var obj1 = {id:1,prop1:"prop1",prop3:""};
        var obj2 = {id:2,prop1:"propupdated",prop2:"prop2"};
        expect(obj1.changes(obj2)).toEqual({
            $length:4,
            $add:['prop2'],
            $update:["id","prop1"],
            $delete:["prop3"],
            id:2,
            prop1:"propupdated",
            prop2:"prop2",
            prop3:null
        });

    });
    it('contains - string/string',function(){
        expect("asdf".contains("a")).toBe(true);
        expect("asdf".contains("e")).toBe(false);
    });
    it('contains - string/regex',function(){
        expect("asdf".contains(/^as/)).toBe(true);
        expect("asdf".contains(/ad/)).toBe(false);
    });
    it('contains - array/string',function(){
        expect(['q','b'].contains("b")).toBe(true);
        expect(['q','b'].contains("c")).toBe(false);
    });
    it('contains - array/regex',function(){
        expect(['q','b'].contains(/b/)).toBe(true);
    });
    it('contains - array/array',function(){
        expect(['q','b'].contains(['a','c'])).toBe(false);
        expect(['q','b'].contains(['a','q'])).toBe("q");
    });
    it('contains - array/value/func',function(){
        expect(['q','b'].contains('a',function(){ return 'a';})).toBe(true);
    });
    it('contains - array/func',function(){
        expect(['q','b'].contains(function(val,prop,arr){ return val=='b';})).toBe(true);
    });
    it('contains - object/string',function(){
        expect({q:"asdf",b:"abbb"}.contains("abbb")).toBe(true);
        expect({q:"asdf",b:"abbb"}.contains("asdfb")).toBe(false);
    });
    it('copyObject',function(){
        function B(){ this.hi = "hello"; }
        var b = new B();
        var tb = b.copyObject();
        expect(tb).toEqual({hi:"hello"});
        expect(tb.constructor).not.toEqual(B);
    });
    it('duplicate - object',function(){
        var obj = {hi:"hello",bye:"ciao",o:{blah:''}};
        var tobj = obj.duplicate();
        expect(tobj).not.toBe(obj);
        expect(tobj.o).toBe(tobj.o);
        tobj = obj.duplicate(true);
        expect(tobj.o).not.toBe(obj.o);
    });
    it('duplicate - class',function(){
        function B(){ this.hi = "hello"; }
        var b = new B();
        var tb = b.duplicate();
        expect(tb).toEqual({hi:"hello"});
        expect(tb.constructor).toEqual(B);
    });
    it('duplicate - recursive',function(){
        function A(){console.log('');}
        var obj = {use:A};
        var obj2 = obj.duplicate(true);
        var obj3 = obj.duplicate();
        expect(obj.use).toEqual(A);
        expect(obj2).not.toBe(obj);
        expect(obj2.use).not.toBe(obj.use);
        expect(obj3.use).toBe(obj.use);
    });
    it('eachProperty',function(){
        var arrp = [], arrv = [], obj = {a:"a1",b:'b1',c:'c1'};
        obj.eachProperty(function(val,prop){
            arrp.push(prop);
            arrv.push(val);
        });
        expect(arrp).toEqual(['a','b','c']);
        expect(arrv).toEqual(['a1','b1','c1']);
    });
    it('equals - string',function(){
        expect("s".equals("s")).toBe(true);
        expect("s".equals("ss")).toBe(false);
    });
    it('equals - number',function(){
        expect((0).equals(0)).toBe(true);
        expect((1).equals(2)).toBe(false);
    });
    it('equals - object',function(){
        expect({}.equals({})).toBe(true);
        expect({}.equals({hi:''})).toBe(false);
    });
    it('equals - object with specified property',function(){
        expect({hi:'',bye:''}.equals({hi:''},['hi'])).toBe(true);
    });
    it('equals - array',function(){
        expect([].equals([])).toBe(true);
        expect([].equals([''])).toBe(false);

    });
    it('every - array',function(){
        expect(['a','b','c'].every(function(val,prop,arr){ return val; })).toBe(true);
        expect(['a','','c'].every(function(val,prop,arr){ return val; })).toBe(false);
    });
    it('every - object',function(){
        expect({a:'a',b:'b',c:'c'}.every(function(val,prop,arr){ return val; })).toBe(true);
        expect({a:'a',b:'',c:'c'}.every(function(val,prop,arr){ return val; })).toBe(false);

    });
    it('getClass',function(){
        function C1() {}
        var c = new C1();
        expect(c.getClass()).toBe("C1");
    });
    it('getProperty',function(){
        var o = {path:{path:"hello world",arr:[{foo:"bar"}]}};
        expect(o.getProperty("path.path")).toBe("hello world");
        expect(o.getProperty("path.arr.foo")).toBe(undefined);
        expect(o.getProperty("path.arr.0.foo")).toBe("bar");
    });
    var f = function(num){return (num || 0 ) + 1; };
    var n = 10;
    var s = "s";
    var o = {};
    var a = [];
    it('getValue - no default',function(){
        expect(f.getValue()).toBe(1);
        expect(n.getValue()).toBe(10);
        expect(s.getValue()).toBe("s");
        expect(o.getValue()).toEqual({});
        expect(a.getValue()).toEqual([]);
    });
    it('getValue - with default',function(){
        expect($m.foo.getValue([-1],1)).toBe(1);
        expect($c.getValue(null,n)).toBe(10);
        expect($c.getValue(null,s)).toBe("s");
        expect($c.getValue(null,o)).toEqual({});
        expect($c.getValue(null,a)).toEqual([]);
    });
    it('has',function(){
        var obj = {hi:""};
        expect(obj.has("hi")).toBe(true);
        expect(obj.has("hasOwnProperty")).toBe(false);

    });
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
    it('isBetween - number',function(){
        expect((10).isBetween(11,9)).toBe(false);
        expect((10).isBetween(9,11)).toBe(true);
        expect((10).isBetween(10,11)).toBe(false);
        expect((10).isBetween(10,11,true)).toBe(true);
    });
    it('isBetween - string',function(){
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
    it('isEmpty - function',function(){
        expect((function(){}).isEmpty()).toBe(true);
        expect((function(){ var b; }).isEmpty()).toBe(false);
    });
    it('isEmpty - object',function(){
        expect(({}).isEmpty()).toBe(true);
        expect(({hi:""}).isEmpty()).toBe(false);
    });
    it('isEmpty - array',function(){
        expect(([]).isEmpty()).toBe(true);
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
    it('itemCount',function(){
        var obj = {hi:""};
        expect((obj).itemCount()).toBe(1);
        expect(({}).itemCount()).toBe(0);
        expect($c.itemCount(undefined)).toBe(undefined);
    });
    it('keyOf',function(){
        expect(({hi:"hello",world:"worlds"}).keyOf("worlds")).toBe("world");
        expect(({hi:"worlds",world:"worlds"}).keyOf("worlds")).toBe("hi");
    });
    it('map',function(){
        var obj = {hi:"hello",world:"world",index:1};
        var obj2 = obj.map(function(val){ return val += 10;});
        expect(obj).toEqual({hi:"hello",world:"world",index:1});
        expect(obj2).toEqual({hi:"hello10",world:"world10",index:11});
    });
    it('merge - single',function(){
        var obj1 = {id:1,prop1:"prop1"};
        var obj2 = {id:2,prop2:"prop2"};
        var merged = obj1.merge(obj2);
        expect(merged).toBe(obj1);
        merged = obj1.merge(obj2,{clone:true});
        expect(merged).not.toBe(obj1);
        obj1 = {id:1,prop1:"prop1"};
        obj2 = {id:2,prop2:"prop2"};
        expect(obj1.merge(obj2,{onlyShared:true,clone:true})).toEqual({id:2,prop1:"prop1"});
        expect(obj1.merge(obj2,{intersect:true,clone:true})).toEqual({id:2});
        obj1 = {id:1,prop1:{p1:"adsf"},arr:[]};
        obj2 = {id:2,prop1:{p2:";lkj"},arr:['1234']};
        expect(obj1.merge(obj2,{recurse:true})).toEqual({id:2,prop1:{p1:"adsf",p2:";lkj"},arr:['1234']});
    });
    it('merge - multi',function(){
        var a = {a:"a"}, b = {b:"b"}, c = {c:"c"}, d = {d:"d"};
        expect(a.merge(b,c,d)).toEqual({a:"a", b:"b", c:"c", d:"d"});
    });
    it('setProperty',function(){
        var o = {};
        expect(o.setProperty("path.path","hello world")).toBe(true);
        expect(o).toEqual({path:{path:"hello world"}});
        expect(o.setProperty("path.arr.0.foo","bar")).toBe(true);
        expect(o).toEqual({path:{path:"hello world",arr:[{foo:"bar"}]}});
    });
    var objToStringAlt = {hi:"hello ",place:"world"};
    it('toStringAlt - basic',function(){
        var objToStringAlt = {hi:"hello ",place:"world"};
        expect(objToStringAlt.toStringAlt()).toBe("&hi=hello &place=world");
        expect(objToStringAlt.toStringAlt("-")).toBe("&hi-hello &place-world");
        expect(objToStringAlt.toStringAlt("=","@")).toBe("@hi=hello @place=world");
    });
    it('toStringAlt - encode uri',function(){
        expect(objToStringAlt.toStringAlt("=","@",true)).toBe("@hi=hello%20@place=world");
    });
});
