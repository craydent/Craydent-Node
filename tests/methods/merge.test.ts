import merge from '../../compiled/transformedMinor/craydent.merge';
describe('merge', () => {
    it('should merge objects', () => {
        let original = {};
        expect(merge(original, { a: 1 })).toBe(original);
        expect(original).toEqual({ a: 1 });
    })
    it('should merge arrays', () => {
        let item = {};
        let original = [item, { a: 1 }];
        expect(merge(original, [item, { b: 1 }])).toBe(original);
        expect(original).toEqual([item, { a: 1 }, { b: 1 }]);
    })
    describe('with option', () => {
        it('should intersect as string', () => {
            let original = { a: 1 };
            expect(merge(original, { a: 2, b: 2 }, 'intersect')).toEqual({ a: 2 });
            expect(original).not.toEqual({ a: 2 });
        });
        it('should intersect as object', () => {
            let original = { a: 1 };
            expect(merge(original, { a: 2, b: 2 }, { intersect: true })).toEqual({ a: 2 });
            expect(original).not.toEqual({ a: 2 });
        });
        it('should shared as string', () => {
            let original = { a: 1 };
            expect(merge(original, { a: 2, b: 2 }, 'onlyShared')).toBe(original);
            expect(original).toEqual({ a: 2 });
        });
        it('should shared as object', () => {
            let original = { a: 1 };
            expect(merge(original, { a: 2, b: 2 }, { onlyShared: true })).toBe(original);
            expect(original).toEqual({ a: 2 });
        });
        it('should compare function', () => {
            let original = [{ a: 1 }];
            expect(merge(original, [{ a: 1, b: 2 }, { a: 2, b: 2 }], (orig:any, comp:any) => orig.a == comp.a)).toBe(original);
            expect(original).toEqual([{ a: 1, b: 2 }, { a: 2, b: 2 }]);
        });
        it('should compare function as object', () => {
            let original = [{ a: 1 }];
            expect(merge(original, [{ a: 1, b: 2 }, { a: 2, b: 2 }], { compareFunction: (orig:any, comp:any) => orig.a == comp.a })).toBe(original);
            expect(original).toEqual([{ a: 1, b: 2 }, { a: 2, b: 2 }]);
        });

        it('should recurse as string', () => {
            let item = { c: 1 };
            let original = { b: { d: 1 } };
            expect(merge(original, { a: 1, b: item }, 'recurse')).toBe(original);
            expect(original).toEqual({ a: 1, b: { c: 1, d: 1 } });
        });
        it('should recurse as object', () => {
            let item = { c: 1 };
            let original = { b: { d: 1 } };
            expect(merge(original, { a: 1, b: item }, { recurse: true })).toBe(original);
            expect(original).toEqual({ a: 1, b: { c: 1, d: 1 } });
        })
        it('should clone as string', () => {
            let original = {};
            const cloned = merge(original, { a: 1 }, 'clone');
            expect(cloned).not.toBe(original);
            expect(cloned).toEqual({ a: 1 });
        })
        it('should clone as object', () => {
            let original = {};
            const cloned = merge(original, { a: 1 }, { clone: true });
            expect(cloned).not.toBe(original);
            expect(cloned).toEqual({ a: 1 });
        })
    })
});
