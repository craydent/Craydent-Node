import isPresto from '../../compiled/transformedMinor/craydent.ispresto';
describe('isPresto', () => {
    it('should check if device is Presto', () => {
        expect(isPresto.call({ navigator: { userAgent: 'presto' } } as any)).toBe(true);
        expect(isPresto.call({ navigator: { userAgent: 'webkit khtml' } } as any)).toBe(false);
    });
});
