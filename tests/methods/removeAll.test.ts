import removeAll from '../../modules/methods/removeAll';
describe('removeAll', () => {
    it('should should not fail when array does not contain item', () => {
        let arr = [1, 2, 3, 4, 5];
        expect(removeAll(arr, 6)).toEqual(false);
        expect(arr).toEqual([1, 2, 3, 4, 5]);
    });
    it('should remove items', () => {
        let arr = [1, 2, 3, 4, 5];
        expect(removeAll(arr)).toEqual([1, 2, 3, 4, 5]);
        expect(arr).toEqual([]);
    })
    it('should remove items with specified value', () => {
        let arr = [1, 2, 2, 2, 3, 4, 5];
        expect(removeAll(arr, 2)).toEqual([2, 2, 2]);
        expect(arr).toEqual([1, 3, 4, 5]);
    })
});
