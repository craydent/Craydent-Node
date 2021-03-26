import insertAt from '../../compiled/transformedMinor/craydent.insertat';
jest.mock('../../compiled/transformedMinor/craydent.insertat/protected/_addToIndex', () => {
    return {
        "default": (...args: any[]) => __addToIndex.apply(this, args as any)
    }
});
let __addToIndex = () => { }
describe('insertAt', () => {
    beforeEach(() => {
        __addToIndex = () => { }
    });
    it('should insert to the array at the given index', () => {
        let arr = ['', ''];
        expect(insertAt(arr, 0, 'ab')).toBe(true);
        expect(arr).toEqual(['ab', '', '']);
        expect((arr as any).__indexed_buckets).toBeUndefined();
    });
    it('should insert to the array and index', () => {
        __addToIndex = jest.fn();
        let arr = ['', ''], obj = {}, expected = ['', {}, ''];
        (expected as any).__indexed_buckets = {};
        (arr as any).__indexed_buckets = {};
        expect(insertAt(arr, 1, obj)).toBe(true);
        expect(arr).toEqual(expected);
        expect(__addToIndex).toHaveBeenCalledWith((arr as any).__indexed_buckets, obj);
    });
});