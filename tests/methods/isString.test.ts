import isString from '../../compiled/transformedMinor/craydent.isstring';
jest.mock('../../compiled/transformedMinor/craydent.isstring/protected/_typeCheck', () => {
    return {
        "default": (...args: any[]) => _typeCheck.apply(this, args as any)
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