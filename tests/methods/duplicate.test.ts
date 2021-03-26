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
    it('should should call _duplicate', () => {
        _duplicate = jest.fn();
        duplicate({}, true);
        expect(_duplicate).toHaveBeenCalledWith({}, {}, true);
    });
});