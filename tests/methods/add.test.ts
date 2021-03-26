import add from '../../compiled/transformedMinor/craydent.add';

jest.mock('../../compiled/transformedMinor/craydent.add/protected/_addToIndex', () => {
    return {
        "default": (...args: any[]) => __addToIndex.apply(this, args as any)
    }
});
let __addToIndex = () => { }
describe('add', () => {
    beforeEach(() => {
        __addToIndex = () => { }
    });
    it('should add to the array', () => {
        let arr: any[] = [];
        expect(add(arr, {})).toBe(true);
        expect(arr).toEqual([{}]);
        expect((arr as any).__indexed_buckets).toBeUndefined();
    });
    it('should add to the array and index', () => {
        __addToIndex = jest.fn();
        let arr: any[] = [], obj: any = {}, expected = [{}];
        (expected as any).__indexed_buckets = {};
        (arr as any).__indexed_buckets = {};
        expect(add(arr, obj)).toBe(true);
        expect(arr).toEqual(expected);
        expect(__addToIndex).toHaveBeenCalledWith((arr as any).__indexed_buckets, obj);
    });
});