import getValue from '../../compiled/transformedMinor/craydent.getvalue';
describe('getValue', () => {
    it('should get the value when given a function', () => {
        expect(getValue((p1:any, p2:any) => ({ p1, p2 }), [1, 2])).toEqual({ p1: 1, p2: 2 });
        expect(getValue(() => 'string')).toEqual('string');
        expect(getValue(() => undefined, null as any, 'string')).toEqual('string');
        expect(getValue(1)).toBe(1);
        expect(getValue(null, 1)).toBe(1);
        expect(getValue([], 1)).toEqual([]);
        expect(getValue([])).toEqual([]);
    })
});
