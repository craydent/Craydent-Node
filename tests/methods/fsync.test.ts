import fsync from '../../compiled/transformedMinor/craydent.fsync';
jest.mock('fs', () => {
    return {
        "fsync": (...args: any[]) => {
            _fsync.apply(this, args);
        }
    }
});
let _fsync = (...args: any[]) => { args[args.length - 1](); };
describe('fsync', () => {
    beforeEach(() => {
        _fsync = (...args: any[]) => { args[args.length - 1](); };
    })
    it('should return null when there are no errors', async () => {
        _fsync = jest.fn().mockImplementationOnce((...args: any[]) => { args[args.length - 1](null); });
        expect(await fsync(1)).toBe(null);
        expect(_fsync).toHaveBeenLastCalledWith(1, expect.any(Function))
    })
    it('should return error when there are errors', async () => {
        _fsync = jest.fn().mockImplementationOnce((...args: any[]) => { args[args.length - 1]({}); });
        expect(await fsync(1)).toEqual({});
        expect(_fsync).toHaveBeenLastCalledWith(1, expect.any(Function));
    })
});
