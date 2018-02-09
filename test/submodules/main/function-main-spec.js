var pre = "@craydent/";
delete global.$c;
delete global.__craydentNoConflict;
delete global.navigator;

try { require.cache[require.resolve('../../../common.js')] && delete require.cache[require.resolve('../../../common.js')]; }catch(e){}
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

try { require.cache[require.resolve(pre + 'craydent-array/noConflict')] && delete require.cache[require.resolve(pre + 'craydent-array/noConflict')]; }catch(e){}
try { require.cache[require.resolve(pre + 'craydent-class/noConflict')] && delete require.cache[require.resolve(pre + 'craydent-class/noConflict')]; }catch(e){}
try { require.cache[require.resolve(pre + 'craydent-cli/noConflict')] && delete require.cache[require.resolve(pre + 'craydent-cli/noConflict')]; }catch(e){}
try { require.cache[require.resolve(pre + 'craydent-control-flow/noConflict')] && delete require.cache[require.resolve(pre + 'craydent-control-flow/noConflict')]; }catch(e){}
try { require.cache[require.resolve(pre + 'craydent-date/noConflict')] && delete require.cache[require.resolve(pre + 'craydent-date/noConflict')]; }catch(e){}
try { require.cache[require.resolve(pre + 'craydent-fs/noConflict')] && delete require.cache[require.resolve(pre + 'craydent-fs/noConflict')]; }catch(e){}
try { require.cache[require.resolve(pre + 'craydent-function/noConflict')] && delete require.cache[require.resolve(pre + 'craydent-function/noConflict')]; }catch(e){}
try { require.cache[require.resolve(pre + 'craydent-http/noConflict')] && delete require.cache[require.resolve(pre + 'craydent-http/noConflict')]; }catch(e){}
try { require.cache[require.resolve(pre + 'craydent-json-parser/noConflict')] && delete require.cache[require.resolve(pre + 'craydent-json-parser/noConflict')]; }catch(e){}
try { require.cache[require.resolve(pre + 'craydent-number/noConflict')] && delete require.cache[require.resolve(pre + 'craydent-number/noConflict')]; }catch(e){}
try { require.cache[require.resolve(pre + 'craydent-object/noConflict')] && delete require.cache[require.resolve(pre + 'craydent-object/noConflict')]; }catch(e){}
try { require.cache[require.resolve(pre + 'craydent-regexp/noConflict')] && delete require.cache[require.resolve(pre + 'craydent-regexp/noConflict')]; }catch(e){}
try { require.cache[require.resolve(pre + 'craydent-string/noConflict')] && delete require.cache[require.resolve(pre + 'craydent-string/noConflict')]; }catch(e){}
try { require.cache[require.resolve(pre + 'craydent-template/noConflict')] && delete require.cache[require.resolve(pre + 'craydent-template/noConflict')]; }catch(e){}
try { require.cache[require.resolve(pre + 'craydent-typeof/noConflict')] && delete require.cache[require.resolve(pre + 'craydent-typeof/noConflict')]; }catch(e){}
try { require.cache[require.resolve(pre + 'craydent-utility/noConflict')] && delete require.cache[require.resolve(pre + 'craydent-utility/noConflict')]; }catch(e){}
try { require.cache[require.resolve(pre + 'craydent-xml-to-json/noConflict')] && delete require.cache[require.resolve(pre + 'craydent-xml-to-json/noConflict')]; }catch(e){}


try { require.cache[require.resolve('../../../noConflict.js')] && delete require.cache[require.resolve('../../../noConflict.js')]; }catch(e){}
try { require.cache[require.resolve('../../../global.js')] && delete require.cache[require.resolve('../../../global.js')]; }catch(e){}
try { require.cache[require.resolve('../../../craydent.js')] && delete require.cache[require.resolve('../../../craydent.js')]; }catch(e){}


require.cache[require.resolve(pre + 'craydent-function/noConflict.js')] && delete require.cache[require.resolve(pre + 'craydent-function/noConflict.js')];
var $c = require(pre + 'craydent-function');
$c.DEBUG_MODE = true;
function foo () {
    /*|{
        "info": "Place holder function for a blank function",
        "category": "Utility",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#foo",
        "returnType": "(void)"
    }|*/
}
describe ('No Conflict Function', function () {
	function temp (par1,par2) {
		this.p = 1;
		this.p2 = 2;
	}
	it('getParameters',function(){
		expect($c.getParameters(temp)).toEqual(['par1','par2']);
	});
	it('getName',function(){
		expect($c.getName(temp)).toEqual('temp');
	});
	it('extends',function(){
        function cls(){
            this.p3 = 0;
        }
        $c.extends(cls,temp);
        var clz = new cls();
        //console.log(cls.extends(temp).toString(), (new cls()).p1, cls.prototype);
        expect(clz.p).toEqual(1);
        expect(clz.p2).toEqual(2);
        expect(clz.p3).toEqual(0);
        expect(clz.construct.toString()).toEqual(foo.toString());

	});
	it('on',function(){
		function testEmit() { return $c.emit('listener'); }
		$c.on(testEmit,'listener',function(){ return 'hello world'; });
		$c.on(testEmit,'listener',function(){ return 'hello world again'; });

		expect(testEmit()).toEqual(['hello world','hello world again']);
	});
	it('then',function(){
		function testNext() { return $c.next(); }
		$c.then(testNext,function(){ return 'hello world'; });
		expect(testNext()).toEqual(['hello world']);
	});
	it('catch',function(){
		function testNext() { return $c.next(); }
		$c.then(testNext,function(){ throw 'adsf'; });
		$c.catch(testNext,function(){ return 'hello world'; });
		expect(testNext()).toEqual(['hello world']);

	});
});
