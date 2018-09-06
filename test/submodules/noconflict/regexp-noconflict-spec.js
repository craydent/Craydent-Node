var pre = require('../_prep');
var $c;
if (process.env.name == 'single') { $c = require(pre + 'craydent-regexp/noConflict.js'); }
else { $c = require('../../../noConflict.js'); }
$c.DEBUG_MODE = true;
describe ('No Conflict RegExp', function () {
	it('addFlags',function(){
		expect($c.addFlags(/a/,'gim').source).toBe((/a/gim).source);
		expect($c.addFlags(/a/,'igm').source).toBe((/a/igm).source);
		expect($c.addFlags(/a/,'g').source).toBe((/a/g).source);
		expect($c.addFlags(/a/,'i').source).toBe((/a/i).source);
		expect($c.addFlags(/a/,'m').source).toBe((/a/m).source);
	});
});
