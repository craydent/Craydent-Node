import isWebkit from '../../compiled/transformedMinor/craydent.iswebkit';
describe('isWebkit', () => {
    it('should check if browser is Webkit', () => {
        expect(isWebkit.call({ navigator: { userAgent: 'webkit trident' } })).toBe(true);
        expect(isWebkit.call({ navigator: { userAgent: 'webkit' } })).toBe(true);
        expect(isWebkit.call({ navigator: { userAgent: 'apple firefox' } })).toBe(false);
    });
});
