import isKHTML from '../../compiled/transformedMinor/craydent.iskhtml';
describe('isKHTML', () => {
    it('should check if browser is KHTML', () => {
        expect(isKHTML.call({ navigator: { userAgent: 'khtml' } })).toBe(true);
        expect(isKHTML.call({ navigator: { userAgent: 'webkit khtml' } })).toBe(false);
    });
});
