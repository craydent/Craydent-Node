import isPromise from '../../compiled/transformedMinor/craydent.ispromise';
jest.mock('../../compiled/transformedMinor/craydent.ispromise/protected/_typeCheck', () => {
    return {
        "default": (...args: any[]) => _typeCheck.apply(this, args as any)
    }
});
let _typeCheck = () => { }
describe('isPromise', () => {
    beforeEach(() => {
        _typeCheck = () => { }
    });

    it('should check if value is a Promise', () => {
        _typeCheck = jest.fn(() => true);
        isPromise(new Promise(() => { }));
        expect(_typeCheck).toHaveBeenCalledWith(new Promise(() => { }), "Promise", true);
    });
});