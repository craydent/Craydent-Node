import remove from '../../compiled/transformedMinor/craydent.remove';
jest.mock('../../compiled/transformedMinor/craydent.remove/protected/_removeFromIndex', () => {
    return {
        "default": (...args) => _removeFromIndex.apply(this, args)
    }
});
let _removeFromIndex = () => { }
describe('remove', () => {
    beforeEach(() => {
        _removeFromIndex = () => { }
    });
    it('should should not fail when array does not contain item', () => {
        let arr = [1, 2];
        expect(remove(arr, {})).toBe(false);
        expect(arr).toEqual([1, 2]);
    });
    it('should remove from the array', () => {
        let obj = {}
        let arr = [1, 2, obj];
        expect(remove(arr, obj)).toBe(obj);
        expect(arr).toEqual([1, 2]);
    });
    it('should remove from the array and index', () => {
        _removeFromIndex = jest.fn();
        let obj = {}, arr = [obj], expected = [];
        (expected as any).__indexed_buckets = {};
        (arr as any).__indexed_buckets = {};
        expect(remove(arr, obj)).toBe(obj);
        expect(arr).toEqual(expected);
        expect(_removeFromIndex).toHaveBeenCalledWith((arr as any).__indexed_buckets, obj);
    });
});