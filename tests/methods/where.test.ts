import where, { __processStage, _joinHelper, _copyWithProjection, _createFuncAndFilter, _recordRange, _reverseRange, _searchRange } from '../../compiled/transformedMinor/craydent.where';

import { IndexedBucket, IndexedArray } from '../../compiled/transformedMinor/craydent.where/models/Arrays';
jest.mock('../../compiled/transformedMinor/craydent.where/protected/_redact', () => {
    return {
        "default": (...args: any[]) => _redact.apply(this, args as any)
    }
});
jest.mock('../../compiled/transformedMinor/craydent.where/protected/_unwind', () => {
    return {
        "default": (...args: any[]) => _unwind.apply(this, args as any)
    }
});
jest.mock('../../compiled/transformedMinor/craydent.where/private/__whereParsers', () => {
    return {
        "__processGroup": (...args: any[]) => __processGroup.apply(this, args as any),
        "__processExpression": (...args: any[]) => __processExpression.apply(this, args as any)
    }
});
let _redact = () => { }
let _unwind = () => { }
let __processGroup = () => { }
let __processExpression = () => { }
describe('where', () => {
    beforeEach(() => {
        _redact = () => { }
        _unwind = () => { }
        __processGroup = () => { }
        __processExpression = () => { }
    })
    it('should return blank array when give null', () => {
        expect(where(null as any)).toEqual([]);
    });
    it('should return blank array when give no items', () => {
        expect(where([])).toEqual([]);
    });
    it('should return blank array when give limit of 0', () => {
        expect(where([{ a: 1 }], {}, 0)).toEqual([]);
    });
    it('should return copy array when give no condition', () => {
        expect(where([])).toEqual([]);
        expect(where([{ a: 1 }, {}, {}], null as any, null as any, 1)).toEqual([{ a: 1 }]);
    });
    it('should return filtered array using function as condition', () => {
        expect(where([{ a: 0 }, { a: 1 }], function (this: any) { return this.a })).toEqual([{ a: 1 }]);
    });
    it('should return filtered array with simple condition', () => {
        expect(where([{ a: 0 }, { a: 1 }], { a: 1 })).toEqual([{ a: 1 }]);
        expect(where([{ a: '0' }, { a: '1' }], { a: '1' })).toEqual([{ a: '1' }]);
        expect(where([{ a: 'abc' }, { a: 'bc' }], { a: /ab/ })).toEqual([{ a: 'abc' }]);
        expect(where([{ a: {} }, { a: { b: 1 } }], { a: {} })).toEqual([{ a: {} }]);
        expect(where([{ a: { b: 1 } }, { a: { b: 2 } }], { 'a.b': 1 })).toEqual([{ a: { b: 1 } }]);
    });
    it('should return filtered array with complex condition', () => {
        expect(where([{ a: 0 }, { a: 1 }], { a: { $eq: 1 } })).toEqual([{ a: 1 }]);
    });
    it('should return filtered array using indexes', () => {
        type T = { a: number };
        const a1b1 = { a: 1, b: 1, c: 1 };
        const a2b1 = { a: 2, b: 1, c: 1 };
        const a2b2 = { a: 2, b: 2, c: 1 };
        const iarr: IndexedArray<T> = [a1b1, a2b1, a2b2] as any;
        iarr.__indexed_buckets = {
            a: { __bucket_keys: [1, 2], 1: [a1b1], 2: [a2b1, a2b2] },
            b: { __bucket_keys: [1, 2], 1: [a1b1, a2b1], 2: [a2b2] }
        };

        expect(where(iarr, { a: 1 })).toEqual([{ a: 1, b: 1, c: 1 }]);
        expect(where(iarr, { a: 2, b: 1, c: 1 })).toEqual([{ a: 2, b: 1, c: 1 }]);
    });
    describe('__processStage', () => {
        let docs: any[] = [];
        beforeEach(() => {
            _redact = () => { }
            _unwind = () => { }
            __processGroup = () => { }
            docs = [{ a: 1, b: 1 }, { a: 2, b: 2 }]
        });
        it('should process $project', () => {
            expect(__processStage(docs, { $project: { a: 1 } })).toEqual([{ a: 1 }, { a: 2 }]);
        });
        it('should process $match', () => {
            expect(__processStage(docs, { $match: { a: 1 } })).toEqual([{ a: 1, b: 1 }]);
        });
        it('should process $redact', () => {
            _redact = jest.fn(() => ({}));
            expect(__processStage(docs, { $redact: { a: 1 } })).toEqual({});
            expect(_redact).toHaveBeenCalledWith(docs, { a: 1 });
        });
        it('should process $limit', () => {
            expect(__processStage(docs, { $limit: 1 })).toEqual([{ a: 1, b: 1 }]);
        });
        it('should process $skip', () => {
            expect(__processStage(docs, { $skip: 1 })).toEqual([{ a: 2, b: 2 }]);
        });
        it('should process $unwind', () => {
            _unwind = jest.fn(() => ({}));
            expect(__processStage(docs, { $unwind: { a: 1 } })).toEqual({});
            expect(_unwind).toHaveBeenCalledWith([{ a: 1, b: 1 }, { a: 2, b: 2 }], { a: 1 });
        });
        it('should process $group', () => {
            __processGroup = jest.fn(() => ({}));
            expect(__processStage(docs, { $group: { a: 1 } })).toEqual({});
            expect(__processGroup).toHaveBeenCalledWith([{ a: 1, b: 1 }, { a: 2, b: 2 }], { a: 1 });
        });
        it('should process $sort', () => {
            expect(__processStage(docs, { $sort: { a: 1 } })).toEqual([{ a: 1, b: 1 }, { a: 2, b: 2 }]);
            expect(__processStage(docs, { $sort: { a: -1 } })).toEqual([{ a: 2, b: 2 }, { a: 1, b: 1 }]);
        });
        it('should process $out', () => {
            expect((global as any).out).toBeUndefined();
            expect(__processStage(docs, { $out: 'out' })).toEqual([{ a: 1, b: 1 }, { a: 2, b: 2 }]);
            expect((global as any).out).toEqual([{ a: 1, b: 1 }, { a: 2, b: 2 }]);
            delete (global as any).out;

            let arr: any[] = [];
            expect(__processStage(docs, { $out: arr })).toEqual([{ a: 1, b: 1 }, { a: 2, b: 2 }]);
            expect(arr).toEqual([{ a: 1, b: 1 }, { a: 2, b: 2 }]);
        });
        it('should process $sample', () => {
            expect((__processStage([{ a: 1, b: 1 }], { $sample: { size: 1 } }) as any).sample).toEqual([{ a: 1, b: 1 }]);
        });
        it('should process $lookup', () => {
            const stage = { $lookup: { from: docs, localField: 'key', foreignField: 'a', as: 'count' } };
            docs = [{ aa: 1, bb: 1, key: 1 }, { aa: 2, bb: 2 }];
            expect(__processStage(docs, stage)).toBe(docs);
            expect(docs[0]['count']).toEqual([{ a: 1, b: 1 }]);
        });
    });
    describe('_joinHelper', () => {
        it('should join the arrays', () => {
            expect(_joinHelper([{ _id: 1, a: 1, b: 1 }], [{ _id: 1, c: 1, d: 1 }], '_id')).toEqual([{ _id: 1, a: 1, b: 1, c: 1, d: 1 }]);
            expect(_joinHelper([{ _id: 1, a: 1, b: 1 }], [{ _id: 1, c: 1, d: 1 }], '_id=_id')).toEqual([{ _id: 1, a: 1, b: 1, c: 1, d: 1 }]);
            expect(_joinHelper([{ _id: 1, a: 1, b: 1 }], [{ id: 1, c: 1, d: 1 }], ['_id', 'id'])).toEqual([{ _id: 1, id: 1, a: 1, b: 1, c: 1, d: 1 }]);
            expect(_joinHelper([{ _id: 1, a: 1, b: 1 }], [{ _id: 2, c: 1, d: 1 }], '_id', false)).toEqual([{ _id: 1, a: 1, b: 1, c: null, d: null }]);
        });
    });
    describe('_copyWithProjection', () => {
        const obj = { id: 1, a: 1, b: 1 };
        it('should return original when projection arg is true', () => {
            expect(_copyWithProjection(obj, true)).toBe(obj);
        });
        it('should return copy when projection is emply', () => {
            expect(_copyWithProjection(obj, [])).toEqual(obj);
            expect(_copyWithProjection(obj, [])).not.toBe(obj);
        });
        it('should return copy when projection is a string', () => {
            expect(_copyWithProjection(obj, 'id')).toEqual({ id: 1 });
        });
        it('should return copy when projection is a array', () => {
            expect(_copyWithProjection(obj, ['id'])).toEqual({ id: 1 });
        });
        it('should return copy when projection is a object', () => {
            expect(_copyWithProjection(obj, { id: 1 })).toEqual({ id: 1 });
            expect(_copyWithProjection(obj, { id2: '2' })).toEqual({ id2: '2' });
            __processExpression = jest.fn(() => '2');
            expect(_copyWithProjection(obj, { id: '2' })).toEqual({ id: '2' });
            expect(__processExpression).toHaveBeenCalledWith({ id: 1, a: 1, b: 1 }, '2');
        });
        it('should return copy when projection property of the object is an array', () => {
            expect(_copyWithProjection({ id: [{ a: 1 }], a: 1, b: 1 }, { 'id.$': 1 })).toEqual({ id: [{ a: 1 }] });
            expect(_copyWithProjection({ id: [{ a: 1 }], a: 1, b: 1 }, { id: { $elemMatch: { a: 1 } } })).toEqual({ id: [{ a: 1 }] });
            expect(_copyWithProjection({ id: [{ a: 1 }], a: 1, b: 1 }, { id: { $elemMatch: { a: 2 } } })).toEqual({});
            expect(_copyWithProjection({ id: [{ a: 1 }], a: 1, b: 1 }, { id: { $slice: 1 } })).toEqual({ id: [{ a: 1 }] });
            expect(_copyWithProjection({ id: [{ a: 1 }], a: 1, b: 1 }, { id: { $slice: [0, 1] } })).toEqual({ id: [{ a: 1 }] });
            expect(_copyWithProjection({ id: [{ a: 1 }], a: 1, b: 1 }, { id: 1 })).toEqual({ id: [{ a: 1 }] });

        });
        it('should return copy when projection is * or null', () => {
            expect(_copyWithProjection(obj, '*')).toEqual({ id: 1, a: 1, b: 1 });
            expect(_copyWithProjection(obj, null as any)).toEqual({ id: 1, a: 1, b: 1 });
        });
    });
    describe('_createFunc', () => {
        it('should handle ifblock', () => {
            const defaultArgs = { condition: null, arr: [{ a: 1, b: 1 }, { a: 2, b: 2 }], ifblock: 'true', limit: 1 };
            expect(_createFuncAndFilter(defaultArgs)).toEqual([{ a: 1, b: 1 }]);
            expect(_createFuncAndFilter({ ...defaultArgs, _refs: [{}], projection: { a: 1 } })).toEqual([{ a: 1 }]);
            expect(_createFuncAndFilter({ ...defaultArgs, _refs: [{}], projection: { a: 1 }, limit: 10 })).toEqual([{ a: 1 }, { a: 2 }]);
        });
        it('should handle no ifblock', () => {
            const defaultArgs = { condition: { a: 1, 'b.c': 1 }, arr: [{ a: 1, b: { c: 1 } }, { a: 1, b: { c: 2 } }, { a: 2, b: { c: 2 } }], limit: 0 };
            expect(_createFuncAndFilter(defaultArgs)).toEqual([{ a: 1, b: { c: 1 } }]);
            expect(_createFuncAndFilter({ ...defaultArgs, _refs: [{}], projection: { a: 1 } })).toEqual([{ a: 1 }]);
        });
    });
    describe('_recordRange', () => {
        it('should handle no ranges', () => {
            const range: any[] = [];
            expect(_recordRange(range, 0, 0)).toBeUndefined();
            expect(range).toEqual([[0, 0]]);
        });
        it('should handle range start is greater than the end given', () => {
            const range = [[1, 1]];
            expect(_recordRange(range, 0, 0)).toBeUndefined();
            expect(range).toEqual([[0, 0], [1, 1]]);
        });
        it('should handle range end is less than the start given', () => {
            const range = [[0, 0]];
            expect(_recordRange(range, 1, 1)).toBeUndefined();
            expect(range).toEqual([[0, 1]]);
        });
        it('should handle ranges crossing', () => {
            const range = [[2, 7]];
            expect(_recordRange(range, 6, 10)).toBeUndefined();
            expect(range).toEqual([[2, 10]]);

            const range2 = [[2, 6], [10, 10]];
            expect(_recordRange(range2, 7, 11)).toBeUndefined();
            expect(range2).toEqual([[2, 11]]);
        });
        it('should handle ranges not crossing', () => {
            const range = [[2, 6]];
            expect(_recordRange(range, 8, 10)).toBeUndefined();
            expect(range).toEqual([[2, 6], [8, 10]]);

            const range2 = [[2, 5], [10, 11]];
            expect(_recordRange(range2, 7, 8)).toBeUndefined();
            expect(range2).toEqual([[2, 5], [10, 11]]);
        });
        it('should handle ranges within already defined', () => {
            const range = [[2, 6]];
            expect(_recordRange(range, 3, 4)).toBeUndefined();
            expect(range).toEqual([[2, 6]]);
        });
        it('should handle ranges containing already defined', () => {
            const range = [[2, 6]];
            expect(_recordRange(range, 1, 7)).toBeUndefined();
            expect(range).toEqual([[2, 7]]);
        });

        it('should handle overlap with start less than range start', () => {
            const range = [[2, 6], [10, 11]];
            expect(_recordRange(range, 1, 7)).toBeUndefined();
            expect(range).toEqual([[2, 7], [10, 11]]);
        });

        it('should handle ranges using flag as 1', () => {
            const range = [[2, 6], [10, 11]];
            expect(_recordRange(range, 5, 7, 1)).toBeUndefined();
            expect(range).toEqual([[2, 7]]);
        });

        it('should handle ranges using flag as 2 and new range without overlap', () => {
            const range = [[2, 6], [11, 12]];
            expect(_recordRange(range, 8, 9, 2)).toBeUndefined();
            expect(range).toEqual([[8, 12]]);
        });

        it('should handle ranges using flag as 2 and new range with overlap', () => {
            const range = [[2, 6], [10, 11]];
            expect(_recordRange(range, 7, 10, 2)).toBeUndefined();
            expect(range).toEqual([[7, 6], [10, 11]]);
        });

    });
    describe('_reverseRange', () => {
        it('should return blank array when end less than range end', () => {
            const expected: any[] = [];
            (expected as any).items = 0;
            expect(_reverseRange([[1, 4]], 1, 2)).toEqual(expected);
        });
        it('should reverse rangeaaaaa', () => {
            const expected = [[5, 5]];
            (expected as any).items = 0;
            expect(_reverseRange([[1, 4]], 1, 5)).toEqual(expected);
        });
        it('should reverse range', () => {
            const expected = [[0, 0], [5, 5]];
            (expected as any).items = 2;
            expect(_reverseRange([[1, 4]], 0, 5)).toEqual(expected);
        });
    });
    describe('_searchRange', () => {
        const ibucket: IndexedBucket<any> = { 1: [{ a: 1 }], 2: [{ a: 2 }], 3: [{ a: 3 }] } as any;
        ibucket.__bucket_keys = [1, 2, 3];
        it('should return item at index', () => {
            expect(_searchRange(ibucket, { condition: 1 })).toEqual([{ a: 1 }])
        });
        it('should return index of indexed field', () => {
            expect(_searchRange(ibucket as any, { condition: 2, findIndex: true })).toBe(1);
        });
        it('should return array of ranges when given $eq/$equal/$ne', () => {
            expect(_searchRange(ibucket, { condition: { $eq: 1 } })).toEqual([{ a: 1 }])
            expect(_searchRange(ibucket, { condition: { $equal: 1 } })).toEqual([{ a: 1 }])
            expect(_searchRange(ibucket, { condition: { $ne: 1 } })).toEqual([{ a: 2 }, { a: 3 }])
        });
        it('should return array of ranges when given $lt/$lte', () => {
            expect(_searchRange(ibucket, { condition: { $lt: 2 } })).toEqual([{ a: 1 }])
            expect(_searchRange(ibucket, { condition: { $lte: 2 } })).toEqual([{ a: 1 }, { a: 2 }])
        });
        it('should return array of ranges when given $gt/$gte', () => {
            expect(_searchRange(ibucket, { condition: { $gt: 2 } })).toEqual([{ a: 3 }])
            expect(_searchRange(ibucket, { condition: { $gte: 2 } })).toEqual([{ a: 2 }, { a: 3 }])
        });
        it('should return array of ranges when given $exists', () => {
            const ibucket2: IndexedBucket<any> = { 1: [{ a: 1 }], 2: [{ a: 2 }], 3: [{ a: 3 }], undefined: { b: 1 } } as any;
            ibucket2.__bucket_keys = [1, 2, 3, undefined];
            expect(_searchRange(ibucket2, { condition: { $exists: true } })).toEqual([{ a: 1 }, { a: 2 }, { a: 3 }])
            expect(_searchRange(ibucket2, { condition: { $exists: false } })).toEqual([{ b: 1 }])
        });
        it('should return array of ranges when given $in/$nin', () => {
            expect(_searchRange(ibucket, { condition: { $in: [1] } })).toEqual([{ a: 1 }])
            expect(_searchRange(ibucket, { condition: { $nin: [1] } })).toEqual([{ a: 2 }, { a: 3 }])
        });
    });
});
