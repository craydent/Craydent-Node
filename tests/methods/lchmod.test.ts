import lchmod from '../../modules/methods/lchmod';
jest.mock('fs', () => {
    return {
        "lchmod": (...args) => {
            _lchmod.apply(this, args);
        }
    }
});
let _lchmod = (...args) => { args[args.length - 1](); };
describe('lchmod', () => {
    beforeEach(() => {
        _lchmod = (...args) => { args[args.length - 1](); };
    })
    it('should return null when there are no errors', async () => {
        _lchmod = jest.fn().mockImplementationOnce((...args) => { args[args.length - 1](null); });
        expect(await lchmod('/the/path.js', 1)).toBe(null);
        expect(_lchmod).toHaveBeenLastCalledWith('/the/path.js', 1, expect.any(Function))
    })
    it('should return error when there are errors', async () => {
        _lchmod = jest.fn().mockImplementationOnce((...args) => { args[args.length - 1]({}); });
        expect(await lchmod('/the/path.js', 1)).toEqual({});
        expect(_lchmod).toHaveBeenLastCalledWith('/the/path.js', 1, expect.any(Function));
    })
});
