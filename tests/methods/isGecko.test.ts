import isGecko from '../../compiled/transformedMinor/craydent.isgecko';
describe('isGecko', () => {
    it('should check if browser is Gecko', () => {
        expect(isGecko.call({ navigator: { userAgent: 'gecko' } } as any)).toBe(true);
        expect(isGecko.call({ navigator: { userAgent: 'webkit gecko' } } as any)).toBe(false);
        expect(isGecko.call({ navigator: { userAgent: 'khtml gecko' } } as any)).toBe(false);
    });
});
