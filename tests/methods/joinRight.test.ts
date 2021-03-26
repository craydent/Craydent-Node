import joinRight from '../../compiled/transformedMinor/craydent.joinright';
jest.mock('../../compiled/transformedMinor/craydent.where', () => {
    return {
        "_joinHelper": (...args: any[]) => _joinHelper.apply(this, args as any)
    }
});
let _joinHelper = () => { }
describe('innerJoin', () => {
    beforeEach(() => {
        _joinHelper = () => { }
    });
    it('should do an right join', () => {
        _joinHelper = jest.fn();
        joinRight([{ id: 1 }], [{ id: 12 }], 'id');
        expect(_joinHelper).toHaveBeenCalledWith([{ id: 12 }], [{ id: 1 }], 'id')
    });
});