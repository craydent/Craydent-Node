import toSet from '../../compiled/transformedMinor/craydent.toset';
describe('toSet', () => {
    it('should array to a set', () => {
        let arr = [{}, {}, {}, 1, 2];
        toSet(arr);
        expect(arr).toEqual([{}, 1, 2]);
    })
});
