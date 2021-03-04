import isDate from '../../compiled/transformedMinor/craydent.isdate';
jest.mock('../../compiled/transformedMinor/craydent.isdate/protected/_typeCheck', () => {
    return {
        "default": (...args) => _typeCheck.apply(this, args)
    }
});
let _typeCheck = () => { }
describe('isDate', () => {
    beforeEach(() => {
        _typeCheck = () => { }
    });

    it('should check if value is a Date', () => {
        _typeCheck = jest.fn();
        const dt = new Date();
        isDate(dt);
        expect(_typeCheck).toHaveBeenCalledWith(dt, Date);
    });
});