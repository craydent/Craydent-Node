import isBoolean from '../../modules/methods/isBoolean';
jest.mock('../../modules/protected/_typeCheck', () => {
    return {
        "default": (...args) => _typeCheck.apply(this, args)
    }
});
let _typeCheck = () => { }
describe('isBoolean', () => {
    beforeEach(() => {
        _typeCheck = () => { }
    });

    it('should check if value is a boolean', () => {
        _typeCheck = jest.fn();
        isBoolean(true);
        expect(_typeCheck).toHaveBeenCalledWith(true, Boolean);
    });
});