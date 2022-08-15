import duplicate from '../../compiled/transformedMinor/craydent.duplicate';
jest.mock('../../compiled/transformedMinor/craydent.duplicate/protected/_duplicate', () => {
    return {
        "default": (...args: any[]) => _duplicate.apply(this, args as any)
    }
});
let _duplicate = () => { }
describe('duplicate', () => {
    beforeEach(() => {
        _duplicate = () => { }
    });
    it('should not call _duplicate', () => {
        _duplicate = jest.fn();
        expect(duplicate(null)).toBe(null);
        expect(_duplicate).not.toHaveBeenCalled();
    });
    it('should not call _duplicate when object is a valid JSON', () => {
        _duplicate = jest.fn();
        duplicate({}, true);
        expect(_duplicate).not.toHaveBeenCalledWith({}, {}, true);
    });
    it('should call _duplicate when object is not a valid JSON', () => {
        _duplicate = jest.fn();
        duplicate({ hi: /abc/ }, true);
        expect(_duplicate).toHaveBeenCalledWith({}, { hi: /abc/ }, true);
    });
});