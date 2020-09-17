import setProperty from '../../modules/methods/setProperty';
describe('setProperty', () => {
    it('should set the property', () => {
        let obj = { a: 1 };
        expect(setProperty(obj, 'a', 20)).toBe(true);
        expect(obj).toEqual({ a: 20 });
    })
    it('should set the property recursively', () => {
        let obj = { a: {} };
        expect(setProperty(obj, 'a/b/c/d', 20, '/')).toBe(true);
        expect(obj).toEqual({ a: { b: { c: { d: 20 } } } });
    })
    it('should set the property nested in an array', () => {
        let obj = { a: [{ b: 1 }] };
        expect(setProperty(obj, 'a.0.b', 20)).toBe(true);
        expect(obj).toEqual({ a: [{ b: 20 }] });
    })
    it('should set the property nested in an array using []', () => {
        let obj = { a: 1 };
        expect(setProperty(obj, 'a[0].b[0].c', 20)).toBe(true);
        expect(obj).toEqual({ a: [{ b: [{ c: 20 }] }] });
    })
    it('should set the property nested in an array like object using []', () => {
        let obj = { a: { "0": { b: [{}] }, "2": { b: [{}] } } };
        expect(setProperty(obj, 'a[1].b[0].c', 20)).toBe(true);
        expect(obj).toEqual({ a: { "0": { b: [{}] }, "1": { b: [{ c: 20 }] }, "2": { b: [{}] } } });
    })
});
