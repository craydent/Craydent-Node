import createIndex from '../../compiled/transformedMinor/craydent.createindex';
import { IndexedArray } from '../../compiled/transformedMinor/craydent.createindex/models/Arrays';
describe('createIndex', () => {
    it('should not create index when no indexes are given', () => {
        const items = [{ id: 1, value: 'value' }]
        expect(createIndex(items, '')).toBe(items);
        expect(createIndex(items, [])).toBe(items);
        expect(createIndex(items, null as any)).toBe(items);

    });
    it('should create index on a single field', () => {
        let expected: IndexedArray<{ id: number; value: string }> = [
            { id: 1, value: 'value' },
            { id: 2, value: 'value' },
            { id: 1, value: 'value2' }
        ] as any;
        expected.__indexed_buckets = {
            id: {
                __bucket_keys: [1, 2],
                1: [{ id: 1, value: 'value' }, { id: 1, value: 'value2' }],
                2: [{ id: 2, value: 'value' }]
            } as any
        };
        const recieved = createIndex([
            { id: 1, value: 'value' },
            { id: 2, value: 'value' },
            { id: 1, value: 'value2' }], 'id');
        expect(JSON.stringify(recieved)).toEqual(JSON.stringify(expected));
        expect(recieved.__indexed_buckets).toEqual(expected.__indexed_buckets);
    });
    it('should create index on a multiple fields', () => {
        let expected: IndexedArray<{ id: number; value: string }> = [
            { id: 1, value: 'value' }
        ] as any;
        expected.__indexed_buckets = {
            id: { __bucket_keys: [1], 1: [{ id: 1, value: 'value' }] } as any,
            value: { __bucket_keys: ['value'], 'value': [{ id: 1, value: 'value' }] } as any
        };
        const recieved = createIndex([{ id: 1, value: 'value' }], ['id', 'value']);
        expect(JSON.stringify(recieved)).toEqual(JSON.stringify(expected));
        expect(recieved.__indexed_buckets).toEqual(expected.__indexed_buckets);
    })
});
