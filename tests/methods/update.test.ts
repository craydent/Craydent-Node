import update from '../../modules/methods/update';
import { __queryNestedProperty, _subQuery, __pullHelper } from '../../modules/methods/where';

describe('update', () => {

    it('should update the array using condition and set clause as sql', () => {
        let arr = [{ _id: 1 }, { _id: 2 }];
        expect(update(arr, '_id = 1', 'a=1')).toEqual([{ _id: 1, a: 1 }, { _id: 2 }])
    });
    it('should upsert when no items matching condition and option to upsert is passed', () => {
        let arr = [{ _id: 1 }, { _id: 2 }];
        expect(update(arr, '_id = 3', 'a=1', { upsert: true })).toEqual([{ _id: 1 }, { _id: 2 }, { a: 1 }])
    });

    it('should update the array as a replace', () => {
        let arr = [{ _id: 1 }, { _id: 2 }];
        expect(update(arr, { _id: 1 }, { id: 10, a: 1 })).toEqual([{ id: 10, a: 1 }, { _id: 2 }])
    });
    it('should update the array using various operations on a value', () => {
        let arr = [{ _id: 1, a: 1, b: 0, c: 2, d: 10, e: 1, f: 10, g: 2, h: 'h', i: 3, j: 1, k: 5 }, { _id: 2 }];
        const setClause = {
            $unset: { 'a': true },
            $currentDate: { dt: true },
            $inc: { b: 1 },
            $max: { c: 10, d: 2 },
            $min: { e: 10, f: 2 },
            $mul: { g: 2 },
            $bit: {
                h: { "and": 2 },
                i: { and: 1 },
                j: { or: 2 },
                k: { xor: 2 },
                g: { doesnotwork: 1 }
            },
            $rename: { g: 'g1' }
        };
        const expected = [{ _id: 1, b: 1, c: 10, d: 10, dt: expect.any(Date), e: 1, f: 2, g1: 4, h: 'h', i: 3 & 1, j: 1 | 2, k: 5 ^ 2 }, { _id: 2 }];
        expect(update(arr, { _id: 1 }, setClause)).toEqual(expected);
    });
    it('should update the array using various operations on an array', () => {
        let arr = [{
            _id: 1,
            a: [1, 2],
            b: [],
            c: [1, 2],
            d: [1, 2],
            e: [1, 2, 3],
            f: [1, 2],
            g: [1, 2],
            h: [{ id: 3 }],
            i: [{ id: 1 }],
            j: [],
            k: [1, 3],
            l: []
        }];
        const setClause = {
            $addToSet: { a: 1, b: { $each: [1, 2, 2] } },
            $pop: { c: 1, d: -1, _id: 1 },
            $pullAll: { e: [2, 5], _id: 1 },
            $pull: { f: {}, g: 1, _id: 1 },
            $push: {
                h: {
                    $each: [{ id: 2 }],
                    $sort: { id: 1, nothing: 2 }
                },
                i: {
                    $each: [{ id: 2 }],
                    $sort: { id: -1 }
                },
                j: {
                    $each: [1, 2],
                    $slice: 1
                },
                k: {
                    $each: [2],
                    $position: 1,
                },
                l: 5
            }
        };
        const expected = [{
            _id: 1,
            a: [1, 2],
            b: [1, 2],
            c: [1],
            d: [2],
            e: [1, 3],
            f: [],
            g: [2],
            h: [{ id: 2 }, { id: 3 }],
            i: [{ id: 2 }, { id: 1 }],
            j: [2],
            k: [1, 2, 3],
            l: [5]
        }];
        expect(update(arr, { _id: 1 }, setClause)).toEqual(expected);
    });
    it('should update the array using condition and set clause as sql', () => {
        let arr = [{ _id: 1 }, { _id: 2 }];
        expect(update(arr, { $where: function () { return this._id == 1 } }, { $set: { a: 1 } })).toEqual([{ _id: 1, a: 1 }, { _id: 2 }])
    });
});