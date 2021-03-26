import isKHTML from '../../compiled/transformedMinor/craydent.iskhtml';
describe('isKHTML', () => {
    it('should check if browser is KHTML', () => {
        expect(isKHTML.call({ navigator: { userAgent: 'khtml' } } as any)).toBe(true);
        expect(isKHTML.call({ navigator: { userAgent: 'webkit khtml' } } as any)).toBe(false);
    });
});
