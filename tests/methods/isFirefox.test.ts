import isFirefox from '../../compiled/transformedMinor/craydent.isfirefox';
describe('isFirefox', () => {
    it('should check if browser is Firefox', () => {
        expect(isFirefox.call({ navigator: { userAgent: 'firefox' } } as any)).toBe(true);
        expect(isFirefox.call({ navigator: { userAgent: 'chrome firefox' } } as any)).toBe(false);
        expect(isFirefox.call({ navigator: { userAgent: 'apple firefox' } } as any)).toBe(false);
        expect(isFirefox.call({ navigator: { userAgent: 'opera firefox' } } as any)).toBe(false);
    });
});
