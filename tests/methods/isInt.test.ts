import isInt from '../../modules/methods/isInt';
describe('isInt', () => {
    it('should check if value is an integer', () => {
        expect(isInt(null)).toBe(false);
        expect(isInt([1])).toBe(false);
        expect(isInt(0)).toBe(true);
        expect(isInt(1)).toBe(true);
        expect(isInt(1.1)).toBe(false);
        expect(isInt("1")).toBe(false);
    })
});
