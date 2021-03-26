import filter from '../../compiled/transformedMinor/craydent.filter';
describe('filter', () => {
    it('should filter array', () => {
        let arr = [{ id: 1 }, { id: 2 }];
        expect(filter(arr, (obj) => obj.id == 1)).toEqual([{ id: 1 }]);
    });
    it('should throw when callback is not a function', () => {
        let arr = [{ id: 1 }, { id: 2 }];
        expect(filter(arr, null as any)).toEqual([]);
    });
});
