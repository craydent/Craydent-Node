import normalize from '../../compiled/transformedMinor/craydent.normalize';
describe('normalize', () => {
    it('should normalize the array of objects', () => {
        const arr = [{ a: 1 }, null, { b: 1 }];
        const expected = [{ a: 1, b: null }, null, { a: null, b: 1 }];
        expect(normalize(arr)).toEqual(expected);
    })
});
