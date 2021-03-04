import contains from '../../compiled/transformedMinor/craydent.contains';
describe('contains', () => {
    it('should check if array contains item', () => {
        expect(contains(["a", "b"], "b")).toBe(true);
    });
    it('should check if array contains matching regex', () => {
        expect(contains(["a", "b"], /b/)).toBe(true);
    });
    it('should check if array contains any and return the matching', () => {
        expect(contains(["a", "b"], ["c", "b"])).toBe("b");
    });
    it('should check if array contains item using iterator', () => {
        expect(contains(["a", "b"], "b", (val, i, arr) => val == "a")).toBe(true);
    });
    it('should check if array contains item using operator', () => {
        expect(contains([1, 2, 3], 2, '$lt')).toBe(true);
        expect(contains([1, 2, 3], 2, '$gt')).toBe(true);
        expect(contains([1, 2, 3], 2, '$lte')).toBe(true);
        expect(contains([1, 2, 3], 2, '$gte')).toBe(true);
        expect(contains([1, 2, 3], [2, 0], '$mod')).toBe(true);
        expect(contains([1, 2, 3], Number, '$type')).toBe(true);

        expect(contains([1, 2, 3], 1, '$lt')).toBe(false);
        expect(contains([1, 2, 3], 3, '$gt')).toBe(false);
        expect(contains([1, 2, 3], 0, '$lte')).toBe(false);
        expect(contains([1, 2, 3], 4, '$gte')).toBe(false);
        expect(contains([1, 2, 3], [4, 0], '$mod')).toBe(false);
        expect(contains([1, 2, 3], String, '$type')).toBe(false);
    });

    it('should check if object contains item', () => {
        expect(contains({ prop: "a", prop1: "b" }, "b")).toBe(true);
        expect(contains({ prop: "a", prop1: "b" }, "c")).toBe(false);
        expect(contains({ prop: "a", prop1: "b" }, (val, prop, obj) => val == "a")).toBe(true);
    });
    it('should check if string contains string', () => {
        expect(contains("ab", "b")).toBe(true);
    });
    it('should check if string contains using regex', () => {
        expect(contains("ab", /b/)).toBe(true);
    });
    it('should check using number and operator', () => {
        expect(contains(10, 1)).toBe(true);
    });
    it('should return false when regex is given', () => {
        expect(contains(/g/, 1)).toBe(false);
    });
    it('should check if array contains item using iterator', () => {
        expect(contains({ prop: "a", prop1: "b" }, (val, prop, obj) => val == "b")).toBe(true);
    });
    it('should check if object contains item', () => {
        expect(contains(["a", "b"], "b")).toBe(true);
    });
});
