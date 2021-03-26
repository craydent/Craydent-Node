import ltrim from '../../compiled/transformedMinor/craydent.ltrim';
jest.mock('../../compiled/transformedMinor/craydent.ltrim/protected/_generalTrim', () => {
    return {
        "default": (...args: any[]) => _generalTrim.apply(this, args as any)
    }
});
let _generalTrim = () => { }
describe('ltrim', () => {
    beforeEach(() => {
        _generalTrim = () => { }
    });

    it('should trim the left side', () => {
        _generalTrim = jest.fn();
        ltrim('  abc  ', ['c']);
        expect(_generalTrim).toHaveBeenCalledWith('  abc  ', 'l', ['c']);

    });
});