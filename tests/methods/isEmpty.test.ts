import isEmpty from '../../compiled/transformedMinor/craydent.isempty';
describe('isEmpty', () => {
    it('should check if value is empty', () => {
        expect(isEmpty(null)).toBe(false);

        expect(isEmpty("word of the day")).toBe(false);
        expect(isEmpty("")).toBe(true);

        expect(isEmpty([2, 3, 4])).toBe(false);
        expect(isEmpty([])).toBe(true);

        expect(isEmpty({ a: 1 })).toBe(false);
        expect(isEmpty({})).toBe(true);

        expect(isEmpty(function () { return 1; })).toBe(false);
        expect(isEmpty(() => 1)).toBe(false);
        expect(isEmpty(function () { })).toBe(true);
        expect(isEmpty(() => { })).toBe(true);
    })
});
