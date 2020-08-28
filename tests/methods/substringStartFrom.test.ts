import substringStartFrom from '../../modules/methods/substringStartFrom';
describe('substringStartFrom', () => {
    it('should get substring starting in the specified strings', () => {
        expect(substringStartFrom('abcde', 'b')).toBe('bcde');
        expect(substringStartFrom('abcde', 'e')).toBe('e');
        expect(substringStartFrom('abcde', 'a')).toBe('abcde');
    })
});
