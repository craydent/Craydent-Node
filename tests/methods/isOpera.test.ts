import isOpera from '../../modules/methods/isOpera';
describe('isOpera', () => {
    it('should check if browser is Opera', () => {
        expect(isOpera.call({ navigator: { userAgent: 'chrome apple opera' } })).toBe(true);
        expect(isOpera.call({ navigator: { userAgent: 'chrome apple opr' } })).toBe(true);
        expect(isOpera.call({ navigator: { userAgent: 'webkit khtml' } })).toBe(false);
    });
});
