import isArray from '../../compiled/transformedMinor/craydent.isarray';
describe('isArray', () => {
    it('should check if variable is an array when Array.isArray is not defined', () => {
        const _isArray = Array.isArray;
        Array.isArray = null as any;
        expect(isArray([])).toBe(true);
        Array.isArray = _isArray;
    })
    it('should check if variable is an array', () => {
        expect(isArray("")).toBe(false);
        expect(isArray([])).toBe(true);
    })
});
