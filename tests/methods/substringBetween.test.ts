import substringBetween from '../../modules/methods/substringBetween';
describe('substringBetween', () => {
    it('should get substring between specified strings', () => {
        expect(substringBetween('abcde', 'a', 'e')).toBe('bcd');
        expect(substringBetween('abcde', null, 'd')).toBe('abc');
        expect(substringBetween('abcde', 'b')).toBe('cde');
        expect(substringBetween('abcde', 'h', 'q')).toBe('abcde');
    })
});
