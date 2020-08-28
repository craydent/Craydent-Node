import findOne from '../../modules/methods/findOne';
jest.mock('../../modules/methods/where', () => {
    return {
        "default": (...args) => _where.apply(this, args)
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
