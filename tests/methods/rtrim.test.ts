import rtrim from '../../modules/methods/rtrim';
jest.mock('../../modules/protected/_generalTrim', () => {
    return {
        "default": (...args) => _generalTrim.apply(this, args)
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