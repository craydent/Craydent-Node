import Cursor from '../../modules/methods/cursor';
describe('Cursor', () => {
    it('should create a new cursor', () => {
        let cur = new Cursor();
        expect(cur.hasNext).toEqual(expect.any(Function));
        expect(cur.next).toEqual(expect.any(Function));
        expect(cur.setNextIndex).toEqual(expect.any(Function));
        expect(cur.size).toEqual(expect.any(Function));
        expect(cur.next).toEqual(expect.any(Function));
        expect(cur.length).toBe(0);
    });
    it('should create a new cursor from array', () => {
        let cur = new Cursor([1, 2, 3]);
        expect(cur.hasNext).toEqual(expect.any(Function));
        expect(cur.next).toEqual(expect.any(Function));
        expect(cur.setNextIndex).toEqual(expect.any(Function));
        expect(cur.size).toEqual(expect.any(Function));
        expect(cur.next).toEqual(expect.any(Function));
        expect(cur.length).toBe(3);
        expect(cur[0]).toBe(1);
        expect(cur[1]).toBe(2);
        expect(cur[2]).toBe(3);
    });
    it('should create a new cursor from array of objects', () => {
        let obj = { prop: 1 };
        let obj2 = { prop: 2 };
        let obj3 = { props: 3 };
        let cur = new Cursor([obj, obj2, obj3]);
        expect(cur[0]).not.toBe(obj);
        expect(cur[1]).not.toBe(obj2);
        expect(cur[2]).not.toBe(obj3);
        expect(cur.current).toEqual(obj);
    });

    let obj = { prop: 1 };
    let obj2 = { prop: 2 };
    let obj3 = { props: 3 };
    it('should return correct size', () => {
        let obj = { prop1: 1, prop2: 2, prop3: 3 };
        let cur = new Cursor(obj);
        expect(cur.size()).toBe(3);
    });
    it('should return correct size when given an object', () => {
        let cur = new Cursor([obj, obj2, obj3]);
        expect(cur.size()).toBe(3);
    });
    it('should check if the cursor as a next item', () => {
        let cur = new Cursor([obj, obj2, obj3]);
        expect(cur.hasNext());
    });
    it('should set the index', () => {
        let cur = new Cursor([obj, obj2, obj3]);
        cur.setNextIndex(3);
        expect(cur.current).toEqual(obj3);
        expect(cur.hasNext()).toBe(false);
        cur.setNextIndex("2");
        expect(cur.current).toEqual(obj3);
        expect(cur.hasNext()).toBe(false);
        cur.setNextIndex("abc");
        expect(cur.current).toEqual(obj);
        expect(cur.hasNext()).toBe(true);
        cur.setNextIndex(-1);
        expect(cur.current).toEqual(obj);
        expect(cur.hasNext()).toBe(true);
    });
    it('should reset the index', () => {
        let cur = new Cursor([obj, obj2, obj3]);
        cur.setNextIndex(2);
        expect(cur.current).toEqual(obj3);
        expect(cur.hasNext()).toBe(false);
        cur.reset();
        expect(cur.current).toEqual(obj);
        expect(cur.hasNext()).toBe(true);
    });
    it('should be able to iterate', () => {
        let obj = { prop1: 1, prop2: 2, prop3: 3 };
        let cur = new Cursor(obj);
        let value = 1;
        while (!cur.next().done) {
            expect(cur.current).toBe(value);
            value++;
        }
    });
});