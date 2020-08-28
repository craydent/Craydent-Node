import isString from '../../modules/methods/isString';
jest.mock('../../modules/protected/_typeCheck', () => {
    return {
        "default": (...args) => _typeCheck.apply(this, args)
    }
});
let _typeCheck = () => { }
describe('isString', () => {
    beforeEach(() => {
        _typeCheck = () => { }
    });

    it('should check if value is a String', () => {
        _typeCheck = jest.fn(() => true);
        isString(new Promise(() => { }));
        expect(_typeCheck).toHaveBeenCalledWith(new Promise(() => { }), String);
    });
});