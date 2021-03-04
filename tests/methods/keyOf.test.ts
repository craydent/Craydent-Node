import keyOf from '../../compiled/transformedMinor/craydent.keyof';
describe('keyOf', () => {
    it('should get the key at the specified value', () => {
        expect(keyOf(null, 1)).toBe('');
        expect(keyOf({ a: [] }, 'b')).toBe('');
        expect(keyOf({ a: {} }, 'b')).toBe('');
        expect(keyOf({ a: [] }, [])).toBe('a');
        expect(keyOf({ a: [{ b: 1 }, { c: 2 }, { d: 3 }] }, [{ b: 1 }, { c: 2 }, { d: 3 }])).toBe('a');
        expect(keyOf({ a: {} }, {})).toBe('a');
        expect(keyOf({ a: { b: 1, c: 1 } }, { b: 1, c: 1 })).toBe('a');
    })
});
