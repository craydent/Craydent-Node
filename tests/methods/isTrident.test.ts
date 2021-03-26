import isTrident from '../../compiled/transformedMinor/craydent.istrident';
describe('isTrident', () => {
    it('should check if browser is Trident', () => {
        expect(isTrident.call({ navigator: { userAgent: 'webkit trident' } } as any)).toBe(true);
        expect(isTrident.call({ navigator: { userAgent: 'trident' } } as any)).toBe(true);
        expect(isTrident.call({ navigator: { userAgent: 'apple firefox' } } as any)).toBe(false);
    });
});
