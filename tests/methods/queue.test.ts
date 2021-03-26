import Queue from '../../compiled/transformedMinor/craydent.queue';

describe('Queue', () => {
    const sorter = (a: any, b: any) => {
        if (a > b) { return 1; }
        if (a < b) { return -1; }
        return 0
    }
    it('should not fail when given null', () => {
        let ol = new Queue(null as any);
        expect(ol.enqueue).toEqual(expect.any(Function));
        expect(ol.dequeue).toEqual(expect.any(Function));
    });
    it('should create a new queue', () => {
        let ol = new Queue();
        expect(ol.enqueue(0)).toBe(true);
        expect(ol[0]).toEqual(0);
        expect(ol.dequeue()).toEqual(0);
        expect(ol.length).toBe(0);
    });
    it('should create a new queue from array', () => {
        let ol = new Queue([1, 3, 4]);
        expect(ol.enqueue(0)).toBe(true);
        expect(ol.length).toBe(4);
        expect(ol.enqueue(5)).toBe(true);
        expect(ol.enqueue(2)).toBe(true);
        expect(ol.length).toBe(6);
        expect(ol.dequeue()).toEqual(1);
        expect(ol).toEqual([3, 4, 0, 5, 2]);
    });
});