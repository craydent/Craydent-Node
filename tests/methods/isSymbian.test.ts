import isSymbian from '../../modules/methods/isSymbian';
describe('isSymbian', () => {
    it('should check if browser is Symbian', () => {
        expect(isSymbian.call({ navigator: { userAgent: 'webkit series60' } })).toBe(true);
        expect(isSymbian.call({ navigator: { userAgent: 'webkit symbian' } })).toBe(true);
        expect(isSymbian.call({ navigator: { userAgent: 'apple firefox' } })).toBe(false);
    });
});
