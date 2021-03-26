import isOdd from '../../compiled/transformedMinor/craydent.isodd';
jest.mock('../../compiled/transformedMinor/craydent.isodd/protected/_even', () => {
    return {
        "default": (...args: any[]) => _even.apply(this, args as any)
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