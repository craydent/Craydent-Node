import substringEndAt from '../../modules/methods/substringEndAt';
describe('substringEndAt', () => {
    it('should get substring ending in the specified strings', () => {
        expect(substringEndAt('abcde', 'a')).toBe('');
        expect(substringEndAt('abcde', 'b')).toBe('a');
    })
});
