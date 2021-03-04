import isFirefox from '../../compiled/transformedMinor/craydent.isfirefox';
describe('isFirefox', () => {
    it('should check if browser is Firefox', () => {
        expect(isFirefox.call({ navigator: { userAgent: 'firefox' } })).toBe(true);
        expect(isFirefox.call({ navigator: { userAgent: 'chrome firefox' } })).toBe(false);
        expect(isFirefox.call({ navigator: { userAgent: 'apple firefox' } })).toBe(false);
        expect(isFirefox.call({ navigator: { userAgent: 'opera firefox' } })).toBe(false);
    });
});
