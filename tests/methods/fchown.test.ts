import fchown from '../../compiled/transformedMinor/craydent.fchown';
jest.mock('fs', () => {
    return {
        "fchown": (...args) => {
            _fchown.apply(this, args);
        }
    }
});
let _fchown = (...args) => { args[args.length - 1](); };
describe('fchown', () => {
    beforeEach(() => {
        _fchown = (...args) => { args[args.length - 1](); };
    })
    it('should return null when there are no errors', async () => {
        _fchown = jest.fn().mockImplementationOnce((...args) => { args[args.length - 1](null); });
        expect(await fchown(1, 1, 1)).toBe(null);
        expect(_fchown).toHaveBeenLastCalledWith(1, 1, 1, expect.any(Function))
    })
    it('should return error when there are errors', async () => {
        _fchown = jest.fn().mockImplementationOnce((...args) => { args[args.length - 1]({}); });
        expect(await fchown(1, 1, 1)).toEqual({});
        expect(_fchown).toHaveBeenLastCalledWith(1, 1, 1, expect.any(Function));
    })
});
