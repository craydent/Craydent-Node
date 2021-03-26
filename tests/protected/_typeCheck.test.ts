import _typeCheck from '../../modules/protected/_typeCheck';

describe('_typeCheck', () => {
    it('should return when null', () => {
        expect(_typeCheck(null, Object)).toBe(false);
        expect(_typeCheck(undefined, Object)).toBe(false);
    });
    it('should return true when is of type', () => {
        expect(_typeCheck({}, Object)).toBe(true);
        expect(_typeCheck("", String)).toBe(true);
        expect(_typeCheck(0, Number)).toBe(true);
        expect(_typeCheck(function () { }, Function)).toBe(true);
        expect(_typeCheck(/a/, RegExp)).toBe(true);
        function a() { }
        const value = new (a as any)();
        expect(_typeCheck(value, a)).toBe(true);
    });
    it('should return true/false when using backward_compatible flag', () => {
        expect(_typeCheck({}, "Object", true)).toBe(true);
        expect(_typeCheck("", "String", true)).toBe(true);
        expect(_typeCheck(0, "Number", true)).toBe(true);
        expect(_typeCheck(function () { }, "Function", true)).toBe(true);
        expect(_typeCheck(/a/, "RegExp", true)).toBe(true);
        function a() { }
        const value = new (a as any)();
        expect(_typeCheck(value, "a", true)).toBe(true);
    });
});