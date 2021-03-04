import symlink from '../../compiled/transformedMinor/craydent.symlink';
jest.mock('fs', () => {
    return {
        "symlink": (...args) => {
            _symlink.apply(this, args);
        }
    }
});
let _symlink = (...args) => { args[args.length - 1](); };
describe('symlink', () => {
    beforeEach(() => {
        _symlink = (...args) => { args[args.length - 1](); };
    })
    it('should return null when there are no errors', async () => {
        _symlink = jest.fn().mockImplementationOnce((...args) => { args[args.length - 1](null); });
        expect(await symlink('/the/path.js', '/path')).toBe(null);
        expect(_symlink).toHaveBeenLastCalledWith('/the/path.js', '/path', expect.any(Function))
    })
    it('should return error when there are errors', async () => {
        _symlink = jest.fn().mockImplementationOnce((...args) => { args[args.length - 1]({}); });
        expect(await symlink('/the/path.js', '/path', 'file')).toEqual({});
        expect(_symlink).toHaveBeenLastCalledWith('/the/path.js', '/path', 'file', expect.any(Function));
    })
});
