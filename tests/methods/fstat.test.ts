import fstat from '../../modules/methods/fstat';
jest.mock('fs', () => {
    return {
        "fstat": (...args) => {
            _fstat.apply(this, args);
        }
    }
});
let _fstat = (...args) => { args[args.length - 1](); };
describe('fstat', () => {
    beforeEach(() => {
        _fstat = (...args) => { args[args.length - 1](); };
    })
    it('should return null when there are no errors', async () => {
        _fstat = jest.fn().mockImplementationOnce((...args) => { args[args.length - 1](null); });
        expect(await fstat(1)).toBe(null);
        expect(_fstat).toHaveBeenLastCalledWith(1, expect.any(Function))
    })
    it('should return error when there are errors', async () => {
        _fstat = jest.fn().mockImplementationOnce((...args) => { args[args.length - 1]({}); });
        expect(await fstat(1)).toEqual({});
        expect(_fstat).toHaveBeenLastCalledWith(1, expect.any(Function));
    })
});
