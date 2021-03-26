import utimes from '../../compiled/transformedMinor/craydent.utimes';
jest.mock('fs', () => {
    return {
        "utimes": (...args: any[]) => {
            _utimes.apply(this, args);
        }
    }
});
let _utimes = (...args: any[]) => { args[args.length - 1](); };
describe('utimes', () => {
    beforeEach(() => {
        _utimes = (...args: any[]) => { args[args.length - 1](); };
    })
    it('should return null when there are no errors', async () => {
        _utimes = jest.fn().mockImplementationOnce((...args: any[]) => { args[args.length - 1](null); });
        expect(await utimes('/the/path.js', 'atime', 'mtime')).toBe(null);
        expect(_utimes).toHaveBeenLastCalledWith('/the/path.js', 'atime', 'mtime', expect.any(Function))
    })
    it('should return error when there are errors', async () => {
        _utimes = jest.fn().mockImplementationOnce((...args: any[]) => { args[args.length - 1]({}); });
        expect(await utimes('/the/path.js', 'atime', 'mtime')).toEqual({});
        expect(_utimes).toHaveBeenLastCalledWith('/the/path.js', 'atime', 'mtime', expect.any(Function));
    })
});
