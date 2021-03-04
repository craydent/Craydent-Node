import isRegExp from '../../compiled/transformedMinor/craydent.isregexp';
jest.mock('../../compiled/transformedMinor/craydent.isregexp/protected/_typeCheck', () => {
    return {
        "default": (...args) => _typeCheck.apply(this, args)
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