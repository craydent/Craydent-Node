import insertBefore from '../../compiled/transformedMinor/craydent.insertbefore';
jest.mock('../../compiled/transformedMinor/craydent.insertbefore/protected/_addToIndex', () => {
    return {
        "default": (...args) => __addToIndex.apply(this, args)
    }
});
let __addToIndex = () => { }
describe('insertBefore', () => {
    beforeEach(() => {
        __addToIndex = () => { }
    });
    it('should insert to the array at the given index', () => {
        let arr = ['', ''];
        expect(insertBefore(arr, 0, 'ab')).toBe(true);
        expect(arr).toEqual(['ab', '', '']);
        expect((arr as any).__indexed_buckets).toBeUndefined();
    });
    it('should insert to the array and index', () => {
        __addToIndex = jest.fn();
        let arr = ['', ''], obj = {}, expected = ['', {}, ''];
        (expected as any).__indexed_buckets = {};
        (arr as any).__indexed_buckets = {};
        expect(insertBefore(arr, 1, obj)).toBe(true);
        expect(arr).toEqual(expected);
        expect(__addToIndex).toHaveBeenCalledWith((arr as any).__indexed_buckets, obj);
    });
});