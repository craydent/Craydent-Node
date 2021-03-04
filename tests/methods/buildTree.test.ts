import buildTree from '../../compiled/transformedMinor/craydent.buildtree';
import isNull from '../../compiled/transformedMinor/craydent.isnull';
describe('buildTree', function () {
    it('childFinder:string', function () {
        expect(buildTree([
            { id: 0, share: "shared", odd: false },
            { id: 1, p: "10", share: "shared", index: 10, std: 4 },
            { id: 2, p: "20", share: "shared", index: 20, std: 4 },
            { id: 3, p: "30", share: "shared", index: 30, std: 4 },
            { id: 4, share: "shared", odd: false },
            { id: 5, share: "shared1", odd: true },
            { id: 6, share: "noShare", odd: true, index: 11 }
        ], function (item) {
            return !item.index;
        }, 'share')).toEqual([{
            id: 0, share: "shared", odd: false, children: [
                { id: 1, p: "10", share: "shared", index: 10, std: 4, children: [] },
                { id: 2, p: "20", share: "shared", index: 20, std: 4, children: [] },
                { id: 3, p: "30", share: "shared", index: 30, std: 4, children: [] }
            ]
        },
        { id: 4, share: "shared", odd: false, children: [] },
        { id: 5, share: "shared1", odd: true, children: [] },
        { id: 6, share: "noShare", odd: true, index: 11, children: [] }]);
    });
    it('childFinder: string with options', function () {
        expect(buildTree([
            { id: 1, p: "10", share: "shared", index: 10, std: 4 },
            { id: 2, p: "20", share: "shared", index: 20, std: 4 },
            { id: 3, p: "30", share: "shared", index: 30, std: 4 },
            { id: 4, share: "shared", odd: false },
            { id: 5, share: "shared1", odd: true }
        ], function (item) {
            return !item.index;
        }, 'share', { childProperty: "cc" })).toEqual([{
            id: 4, share: "shared", odd: false, cc: [
                { id: 1, p: "10", share: "shared", index: 10, std: 4, cc: [] },
                { id: 2, p: "20", share: "shared", index: 20, std: 4, cc: [] },
                { id: 3, p: "30", share: "shared", index: 30, std: 4, cc: [] }]
        }, { id: 5, share: "shared1", odd: true, cc: [] }]);
    });
    it('childFinder: function', function () {
        expect(buildTree([
            { id: 1, p: "10", share: "shared", index: 10, std: 4 },
            { id: 2, p: "20", share: "shared", index: 20, std: 4 },
            { id: 3, p: "30", share: "shared", index: 30, std: 4 },
            { id: 4, share: "shared", odd: false },
            { id: 5, share: "shared1", odd: true }
        ], function (item) {
            return !isNull(item.odd);
        }, function (item) { return !!(item.id % 2); }, { childProperty: "cc" })).toEqual([
            { id: 4, share: "shared", odd: false, cc: [{ id: 2, p: "20", share: "shared", index: 20, std: 4, cc: [] }] },
            { id: 5, share: "shared1", odd: true, cc: [{ id: 1, p: "10", share: "shared", index: 10, std: 4, cc: [] }, { id: 3, p: "30", share: "shared", index: 30, std: 4, cc: [] }] }
        ]);
    });
});