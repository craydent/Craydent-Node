import deleteit from '../../compiled/transformedMinor/craydent.delete';
jest.mock('../../compiled/transformedMinor/craydent.delete/protected/_removeFromIndex', () => {
    return {
        "default": (...args: any[]) => _removeFromIndex.apply(this, args as any)
    }
});
let _removeFromIndex = () => { }
describe('deleteit no index', () => {
    it('should delete first matching', () => {
        const arr = [{ id: 1, p: 1 }, { id: 1, p: 2 }, { id: 2 }];
        const expected = [{ id: 1, p: 2 }, { id: 2 }];
        const result = deleteit(arr, { id: 1 });
        expect(arr).toEqual(expected);
        expect(result).toEqual([{ id: 1, p: 1 }]);

    });
    it('should delete first item', () => {
        const arr = [{ id: 1 }, { id: 1 }, { id: 2 }];
        const expected = [{ id: 1 }, { id: 2 }];
        const result = deleteit(arr);
        expect(arr).toEqual(expected);
        expect(result).toEqual([{ id: 1 }]);
    });
    it('should delete all matching', () => {
        const arr = [{ id: 1 }, { id: 1 }, { id: 2 }];
        const expected = [{ id: 2 }];
        const result = deleteit(arr, { $where: function () { return this.id == 1 } }, false);
        expect(arr).toEqual(expected);
        expect(result).toEqual([{ id: 1 }, { id: 1 }]);
    });
    it('should delete all', () => {
        const arr = [{ id: 1 }, { id: 1 }, { id: 2 }];
        const expected: any = [];
        const result = deleteit(arr, null, false);
        expect(arr).toEqual(expected);
        expect(result).toEqual([{ id: 1 }, { id: 1 }, { id: 2 }]);
    });
});
describe('deleteit with index', () => {
    beforeEach(() => {
        _removeFromIndex = () => { };
    });
    it('should delete first matching', () => {
        _removeFromIndex = jest.fn();
        const arr: any = [{ id: 1, p: 1 }, { id: 1, p: 2 }, { id: 2 }];
        arr.__indexed_buckets = [];
        deleteit(arr, { id: 1 }, false);
        expect(_removeFromIndex).toHaveBeenCalledTimes(2);
    });
    it('should delete first item', () => {
        _removeFromIndex = jest.fn();
        const arr: any = [{ id: 1 }, { id: 1 }, { id: 2 }];
        arr.__indexed_buckets = [];
        deleteit(arr, { id: 1 });
        expect(_removeFromIndex).toHaveBeenCalledTimes(1);
    });

});