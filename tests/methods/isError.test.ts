import isError from '../../compiled/transformedMinor/craydent.iserror';
import { $c } from '../../compiled/transformedMinor/craydent.iserror/private/__common';
jest.mock('../../compiled/transformedMinor/craydent.iserror/protected/_typeCheck', () => {
    return {
        "default": (...args: any[]) => _typeCheck.apply(this, args as any)
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
        expect(isError(new (CustomError as any)())).toBe(true);
        expect(isError(CustomError)).toBe(true);
    });
});