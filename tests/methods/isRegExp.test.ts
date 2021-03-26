import isRegExp from '../../compiled/transformedMinor/craydent.isregexp';
jest.mock('../../compiled/transformedMinor/craydent.isregexp/protected/_typeCheck', () => {
    return {
        "default": (...args: any[]) => _typeCheck.apply(this, args as any)
    }
});
let _typeCheck = () => { }
describe('isRegExp', () => {
    beforeEach(() => {
        _typeCheck = () => { }
    });

    it('should check if value is a RegExp', () => {
        _typeCheck = jest.fn(() => true);
        isRegExp(/g/);
        expect(_typeCheck).toHaveBeenCalledWith(/g/, RegExp);
    });
});