import fchmod from '../../compiled/transformedMinor/craydent.fchmod';
jest.mock('fs', () => {
    return {
        "fchmod": (...args) => {
            _fchmod.apply(this, args);
        }
    }
});
let _fchmod = (...args) => { args[args.length - 1](); };
describe('fchmod', () => {
    beforeEach(() => {
        _fchmod = (...args) => { args[args.length - 1](); };
    })
    it('should return null when there are no errors', async () => {
        _fchmod = jest.fn().mockImplementationOnce((...args) => { args[args.length - 1](null); });
        expect(await fchmod(1, 'mode')).toBe(null);
        expect(_fchmod).toHaveBeenLastCalledWith(1, 'mode', expect.any(Function))
    })
    it('should return error when there are errors', async () => {
        _fchmod = jest.fn().mockImplementationOnce((...args) => { args[args.length - 1]({}); });
        expect(await fchmod(1, 'mode')).toEqual({});
        expect(_fchmod).toHaveBeenLastCalledWith(1, 'mode', expect.any(Function));
    })
});
