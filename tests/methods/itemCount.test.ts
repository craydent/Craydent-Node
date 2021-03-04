import itemCount from '../../compiled/transformedMinor/craydent.itemcount';
describe('itemCount', () => {
    it('should count the properties', () => {
        expect(itemCount(null)).toBe(null);
        expect(itemCount({})).toBe(0);
        expect(itemCount({ a: 2 })).toBe(1);
        expect(itemCount({ a: null, b: undefined })).toBe(2);
    })
});
