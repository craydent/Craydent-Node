import _whereFunction from '../../modules/protected/_whereFunction';
describe('_whereFunction', () => {
    it('should not return any items when condition method is not provided', () => {
        expect(_whereFunction({ objs: [{}], condition: null as any })).toEqual([]);
    })
    it('should not return any items when condition method is not provided', () => {
        expect(_whereFunction({ objs: [{ id: 1 }, { id: 2 }], condition: function (i, objs) { return this.id == 1 } })).toEqual([{ id: 1 }]);
    })
});
