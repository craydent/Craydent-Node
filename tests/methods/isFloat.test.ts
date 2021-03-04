import isFloat from '../../compiled/transformedMinor/craydent.isfloat';
describe('isFloat', () => {
    it('should check if value is a float', () => {
        expect(isFloat(null)).toBe(false);
        expect(isFloat([1])).toBe(false);
        expect(isFloat(0)).toBe(true);
        expect(isFloat(1)).toBe(true);
        expect(isFloat(1.1)).toBe(true);
        expect(isFloat("1.1")).toBe(false);
    })
});
