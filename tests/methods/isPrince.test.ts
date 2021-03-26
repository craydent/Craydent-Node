import isPrince from '../../compiled/transformedMinor/craydent.isprince';
describe('isPrince', () => {
    it('should check if device is Prince', () => {
        expect(isPrince.call({ navigator: { userAgent: 'prince' } } as any)).toBe(true);
        expect(isPrince.call({ navigator: { userAgent: 'webkit khtml' } } as any)).toBe(false);
    });
});
