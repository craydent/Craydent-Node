var pre = require('../_prep');
var $c;
if (process.env.name == 'single') { $c = require(pre + 'craydent-number'); }
else { $c = require('../../../craydent.js'); }
$c.DEBUG_MODE = true;
describe ('Number', function () {
    it('aboutEqualTo',function(){
        expect((10).aboutEqualTo(9,1)).toBe(true);
        expect((10).aboutEqualTo(9,1.1)).toBe(true);
        expect((10).aboutEqualTo(9,0.9)).toBe(false);
        expect((8).aboutEqualTo(9,1)).toBe(true);
        expect((8).aboutEqualTo(9,1.1)).toBe(true);
        expect((8).aboutEqualTo(9,0.9)).toBe(false);
        expect((7).aboutEqualTo(9,1.1)).toBe(false);
    });
    it('isOdd',function(){
        expect((10).isOdd()).toBe(false);
        expect((9).isOdd()).toBe(true);
    });
    it('isEven',function(){
        expect((10).isEven()).toBe(true);
        expect((9).isEven()).toBe(false);
    });

    it('toCurrencyNotation',function(){
        expect((1000).toCurrencyNotation()).toBe("1,000");
        expect((1000000).toCurrencyNotation()).toBe("1,000,000");
        expect((1000).toCurrencyNotation('.')).toBe('1.000');
    });

});
