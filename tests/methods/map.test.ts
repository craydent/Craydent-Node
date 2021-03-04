import map from '../../compiled/transformedMinor/craydent.map';
describe('map', () => {
    it('should map the array', () => {
        expect(map([1, 2, 3, 4], (value, i, objs) => value + i)).toEqual([1, 3, 5, 7]);
    });

    it('should map the object', () => {
        expect(map({ a: 1, b: 2, c: 3, d: 4 }, (value, prop, obj) => value + prop))
            .toEqual({ a: '1a', b: '2b', c: '3c', d: '4d' });
    })
});
