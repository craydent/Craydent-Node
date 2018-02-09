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
var $c = require(pre + 'craydent-string');
var $s = require('../../../common.js');
function cuid(msFormat) {
    /*|{
        "info": "Creates a Craydent/Global Unique Identifier",
        "category": "Global",
        "parameters":[
            {"msFormat": "(Bool) use microsoft format if true"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#cuid",
        "returnType": "(String)"
    }|*/
    try {
        var pr = "", pt = "";
        msFormat && (pr="{",pt="}");
        return pr + 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
                return v.toString(16);
            }) + pt;
    } catch (e) {
        error('cuid', e);
    }
}
$s.cuid = cuid;
$c.DEBUG_MODE = true;
describe ('String', function () {
    it('capitalize',function(){
        expect("word of the day".capitalize()).toBe("Word of the day");
        expect("word of the day".capitalize(1)).toBe("wOrd of the day");
        expect("word of the day".capitalize(0,true)).toBe("Word Of The Day");
        expect("word of the day".capitalize(1,true)).toBe("wOrd oF tHe dAy");
    });
    it('convertUTCDate',function(){
        expect("2016/12/13 10:01:33".convertUTCDate("/")).toBe("12/13/2016 10:01:33");
        expect("2016.12.13 10:01:33".convertUTCDate( ".")).toBe("12/13/2016 10:01:33");
        expect("2016-12-13 10:01:33".convertUTCDate( "-")).toBe("12/13/2016 10:01:33");
    });
    it('count',function(){
        expect("calaiedc8a".count("a")).toBe(3);
        expect("calaiedc8a".count("c")).toBe(2);
        expect("calaiedc8a".count("-")).toBe(0);
    });
    it('cut',function(){
        expect("cala".cut(1,2)).toBe("cla");
        expect("cala".cut(1,2,"p")).toBe("cpla");
    });
    it('ellipsis',function(){
        expect("calasdfadfasdfasdfadf".ellipsis(1)).toBe("c...alasdfadfasdfasdfadf");
        expect("calasdfadfasdfasdfadf".ellipsis(1,2)).toBe("c...df");
    });
    it('endsWithAny',function(){
        expect("calasdfadfasdfasdfadf".endsWithAny('a','p','f')).toBe("f");
        expect("calasdfadfasdfasdfadf".endsWithAny(['a','p','f'])).toBe("f");
        expect("calasdfadfasdfasdfadf".endsWithAny('a')).toBe(false);
        expect("calasdfadfasdfasdfadf".endsWithAny(['a'])).toBe(false);
        expect("build".endsWithAny("build","pull","npm")).toBe("build");
        expect("pull".endsWithAny("build","pull","npm")).toBe("pull");
    });
    it('highlight',function(){
        expect("cal".highlight('a')).toBe("c<span class=\"chighlight\">a</span>l");
        expect("cal".highlight(/a/)).toBe("c<span class=\"chighlight\">a</span>l");
        expect("cal".highlight('a','chl')).toBe("c<span class=\"chl\">a</span>l");
        expect("cal".highlight(/a/,'chl')).toBe("c<span class=\"chl\">a</span>l");
        expect("cal".highlight('a',null,'div')).toBe("c<div class=\"chighlight\">a</div>l");
        expect("cal".highlight(/a/,null,'div')).toBe("c<div class=\"chighlight\">a</div>l");
        expect("cal".highlight('a',"chl",'div')).toBe("c<div class=\"chl\">a</div>l");
        expect("cal".highlight(/a/,"chl",'div')).toBe("c<div class=\"chl\">a</div>l");
    });
    it('indexOfAlt',function(){
        expect("cal".indexOfAlt(/a/)).toBe(1);
        expect("cala".indexOfAlt(/a/,2)).toBe(3);
    });
    it('ireplace_all',function(){
        expect("calA".ireplace_all('a','')).toBe('cl');
    });
    it('isCuid',function(){
        var c = $s.cuid();
        expect(c.isCuid()).toBe(true);
    });
    it('isBlank',function(){
        expect("cal".isBlank()).toBe(false);
        expect("".isBlank()).toBe(true);
    });
    it('isValidEmail',function(){
        expect("cal".isValidEmail()).toBe(false);
        expect("cal@craydent.com".isValidEmail()).toBe(true);
    });
    it('lastIndexOfAlt',function(){
        expect("caal".lastIndexOfAlt(/a/)).toBe(2);
        expect("caal".lastIndexOfAlt(/a/,0)).toBe(-1);
    });
    it('ltrim',function(){
        expect("     cal ".ltrim()).toBe("cal ");
        expect("     aacalaaa".ltrim('a')).toBe("     aacalaaa");
        expect("aacalaaa".ltrim('a')).toBe("calaaa");
    });
    it('pluralize',function(){
        expect("life".pluralize()).toBe("lives");
        expect("history".pluralize()).toBe("histories");
        expect("deer".pluralize()).toBe("deer");
    });
    it('replace_all',function(){
        expect("calA".replace_all('a','')).toBe("clA");
        expect("calaaa".replace_all('a','')).toBe("cl");
        expect("calaaa".replace_all('a','b')).toBe("cblbbb");
        expect("calaaa".replace_all(['c','a'],['d','b'])).toBe("dblbbb");
        expect("calaaa".replace_all(['c','a'],['b'])).toBe("bblbbb");
    });
    it('reverse',function(){
        expect("cal".reverse()).toBe("lac");
    });
    it('rtrim',function(){
        expect(" cal  ".rtrim()).toBe(" cal");
        expect("     aacalaaa".rtrim('a')).toBe("     aacal");
        expect("aacalaaa".rtrim('a')).toBe("aacal");
    });
    // TO/DO sanitize
    it('sanitize',function(){
        // expect($c.rtrim(" cal  ")).toBe(" cal");
        // expect($c.rtrim("     aacalaaa",'a')).toBe("     aacal");
        // expect($c.rtrim("aacalaaa",'a')).toBe("aacal");
    });
    it('singularize',function(){
        expect("lives".singularize()).toBe("life");
        expect("histories".singularize()).toBe("history");
        expect("deer".singularize()).toBe("deer");
    });
    it('startsWithAny',function(){
        expect("calasdfadfasdfasdfadf".startsWithAny('a','c','f')).toBe("c");
        expect("calasdfadfasdfasdfadf".startsWithAny(['a','c','f'])).toBe("c");
        expect("calasdfadfasdfasdfadf".startsWithAny('a')).toBe(false);
        expect("calasdfadfasdfasdfadf".startsWithAny(['a'])).toBe(false);
        expect("build".startsWithAny("build", "pull","npm")).toBe("build");
        expect("pull".startsWithAny("poull", "pull","npm")).toBe("pull");
    });
    it('strip',function(){
        expect("aaaaaaaaaaaacalaaaaaaaaaa".strip('a')).toBe("cal");
        expect("aaaaaaaaaaaacalaaaaaaaaaab".strip('a')).toBe("calaaaaaaaaaab");
        expect("aaaaaaaaaaaacalaaaaaaaaaa".strip(['a','l'])).toBe('c');
    });
    it('toCurrencyNotation',function(){
        expect("1000".toCurrencyNotation()).toBe("1,000");
        expect("1000000".toCurrencyNotation()).toBe("1,000,000");
        expect("1000".toCurrencyNotation('.')).toBe('1.000');
    });
    it('toDateTime',function(){
        //console.log($c.toDateTime("30-12-2012"));
        expect("30-12-2012".toDateTime()).toEqual(new Date("12/30/2012"));
        expect("30.12.2012".toDateTime()).toEqual(new Date("12/30/2012"));
        expect("2012-12-30".toDateTime()).toEqual(new Date("12/30/2012"));
        expect("2012.12.30".toDateTime()).toEqual(new Date("12/30/2012"));
        expect("2012.12.30".toDateTime({format:'m/d/Y'})).toEqual("12/30/2012");
        expect("2012.12.30".toDateTime({format:'d/m/Y'})).toEqual("30/12/2012");
        //expect($c.toDateTime("1000",'.')).toBe('1.000');
    });
    it('toObject',function(){
        expect(JSON.stringify("p1=1&p2=2&p3=3".toObject())).toBe(JSON.stringify({p1:"1",p2:"2",p3:"3"}));
        expect(JSON.stringify("p1=1".toObject())).toBe(JSON.stringify({p1:"1"}));
        expect(JSON.stringify("p1=&p2".toObject())).toBe(JSON.stringify({p1:"",p2:undefined}));
    });
    it('trim',function(){
        expect("    cal    ".trim()).toBe("cal");
        expect("    cal".trim()).toBe("cal");
        expect("cal   ".trim()).toBe("cal");
    });

});
