import _generalTrim from '../../modules/protected/_generalTrim';

describe('_generalTrim', () => {
    it('should trim white spaces on both sides', () => {
        expect(_generalTrim("    cal    ")).toBe("cal");
        expect(_generalTrim("    cal")).toBe("cal");
        expect(_generalTrim("cal   ")).toBe("cal");

        expect(_generalTrim("\n\n\n\ncal\t\t\t\t")).toBe("cal");
        expect(_generalTrim("\n\n\n\ncal")).toBe("cal");
        expect(_generalTrim("cal\t\t\t\t")).toBe("cal");
    });
    it('should trim white spaces on left side', () => {
        expect(_generalTrim("    cal    ", 'l')).toBe("cal    ");
        expect(_generalTrim("    cal", 'l')).toBe("cal");
        expect(_generalTrim("cal    ", 'l')).toBe("cal    ");
    });
    it('should trim white spaces on right side', () => {
        expect(_generalTrim("    cal    ", 'r')).toBe("    cal");
        expect(_generalTrim("    cal", 'r')).toBe("    cal");
        expect(_generalTrim("cal   ", 'r')).toBe("cal");
    });
    it('should not trim characters when characters is not a string|string[]', () => {
        expect(_generalTrim("aaaacalaaaa", null as any, 1 as any)).toBe("aaaacalaaaa");
    });
    it('should trim characters on both sides', () => {
        expect(_generalTrim("aaaacalaaaa", null as any, 'a')).toBe("cal");
        expect(_generalTrim("aaaacal", null as any, 'a')).toBe("cal");
        expect(_generalTrim("calaaaa", null as any, 'a')).toBe("cal");

        expect(_generalTrim("ababababcalabababab", null as any, ['a', 'b'])).toBe("cal");
        expect(_generalTrim("ababababcal", null as any, ['a', 'b'])).toBe("cal");
        expect(_generalTrim("calabababab", null as any, ['a', 'b'])).toBe("cal");
    });
    it('should trim characters on left side', () => {
        expect(_generalTrim("aaaacalaaaa", 'l', 'a')).toBe("calaaaa");
        expect(_generalTrim("aaaacal", 'l', 'a')).toBe("cal");
        expect(_generalTrim("calaaaa", 'l', 'a')).toBe("calaaaa");

        expect(_generalTrim("ababababcalabababab", 'l', ['a', 'b'])).toBe("calabababab");
        expect(_generalTrim("ababababcal", 'l', ['a', 'b'])).toBe("cal");
        expect(_generalTrim("calabababab", 'l', ['a', 'b'])).toBe("calabababab");
    });
    it('should trim characters on right side', () => {
        expect(_generalTrim("aaaacalaaaa", 'r', 'a')).toBe("aaaacal");
        expect(_generalTrim("aaaacal", 'r', 'a')).toBe("aaaacal");
        expect(_generalTrim("calaaaa", 'r', 'a')).toBe("cal");

        expect(_generalTrim("ababababcalabababab", 'r', ['a', 'b'])).toBe("ababababcal");
        expect(_generalTrim("ababababcal", 'r', ['a', 'b'])).toBe("ababababcal");
        expect(_generalTrim("calabababab", 'r', ['a', 'b'])).toBe("cal");
    });
});