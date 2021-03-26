import last from '../../compiled/transformedMinor/craydent.last';
describe('last', () => {
    it('should retrieve the last item in the array', () => {
        expect(last(null as any)).toBe(null);
        expect(last([])).toBe(null);
        expect(last([1])).toBe(1);
        expect(last([1, 2, 3])).toBe(3);
    })
});
