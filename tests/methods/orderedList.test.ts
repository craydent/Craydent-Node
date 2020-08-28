import OrderedList, { _orderListHelper } from '../../modules/methods/orderedList';

describe('OrderedList', () => {
    const sorter = (a, b) => {
        if (a > b) { return 1; }
        if (a < b) { return -1; }
        return 0
    }
    it('should not fail when given null', () => {
        let ol = new OrderedList(null, null);
        expect(ol.add).toEqual(expect.any(Function));
    });
    it('should create a new ordered list', () => {
        let ol = new OrderedList();
        expect(ol.add).toEqual(expect.any(Function));
        expect(ol.add(0)).toBe(true);
        expect(ol[0]).toEqual(0);
    });
    it('should create a new ordered list from array', () => {
        let ol = new OrderedList([1, 3, 4], sorter);
        expect(ol.add(0)).toBe(true);
        expect(ol.length).toBe(4);
        expect(ol.add(5)).toBe(true);
        expect(ol.add(2)).toBe(true);
        expect(ol.length).toBe(6);
        for (let i = 0, len = ol.length; i < len; i++) {
            expect(ol[i]).toBe(i);
        }
    });
    describe('_orderListHelper', () => {
        it('should return the position to add', () => {
            const arr = [0, 1, 2, 3, 4, 5, 6];

            expect(_orderListHelper(7, sorter, [1])).toBe(1);
            expect(_orderListHelper(-1, sorter, arr)).toBe(0);
            expect(_orderListHelper(0, sorter, arr)).toBe(1);
            expect(_orderListHelper(7, sorter, arr)).toBe(7);
            expect(_orderListHelper(6, sorter, arr)).toBe(6);
            expect(_orderListHelper(3, sorter, arr)).toBe(3);
            expect(_orderListHelper(5, sorter, arr)).toBe(5);
        });
    });
});