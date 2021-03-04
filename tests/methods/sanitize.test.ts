import sanitize from '../../compiled/transformedMinor/craydent.sanitize';
describe('sanitize', () => {
    it('should encode special chars', () => {
        expect(sanitize('&')).toBe('&#38;');
        expect(sanitize('#')).toBe('&#35;');
        expect(sanitize('%')).toBe('&#37;');
        expect(sanitize(';')).toBe('&#59;');
        expect(sanitize('+')).toBe('&#43;');
        expect(sanitize('-')).toBe('&#45;');
        expect(sanitize('\'')).toBe('&#39;');
        expect(sanitize('"')).toBe('&#34;');
        expect(sanitize('(')).toBe('&#40;');
        expect(sanitize(')')).toBe('&#41;');
        expect(sanitize('<')).toBe('&#60;');
        expect(sanitize('>')).toBe('&#62;');
    })
});
