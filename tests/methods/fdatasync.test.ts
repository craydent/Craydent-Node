import fdatasync from '../../compiled/transformedMinor/craydent.fdatasync';
jest.mock('fs', () => {
    return {
        "fdatasync": (...args: any[]) => {
            _fdatasync.apply(this, args);
        }
    }
});
let _fdatasync = (...args: any[]) => { args[args.length - 1](); };
describe('fdatasync', () => {
    beforeEach(() => {
        _fdatasync = (...args: any[]) => { args[args.length - 1](); };
    })
    it('should return null when there are no errors', async () => {
        _fdatasync = jest.fn().mockImplementationOnce((...args: any[]) => { args[args.length - 1](null); });
        expect(await fdatasync(1)).toBe(null);
        expect(_fdatasync).toHaveBeenLastCalledWith(1, expect.any(Function))
    })
    it('should return error when there are errors', async () => {
        _fdatasync = jest.fn().mockImplementationOnce((...args: any[]) => { args[args.length - 1]({}); });
        expect(await fdatasync(1)).toEqual({});
        expect(_fdatasync).toHaveBeenLastCalledWith(1, expect.any(Function));
    })
});
