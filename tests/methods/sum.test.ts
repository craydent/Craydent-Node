import sum from '../../compiled/transformedMinor/craydent.sum';
describe('sum', () => {
    it('should sum items in the array', () => {
        const arr = [1, 2, 3, null, 6];
        expect(sum(arr)).toBe(12);
    })
});
