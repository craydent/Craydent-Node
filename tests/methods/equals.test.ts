import equals from '../../modules/methods/equals';
describe('equals', () => {
    it('should test equality ', () => {
        expect(equals(0, 0)).toBe(true);
        expect(equals(undefined, 1)).toBe(false);
        expect(equals(1, undefined)).toBe(false);
        expect(equals(undefined, undefined)).toBe(true);
        expect(equals(null, 1)).toBe(false);
        expect(equals(1, null)).toBe(false);
        expect(equals(null, null)).toBe(true);
        expect(equals(/a/, /a/)).toBe(true);
        expect(equals(/a/, /b/)).toBe(false);
        expect(equals("a", "a")).toBe(true);
        expect(equals("a", "b")).toBe(false);
        expect(equals(function () { return null; }, function () { return null; })).toBe(true);
        expect(equals(function () { return null; }, function () { return 1; })).toBe(false);
        expect(equals({ a: 1 }, { a: 1 })).toBe(true);
        expect(equals({ a: 1 }, { a: 2 })).toBe(false);
        expect(equals({ a: 1, b: 1 }, { a: 1 })).toBe(false);
        expect(equals({ a: 1 }, { a: 1, b: 1 })).toBe(false);
        expect(equals([{ a: 1 }, { a: 1 }, /a/], [{ a: 1 }, { a: 1 }, /a/])).toBe(true);
        expect(equals([{ a: 1 }, { a: 1 }, /a/], [{ a: 1 }, { a: 2 }, /a/])).toBe(false);
        expect(equals([{ a: 1 }, { a: 1 }, /a/], [{ a: 1 }, { a: 1 }, /b/])).toBe(false);
    });
    it('should test equality given props', () => {
        expect(equals({ id: 1, prop: 2, none: 3 }, { id: 1, prop: 2, none: 3 }, ['id', 'prop'])).toBe(true);
        expect(equals({ id: 1, prop: 1, none: 3 }, { id: 1, prop: 2, none: 3 }, ['id', 'prop'])).toBe(false);
        expect(equals({ id: 1, prop: 1, none: 3 }, { id: 1, prop: 2 }, ['id', 'none'])).toBe(false);
        expect(equals({ id: 1, prop: 1 }, { id: 1, prop: 2, none: 3 }, ['id', 'none'])).toBe(false);
    });
});
