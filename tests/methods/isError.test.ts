import isError from '../../modules/methods/isError';
import { $c } from '../../modules/private/__common';
jest.mock('../../modules/protected/_typeCheck', () => {
    return {
        "default": (...args) => _typeCheck.apply(this, args)
    }
});
let _typeCheck = () => { }
describe('isError', () => {
    beforeEach(() => {
        _typeCheck = () => { }
    });

    it('should check if value is an Error', () => {
        _typeCheck = jest.fn();
        const err = new Error();
        isError(err);
        expect(_typeCheck).toHaveBeenCalledWith(err, Error);
    });

    it('should check if value is a custom error', () => {
        function CustomError() { }
        $c.ERROR_TYPES.push(CustomError)
        expect(isError(new CustomError())).toBe(true);
        expect(isError(CustomError)).toBe(true);
    });
});