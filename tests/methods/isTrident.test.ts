import isTrident from '../../modules/methods/isTrident';
describe('isTrident', () => {
    it('should check if browser is Trident', () => {
        expect(isTrident.call({ navigator: { userAgent: 'webkit trident' } })).toBe(true);
        expect(isTrident.call({ navigator: { userAgent: 'trident' } })).toBe(true);
        expect(isTrident.call({ navigator: { userAgent: 'apple firefox' } })).toBe(false);
    });
});
