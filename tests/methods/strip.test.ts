import strip from '../../compiled/transformedMinor/craydent.strip';

jest.mock('../../compiled/transformedMinor/craydent.strip/protected/_generalTrim', () => {
    return {
        "default": (...args: any[]) => _generalTrim.apply(this, args as any)
    }
});
let _generalTrim = () => { }
describe('strip', () => {
    beforeEach(() => {
        _generalTrim = () => { }
    });

    it('should strip characters from string', () => {
        _generalTrim = jest.fn(() => 'str');
        const str = 'aaastraaa';
        const char = 'a';
        expect(strip(str, char)).toBe('str');
        expect(_generalTrim).toHaveBeenCalledWith(str, undefined, char);
    });
    it('should strip spaces from string', () => {
        _generalTrim = jest.fn(() => 'str');
        const str = '  str  ';

        expect(strip(str)).toBe('str');
        expect(_generalTrim).toHaveBeenCalledWith(str, undefined, undefined);
    });
});