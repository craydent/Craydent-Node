import * as _addToIndex from '../../modules/protected/_addToIndex';

describe('_addToIndex', () => {
    it('should add to index when value is null', () => {
        const buckets = {
            prop: { value: null, __bucket_keys: [] }
        };
        const expected = {
            prop: { value: [{ prop: 'value' }], __bucket_keys: ['value'] }
        }
        _addToIndex.default(buckets, { prop: 'value' })
        expect(buckets).toEqual(expected);
    });
    it('should add to index when value is []', () => {
        const buckets = {
            prop: { value: [], __bucket_keys: [] }
        }
        const expected = {
            prop: { value: [{ prop: 'value' }], __bucket_keys: ['value'] }
        }
        _addToIndex.default(buckets, { prop: 'value' })
        expect(buckets).toEqual(expected);
    });
    it('should add to index when value is something', () => {
        const buckets = {
            prop: { value: [{ item: 1 }] }
        };
        const expected = {
            prop: { value: [{ item: 1 }, { prop: 'value' }] }
        }
        _addToIndex.default(buckets, { prop: 'value' })
        expect(buckets).toEqual(expected);
    });
});

describe('__binarySearch', () => {
    it('should return the correct index with odd number of items', () => {
        const searchArray = ["a", "b", "c", "d", "e"];
        expect(_addToIndex.__binarySearch(searchArray, "e")).toBe(4);
    });
    it('should return the correct index with even number of items', () => {
        const searchArray = ["a", "b", "c", "d"];
        expect(_addToIndex.__binarySearch(searchArray, "a")).toBe(1);
    });
    it('should return the correct index with even number of items', () => {
        const searchArray = ["a", "b", "c", "c", "c", "c", "d", "e"];
        expect(_addToIndex.__binarySearch(searchArray, "c")).toBe(2);
    });
    it('should return the correct index with one item', () => {
        const searchArray = ["a"];
        expect(_addToIndex.__binarySearch(searchArray, "c")).toBe(1);
    });
    it('should return the correct index with no items', () => {
        const searchArray: any = [];
        expect(_addToIndex.__binarySearch(searchArray, "c")).toBe(0);
    });
});
