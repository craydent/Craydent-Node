import lstat from '../../compiled/transformedMinor/craydent.lstat';
jest.mock('fs', () => {
    return {
        "lstat": (...args: any[]) => {
            _lstat.apply(this, args);
        }
    }
});
let _lstat = (...args: any[]) => { args[args.length - 1](); };
describe('lstat', () => {
    beforeEach(() => {
        _lstat = (...args: any[]) => { args[args.length - 1](); };
    })
    it('should return null when there are no errors', async () => {
        _lstat = jest.fn().mockImplementationOnce((...args: any[]) => { args[args.length - 1](null); });
        expect(await lstat('/the/path.js')).toBe(null);
        expect(_lstat).toHaveBeenLastCalledWith('/the/path.js', expect.any(Function))
    })
    it('should return error when there are errors', async () => {
        _lstat = jest.fn().mockImplementationOnce((...args: any[]) => { args[args.length - 1]({}); });
        expect(await lstat('/the/path.js')).toEqual({});
        expect(_lstat).toHaveBeenLastCalledWith('/the/path.js', expect.any(Function));
    })
});
