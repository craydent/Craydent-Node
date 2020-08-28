import isKHTML from '../../modules/methods/isKHTML';
describe('isKHTML', () => {
    it('should check if browser is KHTML', () => {
        expect(isKHTML.call({ navigator: { userAgent: 'khtml' } })).toBe(true);
        expect(isKHTML.call({ navigator: { userAgent: 'webkit khtml' } })).toBe(false);
    });
});
