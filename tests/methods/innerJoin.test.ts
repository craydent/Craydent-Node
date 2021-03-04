import innerJoin from '../../compiled/transformedMinor/craydent.innerjoin';
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
    it('should do an inner join', () => {
        _joinHelper = jest.fn();
        innerJoin([{ id: 1 }], [{ id: 1 }], 'id');
        expect(_joinHelper).toHaveBeenCalledWith([{ id: 1 }], [{ id: 1 }], 'id', true)
    });
});