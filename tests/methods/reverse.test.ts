import reverse from '../../modules/methods/reverse';
describe('reverse', () => {
    it('should reverse the string', () => {
        expect(reverse('abcd')).toBe('dcba');
        expect(reverse('')).toBe('');
        expect(reverse(undefined)).toBe('');
        expect(reverse(null)).toBe('');
    })
});
