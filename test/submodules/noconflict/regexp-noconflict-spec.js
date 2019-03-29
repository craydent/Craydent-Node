const pre = require('../_prep')();
let path = '../../../noConflict.js';
if (process.env.name == 'single') { path = `${pre}craydent-date/noConflict.js`; }
const $c = require(path);
$c.DEBUG_MODE = true;
describe('No Conflict RegExp', function () {
	it('addFlags', function () {
		expect($c.addFlags(/a/, 'gim').source).toBe((/a/gim).source);
		expect($c.addFlags(/a/, 'igm').source).toBe((/a/igm).source);
		expect($c.addFlags(/a/, 'g').source).toBe((/a/g).source);
		expect($c.addFlags(/a/, 'i').source).toBe((/a/i).source);
		expect($c.addFlags(/a/, 'm').source).toBe((/a/m).source);
	});
});
