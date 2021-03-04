import cut from '../../compiled/transformedMinor/craydent.cut';
describe('cut', () => {
    it('should cut a section of the string', () => {
        expect(cut("0123456", 1, 4)).toBe("056");
        expect(cut("0123456", 1, 4, "replace")).toBe("0replace56");
        expect(cut("0123456", 1, null)).toBe("0");
        expect(cut("0123456", 1, null, "replace")).toBe("0replace");
    });
    it('should not cut a section of the string when start and end are equal', () => {
        expect(cut("0123456", 0, 0)).toBe("0123456");
        expect(cut("0123456", 0, 0, "replace")).toBe("replace0123456");
        expect(cut("0123456", 2, 2)).toBe("0123456");
        expect(cut("0123456", 2, 2, "replace")).toBe("01replace23456");
        expect(cut("0123456", -2, -2)).toBe("0123456");
        expect(cut("0123456", -2, -2, "replace")).toBe("01234replace56");
    });
    it('should not cut a section of the string when either start index is null', () => {
        expect(cut("0123456", null, 4)).toBe("0123456");
    });
    it('should handle when end index is greater than start index', () => {
        expect(cut("0123456", 1, 0)).toBe("0123456");
        expect(cut("0123456", 3, 0)).toBe("0123456");
        expect(cut("0123456", 3, 2)).toBe("0123456");
    });
    it('should handle when end index is negative', () => {
        expect(cut("0123456", 1, -1)).toBe("06");
    });
    it('should handle when start and end indexes are negative', () => {
        expect(cut("6543210", -3, -1)).toBe("6540");
    });
});