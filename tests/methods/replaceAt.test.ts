import replaceAt from '../../compiled/transformedMinor/craydent.replaceat';

jest.mock('../../compiled/transformedMinor/craydent.replaceat/protected/_removeFromIndex', () => {
    return {
        "default": (...args: any[]) => _removeFromIndex.apply(this, args as any)
    }
});
jest.mock('../../compiled/transformedMinor/craydent.replaceat/protected/_addToIndex', () => {
    return {
        "default": (...args: any[]) => _addToIndex.apply(this, args as any)
    }
});
let _addToIndex = () => { },
    _removeFromIndex = () => { };
describe('replaceAt', () => {
    beforeEach(() => {
        _addToIndex = () => { }
        _removeFromIndex = () => { }
    });
    it('should replace at the index when index does not exist', () => {
        let arr: any[] = [];
        expect(replaceAt(arr, 0, {})).toBe(undefined);
        expect(arr).toEqual([{}]);
        expect((arr as any).__indexed_buckets).toBeUndefined();
    });
    it('should replace at the index when index', () => {
        let arr = [10];
        expect(replaceAt<any>(arr, 0, {})).toBe(10);
        expect(arr).toEqual([{}]);
        expect((arr as any).__indexed_buckets).toBeUndefined();
    });
    it('should replace at index in the array and index', () => {
        _addToIndex = jest.fn();
        _removeFromIndex = jest.fn();
        let obj = {}, arr = [obj], expected = [{ value: 1 }];
        (expected as any).__indexed_buckets = {};
        (arr as any).__indexed_buckets = {};
        expect(replaceAt(arr, 0, { value: 1 })).toBe(obj);
        expect(arr).toEqual(expected);
        expect(_removeFromIndex).toHaveBeenCalledWith((arr as any).__indexed_buckets, obj);
        expect(_addToIndex).toHaveBeenCalledWith((arr as any).__indexed_buckets, { value: 1 });
    });
});