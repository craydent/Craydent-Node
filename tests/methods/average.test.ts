import average from '../../compiled/transformedMinor/craydent.average';
describe('average', () => {
    it('should return average of all numbers', () => {
        expect(average([2, 2, '' as any])).toBe(2);
    })
});