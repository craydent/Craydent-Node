import ellipsis from '../../compiled/transformedMinor/craydent.ellipsis';
describe('ellipsis', () => {
    it('should not add ellipsis', () => {
        expect(ellipsis('the sentence', 15)).toBe('the sentence');
    })
    it('should add ellipsis at the end', () => {
        expect(ellipsis('the sentence', 10)).toBe('the senten...');
    })
    it('should add ellipsis in the middel', () => {
        expect(ellipsis('the sentence', 5, 2)).toBe('the s...ce');
    })
});
