import toSet from '../../modules/methods/toSet';
describe('toSet', () => {
    it('should array to a set', () => {
        let arr = [{}, {}, {}, 1, 2];
        toSet(arr);
        expect(arr).toEqual([{}, 1, 2]);
    })
});
