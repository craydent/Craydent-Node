import isMobile from '../../compiled/transformedMinor/craydent.ismobile';
describe('isMobile', () => {
    it('should check if browser is Mobile', () => {
        // expect(isMobile.call({ navigator: { userAgent: 'android' } })).toBe(true);
        // expect(isMobile.call({ navigator: { userAgent: 'blackberry' } })).toBe(true);
        // expect(isMobile.call({ navigator: { userAgent: 'ipad' } })).toBe(true);
        // expect(isMobile.call({ navigator: { userAgent: 'iphone' } })).toBe(true);
        // expect(isMobile.call({ navigator: { userAgent: 'ipod' } })).toBe(true);
        // expect(isMobile.call({ navigator: { userAgent: 'palm' } })).toBe(true);
        expect(isMobile.call({ navigator: { userAgent: 'webkit symbian' } } as any)).toBe(true);
        expect(isMobile.call({ navigator: { userAgent: 'windows ce' } } as any)).toBe(true);
        expect(isMobile.call({ navigator: { userAgent: 'webkit khtml' } } as any)).toBe(false);
    });
});
