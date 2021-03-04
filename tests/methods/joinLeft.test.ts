import joinLeft from '../../compiled/transformedMinor/craydent.joinleft';
jest.mock('../../compiled/transformedMinor/craydent.where', () => {
    return {
        "_joinHelper": (...args) => _joinHelper.apply(this, args)
    }
});
let _joinHelper = () => { }
describe('innerJoin', () => {
    beforeEach(() => {
        _joinHelper = () => { }
    });
    it('should do an left join', () => {
        _joinHelper = jest.fn();
        joinLeft([{ id: 12 }], [{ id: 1 }], 'id');
        expect(_joinHelper).toHaveBeenCalledWith([{ id: 12 }], [{ id: 1 }], 'id')
    });
});