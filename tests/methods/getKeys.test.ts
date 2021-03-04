import getKeys from '../../compiled/transformedMinor/craydent.getkeys';
describe('getKeys', () => {
    const _keys = Object.keys;

    it('should return null when argument is null', () => {
        expect(getKeys(null)).toBe(null);
        expect(getKeys(undefined)).toBe(null);
    });
    it('should all keys of the object when Object.keys is not defined', () => {
        Object.keys = null;
        const keys = getKeys({ a: 1, b: 1 });
        Object.keys = _keys;
        expect(keys).toEqual(['a', 'b']);
    });
    it('should all keys of the object when Object.keys is defined', () => {
        expect(getKeys({ a: 1, b: 1 })).toEqual(['a', 'b']);
    });
});
