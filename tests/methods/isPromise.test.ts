import isPromise from '../../modules/methods/isPromise';
jest.mock('../../modules/protected/_typeCheck', () => {
    return {
        "default": (...args) => _typeCheck.apply(this, args)
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