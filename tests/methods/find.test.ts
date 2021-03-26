import find from '../../compiled/transformedMinor/craydent.find';
jest.mock('../../compiled/transformedMinor/craydent.where', () => {
    return {
        "default": (...args: any[]) => _where.apply(this, args as any)
    }
});
let _where = () => { }
describe('find', () => {
    beforeEach(() => {
        _where = () => { }
    });
    it('should call where without projection', () => {
        _where = jest.fn().mockImplementationOnce(() => []);
        let arr = [{ id: 1 }, { id: 2 }];
        expect(find(arr, {})).toEqual([]);
        expect(_where).toHaveBeenCalledWith(arr, {}, undefined);
    });
    it('should call where with projection', () => {
        _where = jest.fn().mockImplementationOnce(() => []);
        let arr = [{ id: 1 }, { id: 2 }];
        expect(find(arr, {}, { id: 1 })).toEqual([]);
        expect(_where).toHaveBeenCalledWith(arr, {}, { id: 1 });
    });
});
