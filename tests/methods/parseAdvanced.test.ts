import parseAdvanced from '../../modules/methods/parseAdvanced';
jest.mock('../../modules/protected/_parseAdvanced', () => {
    return {
        "default": (...args) => _parseAdvanced.apply(this, args)
    }
});
jest.mock('../../modules/methods/absolutePath', () => {
    return {
        "default": (...args) => absolutePath.apply(this, args)
    }
});
jest.mock('../../modules/methods/include', () => {
    return {
        "default": (...args) => include.apply(this, args)
    }
});
let _parseAdvanced = () => { };
let absolutePath = (p) => { };
let include = (p) => { };
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
        expect(_parseAdvanced).toHaveBeenCalledWith({}, null, undefined, './', 0);
        expect(include).toHaveBeenCalledWith('./parseAdvanced');
        expect(absolutePath).toHaveBeenCalledWith('./parseAdvanced');
    });
    it('should parse a valid json', () => {

        _parseAdvanced = jest.fn();
        parseAdvanced('{"a":12345678901234567,"b":"12345678901234567"}');
        expect(_parseAdvanced).toHaveBeenCalledWith({ a: "12345678901234567", b: "12345678901234567" }, null, undefined, '', 0);

        _parseAdvanced = jest.fn();
        parseAdvanced('{"a":12345678901234567}');
        expect(_parseAdvanced).toHaveBeenCalledWith({ a: "12345678901234567" }, null, undefined, '', 0);

    });
    it('should parse with a basepath', () => {
        _parseAdvanced = jest.fn();
        absolutePath = jest.fn();
        parseAdvanced('{}', null, null, 'basepath');
        expect(_parseAdvanced).toHaveBeenCalledWith({}, null, null, 'basepath/', 0);
    });
});