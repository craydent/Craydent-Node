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
var $c = require(pre + 'craydent-date');
$c.DEBUG_MODE = true;
describe ('Date', function () {
    it('format',function(){
        var date = new Date('1/8/2016 13:00:00');

        expect(date.format('m/d/Y')).toBe("01/08/2016");

        // Day
        expect(date.format('d')).toBe('08');
        expect(date.format('%d')).toBe('08');
        expect(date.format('D')).toBe('Fri');
        expect(date.format('j')).toBe('8');
        expect(date.format('l')).toBe('Friday');
        expect(date.format('N')).toBe('5');
        expect(date.format('S')).toBe('th');
        expect(date.format('w')).toBe('5');
        expect(date.format('%w')).toBe('6');
        expect(date.format('z')).toBe('7');
        expect(date.format('%j')).toBe('8');

        // Week
        expect(date.format('W')).toBe('1');
        expect(date.format('%U')).toBe('01');

        // Month
        expect(date.format('F')).toBe('January');
        expect(date.format('m')).toBe('01');
        expect(date.format('%m')).toBe('01');
        expect(date.format('M')).toBe('Jan');
        expect(date.format('%M')).toBe('Jan');
        expect(date.format('n')).toBe('1');
        expect(date.format('t')).toBe('31');

        // Year
        expect(date.format('L')).toBe('1');
        expect(date.format('o')).toBe('2016');
        expect(date.format('Y')).toBe('2016');
        expect(date.format('%Y')).toBe('2016');
        expect(date.format('y')).toBe('16');

        // Time
        expect(date.format('a')).toBe('pm');
        expect(date.format('A')).toBe('PM');
        expect(date.format('B')).toBe('916');
        expect(date.format('g')).toBe('1');
        expect(date.format('G')).toBe('13');
        expect(date.format('h')).toBe('01');
        expect(date.format('H')).toBe('13');
        expect(date.format('i')).toBe('00');
        expect(date.format('s')).toBe('00');
        expect(date.format('u')).toBe((date.getTime() * 1000).toString());
        expect(date.format('%L')).toBe((date.getTime()).toString());

        // Timezone
        expect(date.format('e')).toBe('Pacific Standard Time (North America)');
        expect(date.format('I')).toBe('1');
        expect(date.format('O')).toBe('-0800');
        expect(date.format('P')).toBe('-08:00');
        expect(date.format('T')).toBe('PST');
        expect(date.format('Z')).toBe('480');

        // Other
        expect(date.format('c')).toBe('2016-01-08T21:00:00.000Z');
        expect(date.format('r')).toBe('Fri, 08 Jan 2016 13:00:00 -0800');
        expect(date.format('U')).toBe('1452286800');

        expect(date.format('yymmdd')).toBe('161601010808');
    });
    it('getDayOfYear',function(){
        expect($c.getDayOfYear(new Date('1/1/2016'))).toBe(1);
        expect($c.getDayOfYear(new Date('3/1/2016'))).toBe(61);
    });
    it('getWeek',function(){
        expect($c.getWeek(new Date('1/1/2016'))).toBe(1);
        expect($c.getWeek(new Date('1/8/2016'))).toBe(2);
        expect($c.getWeek(new Date('2/1/2016'))).toBe(6);
        expect($c.getWeek(new Date('2/7/2016'))).toBe(7);
        expect($c.getWeek(new Date('12/31/2016'))).toBe(53);
    });
    it('isValidDate',function(){
        var ndate = new Date('adsfaf');
        expect($c.isValidDate(ndate)).toBe(false);
        expect($c.isValidDate(new Date())).toBe(true);
    });
});