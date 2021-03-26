import removeAt from '../../compiled/transformedMinor/craydent.removeat';
jest.mock('../../compiled/transformedMinor/craydent.removeat/protected/_removeFromIndex', () => {
    return {
        "default": (...args: any[]) => _removeFromIndex.apply(this, args as any)
    }
});
let _removeFromIndex = () => { }
describe('removeAt', () => {
    beforeEach(() => {
        _removeFromIndex = () => { }
    });
    it('should should not fail when array does not contain item', () => {
        let arr = [1, 2, 3, 4, 5];
        expect(removeAt(arr, 10)).toEqual(false);
        expect(arr).toEqual([1, 2, 3, 4, 5]);
    });
    it('should remove item at index', () => {
        let arr = [1, 2, 3, 4, 5];
        expect(removeAt(arr, 2)).toEqual(3);
        expect(arr).toEqual([1, 2, 4, 5]);
    })
    it('should call _removeFromIndex when index is defined', () => {
        _removeFromIndex = jest.fn();
        let arr = [1, 2, 3, 4, 5];
        let expected = [1, 2, 4, 5];
        (arr as any).__indexed_buckets = {};
        (expected as any).__indexed_buckets = {};
        expect(removeAt(arr, 2)).toEqual(3);
        expect(arr).toEqual(expected);
        expect(_removeFromIndex).toHaveBeenCalledWith((arr as any).__indexed_buckets, 3);
    })
});
