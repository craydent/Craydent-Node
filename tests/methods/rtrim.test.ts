import rtrim from '../../compiled/transformedMinor/craydent.rtrim';
jest.mock('../../compiled/transformedMinor/craydent.rtrim/protected/_generalTrim', () => {
    return {
        "default": (...args: any[]) => _generalTrim.apply(this, args as any)
    }
});
let _generalTrim = () => { }
describe('rtrim', () => {
    beforeEach(() => {
        _generalTrim = () => { }
    });

    it('should trim the left side', () => {
        _generalTrim = jest.fn();
        rtrim('  abc  ', ['c']);
        expect(_generalTrim).toHaveBeenCalledWith('  abc  ', 'r', ['c']);
    });
});