import isEven from '../../modules/methods/isEven';
jest.mock('../../modules/protected/_even', () => {
    return {
        "default": (...args) => _even.apply(this, args)
    }
});
let _even = () => { }
describe('isEven', () => {
    beforeEach(() => {
        _even = () => { }
    });

    it('should check if value is even', () => {
        _even = jest.fn();
        isEven(1);
        expect(_even).toHaveBeenCalledWith(1);
    });
});