import isPalmOS from '../../compiled/transformedMinor/craydent.ispalmos';
describe('isPalmOS', () => {
    it('should check if device is PalmOS', () => {
        expect(isPalmOS.call({ navigator: { userAgent: 'palm' } } as any)).toBe(true);
        expect(isPalmOS.call({ navigator: { userAgent: 'webkit khtml' } } as any)).toBe(false);
    });
});
