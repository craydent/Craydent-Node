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
var $c = require(pre + 'craydent-class');
$c.DEBUG_MODE = true;
describe ('Global classes', function () {
    var arr = [1,2,4,5,6],
        obj = {p1:1,p2:2,p4:4,p5:5,p6:6},
        oarr = [{p:1},{p:2},{p:4},{p:5},{p:6}],
        setarr = [{p:1},{p:2},{p:4},{p:5},{p:5},{p:6}];
    // TO/DO Benchmarker
    //it('Benchmarker',function(){
    //
    //});
    it('Cursor',function(){
        var cursor = new $c.Cursor(arr);
        expect(cursor.current).toBe(1);
        expect(cursor.hasNext()).toBe(true);
        cursor.setNextIndex(10);
        expect(cursor.hasNext()).toBe(true);
        expect(cursor.next()).toEqual({value:6,done:true});
        expect(cursor.current).toBe(6);
        expect(cursor.hasNext()).toBe(false);
        cursor.setNextIndex(-10);
        expect(cursor.hasNext()).toBe(true);
        expect(cursor.current).toBe(1);
        expect(cursor.next()).toEqual({value:1,done:false});
        expect(cursor.current).toBe(1);


        cursor = new $c.Cursor(obj);
        expect(cursor.current).toBe(1);
        expect(cursor.hasNext()).toBe(true);
        cursor.setNextIndex(10);
        expect(cursor.hasNext()).toBe(true);
        expect(cursor.next()).toEqual({value:6,done:true});
        expect(cursor.current).toBe(6);
        expect(cursor.hasNext()).toBe(false);
        cursor.setNextIndex(-10);
        expect(cursor.hasNext()).toBe(true);
        expect(cursor.current).toBe(1);
        expect(cursor.next()).toEqual({value:1,done:false});
        expect(cursor.current).toBe(1);
    });
    it('OrderedList',function(){
        var ol = new $c.OrderedList(arr);
        expect(ol.hasNext()).toBe(true);
        expect(ol.next()).toEqual({value:1,done:false});
        expect(ol.hasNext()).toBe(true);
        expect(ol.next()).toEqual({value:2,done:false});
        expect(ol.hasNext()).toBe(true);
        expect(ol.next()).toEqual({value:4,done:false});
        expect(ol.hasNext()).toBe(true);
        expect(ol.next()).toEqual({value:5,done:false});
        expect(ol.hasNext()).toBe(true);
        expect(ol.next()).toEqual({value:6,done:true});
        expect(ol.add(3)).toEqual(true);
        expect(ol.length).toEqual(6);
        expect(ol[2]).toBe(3);



        ol = new $c.OrderedList(oarr,function(a,b){if (a.p < b.p) {return -1;}if (a.p > b.p) {return 1;}return 0;});
        expect(ol.hasNext()).toBe(true);
        expect(ol.next()).toEqual({value:{p:1},done:false});
        expect(ol.hasNext()).toBe(true);
        expect(ol.next()).toEqual({value:{p:2},done:false});
        expect(ol.hasNext()).toBe(true);
        expect(ol.next()).toEqual({value:{p:4},done:false});
        expect(ol.hasNext()).toBe(true);
        expect(ol.next()).toEqual({value:{p:5},done:false});
        expect(ol.hasNext()).toBe(true);
        expect(ol.next()).toEqual({value:{p:6},done:true});
        expect(ol.add({p:3})).toEqual(true);
        expect(ol.length).toEqual(6);
        expect(ol[2].p).toBe(3);
    });
    it('Queue',function(){
        var queue = new $c.Queue(oarr);
        expect([].concat(queue)).toEqual([{p:1},{p:2},{p:4},{p:5},{p:6}]);
        expect(queue.hasNext()).toBe(true);
        queue.enqueue({p:7});
        expect([].concat(queue)).toEqual([{p:1},{p:2},{p:4},{p:5},{p:6},{p:7}]);
        expect(queue.dequeue()).toEqual({p:1});
        expect([].concat(queue)).toEqual([{p:2},{p:4},{p:5},{p:6},{p:7}]);
        expect(queue.next()).toEqual({value:{p:2},done:false});
        expect(queue.next()).toEqual({value:{p:4},done:false});
        expect(queue.next()).toEqual({value:{p:5},done:false});
        expect(queue.next()).toEqual({value:{p:6},done:false});
        expect(queue.next()).toEqual({value:{p:7},done:true});
    });
    it('Set',function(){
        var set = new $c.Set(setarr);
        expect([].concat(set)).toEqual([{p:1},{p:2},{p:4},{p:5},{p:6}]);
        expect(set.hasNext()).toBe(true);
        expect(set.push({p:1})).toBe(6);
        expect([].concat(set)).toEqual([{p:1},{p:2},{p:4},{p:5},{p:6},{p:1}]);
        set.clean();
        expect([].concat(set)).toEqual([{p:1},{p:2},{p:4},{p:5},{p:6}]);
        expect(set.next()).toEqual({value:{p:1},done:false});
        expect(set.next()).toEqual({value:{p:2},done:false});
        expect(set.next()).toEqual({value:{p:4},done:false});
        expect(set.next()).toEqual({value:{p:5},done:false});
        expect(set.next()).toEqual({value:{p:6},done:true});
        set.clear();
        expect([].concat(set)).toEqual([]);
    });
});
