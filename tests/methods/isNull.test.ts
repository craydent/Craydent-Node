import isNull from '../../modules/methods/isNull';
describe('isNull', () => {
    it('should check if value is null', () => {
        expect(isNull({})).toBe(false);
        expect(isNull(0)).toBe(false);
        expect(isNull("")).toBe(false);
        expect(isNull(undefined)).toBe(true);
        expect(isNull(null)).toBe(true);
        expect(isNull(null, 1)).toBe(1);
        expect(isNull(2, 1)).toBe(2);
    })
});
