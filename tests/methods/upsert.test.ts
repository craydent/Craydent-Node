import upsert from '../../compiled/transformedMinor/craydent.upsert';
describe('upsert', () => {
    it('should upsert a single item', () => {
        let arr = [{ _id: 1 }, { _id: 2 }]
        expect(upsert(arr, { _id: 2 })).toEqual({
            insertedIndexes: [],
            updatedIndexes: [],
            unchangedIndexes: [1],
            inserted: [],
            updated: [],
            unchanged: [{ _id: 2 }]
        });
        expect(arr).toEqual([{ _id: 1 }, { _id: 2 }]);
    })
    it('should upsert a multiple items', () => {
        let arr = [{ _id: 1 }, { _id: 2 }]
        expect(upsert(arr, [{ _id: 1 }, { _id: 2, a: 1 }, { _id: 3 }])).toEqual({
            insertedIndexes: [2],
            updatedIndexes: [1],
            unchangedIndexes: [0],
            inserted: [{ _id: 3 }],
            updated: [{ _id: 2, a: 1 }],
            unchanged: [{ _id: 1 }]
        });
        expect(arr).toEqual([{ _id: 1 }, { _id: 2, a: 1 }, { _id: 3 }]);
    })
    it('should upsert a single item using callback', () => {
        let arr = [{ _id: 1 }, { _id: 2 }]
        expect(upsert(arr, { _id: 2 }, (value, ref) => { return value._id == ref._id; })).toEqual({
            insertedIndexes: [],
            updatedIndexes: [],
            unchangedIndexes: [1],
            inserted: [],
            updated: [],
            unchanged: [{ _id: 2 }]
        });
        expect(arr).toEqual([{ _id: 1 }, { _id: 2 }]);
    })
    it('should upsert a single item using prop and callback', () => {
        let arr = [{ a: 1 }, { a: 2 }]
        expect(upsert(arr, { a: 2 }, 'a', (value, ref) => { return value.a == ref.a; })).toEqual({
            insertedIndexes: [],
            updatedIndexes: [],
            unchangedIndexes: [1],
            inserted: [],
            updated: [],
            unchanged: [{ a: 2 }]
        });
        expect(arr).toEqual([{ a: 1 }, { a: 2 }]);
    })
});
