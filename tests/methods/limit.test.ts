import limit from '../../modules/methods/limit';
describe('limit', () => {
    it('should limit the array size', () => {
        const arr = [0, 1, 2, 3, 4];
        expect(limit(arr, 2)).toEqual([0, 1]);
        expect(limit(arr, 0)).toEqual([]);
    })
    it('should skip and limit the array size', () => {
        const arr = [0, 1, 2, 3, 4];
        expect(limit(arr, 2, 1)).toEqual([1, 2]);
        expect(limit(arr, 0, 1)).toEqual([]);
    })
});
