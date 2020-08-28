import lstat from '../../modules/methods/lstat';
jest.mock('fs', () => {
    return {
        "lstat": (...args) => {
            _lstat.apply(this, args);
        }
    }
});
let _lstat = (...args) => { args[args.length - 1](); };
describe('lstat', () => {
    beforeEach(() => {
        _lstat = (...args) => { args[args.length - 1](); };
    })
    it('should return null when there are no errors', async () => {
        _lstat = jest.fn().mockImplementationOnce((...args) => { args[args.length - 1](null); });
        expect(await lstat('/the/path.js')).toBe(null);
        expect(_lstat).toHaveBeenLastCalledWith('/the/path.js', expect.any(Function))
    })
    it('should return error when there are errors', async () => {
        _lstat = jest.fn().mockImplementationOnce((...args) => { args[args.length - 1]({}); });
        expect(await lstat('/the/path.js')).toEqual({});
        expect(_lstat).toHaveBeenLastCalledWith('/the/path.js', expect.any(Function));
    })
});
