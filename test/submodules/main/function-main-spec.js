const pre = require('../_prep')();
let path = '../../../index.js';
if (process.env.name == 'single') { path = `${pre}craydent-function`; }
const $c = require(path);
var $m = require('../_methods')(pre);
var foo = $m.foo;
describe ('Function', function () {
	function temp (par1,par2) {
		this.p = 1;
		this.p2 = 2;
	}
	it('getParameters',function(){
		expect(temp.getParameters()).toEqual(['par1','par2']);
	});
	it('getName',function(){
		expect(temp.getName()).toEqual('temp');
	});
	it('extends',function(){
        function cls(){
            this.p3 = 0;
        }
		cls.extends(temp);
        var clz = new cls();

        expect(clz.p).toEqual(1);
        expect(clz.p2).toEqual(2);
        expect(clz.p3).toEqual(0);
		expect(clz.construct.name).toEqual(foo.name);

	});
	it('on',function(){
		function testEmit() { return $c.emit('listener'); }
		testEmit.on('listener',function(){ return 'hello world'; });
		testEmit.on('listener',function(){ return 'hello world again'; });

		expect(testEmit()).toEqual(['hello world','hello world again']);
	});
	it('then',function(){
		function testNext() { return $c.next(); }
		testNext.then(function(){ return 'hello world'; });
		expect(testNext()).toEqual(['hello world']);
	});
	it('catch',function(){
		function testNext() { return $c.next(); }
		testNext.then(function(){ throw 'adsf'; });
		testNext.catch(function(){ return 'hello world'; });
		expect(testNext()).toEqual(['hello world']);

	});
});
