import rmdir from '../../modules/methods/rmdir';
jest.mock('fs', () => {
    return {
        "rmdir": (...args) => {
            _rmdir.apply(this, args);
        }
    }
});
let _rmdir = (...args) => { args[args.length - 1](); };
describe('rmdir', () => {
    beforeEach(() => {
        _rmdir = (...args) => { args[args.length - 1](); };
    })
    it('should return null when there are no errors', async () => {
        _rmdir = jest.fn().mockImplementationOnce((...args) => { args[args.length - 1](null); });
        expect(await rmdir('/the/path.js')).toBe(null);
        expect(_rmdir).toHaveBeenLastCalledWith('/the/path.js', expect.any(Function))
    })
    it('should return error when there are errors', async () => {
        _rmdir = jest.fn().mockImplementationOnce((...args) => { args[args.length - 1]({}); });
        expect(await rmdir('/the/path.js')).toEqual({});
        expect(_rmdir).toHaveBeenLastCalledWith('/the/path.js', expect.any(Function));
    })
});
