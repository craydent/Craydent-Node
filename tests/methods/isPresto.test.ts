import isPresto from '../../compiled/transformedMinor/craydent.ispresto';
describe('isPresto', () => {
    it('should check if device is Presto', () => {
        expect(isPresto.call({ navigator: { userAgent: 'presto' } })).toBe(true);
        expect(isPresto.call({ navigator: { userAgent: 'webkit khtml' } })).toBe(false);
    });
});
