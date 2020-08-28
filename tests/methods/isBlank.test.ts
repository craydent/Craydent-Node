import isBlank from '../../modules/methods/isBlank';
describe('isBlank', () => {
    it('should check if string is blank', () => {
        expect(isBlank("word of the day")).toBe(false);
        expect(isBlank("")).toBe(true);
    })
});
