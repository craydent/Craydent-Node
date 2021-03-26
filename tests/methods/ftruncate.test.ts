import ftruncate from '../../compiled/transformedMinor/craydent.ftruncate';
jest.mock('fs', () => {
    return {
        "ftruncate": (...args: any[]) => {
            _ftruncate.apply(this, args);
        }
    }
});
let _ftruncate = (...args: any[]) => { args[args.length - 1](); };
describe('ftruncate', () => {
    beforeEach(() => {
        _ftruncate = (...args: any[]) => { args[args.length - 1](); };
    })
    it('should return null when there are no errors', async () => {
        _ftruncate = jest.fn().mockImplementationOnce((...args: any[]) => { args[args.length - 1](null); });
        expect(await ftruncate(1, 1)).toBe(null);
        expect(_ftruncate).toHaveBeenLastCalledWith(1, 1, expect.any(Function))
    })
    it('should return error when there are errors', async () => {
        _ftruncate = jest.fn().mockImplementationOnce((...args: any[]) => { args[args.length - 1]({}); });
        expect(await ftruncate(1, 1)).toEqual({});
        expect(_ftruncate).toHaveBeenLastCalledWith(1, 1, expect.any(Function));
    })
});
