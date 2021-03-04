import isPalmOS from '../../compiled/transformedMinor/craydent.ispalmos';
describe('isPalmOS', () => {
    it('should check if device is PalmOS', () => {
        expect(isPalmOS.call({ navigator: { userAgent: 'palm' } })).toBe(true);
        expect(isPalmOS.call({ navigator: { userAgent: 'webkit khtml' } })).toBe(false);
    });
});
