import isFunction from '../../modules/methods/isFunction';
jest.mock('../../modules/protected/_typeCheck', () => {
    return {
        "default": (...args) => _typeCheck.apply(this, args)
    }
});
let _typeCheck = () => { }
describe('isFunction', () => {
    beforeEach(() => {
        _typeCheck = () => { }
    });

    it('should check if value is a Function', () => {
        _typeCheck = jest.fn(() => true);
        expect(isFunction(() => { })).toBe(true);
        expect(_typeCheck).toHaveBeenCalledWith(expect.any(Function), Function);
        expect(isFunction(async () => { })).toBe(false);
    });
});