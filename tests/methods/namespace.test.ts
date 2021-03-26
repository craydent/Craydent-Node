import namespace from '../../compiled/transformedMinor/craydent.namespace';
describe('namespace', () => {
    beforeEach(() => {
        delete (namespace as any)['TheNamespace'];
    });
    it('should create the namespace', () => {
        function TheClass() { }
        function TheClass2() { }
        const cb = jest.fn();
        expect((namespace as any)['TheNamespace']).toBeUndefined();
        expect(namespace('TheNamespace', TheClass)).toBe(TheClass);
        expect((namespace as any)['TheNamespace']['TheClass']).toBe(TheClass);
        expect((namespace as any)['TheNamespace'].toString()).toBe('function TheClass() { }');
        expect(namespace('TheNamespace', TheClass2, cb)).toBe(TheClass2);
        expect((namespace as any)['TheNamespace']['TheClass2']).toBe(TheClass2);
        expect((namespace as any)['TheNamespace'].toString()).toBe('function TheClass() { }function TheClass2() { }');
        expect(cb).toHaveBeenCalled();

        expect(namespace('TheNamespace', TheClass)).toBe(TheClass);
        expect((namespace as any)['TheNamespace']['TheClass']).toBe(TheClass);
        expect((namespace as any)['TheNamespace'].toString()).toBe('function TheClass2() { }function TheClass() { }');
    })
});
