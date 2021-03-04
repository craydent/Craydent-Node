import isSubset from '../../compiled/transformedMinor/craydent.issubset';
describe('isSubset', () => {
    it('should check if the value is a subset of another object', () => {
        expect(isSubset({ a: 1 }, null)).toEqual(false);
        expect(isSubset(null, { a: 1 })).toEqual(false);
        expect(isSubset(null, null)).toEqual(false);

        expect(isSubset({ a: 1 }, { a: 1, b: 1 })).toEqual(true);
        expect(isSubset({ a: 1 }, [])).toEqual(false);
        expect(isSubset({ a: 1 }, { b: 1 })).toEqual(false);

        expect(isSubset({ a: 1, c: 1 }, { b: 1, c: 1 }, true)).toEqual(true);
        expect(isSubset({ a: 1, c: 1 }, { b: 1 }, true)).toEqual(false);
    })
    it('should check if the value is a subset of another array', () => {
        expect(isSubset([], null)).toEqual(false);
        expect(isSubset(null, [])).toEqual(false);
        expect(isSubset(null, null)).toEqual(false);

        expect(isSubset(['a'], ['b', 'a'])).toEqual(true);
        expect(isSubset(['a', 'b', 'c'], ['z', 'a', 'c', 'y', 'b'])).toEqual(true);
        expect(isSubset(['a',], ['z', 'c', 'y', 'b'])).toEqual(false);

        expect(isSubset(['a', 'c'], ['z', 'c', 'y', 'b'], true)).toEqual(true);
        expect(isSubset(['a', 'c'], ['z', 'y', 'b'], true)).toEqual(false);
    })
    it('should check if the value is a subset of another string/number', () => {
        expect(isSubset("ab", "abc")).toEqual(true);
        expect(isSubset(1, 12)).toEqual(true);
        expect(isSubset("abc", "ab")).toEqual(false);
        expect(isSubset(12, 1)).toEqual(false);
        expect(isSubset("1", 12)).toEqual(false);
    })
});
