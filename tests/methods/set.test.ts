import Set from '../../modules/methods/set';
describe('Set', () => {
    it('should create a set', () => {
        const arr = [1, 2, 2, 3, 4, 5];
        const set1 = new Set();
        const set2 = new Set(arr);
        expect(set1.length).toBe(0);
        expect(set1.add).toEqual(expect.any(Function));
        expect(set1.clear).toEqual(expect.any(Function));
        expect(set1.clean).toEqual(expect.any(Function));

        expect(set2.length).toBe(5);
        expect(set2[0]).toBe(1);
        expect(set2[1]).toBe(2);
        expect(set2[2]).toBe(3);
        expect(set2[3]).toBe(4);
        expect(set2[4]).toBe(5);
    });
    it('should add to the set', () => {
        const arr = [1, 2, 3, 4, 5];
        const set = new Set(arr);
        expect(set.add(2)).toBe(false);
        expect(set.length).toBe(5);
        expect(set.add(6)).toBe(true);
        expect(set.length).toBe(6);
        expect(set[5]).toBe(6);
    });
    it('should clear the set', () => {
        const arr = [1, 2, 3, 4, 5];
        const set = new Set(arr);
        set.clear();
        expect(set.length).toBe(0);
    });
    it('should clean the set', () => {
        const arr = [1, 2, 3, 4, 5];
        const set = new Set(arr);
        set.push(2);
        expect(set.length).toBe(6);
        set.clean();
        expect(set.length).toBe(5);
    });
});
