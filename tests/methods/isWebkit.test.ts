import isWebkit from '../../compiled/transformedMinor/craydent.iswebkit';
describe('isWebkit', () => {
    it('should check if browser is Webkit', () => {
        expect(isWebkit.call({ navigator: { userAgent: 'webkit trident' } } as any)).toBe(true);
        expect(isWebkit.call({ navigator: { userAgent: 'webkit' } } as any)).toBe(true);
        expect(isWebkit.call({ navigator: { userAgent: 'apple firefox' } } as any)).toBe(false);
    });
});
