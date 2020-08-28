import isPrince from '../../modules/methods/isPrince';
describe('isPrince', () => {
    it('should check if device is Prince', () => {
        expect(isPrince.call({ navigator: { userAgent: 'prince' } })).toBe(true);
        expect(isPrince.call({ navigator: { userAgent: 'webkit khtml' } })).toBe(false);
    });
});
