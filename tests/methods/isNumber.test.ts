import isNumber from '../../modules/methods/isNumber';
jest.mock('../../modules/protected/_typeCheck', () => {
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