var pre = require('../_prep');
var $c = require(pre + 'craydent-regexp');
$c.DEBUG_MODE = true;
describe ('RegExp', function () {
    it('addFlags',function(){
        expect(/a/.addFlags('gim').source).toBe((/a/gim).source);
        expect(/a/.addFlags('igm').source).toBe((/a/igm).source);
        expect(/a/.addFlags('g').source).toBe((/a/g).source);
        expect(/a/.addFlags('i').source).toBe((/a/i).source);
        expect(/a/.addFlags('m').source).toBe((/a/m).source);
    });
});
