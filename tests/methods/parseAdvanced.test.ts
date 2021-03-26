import parseAdvanced from '../../compiled/transformedMinor/craydent.parseadvanced';
jest.mock('../../compiled/transformedMinor/craydent.parseadvanced/protected/_parseAdvanced', () => {
    return {
        "default": (...args: any[]) => _parseAdvanced.apply(this, args as any)
    }
});
jest.mock('../../compiled/transformedMinor/craydent.absolutepath', () => {
    return {
        "default": (...args: any[]) => absolutePath.apply(this, args as any)
    }
});
jest.mock('../../compiled/transformedMinor/craydent.include', () => {
    return {
        "default": (...args: any[]) => include.apply(this, args as any)
    }
});
let _parseAdvanced = () => { };
let absolutePath = (p: any) => { };
let include = (p: any) => { };
describe('parseAdvanced', () => {
    beforeEach(() => {
        _parseAdvanced = () => { };
        absolutePath = () => { };
    });
    it('should not parse invalid json', () => {
        _parseAdvanced = jest.fn();
        absolutePath = jest.fn(p => p);
        include = jest.fn(m => null);
        expect(parseAdvanced('{')).toBeUndefined();
        expect(_parseAdvanced).not.toHaveBeenCalled();
        expect(include).toHaveBeenCalledWith('{');
        expect(absolutePath).toHaveBeenCalledWith('{');
    });
    it('should not parse non json', () => {
        _parseAdvanced = jest.fn();
        absolutePath = jest.fn(p => p);
        include = jest.fn(m => null);
        expect(parseAdvanced('0')).toBeUndefined();
        expect(_parseAdvanced).not.toHaveBeenCalled();
        expect(include).toHaveBeenCalledWith('0');
        expect(absolutePath).toHaveBeenCalledWith('0');
    });
    it('should import', () => {
        _parseAdvanced = jest.fn(() => ({}));
        absolutePath = jest.fn(p => p);
        include = jest.fn(m => ({}));
        expect(parseAdvanced('./parseAdvanced')).toEqual({});
        expect(_parseAdvanced).toHaveBeenCalledWith({}, null, undefined, './', 1);
        expect(include).toHaveBeenCalledWith('./parseAdvanced');
        expect(absolutePath).toHaveBeenCalledWith('./parseAdvanced');
    });
    it('should parse a valid json', () => {

        _parseAdvanced = jest.fn();
        parseAdvanced('{"a":12345678901234567,"b":"12345678901234567"}');
        expect(_parseAdvanced).toHaveBeenCalledWith({ a: "12345678901234567", b: "12345678901234567" }, null, undefined, '', 1);

        _parseAdvanced = jest.fn();
        parseAdvanced('{"a":12345678901234567}');
        expect(_parseAdvanced).toHaveBeenCalledWith({ a: "12345678901234567" }, null, undefined, '', 1);

    });
    it('should parse with a basepath', () => {
        _parseAdvanced = jest.fn();
        absolutePath = jest.fn();
        parseAdvanced('{}', null as any, null as any, 'basepath');
        expect(_parseAdvanced).toHaveBeenCalledWith({}, null, null, 'basepath/', 1);
    });
});