import $c from '../../transformedMajor/class/noConflict';

describe('No Conflict Global classes', function () {
    var arr = [1, 2, 4, 5, 6],
        obj = { p1: 1, p2: 2, p4: 4, p5: 5, p6: 6 },
        oarr = [{ p: 1 }, { p: 2 }, { p: 4 }, { p: 5 }, { p: 6 }],
        setarr = [{ p: 1 }, { p: 2 }, { p: 4 }, { p: 5 }, { p: 5 }, { p: 6 }];
    // TO/DO Benchmarker
    //it('Benchmarker',function(){
    //
    //});
    it('Cursor - array', function () {
        var cursor = new $c.Cursor(arr);
        expect(cursor.current).toBe(1);
        expect(cursor.hasNext()).toBe(true);
        cursor.setNextIndex(10);
        expect(cursor.hasNext()).toBe(false);
        expect(cursor.next()).toEqual({ value: 6, done: true });
        expect(cursor.current).toBe(6);
        expect(cursor.hasNext()).toBe(false);
        cursor.setNextIndex(-10);
        expect(cursor.hasNext()).toBe(true);
        expect(cursor.current).toBe(1);
        expect(cursor.next()).toEqual({ value: 1, done: false });
        expect(cursor.current).toBe(1);
    });
    it('Cursor - object', function () {
        var cursor = new $c.Cursor(obj);
        expect(cursor.current).toBe(1);
        expect(cursor.hasNext()).toBe(true);
        cursor.setNextIndex(10);
        expect(cursor.hasNext()).toBe(false);
        expect(cursor.next()).toEqual({ value: 6, done: true });
        expect(cursor.current).toBe(6);
        expect(cursor.hasNext()).toBe(false);
        cursor.setNextIndex(-10);
        expect(cursor.hasNext()).toBe(true);
        expect(cursor.current).toBe(1);
        expect(cursor.next()).toEqual({ value: 1, done: false });
        expect(cursor.current).toBe(1);
    });
    it('OrderedList - array', function () {
        var ol = new $c.OrderedList(arr);
        // expect(ol.hasNext()).toBe(true);
        // expect(ol.next()).toEqual({ value: 1, done: false });
        // expect(ol.hasNext()).toBe(true);
        // expect(ol.next()).toEqual({ value: 2, done: false });
        // expect(ol.hasNext()).toBe(true);
        // expect(ol.next()).toEqual({ value: 4, done: false });
        // expect(ol.hasNext()).toBe(true);
        // expect(ol.next()).toEqual({ value: 5, done: false });
        // expect(ol.hasNext()).toBe(true);
        // expect(ol.next()).toEqual({ value: 6, done: true });
        expect(ol.add(3)).toEqual(true);
        expect(ol.length).toEqual(6);
        expect(ol[2]).toBe(3);
    });
    it('OrderedList - object', function () {
        var ol = new $c.OrderedList(oarr, function (a, b) { if (a.p < b.p) { return -1; } if (a.p > b.p) { return 1; } return 0; });
        // expect(ol.hasNext()).toBe(true);
        // expect(ol.next()).toEqual({ value: { p: 1 }, done: false });
        // expect(ol.hasNext()).toBe(true);
        // expect(ol.next()).toEqual({ value: { p: 2 }, done: false });
        // expect(ol.hasNext()).toBe(true);
        // expect(ol.next()).toEqual({ value: { p: 4 }, done: false });
        // expect(ol.hasNext()).toBe(true);
        // expect(ol.next()).toEqual({ value: { p: 5 }, done: false });
        // expect(ol.hasNext()).toBe(true);
        // expect(ol.next()).toEqual({ value: { p: 6 }, done: true });
        expect(ol.add({ p: 3 })).toEqual(true);
        expect(ol.length).toEqual(6);
        expect(ol[2].p).toBe(3);
    });
    it('Queue', function () {
        var queue = new $c.Queue(oarr);
        expect([].concat(queue)).toEqual([{ p: 1 }, { p: 2 }, { p: 4 }, { p: 5 }, { p: 6 }]);
        // expect(queue.hasNext()).toBe(true);
        queue.enqueue({ p: 7 });
        expect([].concat(queue)).toEqual([{ p: 1 }, { p: 2 }, { p: 4 }, { p: 5 }, { p: 6 }, { p: 7 }]);
        expect(queue.dequeue()).toEqual({ p: 1 });
        expect([].concat(queue)).toEqual([{ p: 2 }, { p: 4 }, { p: 5 }, { p: 6 }, { p: 7 }]);
        // expect(queue.next()).toEqual({ value: { p: 2 }, done: false });
        // expect(queue.next()).toEqual({ value: { p: 4 }, done: false });
        // expect(queue.next()).toEqual({ value: { p: 5 }, done: false });
        // expect(queue.next()).toEqual({ value: { p: 6 }, done: false });
        // expect(queue.next()).toEqual({ value: { p: 7 }, done: true });
    });
    it('Set', function () {
        var set = new $c.Set(setarr);
        expect([].concat(set)).toEqual([{ p: 1 }, { p: 2 }, { p: 4 }, { p: 5 }, { p: 6 }]);
        // expect(set.hasNext()).toBe(true);
        expect(set.push({ p: 1 })).toBe(6);
        expect([].concat(set)).toEqual([{ p: 1 }, { p: 2 }, { p: 4 }, { p: 5 }, { p: 6 }, { p: 1 }]);
        set.clean();
        expect([].concat(set)).toEqual([{ p: 1 }, { p: 2 }, { p: 4 }, { p: 5 }, { p: 6 }]);
        // expect(set.next()).toEqual({ value: { p: 1 }, done: false });
        // expect(set.next()).toEqual({ value: { p: 2 }, done: false });
        // expect(set.next()).toEqual({ value: { p: 4 }, done: false });
        // expect(set.next()).toEqual({ value: { p: 5 }, done: false });
        // expect(set.next()).toEqual({ value: { p: 6 }, done: true });
        set.clear();
        expect([].concat(set)).toEqual([]);
    });
});