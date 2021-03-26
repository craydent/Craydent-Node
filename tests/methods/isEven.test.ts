import isEven from '../../compiled/transformedMinor/craydent.iseven';
jest.mock('../../compiled/transformedMinor/craydent.iseven/protected/_even', () => {
    return {
        "default": (...args: any[]) => _even.apply(this, args as any)
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