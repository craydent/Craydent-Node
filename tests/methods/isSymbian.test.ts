import isSymbian from '../../compiled/transformedMinor/craydent.issymbian';
describe('isSymbian', () => {
    it('should check if browser is Symbian', () => {
        expect(isSymbian.call({ navigator: { userAgent: 'webkit series60' } } as any)).toBe(true);
        expect(isSymbian.call({ navigator: { userAgent: 'webkit symbian' } } as any)).toBe(true);
        expect(isSymbian.call({ navigator: { userAgent: 'apple firefox' } } as any)).toBe(false);
    });
});
