import __queryNestedProperty from '../../modules/private/__queryNestedProperty';
describe('__queryNestedProperty', () => {
    it('should query property', () => {
        expect(__queryNestedProperty({ a: { b: 1 } }, 'a')).toEqual([{ b: 1 }]);
        expect(__queryNestedProperty({ a: { b: 1 } }, '')).toEqual([{ a: { b: 1 } }]);
    })
    it('should query the nested property', () => {
        expect(__queryNestedProperty({ a: { b: [{ c: 1 }, { c: 2 }] } }, 'a.b.c')).toEqual([1, 2]);
    })
    it('should query the nested property array', () => {
        expect(__queryNestedProperty({ a: { b: [1] } }, 'a.b')).toEqual([1]);
    })
});
