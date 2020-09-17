import $c from '../../transformed/function/noConflict';
import foo from '../../modules/methods/foo'

describe('No Conflict Function', function () {
	function temp(par1, par2) {
		this.p = 1;
		this.p2 = 2;
	}
	it('getParameters', function () {
		expect($c.getParameters(temp)).toEqual(['par1', 'par2']);
	});
	it('getName', function () {
		expect($c.getName(temp)).toEqual('temp');
	});
	it('extends', function () {
		function cls() {
			this.p3 = 0;
		}
		$c.extend(cls, temp as any);
		var clz = new cls();
		//console.log(cls.extends(temp).toString(), (new cls()).p1, cls.prototype);
		expect(clz.p).toEqual(1);
		expect(clz.p2).toEqual(2);
		expect(clz.p3).toEqual(0);
		expect(clz.construct.name).toEqual(foo.name);

	});
	it('on', function () {
		function testEmit() { return $c.emit('listener'); }
		$c.on(testEmit, 'listener', function () { return 'hello world'; });
		$c.on(testEmit, 'listener', function () { return 'hello world again'; });

		expect(testEmit()).toEqual(['hello world', 'hello world again']);
	});
	it('then', function () {
		function testNext() { return $c.next(); }
		$c.then(testNext, function () { return 'hello world'; });
		expect(testNext()).toEqual(['hello world']);
	});
	it('catch', function () {
		function testNext() { return $c.next(); }
		$c.then(testNext, function () { throw 'adsf'; });
		$c.catch(testNext, function () { return 'hello world'; });
		expect(testNext()).toEqual(['hello world']);

	});
});