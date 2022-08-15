import _unwind from '../../modules/protected/_unwind';
describe('_unwind', () => {
    it('should _unwind', () => {
        expect(_unwind([{ arr: null }], { path: '$arr', preserveNullAndEmptyArrays: true })).toEqual([{ arr: null }]);
        expect(_unwind([{ arr: null }], { path: '$arr', preserveNullAndEmptyArrays: true, includeArrayIndex: "row" })).toEqual([{ arr: null, row: 0 }]);
        expect(_unwind([{ arr: [1, 2] }], '$arr')).toEqual([{ arr: 1 }, { arr: 2 }]);
        expect(_unwind([{ arr: [1, 2] }], { path: 'arr', includeArrayIndex: "row" })).toEqual([{ arr: 1, row: 0 }, { arr: 2, row: 1 }]);
        expect(_unwind([{ arr: [{ a: [1, 2] }, { a: [3, 4] }] }], { path: 'arr.a', includeArrayIndex: "row" })).toEqual(
            [{ arr: [{ a: 1, row: 0 }, { a: 2, row: 1 }, { a: 3, row: 0 }, { a: 4, row: 1 }] }]
        );
    })
});
