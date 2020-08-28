import duplicate from '../../modules/methods/duplicate';
jest.mock('../../modules/protected/_duplicate', () => {
    return {
        "default": (...args) => _duplicate.apply(this, args)
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