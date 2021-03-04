import isNumber from '../../compiled/transformedMinor/craydent.isnumber';
jest.mock('../../compiled/transformedMinor/craydent.isnumber/protected/_typeCheck', () => {
    return {
        "default": (...args) => _typeCheck.apply(this, args)
    }
});
let _typeCheck = () => { }
describe('isNumber', () => {
    beforeEach(() => {
        _typeCheck = () => { }
    });

    it('should check if value is a Number', () => {
        _typeCheck = jest.fn(() => true);
        isNumber(1);
        expect(_typeCheck).toHaveBeenCalledWith(1, Number);
    });
});