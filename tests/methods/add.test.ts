import add from '../../modules/methods/add';

jest.mock('../../modules/protected/_addToIndex', () => {
    return {
        "default": (...args) => __addToIndex.apply(this, args)
    }
});
let __addToIndex = () => { }
describe('add', () => {
    beforeEach(() => {
        __addToIndex = () => { }
    });
    it('should add to the array', () => {
        let arr = [];
        expect(add(arr, {})).toBe(true);
        expect(arr).toEqual([{}]);
        expect((arr as any).__indexed_buckets).toBeUndefined();
    });
    it('should add to the array and index', () => {
        __addToIndex = jest.fn();
        let arr = [], obj = {}, expected = [{}];
        (expected as any).__indexed_buckets = {};
        (arr as any).__indexed_buckets = {};
        expect(add(arr, obj)).toBe(true);
        expect(arr).toEqual(expected);
        expect(__addToIndex).toHaveBeenCalledWith((arr as any).__indexed_buckets, obj);
    });
});