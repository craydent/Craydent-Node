import condense from '../../modules/methods/condense';
describe('condense', () => {
    it('should condense array', () => {
        expect(condense([null, false, undefined, 1])).toEqual([false, 1]);
    });
    it('should condense array and remove dupes', () => {
        const obj = {};
        expect(condense([obj, obj, false, null, false, undefined, 1, 1], true))
            .toEqual([obj, false, 1]);
    });
    it('should condense array using a list of values', () => {
        const obj = {}, obj2 = {};
        expect(condense([obj, obj2, false, null, false, undefined, 1, 1], [obj, obj2]))
            .toEqual([false, 1]);
    });
});
