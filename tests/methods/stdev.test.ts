import stdev from '../../compiled/transformedMinor/craydent.stdev';
describe('stdev', () => {
    it('should get standar deviation', () => {
        let arr = [1, 2, 3, null, 2];
        expect(stdev(arr)).toBe(0.7071067811865476);
        expect(stdev([])).toBe(0);
        expect(stdev(null)).toBe(0);
    })
});
