import isOdd from '../../modules/methods/isOdd';
jest.mock('../../modules/protected/_even', () => {
    return {
        "default": (...args) => _even.apply(this, args)
    }
});
let _even = () => { }
describe('isOdd', () => {
    beforeEach(() => {
        _even = () => { }
    });

    it('should check if value is odd', () => {
        _even = jest.fn();
        isOdd(1);
        expect(_even).toHaveBeenCalledWith(1);
    });
});