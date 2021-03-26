import stringifyAdvanced from '../../compiled/transformedMinor/craydent.stringifyadvanced';

jest.mock('../../compiled/transformedMinor/craydent.stringifyadvanced/protected/_stringifyAdvanced', () => {
    return {
        "default": (...args: any[]) => _stringifyAdvanced.apply(this, args as any)
    }
});
let _stringifyAdvanced = () => { }
describe('stringifyAdvanced', () => {
    beforeEach(() => {
        _stringifyAdvanced = () => { }
    });

    it('should stringifyAdvanced the object', () => {
        _stringifyAdvanced = jest.fn(() => ({}));
        const obj = {};
        expect(stringifyAdvanced(obj)).toBe('{}');
        expect(_stringifyAdvanced).toHaveBeenCalledWith(obj);
    });
});