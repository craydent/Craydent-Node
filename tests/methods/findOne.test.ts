import findOne from '../../compiled/transformedMinor/craydent.findone';
jest.mock('../../compiled/transformedMinor/craydent.where', () => {
    return {
        "default": (...args: any[]) => _where.apply(this, args as any)
    }
});
let _where = () => { }
describe('findOne', () => {
    beforeEach(() => {
        _where = () => { }
    });
    it('should call where without projection', () => {
        _where = jest.fn().mockImplementationOnce(() => []);
        let arr = [{ id: 1 }, { id: 2 }];
        expect(findOne(arr, {})).toEqual(undefined);
        expect(_where).toHaveBeenCalledWith(arr, {}, undefined, 1);
    });
    it('should call where with projection', () => {
        _where = jest.fn().mockImplementationOnce(() => []);
        let arr = [{ id: 1 }, { id: 2 }];
        expect(findOne(arr, {}, { id: 1 })).toEqual(undefined);
        expect(_where).toHaveBeenCalledWith(arr, {}, { id: 1 }, 1);
    });
});
