import isBlank from '../../compiled/transformedMinor/craydent.isblank';
describe('isBlank', () => {
    it('should check if string is blank', () => {
        expect(isBlank("word of the day")).toBe(false);
        expect(isBlank("")).toBe(true);
    })
});
