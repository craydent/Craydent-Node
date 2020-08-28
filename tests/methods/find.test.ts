import find from '../../modules/methods/find';
jest.mock('../../modules/methods/where', () => {
    return {
        "default": (...args) => _where.apply(this, args)
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
