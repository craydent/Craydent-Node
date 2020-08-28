import getParameters from '../../modules/methods/getParameters';
jest.mock('../../modules/protected/_getFuncArgs', () => {
    return {
        "default": (...args) => _getFuncArgs.apply(this, args)
    }
});
let _getFuncArgs = () => { }
describe('getParameters', () => {
    beforeEach(() => {
        _getFuncArgs = () => { }
    });
    it('should getParameters', () => {
        function a(b, c) { }
        _getFuncArgs = jest.fn();
        getParameters(a);
        expect(_getFuncArgs).toHaveBeenCalledWith(a);
    });
});