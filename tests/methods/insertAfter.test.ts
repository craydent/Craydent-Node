import insertAfter from '../../compiled/transformedMinor/craydent.insertafter';
jest.mock('../../compiled/transformedMinor/craydent.insertafter/protected/_addToIndex', () => {
    return {
        "default": (...args: any[]) => __addToIndex.apply(this, args as any)
    }
});
let __addToIndex = () => { }
describe('insertAfter', () => {
    beforeEach(() => {
        __addToIndex = () => { }
    });
    it('should insert to the array after the given index', () => {
        let arr = ['', ''];
        expect(insertAfter(arr, 0, 'ab')).toBe(true);
        expect(arr).toEqual(['', 'ab', '']);
        expect((arr as any).__indexed_buckets).toBeUndefined();
    });
    it('should insert to the array and index', () => {
        __addToIndex = jest.fn();
        let arr = ['', ''], obj = {}, expected = ['', '', {}];
        (expected as any).__indexed_buckets = {};
        (arr as any).__indexed_buckets = {};
        expect(insertAfter(arr, 1, obj)).toBe(true);
        expect(arr).toEqual(expected);
        expect(__addToIndex).toHaveBeenCalledWith((arr as any).__indexed_buckets, obj);
    });
});