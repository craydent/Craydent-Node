import getParameters from '../../compiled/transformedMinor/craydent.getparameters';
jest.mock('../../compiled/transformedMinor/craydent.getparameters/protected/_getFuncArgs', () => {
    return {
        "default": (...args: any[]) => _getFuncArgs.apply(this, args as any)
    }
});
let _getFuncArgs = () => { }
describe('getParameters', () => {
    beforeEach(() => {
        _getFuncArgs = () => { }
    });
    it('should getParameters', () => {
        function a(b: any, c: any) { }
        _getFuncArgs = jest.fn();
        getParameters(a);
        expect(_getFuncArgs).toHaveBeenCalledWith(a);
    });
});